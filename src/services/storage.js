/* चंद्रकैलाश Tours & Travels - Central Cloud Storage Service (GitHub Single Source of Truth) */

import { state, ensurePackagesHaveSlugsAndHeroProps } from '../context/state.js';

export async function fetchCloudData() {
    const timestamp = Date.now();
    try {
        console.log('🔄 Fetching live data from GitHub central repository...');
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
        console.warn('⚠️ Cloud data fetch notice:', e);
    }
}

export function saveStore(renderCallback) {
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

export async function savePackageCloud(packageData) {
    console.log('Uploading images...');
    console.log('Updating JSON...');
    console.log('Creating commit...');
    console.log('Pushing...');

    const res = await fetch('/api/savePackage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageData })
    });

    if (!res.ok) {
        const errJson = await res.json().catch(() => ({ error: 'GitHub Sync Failed' }));
        throw new Error(errJson.error || 'GitHub Commit Failed');
    }

    const data = await res.json();
    console.log('Refreshing cache...');
    await fetchCloudData();
    console.log('Done.');
    return data;
}

export async function deletePackageCloud(packageId) {
    console.log('Deleting package from GitHub JSON...');
    const res = await fetch('/api/deletePackage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId })
    });

    if (!res.ok) {
        const errJson = await res.json().catch(() => ({ error: 'GitHub Delete Failed' }));
        throw new Error(errJson.error || 'GitHub Delete Failed');
    }

    const data = await res.json();
    await fetchCloudData();
    return data;
}

export async function saveAlbumCloud(albumData) {
    console.log('Uploading album images...');
    console.log('Updating album JSON...');
    console.log('Creating commit...');
    console.log('Pushing...');

    const res = await fetch('/api/saveAlbum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ albumData })
    });

    if (!res.ok) {
        const errJson = await res.json().catch(() => ({ error: 'GitHub Album Sync Failed' }));
        throw new Error(errJson.error || 'GitHub Album Sync Failed');
    }

    const data = await res.json();
    console.log('Refreshing cache...');
    await fetchCloudData();
    console.log('Done.');
    return data;
}

export async function deleteAlbumCloud(albumId) {
    console.log('Deleting album from GitHub JSON...');
    const res = await fetch('/api/deleteAlbum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ albumId })
    });

    if (!res.ok) {
        const errJson = await res.json().catch(() => ({ error: 'GitHub Delete Failed' }));
        throw new Error(errJson.error || 'GitHub Delete Failed');
    }

    const data = await res.json();
    await fetchCloudData();
    return data;
}

export async function saveSettingsCloud(settingsData) {
    console.log('Updating settings JSON...');
    console.log('Creating commit...');
    console.log('Pushing...');

    const res = await fetch('/api/saveSettings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settingsData })
    });

    if (!res.ok) {
        const errJson = await res.json().catch(() => ({ error: 'GitHub Settings Sync Failed' }));
        throw new Error(errJson.error || 'GitHub Settings Sync Failed');
    }

    const data = await res.json();
    console.log('Refreshing cache...');
    await fetchCloudData();
    console.log('Done.');
    return data;
}
