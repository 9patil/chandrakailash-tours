/* चंद्रकैलाश Tours & Travels - Local Browser Storage Service (100% Free Plan Compatible) */

import { state, ensurePackagesHaveSlugsAndHeroProps } from '../context/state.js';

const STORAGE_KEYS = {
    PACKAGES: 'ck_packages_v1',
    ALBUMS: 'ck_albums_v1',
    SETTINGS: 'ck_settings_v1',
    REVIEWS: 'ck_reviews_v1'
};

export async function fetchLocalOrStaticData() {
    try {
        const localPkgs = localStorage.getItem(STORAGE_KEYS.PACKAGES);
        const localAlbums = localStorage.getItem(STORAGE_KEYS.ALBUMS);
        const localSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        const localReviews = localStorage.getItem(STORAGE_KEYS.REVIEWS);

        if (localPkgs) {
            try { state.packages = JSON.parse(localPkgs); } catch (e) {}
        }
        if (localAlbums) {
            try { state.albums = JSON.parse(localAlbums); } catch (e) {}
        }
        if (localSettings) {
            try { state.settings = { ...state.settings, ...JSON.parse(localSettings) }; } catch (e) {}
        }
        if (localReviews) {
            try { state.reviews = JSON.parse(localReviews); } catch (e) {}
        }

        // Fetch static JSON files if any key is missing in localStorage
        const fetchPromises = [];
        const timestamp = Date.now();

        if (!localPkgs) {
            fetchPromises.push(
                fetch(`data/packages.json?v=${timestamp}`)
                    .then(r => r.ok ? r.json() : null)
                    .then(d => {
                        if (d && Array.isArray(d)) {
                            state.packages = d;
                            localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(d));
                        }
                    })
            );
        }

        if (!localAlbums) {
            fetchPromises.push(
                fetch(`data/albums.json?v=${timestamp}`)
                    .then(r => r.ok ? r.json() : null)
                    .then(d => {
                        if (d && Array.isArray(d)) {
                            state.albums = d;
                            localStorage.setItem(STORAGE_KEYS.ALBUMS, JSON.stringify(d));
                        }
                    })
            );
        }

        if (!localSettings) {
            fetchPromises.push(
                fetch(`data/settings.json?v=${timestamp}`)
                    .then(r => r.ok ? r.json() : null)
                    .then(d => {
                        if (d && typeof d === 'object') {
                            state.settings = { ...state.settings, ...d };
                            localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
                        }
                    })
            );
        }

        if (!localReviews) {
            fetchPromises.push(
                fetch(`data/reviews.json?v=${timestamp}`)
                    .then(r => r.ok ? r.json() : null)
                    .then(d => {
                        if (d && Array.isArray(d)) {
                            state.reviews = d;
                            localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(d));
                        }
                    })
            );
        }

        if (fetchPromises.length > 0) {
            await Promise.allSettled(fetchPromises);
        }

        ensurePackagesHaveSlugsAndHeroProps();
    } catch (e) {
        console.warn('⚠️ Local storage initialization notice:', e);
    }
}

export function saveStore(renderCallback) {
    try {
        if (state.packages) localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(state.packages));
        if (state.albums) localStorage.setItem(STORAGE_KEYS.ALBUMS, JSON.stringify(state.albums));
        if (state.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
        if (state.reviews) localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(state.reviews));
    } catch (e) {
        console.error('Failed to write to localStorage:', e);
    }

    if (renderCallback && typeof renderCallback === 'function') {
        renderCallback();
    }
}

export async function initStorage(handleRouteCallback) {
    await fetchLocalOrStaticData();
    if (handleRouteCallback && typeof handleRouteCallback === 'function') {
        handleRouteCallback();
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
