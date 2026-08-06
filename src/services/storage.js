/* चंद्रकैलाश Tours & Travels - Central Cloud Storage Service (Zero GitHub Tokens) */

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

    // 1. Try Supabase Cloud Database if configured
    if (isSupabaseConfigured()) {
        const loadedFromSupabase = await fetchStateFromSupabase();
        if (loadedFromSupabase) return;
    }

    // 2. Try Serverless Cloud DB API or static JSON files
    try {
        const [pkgsRes, albumsRes, settingsRes, reviewsRes] = await Promise.allSettled([
            fetch(`data/packages.json?v=${timestamp}`, { cache: 'no-store' }),
            fetch(`data/albums.json?v=${timestamp}`, { cache: 'no-store' }),
            fetch(`data/settings.json?v=${timestamp}`, { cache: 'no-store' }),
            fetch(`data/reviews.json?v=${timestamp}`, { cache: 'no-store' })
        ]);

        if (pkgsRes.status === 'fulfilled' && pkgsRes.value.ok) {
            const pkgs = await pkgsRes.value.json();
            if (Array.isArray(pkgs)) state.packages = pkgs;
        }
        if (albumsRes.status === 'fulfilled' && albumsRes.value.ok) {
            const albums = await albumsRes.value.json();
            if (Array.isArray(albums)) state.albums = albums;
        }
        if (settingsRes.status === 'fulfilled' && settingsRes.value.ok) {
            const settings = await settingsRes.value.json();
            if (settings && typeof settings === 'object') state.settings = { ...state.settings, ...settings };
        }
        if (reviewsRes.status === 'fulfilled' && reviewsRes.value.ok) {
            const reviews = await reviewsRes.value.json();
            if (Array.isArray(reviews)) state.reviews = reviews;
        }
        ensurePackagesHaveSlugsAndHeroProps();
    } catch (e) {
        console.warn('⚠️ Central cloud data fetch notice:', e);
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
    } catch (e) {
        console.warn(`Local cloud store API sync notice for ${type}:`, e.message);
    }
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
    await syncToCloudStore('packages', state.packages);
    await fetchCloudData();
    return { success: true, package: packageData, message: 'Package Saved Successfully' };
}

export async function deletePackageCloud(packageId) {
    state.packages = (state.packages || []).filter(p => p.id !== packageId);
    saveStore();
    await syncToCloudStore('packages', state.packages);
    await fetchCloudData();
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
    await syncToCloudStore('albums', state.albums);
    await fetchCloudData();
    return { success: true, album: albumData, message: 'Album Saved Successfully' };
}

export async function deleteAlbumCloud(albumId) {
    state.albums = (state.albums || []).filter(a => a.id !== albumId);
    saveStore();
    await syncToCloudStore('albums', state.albums);
    await fetchCloudData();
    return { success: true, albumId, message: 'Album Deleted Successfully' };
}

export async function saveSettingsCloud(settingsData) {
    state.settings = { ...state.settings, ...settingsData };
    saveStore();
    await syncToCloudStore('settings', state.settings);
    await fetchCloudData();
    return { success: true, settings: state.settings, message: 'Settings Saved Successfully' };
}
