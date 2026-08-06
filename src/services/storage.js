/* चंद्रकैलाश Tours & Travels - Persistent Storage Service (IndexedDB + LocalStorage) */

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

export function saveStore(renderCallback) {
    try {
        localStorage.setItem('ck_set_v21', JSON.stringify(state.settings));
        localStorage.setItem('ck_pkgs_v21', JSON.stringify(state.packages));
        localStorage.setItem('ck_alb_v21', JSON.stringify(state.albums));
        localStorage.setItem('ck_rev_v21', JSON.stringify(state.reviews));
        localStorage.setItem('ck_bk_v21', JSON.stringify(state.bookings));
        localStorage.setItem('ck_i18n_v21', JSON.stringify(state.translations));
    } catch (err) {
        console.warn('LocalStorage save limit reached, state safely preserved in IndexedDB.', err);
    }
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

export function initStorage(handleRouteCallback) {
    try {
        const localPkgs = localStorage.getItem('ck_pkgs_v21');
        if (localPkgs) {
            const parsed = JSON.parse(localPkgs);
            if (Array.isArray(parsed) && parsed.length > 0) {
                state.packages = parsed;
            }
        }
        const localSet = localStorage.getItem('ck_set_v21');
        if (localSet) state.settings = JSON.parse(localSet);
        const localAlb = localStorage.getItem('ck_alb_v21');
        if (localAlb) state.albums = JSON.parse(localAlb);
        const localRev = localStorage.getItem('ck_rev_v21');
        if (localRev) state.reviews = JSON.parse(localRev);
        const localBk = localStorage.getItem('ck_bk_v21');
        if (localBk) state.bookings = JSON.parse(localBk);
    } catch (e) {}

    loadFromIndexedDB('ck_full_state_v21').then((savedState) => {
        if (savedState) {
            if (savedState.settings) state.settings = savedState.settings;
            if (savedState.packages) state.packages = savedState.packages;
            if (savedState.albums) state.albums = savedState.albums;
            if (savedState.reviews) state.reviews = savedState.reviews;
            if (savedState.bookings) state.bookings = savedState.bookings;
            if (savedState.translations) state.translations = savedState.translations;
        }
        ensurePackagesHaveSlugsAndHeroProps();
        if (handleRouteCallback && typeof handleRouteCallback === 'function') {
            handleRouteCallback();
        }
    }).catch(err => {
        console.warn('IndexedDB load warning:', err);
        ensurePackagesHaveSlugsAndHeroProps();
        if (handleRouteCallback && typeof handleRouteCallback === 'function') {
            handleRouteCallback();
        }
    });
}

export async function savePackageCloud(packageData) {
    state.packages = state.packages || [];
    const existingIdx = state.packages.findIndex(p => p.id === packageData.id);
    if (existingIdx !== -1) {
        state.packages[existingIdx] = packageData;
    } else {
        state.packages.unshift(packageData);
    }
    saveStore();
    return { success: true, package: packageData, message: 'Package Saved Successfully' };
}

export async function deletePackageCloud(packageId) {
    state.packages = (state.packages || []).filter(p => p.id !== packageId);
    saveStore();
    return { success: true, packageId, message: 'Package Deleted Successfully' };
}

export async function saveAlbumCloud(albumData) {
    state.albums = state.albums || [];
    const existingIdx = state.albums.findIndex(a => a.id === albumData.id);
    if (existingIdx !== -1) {
        state.albums[existingIdx] = albumData;
    } else {
        state.albums.unshift(albumData);
    }
    saveStore();
    return { success: true, album: albumData, message: 'Album Saved Successfully' };
}

export async function deleteAlbumCloud(albumId) {
    state.albums = (state.albums || []).filter(a => a.id !== albumId);
    saveStore();
    return { success: true, albumId, message: 'Album Deleted Successfully' };
}

export async function saveSettingsCloud(settingsData) {
    state.settings = { ...state.settings, ...settingsData };
    saveStore();
    return { success: true, settings: state.settings, message: 'Settings Saved Successfully' };
}
