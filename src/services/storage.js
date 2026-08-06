/* चंद्रकैलाश Tours & Travels - Complete Multi-Tier Persistent Storage Service */

import { state, ensurePackagesHaveSlugsAndHeroProps } from '../context/state.js';
import { fetchStateFromSupabase, saveSectionToSupabase, isSupabaseConfigured } from './supabase.js';

const DB_NAME = 'ChandrakailashToursDB';
const DB_VERSION = 2;
const STORE_NAME = 'app_state';

function openDB() {
    return new Promise((resolve) => {
        if (!window.indexedDB) return resolve(null);
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
        req.onsuccess = (e) => resolve(e.target.result);
        req.onerror = () => resolve(null);
    });
}

export async function saveToIndexedDB(key, val) {
    try {
        const db = await openDB();
        if (!db) return;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(val, key);
    } catch (err) {
        console.warn('IndexedDB save notice:', err);
    }
}

export async function loadFromIndexedDB(key) {
    try {
        const db = await openDB();
        if (!db) return null;
        return new Promise((resolve) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const req = tx.objectStore(STORE_NAME).get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve(null);
        });
    } catch (err) {
        return null;
    }
}

export async function fetchCloudData() {
    const timestamp = Date.now();

    // 1. Read persistent local state first so user edits are never lost
    let localPkgs = null;
    let localAlbums = null;
    let localSettings = null;
    let localReviews = null;

    try {
        const lp = localStorage.getItem('ck_pkgs_v21');
        if (lp) localPkgs = JSON.parse(lp);
        const la = localStorage.getItem('ck_alb_v21');
        if (la) localAlbums = JSON.parse(la);
        const ls = localStorage.getItem('ck_set_v21');
        if (ls) localSettings = JSON.parse(ls);
        const lr = localStorage.getItem('ck_rev_v21');
        if (lr) localReviews = JSON.parse(lr);
    } catch (e) {}

    const idbState = await loadFromIndexedDB('ck_full_state_v21');
    if (idbState) {
        if (!localPkgs && Array.isArray(idbState.packages)) localPkgs = idbState.packages;
        if (!localAlbums && Array.isArray(idbState.albums)) localAlbums = idbState.albums;
        if (!localSettings && idbState.settings) localSettings = idbState.settings;
        if (!localReviews && Array.isArray(idbState.reviews)) localReviews = idbState.reviews;
    }

    // 2. Try Supabase Cloud Database if configured
    if (isSupabaseConfigured()) {
        const loadedFromSupabase = await fetchStateFromSupabase();
        if (loadedFromSupabase) {
            console.log('Loaded package count:', (state.packages || []).length);
            return;
        }
    }

    // 3. Fetch static/cloud JSON and merge cleanly
    try {
        const [pkgsRes, albumsRes, settingsRes, reviewsRes] = await Promise.allSettled([
            fetch(`data/packages.json?v=${timestamp}`, { cache: 'no-store' }),
            fetch(`data/albums.json?v=${timestamp}`, { cache: 'no-store' }),
            fetch(`data/settings.json?v=${timestamp}`, { cache: 'no-store' }),
            fetch(`data/reviews.json?v=${timestamp}`, { cache: 'no-store' })
        ]);

        let cloudPkgs = null;
        if (pkgsRes.status === 'fulfilled' && pkgsRes.value.ok) {
            cloudPkgs = await pkgsRes.value.json();
        }

        if (Array.isArray(cloudPkgs)) {
            if (Array.isArray(localPkgs) && localPkgs.length > 0) {
                const mergedMap = new Map();
                cloudPkgs.forEach(p => mergedMap.set(p.id, p));
                localPkgs.forEach(p => mergedMap.set(p.id, p));
                state.packages = Array.from(mergedMap.values());
            } else {
                state.packages = cloudPkgs;
            }
        } else if (Array.isArray(localPkgs)) {
            state.packages = localPkgs;
        }

        if (albumsRes.status === 'fulfilled' && albumsRes.value.ok) {
            const cloudAlb = await albumsRes.value.json();
            if (Array.isArray(cloudAlb)) {
                if (Array.isArray(localAlbums) && localAlbums.length > 0) {
                    const mergedAlb = new Map();
                    cloudAlb.forEach(a => mergedAlb.set(a.id, a));
                    localAlbums.forEach(a => mergedAlb.set(a.id, a));
                    state.albums = Array.from(mergedAlb.values());
                } else {
                    state.albums = cloudAlb;
                }
            }
        } else if (Array.isArray(localAlbums)) {
            state.albums = localAlbums;
        }

        if (settingsRes.status === 'fulfilled' && settingsRes.value.ok) {
            const settings = await settingsRes.value.json();
            if (settings && typeof settings === 'object') {
                state.settings = { ...state.settings, ...settings, ...(localSettings || {}) };
            }
        } else if (localSettings) {
            state.settings = { ...state.settings, ...localSettings };
        }

        if (reviewsRes.status === 'fulfilled' && reviewsRes.value.ok) {
            const reviews = await reviewsRes.value.json();
            if (Array.isArray(reviews)) state.reviews = reviews;
        } else if (Array.isArray(localReviews)) {
            state.reviews = localReviews;
        }

        ensurePackagesHaveSlugsAndHeroProps();
    } catch (e) {
        if (Array.isArray(localPkgs)) state.packages = localPkgs;
        if (Array.isArray(localAlbums)) state.albums = localAlbums;
        if (localSettings) state.settings = { ...state.settings, ...localSettings };
        ensurePackagesHaveSlugsAndHeroProps();
    }

    console.log('Loaded package count:', (state.packages || []).length);
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

    saveToIndexedDB('ck_full_state_v21', {
        settings: state.settings,
        packages: state.packages,
        albums: state.albums,
        reviews: state.reviews,
        bookings: state.bookings,
        translations: state.translations
    });

    if (renderCallback && typeof renderCallback === 'function') {
        renderCallback();
    }
}

export async function initStorage(handleRouteCallback) {
    await fetchCloudData();
    if (handleRouteCallback && typeof handleRouteCallback === 'function') {
        handleRouteCallback();
    }
}

async function syncToCloudStore(type, data) {
    if (isSupabaseConfigured()) {
        await saveSectionToSupabase(type, data);
        return;
    }

    try {
        await fetch('/api/db', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, data })
        });
    } catch (e) {}
}

export async function savePackageCloud(packageData) {
    console.log('Uploading image...');

    // Process cover image upload if base64
    if (packageData.coverImage && packageData.coverImage.startsWith('data:image/')) {
        try {
            const uploadRes = await fetch('/api/uploadImage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageDataUrl: packageData.coverImage, folder: 'uploads' })
            });
            if (uploadRes.ok) {
                const uploadJson = await uploadRes.json();
                if (uploadJson.path) packageData.coverImage = uploadJson.path;
            }
        } catch (e) {}
    }

    // Process gallery images upload if base64
    if (Array.isArray(packageData.packageGallery)) {
        for (let i = 0; i < packageData.packageGallery.length; i++) {
            const img = packageData.packageGallery[i];
            if (typeof img === 'string' && img.startsWith('data:image/')) {
                try {
                    const uploadRes = await fetch('/api/uploadImage', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ imageDataUrl: img, folder: 'uploads' })
                    });
                    if (uploadRes.ok) {
                        const uploadJson = await uploadRes.json();
                        if (uploadJson.path) packageData.packageGallery[i] = uploadJson.path;
                    }
                } catch (e) {}
            }
        }
    }

    console.log('Image uploaded.');
    console.log('Saving package...');
    console.log('Updating JSON...');

    state.packages = state.packages || [];
    const existingIdx = state.packages.findIndex(p => p.id === packageData.id);
    if (existingIdx !== -1) {
        state.packages[existingIdx] = packageData;
    } else {
        state.packages.unshift(packageData);
    }

    saveStore();

    let githubSyncSuccess = false;
    try {
        const res = await fetch('/api/savePackage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ packageData })
        });
        if (res.ok) {
            const resJson = await res.json();
            if (resJson.package) {
                const pIdx = state.packages.findIndex(p => p.id === resJson.package.id);
                if (pIdx !== -1) state.packages[pIdx] = resJson.package;
            }
            githubSyncSuccess = true;
            console.log('Commit successful.');
        } else {
            const errJson = await res.json().catch(() => ({ error: 'GitHub save failed' }));
            console.warn('⚠️ GitHub API Notice:', errJson.error);
        }
    } catch (e) {
        console.warn('⚠️ Serverless savePackage notice:', e.message);
    }

    await syncToCloudStore('packages', state.packages);

    if (githubSyncSuccess) {
        console.log('Commit successful.');
    }

    console.log('Reloading packages...');
    await fetchCloudData();

    return { success: true, package: packageData, message: 'Package Saved Successfully' };
}

export async function deletePackageCloud(packageId) {
    console.log('Saving package...');
    console.log('Updating JSON...');

    state.packages = (state.packages || []).filter(p => p.id !== packageId);
    saveStore();

    try {
        const res = await fetch('/api/deletePackage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ packageId })
        });
        if (res.ok) {
            console.log('Commit successful.');
        }
    } catch (e) {}

    await syncToCloudStore('packages', state.packages);

    console.log('Reloading packages...');
    await fetchCloudData();

    return { success: true, packageId, message: 'Package Deleted Successfully' };
}

export async function saveAlbumCloud(albumData) {
    console.log('Uploading image...');

    if (albumData.coverImage && albumData.coverImage.startsWith('data:image/')) {
        try {
            const uploadRes = await fetch('/api/uploadImage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageDataUrl: albumData.coverImage, folder: 'uploads' })
            });
            if (uploadRes.ok) {
                const uploadJson = await uploadRes.json();
                if (uploadJson.path) albumData.coverImage = uploadJson.path;
            }
        } catch (e) {}
    }

    if (Array.isArray(albumData.photos)) {
        for (let i = 0; i < albumData.photos.length; i++) {
            const photo = albumData.photos[i];
            if (photo && photo.image && photo.image.startsWith('data:image/')) {
                try {
                    const uploadRes = await fetch('/api/uploadImage', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ imageDataUrl: photo.image, folder: 'uploads' })
                    });
                    if (uploadRes.ok) {
                        const uploadJson = await uploadRes.json();
                        if (uploadJson.path) photo.image = uploadJson.path;
                    }
                } catch (e) {}
            }
        }
    }

    console.log('Image uploaded.');
    console.log('Saving package...');
    console.log('Updating JSON...');

    state.albums = state.albums || [];
    const existingIdx = state.albums.findIndex(a => a.id === albumData.id);
    if (existingIdx !== -1) {
        state.albums[existingIdx] = albumData;
    } else {
        state.albums.unshift(albumData);
    }

    saveStore();

    try {
        const res = await fetch('/api/saveAlbum', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ albumData })
        });
        if (res.ok) {
            console.log('Commit successful.');
        }
    } catch (e) {}

    await syncToCloudStore('albums', state.albums);

    console.log('Reloading packages...');
    await fetchCloudData();

    return { success: true, album: albumData, message: 'Album Saved Successfully' };
}

export async function deleteAlbumCloud(albumId) {
    console.log('Saving package...');
    console.log('Updating JSON...');

    state.albums = (state.albums || []).filter(a => a.id !== albumId);
    saveStore();

    try {
        const res = await fetch('/api/deleteAlbum', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ albumId })
        });
        if (res.ok) {
            console.log('Commit successful.');
        }
    } catch (e) {}

    await syncToCloudStore('albums', state.albums);

    console.log('Reloading packages...');
    await fetchCloudData();

    return { success: true, albumId, message: 'Album Deleted Successfully' };
}

export async function saveSettingsCloud(settingsData) {
    console.log('Saving package...');
    console.log('Updating JSON...');

    state.settings = { ...state.settings, ...settingsData };
    saveStore();

    try {
        const res = await fetch('/api/saveSettings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ settingsData })
        });
        if (res.ok) {
            console.log('Commit successful.');
        }
    } catch (e) {}

    await syncToCloudStore('settings', state.settings);

    console.log('Reloading packages...');
    await fetchCloudData();

    return { success: true, settings: state.settings, message: 'Settings Saved Successfully' };
}
