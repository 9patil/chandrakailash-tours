/* चंद्रकैलाश Tours & Travels - Clean Client-Side Storage Service (LocalStorage + IndexedDB) */

import { state, ensurePackagesHaveSlugsAndHeroProps } from '../context/state.js';

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

export async function fetchStorageData() {
    const timestamp = Date.now();

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
                localPkgs.forEach(p => {
                    const existing = mergedMap.get(p.id);
                    if (existing) {
                        mergedMap.set(p.id, { ...existing, ...p });
                    } else {
                        mergedMap.set(p.id, p);
                    }
                });
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

    saveStore(null);
    console.log('Loaded package count:', (state.packages || []).length);
}

export const fetchCloudData = fetchStorageData;

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
    await fetchStorageData();
    if (handleRouteCallback && typeof handleRouteCallback === 'function') {
        handleRouteCallback();
    }
}

export async function savePackageData(packageData) {
    console.log('Saving package locally...');
    console.log('Updating JSON state...');

    state.packages = state.packages || [];
    const existingIdx = state.packages.findIndex(p => p.id === packageData.id);
    if (existingIdx !== -1) {
        state.packages[existingIdx] = packageData;
    } else {
        state.packages.unshift(packageData);
    }

    saveStore();
    console.log('Reloading packages...');
    await fetchStorageData();

    return { success: true, package: packageData, message: 'Package Saved (Local Browser Storage)' };
}

export const savePackageCloud = savePackageData;

export async function deletePackageData(packageId) {
    console.log('Deleting package locally...');
    console.log('Updating JSON state...');

    state.packages = (state.packages || []).filter(p => p.id !== packageId);
    saveStore();

    console.log('Reloading packages...');
    await fetchStorageData();

    return { success: true, packageId, message: 'Package Deleted (Local Browser Storage)' };
}

export const deletePackageCloud = deletePackageData;

export async function saveAlbumData(albumData) {
    console.log('Saving album locally...');
    console.log('Updating JSON state...');

    state.albums = state.albums || [];
    const existingIdx = state.albums.findIndex(a => a.id === albumData.id);
    if (existingIdx !== -1) {
        state.albums[existingIdx] = albumData;
    } else {
        state.albums.unshift(albumData);
    }

    saveStore();

    console.log('Reloading albums...');
    await fetchStorageData();

    return { success: true, album: albumData, message: 'Album Saved (Local Browser Storage)' };
}

export const saveAlbumCloud = saveAlbumData;

export async function deleteAlbumData(albumId) {
    console.log('Deleting album locally...');
    console.log('Updating JSON state...');

    state.albums = (state.albums || []).filter(a => a.id !== albumId);
    saveStore();

    console.log('Reloading albums...');
    await fetchStorageData();

    return { success: true, albumId, message: 'Album Deleted (Local Browser Storage)' };
}

export const deleteAlbumCloud = deleteAlbumData;

export async function saveSettingsData(settingsData) {
    console.log('Saving settings locally...');
    console.log('Updating JSON state...');

    state.settings = { ...state.settings, ...settingsData };
    saveStore();

    console.log('Reloading settings...');
    await fetchStorageData();

    return { success: true, settings: state.settings, message: 'Settings Saved (Local Browser Storage)' };
}

export const saveSettingsCloud = saveSettingsData;
