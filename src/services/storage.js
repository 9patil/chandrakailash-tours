/* चंद्रकैलाश Tours & Travels - Real-Time Multi-Device & Cloud Persistence Service */

import { state, ensurePackagesHaveSlugsAndHeroProps } from '../context/state.js';
import { INITIAL_PACKAGES, INITIAL_ALBUMS, INITIAL_REVIEWS } from '../data/initialData.js';
import { 
    COLLECTIONS,
    seedFirestoreIfEmpty,
    fetchCollectionFromFirestore,
    fetchDocFromFirestore,
    saveDocToFirestore,
    deleteDocFromFirestore,
    uploadImageToFirebaseStorage,
    deleteImageFromFirebaseStorage,
    setupFirestoreRealtimeSync
} from './firebase.js';

let lastCloudTimestamp = 0;

const isDefaultBusImage = (url) => typeof url === 'string' && (
    url.includes('photo-1561361513-2d000a50f0dc') || 
    url.includes('photo-1609946850426-3023b49c716d') || 
    url.includes('photo-1564507592333-c60657eea523') || 
    (url.includes('bus') && url.includes('unsplash'))
);

function cleanImageArray(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.filter(img => img && typeof img === 'string' && !isDefaultBusImage(img));
}

function isSameAsInitial(pkg) {
    if (!pkg || !pkg.id) return false;
    const initial = INITIAL_PACKAGES.find(p => p.id === pkg.id);
    if (!initial) return false;
    return (
        pkg.name === initial.name &&
        pkg.price === initial.price &&
        pkg.dates === initial.dates &&
        pkg.duration === initial.duration &&
        pkg.coverImage === initial.coverImage &&
        pkg.shortDesc === initial.shortDesc
    );
}

function mergePackageObjects(existing, incoming) {
    if (!existing) return incoming;
    if (!incoming) return existing;

    // If incoming is identical to hardcoded initial baseline data, BUT existing was edited by user, KEEP existing!
    if (isSameAsInitial(incoming) && !isSameAsInitial(existing)) {
        return { ...incoming, ...existing };
    }

    // If existing is identical to initial baseline data, BUT incoming was edited, KEEP incoming!
    if (isSameAsInitial(existing) && !isSameAsInitial(incoming)) {
        return { ...existing, ...incoming };
    }

    const initialPkg = INITIAL_PACKAGES.find(p => p.id === existing.id) || {};
    const merged = { ...initialPkg, ...incoming, ...existing };

    // Cover image check
    const existingCover = existing.coverImage;
    const incomingCover = incoming.coverImage;
    if (existingCover && !isDefaultBusImage(existingCover)) {
        merged.coverImage = existingCover;
    } else if (incomingCover && !isDefaultBusImage(incomingCover)) {
        merged.coverImage = incomingCover;
    } else {
        merged.coverImage = 'images/prem_mandir_vrindavan.jpg';
    }

    // Preserve custom package gallery photos
    const existingGallery = cleanImageArray(existing.packageGallery);
    const incomingGallery = cleanImageArray(incoming.packageGallery);

    if (existingGallery.length > 0) {
        merged.packageGallery = existingGallery;
    } else if (incomingGallery.length > 0) {
        merged.packageGallery = incomingGallery;
    } else {
        merged.packageGallery = ['images/prem_mandir_vrindavan.jpg'];
    }

    return merged;
}

function mergePackagesSafely(incomingPackages) {
    const deleted = new Set(state.deletedPackageIds || []);
    const pkgMap = new Map();
    INITIAL_PACKAGES.forEach(p => {
        if (!deleted.has(p.id)) pkgMap.set(p.id, p);
    });

    (state.packages || []).forEach(p => {
        if (!deleted.has(p.id)) {
            const existing = pkgMap.get(p.id);
            pkgMap.set(p.id, mergePackageObjects(existing, p));
        }
    });

    if (Array.isArray(incomingPackages)) {
        incomingPackages.forEach(p => {
            if (!deleted.has(p.id)) {
                const existing = pkgMap.get(p.id);
                pkgMap.set(p.id, mergePackageObjects(existing, p));
            }
        });
    }
    return Array.from(pkgMap.values()).filter(p => !deleted.has(p.id));
}

function mergeAlbumsSafely(incomingAlbums) {
    const deleted = new Set(state.deletedAlbumIds || []);
    const albMap = new Map();
    INITIAL_ALBUMS.forEach(a => {
        if (!deleted.has(a.id)) albMap.set(a.id, a);
    });

    (state.albums || []).forEach(a => {
        if (!deleted.has(a.id)) {
            const existing = albMap.get(a.id);
            albMap.set(a.id, existing ? { ...existing, ...a } : a);
        }
    });

    if (Array.isArray(incomingAlbums)) {
        incomingAlbums.forEach(a => {
            if (!deleted.has(a.id)) {
                const existing = albMap.get(a.id);
                if (existing) {
                    const merged = { ...existing, ...a };
                    if (Array.isArray(existing.photos) && existing.photos.length > 0) {
                        if (!Array.isArray(a.photos) || a.photos.length === 0) {
                            merged.photos = existing.photos;
                        }
                    }
                    albMap.set(a.id, merged);
                } else {
                    albMap.set(a.id, a);
                }
            }
        });
    }
    return Array.from(albMap.values()).filter(a => !deleted.has(a.id));
}

export function mergeReviewsSafely(incomingReviews) {
    const deleted = new Set(state.deletedReviewIds || []);
    const revMap = new Map();
    INITIAL_REVIEWS.forEach(r => {
        if (!deleted.has(r.id)) revMap.set(r.id, r);
    });

    (state.reviews || []).forEach(r => {
        if (!deleted.has(r.id)) {
            const existing = revMap.get(r.id);
            revMap.set(r.id, existing ? { ...existing, ...r } : r);
        }
    });

    if (Array.isArray(incomingReviews)) {
        incomingReviews.forEach(r => {
            if (!deleted.has(r.id)) {
                const existing = revMap.get(r.id);
                revMap.set(r.id, existing ? { ...existing, ...r } : r);
            }
        });
    }
    return Array.from(revMap.values()).filter(r => !deleted.has(r.id));
}

let _syncDebounceTimer = null;
let _isSyncingCloud = false;

export function saveStore(renderCallback) {
    try {
        localStorage.setItem('ck_set_v21', JSON.stringify(state.settings));
        localStorage.setItem('ck_pkgs_v21', JSON.stringify(state.packages));
        localStorage.setItem('ck_alb_v21', JSON.stringify(state.albums));
        localStorage.setItem('ck_rev_v21', JSON.stringify(state.reviews));
        localStorage.setItem('ck_bk_v21', JSON.stringify(state.bookings));
        localStorage.setItem('ck_i18n_v21', JSON.stringify(state.translations));
        localStorage.setItem('ck_del_pkgs_v21', JSON.stringify(state.deletedPackageIds || []));
        localStorage.setItem('ck_del_albs_v21', JSON.stringify(state.deletedAlbumIds || []));
        localStorage.setItem('ck_del_revs_v21', JSON.stringify(state.deletedReviewIds || []));
    } catch (err) {}

    if (renderCallback && typeof renderCallback === 'function') {
        renderCallback();
    }

    if (!_isSyncingCloud) {
        if (_syncDebounceTimer) clearTimeout(_syncDebounceTimer);
        _syncDebounceTimer = setTimeout(() => {
            syncToCloudDatabase();
        }, 300);
    }
}

export async function syncToCloudDatabase() {
    _isSyncingCloud = true;
    saveStore();
    try {
        const payload = {
            packages: state.packages || [],
            albums: state.albums || [],
            settings: state.settings || {},
            reviews: state.reviews || [],
            deletedPackageIds: state.deletedPackageIds || [],
            deletedAlbumIds: state.deletedAlbumIds || [],
            deletedReviewIds: state.deletedReviewIds || []
        };
        const res = await fetch('/api/db', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            const data = await res.json();
            if (data.lastUpdated) lastCloudTimestamp = data.lastUpdated;
            console.log('☁️ Multi-Device Cloud DB Sync Success! Package count:', (state.packages || []).length);
        }
    } catch (err) {
        console.warn('⚠️ Cloud DB Sync Notice:', err.message);
    } finally {
        _isSyncingCloud = false;
    }
}

export function loadFromLocalStorage() {
    try {
        const pkgs = localStorage.getItem('ck_pkgs_v21');
        const settings = localStorage.getItem('ck_set_v21');
        const albums = localStorage.getItem('ck_alb_v21');
        const reviews = localStorage.getItem('ck_rev_v21');
        const delPkgs = localStorage.getItem('ck_del_pkgs_v21');
        const delAlbs = localStorage.getItem('ck_del_albs_v21');
        const delRevs = localStorage.getItem('ck_del_revs_v21');

        if (delPkgs) state.deletedPackageIds = JSON.parse(delPkgs);
        if (delAlbs) state.deletedAlbumIds = JSON.parse(delAlbs);
        if (delRevs) state.deletedReviewIds = JSON.parse(delRevs);

        if (pkgs) {
            const parsed = JSON.parse(pkgs);
            if (Array.isArray(parsed) && parsed.length > 0) {
                state.packages = mergePackagesSafely(parsed);
            }
        }
        if (settings) {
            const parsed = JSON.parse(settings);
            if (parsed && typeof parsed === 'object') {
                state.settings = { ...state.settings, ...parsed };
            }
        }
        if (albums) {
            const parsed = JSON.parse(albums);
            if (Array.isArray(parsed) && parsed.length > 0) {
                state.albums = mergeAlbumsSafely(parsed);
            }
        }
        if (reviews) {
            const parsed = JSON.parse(reviews);
            if (Array.isArray(parsed) && parsed.length > 0) {
                state.reviews = mergeReviewsSafely(parsed);
            }
        }

        // Auto-sanitize any leftover broken 404 or bus image URLs in local storage
        if (Array.isArray(state.packages)) {
            state.packages.forEach(p => {
                if (isDefaultBusImage(p.coverImage)) {
                    p.coverImage = 'images/prem_mandir_vrindavan.jpg';
                }
                if (Array.isArray(p.packageGallery)) {
                    p.packageGallery = p.packageGallery.map(img => isDefaultBusImage(img) ? 'images/prem_mandir_vrindavan.jpg' : img);
                }
            });
        }
        if (Array.isArray(state.albums)) {
            state.albums.forEach(a => {
                if (isDefaultBusImage(a.coverImage)) {
                    a.coverImage = 'images/prem_mandir_vrindavan.jpg';
                }
                if (Array.isArray(a.photos)) {
                    a.photos.forEach(ph => {
                        if (ph && isDefaultBusImage(ph.image)) {
                            ph.image = 'images/prem_mandir_vrindavan.jpg';
                        }
                    });
                }
            });
        }
    } catch (e) {
        console.warn('⚠️ LocalStorage load notice:', e.message);
    }
}

export async function fetchStorageData() {
    console.log('☁️ Fetching latest multi-device data from Cloud Database...');

    // Restore local device changes first so user edits are immediately loaded
    loadFromLocalStorage();
    ensurePackagesHaveSlugsAndHeroProps();

    // 1. Fetch from Vercel Multi-Device API (/api/db)
    try {
        const res = await fetch('/api/db?t=' + Date.now(), { cache: 'no-store' });
        if (res.ok) {
            const cloudData = await res.json();
            if (cloudData) {
                if (Array.isArray(cloudData.packages) && cloudData.packages.length > 0) {
                    state.packages = mergePackagesSafely(cloudData.packages);
                }
                if (Array.isArray(cloudData.albums) && cloudData.albums.length > 0) {
                    state.albums = mergeAlbumsSafely(cloudData.albums);
                }
                if (Array.isArray(cloudData.reviews) && cloudData.reviews.length > 0) {
                    state.reviews = mergeReviewsSafely(cloudData.reviews);
                }
                if (cloudData.settings && typeof cloudData.settings === 'object') {
                    state.settings = { ...state.settings, ...cloudData.settings };
                }
                if (cloudData.lastUpdated) lastCloudTimestamp = cloudData.lastUpdated;

                ensurePackagesHaveSlugsAndHeroProps();
                saveStore();

                // If local state has custom edits, ensure cloud DB gets updated
                syncToCloudDatabase();

                console.log('✅ Multi-Device Cloud Data Loaded! Package count:', state.packages.length);
                return;
            }
        }
    } catch (e) {
        console.warn('⚠️ Cloud DB API fetch notice:', e.message);
    }

    // 2. Secondary Firestore Fallback
    try {
        const [pkgs, albums, reviews, siteSettings] = await Promise.all([
            fetchCollectionFromFirestore(COLLECTIONS.PACKAGES),
            fetchCollectionFromFirestore(COLLECTIONS.ALBUMS),
            fetchCollectionFromFirestore(COLLECTIONS.REVIEWS),
            fetchDocFromFirestore(COLLECTIONS.SETTINGS, 'siteSettings')
        ]);

        if (Array.isArray(pkgs) && pkgs.length > 0) state.packages = mergePackagesSafely(pkgs);
        if (Array.isArray(albums) && albums.length > 0) state.albums = mergeAlbumsSafely(albums);
        if (Array.isArray(reviews) && reviews.length > 0) state.reviews = reviews;
        if (siteSettings && typeof siteSettings === 'object') state.settings = { ...state.settings, ...siteSettings };

        ensurePackagesHaveSlugsAndHeroProps();
        saveStore();
    } catch (err) {
        console.warn('⚠️ Secondary Firestore Notice:', err.message);
        ensurePackagesHaveSlugsAndHeroProps();
        saveStore();
    }
}

export const fetchCloudData = fetchStorageData;

export function setupMultiDeviceRealtimeSync() {
    console.log('⚡ Initializing Multi-Device Real-Time Polling...');
    setInterval(async () => {
        try {
            const res = await fetch('/api/db?t=' + Date.now(), { cache: 'no-store' });
            if (res.ok) {
                const cloudData = await res.json();
                if (cloudData && cloudData.lastUpdated && cloudData.lastUpdated > lastCloudTimestamp) {
                    lastCloudTimestamp = cloudData.lastUpdated;
                    if (Array.isArray(cloudData.packages)) state.packages = mergePackagesSafely(cloudData.packages);
                    if (Array.isArray(cloudData.albums)) state.albums = mergeAlbumsSafely(cloudData.albums);
                    if (Array.isArray(cloudData.reviews)) state.reviews = cloudData.reviews;
                    if (cloudData.settings) state.settings = { ...state.settings, ...cloudData.settings };

                    ensurePackagesHaveSlugsAndHeroProps();
                    saveStore();
                    console.log('⚡ Real-time Multi-Device update received! Packages count:', state.packages.length);
                    if (window.renderApp) window.renderApp();
                }
            }
        } catch (e) {}
    }, 3000);
}

export async function initStorage(handleRouteCallback) {
    try {
        await fetchStorageData();
        setupMultiDeviceRealtimeSync();
        setupFirestoreRealtimeSync(() => {
            saveStore();
            if (window.renderApp) window.renderApp();
        });
    } catch (err) {
        console.warn('⚠️ Storage init notice:', err.message);
    }
    if (handleRouteCallback && typeof handleRouteCallback === 'function') {
        handleRouteCallback();
    }
}

export async function savePackageData(packageData) {
    console.log('Starting package save...');

    // 1. Upload Cover Image (if base64)
    if (packageData.coverImage && packageData.coverImage.startsWith('data:image/')) {
        console.log('Uploading cover image...');
        try {
            packageData.coverImage = await uploadImageToFirebaseStorage('packages', packageData.coverImage, 'pkg-cover');
        } catch (e) {}
    }

    // 2. Upload Gallery Images (if base64)
    if (Array.isArray(packageData.packageGallery)) {
        for (let i = 0; i < packageData.packageGallery.length; i++) {
            const img = packageData.packageGallery[i];
            if (typeof img === 'string' && img.startsWith('data:image/')) {
                try {
                    packageData.packageGallery[i] = await uploadImageToFirebaseStorage('packages', img, `pkg-gal-${i + 1}`);
                } catch (e) {}
            }
        }
    }

    // 3. Save Package Document to Firestore
    try {
        await saveDocToFirestore(COLLECTIONS.PACKAGES, packageData.id, packageData);
    } catch (e) {}

    // Update in-memory state safely without losing other packages
    state.packages = state.packages || [];
    const existingIdx = state.packages.findIndex(p => p.id === packageData.id);
    if (existingIdx !== -1) {
        state.packages[existingIdx] = { ...state.packages[existingIdx], ...packageData };
    } else {
        state.packages.unshift(packageData);
    }

    state.packages = mergePackagesSafely(state.packages);
    lastCloudTimestamp = Date.now();
    saveStore();

    await syncToCloudDatabase();
    console.log('Finished package save! Total packages:', state.packages.length);
    return { success: true, package: packageData, message: 'Package Saved Successfully' };
}

export const savePackageCloud = savePackageData;

export async function deletePackageData(packageId) {
    console.log('🔥 Deleting package:', packageId);

    state.deletedPackageIds = state.deletedPackageIds || [];
    if (!state.deletedPackageIds.includes(packageId)) {
        state.deletedPackageIds.push(packageId);
    }
    
    const targetPkg = (state.packages || []).find(p => p.id === packageId);
    if (targetPkg) {
        if (targetPkg.coverImage) deleteImageFromFirebaseStorage(targetPkg.coverImage);
        if (Array.isArray(targetPkg.packageGallery)) {
            for (const imgUrl of targetPkg.packageGallery) deleteImageFromFirebaseStorage(imgUrl);
        }
    }

    deleteDocFromFirestore(COLLECTIONS.PACKAGES, packageId);
    state.packages = (state.packages || []).filter(p => p.id !== packageId);
    lastCloudTimestamp = Date.now();
    saveStore();
    await syncToCloudDatabase();

    return { success: true, packageId, message: 'Package Deleted Successfully' };
}

export const deletePackageCloud = deletePackageData;

export async function saveAlbumData(albumData) {
    if (albumData.coverImage && albumData.coverImage.startsWith('data:image/')) {
        try {
            albumData.coverImage = await uploadImageToFirebaseStorage('gallery', albumData.coverImage, 'alb-cover');
        } catch (e) {}
    }

    if (Array.isArray(albumData.photos)) {
        for (let i = 0; i < albumData.photos.length; i++) {
            const photo = albumData.photos[i];
            if (photo && photo.image && photo.image.startsWith('data:image/')) {
                try {
                    photo.image = await uploadImageToFirebaseStorage('gallery', photo.image, `alb-photo-${i + 1}`);
                } catch (e) {}
            }
        }
    }

    saveDocToFirestore(COLLECTIONS.ALBUMS, albumData.id, albumData);

    state.albums = state.albums || [];
    const existingIdx = state.albums.findIndex(a => a.id === albumData.id);
    if (existingIdx !== -1) {
        state.albums[existingIdx] = albumData;
    } else {
        state.albums.unshift(albumData);
    }

    state.albums = mergeAlbumsSafely(state.albums);
    lastCloudTimestamp = Date.now();
    saveStore();

    await syncToCloudDatabase();
    return { success: true, album: albumData, message: 'Album Saved Successfully' };
}

export const saveAlbumCloud = saveAlbumData;

export async function deleteAlbumData(albumId) {
    state.deletedAlbumIds = state.deletedAlbumIds || [];
    if (!state.deletedAlbumIds.includes(albumId)) {
        state.deletedAlbumIds.push(albumId);
    }

    const targetAlb = (state.albums || []).find(a => a.id === albumId);
    if (targetAlb) {
        if (targetAlb.coverImage) deleteImageFromFirebaseStorage(targetAlb.coverImage);
        if (Array.isArray(targetAlb.photos)) {
            for (const p of targetAlb.photos) {
                if (p && p.image) deleteImageFromFirebaseStorage(p.image);
            }
        }
    }

    deleteDocFromFirestore(COLLECTIONS.ALBUMS, albumId);
    state.albums = (state.albums || []).filter(a => a.id !== albumId);
    lastCloudTimestamp = Date.now();
    saveStore();
    await syncToCloudDatabase();

    return { success: true, albumId, message: 'Album Deleted Successfully' };
}

export const deleteAlbumCloud = deleteAlbumData;

export async function saveSettingsData(settingsData) {
    if (settingsData.logoUrl && settingsData.logoUrl.startsWith('data:image/')) {
        try {
            settingsData.logoUrl = await uploadImageToFirebaseStorage('logo', settingsData.logoUrl, 'brand-logo');
        } catch (e) {}
    }
    if (settingsData.heroBgImage && settingsData.heroBgImage.startsWith('data:image/')) {
        try {
            settingsData.heroBgImage = await uploadImageToFirebaseStorage('hero', settingsData.heroBgImage, 'hero-bg');
        } catch (e) {}
    }

    saveDocToFirestore(COLLECTIONS.SETTINGS, 'siteSettings', settingsData);

    state.settings = { ...state.settings, ...settingsData };
    await syncToCloudDatabase();
    return { success: true, settings: state.settings, message: 'Settings Saved Successfully' };
}

export const saveSettingsCloud = saveSettingsData;
