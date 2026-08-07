/* चंद्रकैलाश Tours & Travels - Real-Time Multi-Device & Cloud Persistence Service */

import { state, ensurePackagesHaveSlugsAndHeroProps } from '../context/state.js';
import { INITIAL_PACKAGES, INITIAL_ALBUMS } from '../data/initialData.js';
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

function mergePackagesSafely(incomingPackages) {
    const pkgMap = new Map();
    INITIAL_PACKAGES.forEach(p => pkgMap.set(p.id, p));
    (state.packages || []).forEach(p => pkgMap.set(p.id, p));
    if (Array.isArray(incomingPackages)) {
        incomingPackages.forEach(p => {
            const existing = pkgMap.get(p.id);
            if (existing) {
                pkgMap.set(p.id, { ...existing, ...p });
            } else {
                pkgMap.set(p.id, p);
            }
        });
    }
    return Array.from(pkgMap.values());
}

function mergeAlbumsSafely(incomingAlbums) {
    const albMap = new Map();
    INITIAL_ALBUMS.forEach(a => albMap.set(a.id, a));
    (state.albums || []).forEach(a => albMap.set(a.id, a));
    if (Array.isArray(incomingAlbums)) {
        incomingAlbums.forEach(a => albMap.set(a.id, a));
    }
    return Array.from(albMap.values());
}

export function saveStore(renderCallback) {
    try {
        localStorage.setItem('ck_set_v21', JSON.stringify(state.settings));
        localStorage.setItem('ck_pkgs_v21', JSON.stringify(state.packages));
        localStorage.setItem('ck_alb_v21', JSON.stringify(state.albums));
        localStorage.setItem('ck_rev_v21', JSON.stringify(state.reviews));
        localStorage.setItem('ck_bk_v21', JSON.stringify(state.bookings));
        localStorage.setItem('ck_i18n_v21', JSON.stringify(state.translations));
    } catch (err) {}

    if (renderCallback && typeof renderCallback === 'function') {
        renderCallback();
    }
}

export async function syncToCloudDatabase() {
    saveStore();
    try {
        const payload = {
            packages: state.packages || [],
            albums: state.albums || [],
            settings: state.settings || {},
            reviews: state.reviews || []
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
    }
}

export async function fetchStorageData() {
    console.log('☁️ Fetching latest multi-device data from Cloud Database...');

    // Ensure state.packages has all initial packages as baseline
    state.packages = mergePackagesSafely([]);
    state.albums = mergeAlbumsSafely([]);

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
                    state.reviews = cloudData.reviews;
                }
                if (cloudData.settings && typeof cloudData.settings === 'object') {
                    state.settings = { ...state.settings, ...cloudData.settings };
                }
                if (cloudData.lastUpdated) lastCloudTimestamp = cloudData.lastUpdated;

                ensurePackagesHaveSlugsAndHeroProps();
                saveStore();
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

    await syncToCloudDatabase();
    console.log('Finished package save! Total packages:', state.packages.length);
    return { success: true, package: packageData, message: 'Package Saved Successfully' };
}

export const savePackageCloud = savePackageData;

export async function deletePackageData(packageId) {
    console.log('🔥 Deleting package:', packageId);
    
    const targetPkg = (state.packages || []).find(p => p.id === packageId);
    if (targetPkg) {
        if (targetPkg.coverImage) deleteImageFromFirebaseStorage(targetPkg.coverImage);
        if (Array.isArray(targetPkg.packageGallery)) {
            for (const imgUrl of targetPkg.packageGallery) deleteImageFromFirebaseStorage(imgUrl);
        }
    }

    deleteDocFromFirestore(COLLECTIONS.PACKAGES, packageId);
    state.packages = (state.packages || []).filter(p => p.id !== packageId);
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

    await syncToCloudDatabase();
    return { success: true, album: albumData, message: 'Album Saved Successfully' };
}

export const saveAlbumCloud = saveAlbumData;

export async function deleteAlbumData(albumId) {
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
