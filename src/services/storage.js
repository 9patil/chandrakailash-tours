/* चंद्रकैलाश Tours & Travels - Central GitHub Storage Service */

import { state, ensurePackagesHaveSlugsAndHeroProps } from '../context/state.js';

export async function fetchStorageData() {
    const timestamp = Date.now();
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
            if (settings && typeof settings === 'object') {
                state.settings = { ...state.settings, ...settings };
            }
        }

        if (reviewsRes.status === 'fulfilled' && reviewsRes.value.ok) {
            const reviews = await reviewsRes.value.json();
            if (Array.isArray(reviews)) state.reviews = reviews;
        }

        ensurePackagesHaveSlugsAndHeroProps();
    } catch (e) {
        console.warn('⚠️ Central repository data fetch notice:', e);
        ensurePackagesHaveSlugsAndHeroProps();
    }

    console.log('Loaded package count:', (state.packages || []).length);
}

export const fetchCloudData = fetchStorageData;

export function saveStore(renderCallback) {
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
    console.log('Saving package...');
    console.log('Storage: GitHub Central Repository (9patil/chandrakailash-tours)');

    if (packageData.coverImage && packageData.coverImage.startsWith('data:image/')) {
        console.log('Uploading image...');
        const uploadRes = await fetch('/api/uploadImage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageDataUrl: packageData.coverImage, folder: 'uploads' })
        });
        if (!uploadRes.ok) {
            const errJson = await uploadRes.json().catch(() => ({ error: 'Image upload failed' }));
            throw new Error('Image Upload Failed: ' + (errJson.error || 'GitHub token or repository access error'));
        }
        const uploadJson = await uploadRes.json();
        if (uploadJson.path) packageData.coverImage = uploadJson.path;
        console.log('Image uploaded.');
    }

    if (Array.isArray(packageData.packageGallery)) {
        for (let i = 0; i < packageData.packageGallery.length; i++) {
            const img = packageData.packageGallery[i];
            if (typeof img === 'string' && img.startsWith('data:image/')) {
                console.log(`Uploading gallery image ${i + 1}...`);
                const uploadRes = await fetch('/api/uploadImage', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageDataUrl: img, folder: 'uploads' })
                });
                if (!uploadRes.ok) {
                    const errJson = await uploadRes.json().catch(() => ({ error: 'Gallery upload failed' }));
                    throw new Error('Gallery Image Upload Failed: ' + (errJson.error || 'GitHub token or repository access error'));
                }
                const uploadJson = await uploadRes.json();
                if (uploadJson.path) packageData.packageGallery[i] = uploadJson.path;
            }
        }
    }

    console.log('Updating JSON...');

    const res = await fetch('/api/savePackage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageData })
    });

    if (!res.ok) {
        const errJson = await res.json().catch(() => ({ error: 'GitHub Save Failed' }));
        throw new Error(errJson.error || 'GitHub Repository Save Failed');
    }

    const resJson = await res.json();
    console.log('Commit successful.');
    console.log('Reloading packages...');

    await fetchStorageData();

    return {
        success: true,
        package: resJson.package || packageData,
        message: 'Package Saved Successfully to GitHub Central Repository'
    };
}

export const savePackageCloud = savePackageData;

export async function deletePackageData(packageId) {
    console.log('Deleting package...');
    console.log('Storage: GitHub Central Repository (9patil/chandrakailash-tours)');
    console.log('Updating JSON...');

    const res = await fetch('/api/deletePackage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId })
    });

    if (!res.ok) {
        const errJson = await res.json().catch(() => ({ error: 'GitHub Delete Package Failed' }));
        throw new Error(errJson.error || 'GitHub Delete Package Failed');
    }

    console.log('Commit successful.');
    console.log('Reloading packages...');

    await fetchStorageData();

    return {
        success: true,
        packageId,
        message: 'Package Deleted Successfully from GitHub Central Repository'
    };
}

export const deletePackageCloud = deletePackageData;

export async function saveAlbumData(albumData) {
    console.log('Saving gallery...');
    console.log('Storage: GitHub Central Repository (9patil/chandrakailash-tours)');

    if (albumData.coverImage && albumData.coverImage.startsWith('data:image/')) {
        console.log('Uploading image...');
        const uploadRes = await fetch('/api/uploadImage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageDataUrl: albumData.coverImage, folder: 'uploads' })
        });
        if (!uploadRes.ok) {
            const errJson = await uploadRes.json().catch(() => ({ error: 'Album cover upload failed' }));
            throw new Error('Album Cover Upload Failed: ' + (errJson.error || 'GitHub token or repository access error'));
        }
        const uploadJson = await uploadRes.json();
        if (uploadJson.path) albumData.coverImage = uploadJson.path;
        console.log('Image uploaded.');
    }

    if (Array.isArray(albumData.photos)) {
        for (let i = 0; i < albumData.photos.length; i++) {
            const photo = albumData.photos[i];
            if (photo && photo.image && photo.image.startsWith('data:image/')) {
                console.log(`Uploading photo ${i + 1}...`);
                const uploadRes = await fetch('/api/uploadImage', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageDataUrl: photo.image, folder: 'uploads' })
                });
                if (!uploadRes.ok) {
                    const errJson = await uploadRes.json().catch(() => ({ error: 'Photo upload failed' }));
                    throw new Error('Photo Upload Failed: ' + (errJson.error || 'GitHub token or repository access error'));
                }
                const uploadJson = await uploadRes.json();
                if (uploadJson.path) photo.image = uploadJson.path;
            }
        }
    }

    console.log('Updating JSON...');

    const res = await fetch('/api/saveAlbum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ albumData })
    });

    if (!res.ok) {
        const errJson = await res.json().catch(() => ({ error: 'GitHub Album Save Failed' }));
        throw new Error(errJson.error || 'GitHub Album Save Failed');
    }

    const resJson = await res.json();
    console.log('Commit successful.');
    console.log('Reloading packages...');

    await fetchStorageData();

    return {
        success: true,
        album: resJson.album || albumData,
        message: 'Album Saved Successfully to GitHub Central Repository'
    };
}

export const saveAlbumCloud = saveAlbumData;

export async function deleteAlbumData(albumId) {
    console.log('Deleting album...');
    console.log('Storage: GitHub Central Repository (9patil/chandrakailash-tours)');
    console.log('Updating JSON...');

    const res = await fetch('/api/deleteAlbum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ albumId })
    });

    if (!res.ok) {
        const errJson = await res.json().catch(() => ({ error: 'GitHub Delete Album Failed' }));
        throw new Error(errJson.error || 'GitHub Delete Album Failed');
    }

    console.log('Commit successful.');
    console.log('Reloading packages...');

    await fetchStorageData();

    return {
        success: true,
        albumId,
        message: 'Album Deleted Successfully from GitHub Central Repository'
    };
}

export const deleteAlbumCloud = deleteAlbumData;

export async function saveSettingsData(settingsData) {
    console.log('Saving hero slider...');
    console.log('Storage: GitHub Central Repository (9patil/chandrakailash-tours)');
    console.log('Updating JSON...');

    const res = await fetch('/api/saveSettings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settingsData })
    });

    if (!res.ok) {
        const errJson = await res.json().catch(() => ({ error: 'GitHub Settings Save Failed' }));
        throw new Error(errJson.error || 'GitHub Settings Save Failed');
    }

    const resJson = await res.json();
    console.log('Commit successful.');
    console.log('Reloading packages...');

    await fetchStorageData();

    return {
        success: true,
        settings: resJson.settings || settingsData,
        message: 'Settings Saved Successfully to GitHub Central Repository'
    };
}

export const saveSettingsCloud = saveSettingsData;
