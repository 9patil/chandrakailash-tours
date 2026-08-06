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
    loadFromIndexedDB('ck_full_state_v21').then((savedState) => {
        if (savedState) {
            if (savedState.settings) state.settings = savedState.settings;
            if (savedState.packages) state.packages = savedState.packages;
            if (savedState.albums) state.albums = savedState.albums;
            if (savedState.reviews) state.reviews = savedState.reviews;
            if (savedState.bookings) state.bookings = savedState.bookings;
            if (savedState.translations) state.translations = savedState.translations;
            ensurePackagesHaveSlugsAndHeroProps();
            if (handleRouteCallback && typeof handleRouteCallback === 'function') {
                handleRouteCallback();
            }
        }
    });
}
