/* चंद्रकैलाश Tours & Travels - Complete Firestore & Local Persistence Service */

import { state, ensurePackagesHaveSlugsAndHeroProps } from '../context/state.js';
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

export async function fetchStorageData() {
    console.log('🔥 Fetching latest data from Firestore Database...');
    await seedFirestoreIfEmpty();

    try {
        const [pkgs, albums, reviews, bookings, siteSettings, i18n] = await Promise.all([
            fetchCollectionFromFirestore(COLLECTIONS.PACKAGES),
            fetchCollectionFromFirestore(COLLECTIONS.ALBUMS),
            fetchCollectionFromFirestore(COLLECTIONS.REVIEWS),
            fetchCollectionFromFirestore(COLLECTIONS.BOOKINGS).catch(() => []),
            fetchDocFromFirestore(COLLECTIONS.SETTINGS, 'siteSettings'),
            fetchDocFromFirestore(COLLECTIONS.SETTINGS, 'translations')
        ]);

        if (Array.isArray(pkgs) && pkgs.length > 0) {
            state.packages = pkgs;
        }

        if (Array.isArray(albums) && albums.length > 0) {
            state.albums = albums;
        }

        if (Array.isArray(reviews) && reviews.length > 0) {
            state.reviews = reviews;
        }

        if (Array.isArray(bookings)) {
            state.bookings = bookings;
        }

        if (siteSettings && typeof siteSettings === 'object') {
            state.settings = { ...state.settings, ...siteSettings };
        }

        if (i18n && typeof i18n === 'object') {
            state.translations = { ...state.translations, ...i18n };
        }

        ensurePackagesHaveSlugsAndHeroProps();
        saveStore();
        console.log('✅ Firestore Load Success! Loaded package count:', (state.packages || []).length);
    } catch (err) {
        console.error('❌ Cloud unavailable:', err.message);
        ensurePackagesHaveSlugsAndHeroProps();
        saveStore();
    }
}

export const fetchCloudData = fetchStorageData;

export async function initStorage(handleRouteCallback) {
    try {
        await fetchStorageData();
        setupFirestoreRealtimeSync(() => {
            saveStore();
            if (window.renderApp) window.renderApp();
        });
    } catch (err) {
        console.warn('⚠️ Firebase init notice:', err.message);
    }
    if (handleRouteCallback && typeof handleRouteCallback === 'function') {
        handleRouteCallback();
    }
}

export async function savePackageData(packageData) {
    console.log('Starting package save...');

    // 1. Upload Cover Image (if base64)
    if (packageData.coverImage && packageData.coverImage.startsWith('data:image/')) {
        console.log('Uploading cover image to Firebase Storage...');
        try {
            packageData.coverImage = await uploadImageToFirebaseStorage('packages', packageData.coverImage, 'pkg-cover');
        } catch (e) {
            console.warn('Cover upload notice:', e.message);
        }
    }

    // 2. Upload Gallery Images (if base64)
    if (Array.isArray(packageData.packageGallery)) {
        console.log('Uploading gallery images to Firebase Storage...');
        for (let i = 0; i < packageData.packageGallery.length; i++) {
            const img = packageData.packageGallery[i];
            if (typeof img === 'string' && img.startsWith('data:image/')) {
                try {
                    packageData.packageGallery[i] = await uploadImageToFirebaseStorage('packages', img, `pkg-gal-${i + 1}`);
                } catch (e) {
                    console.warn('Gallery upload notice:', e.message);
                }
            }
        }
    }

    // 3. Save Package Document to Firestore
    console.log('Saving package document into Firestore...');
    try {
        await saveDocToFirestore(COLLECTIONS.PACKAGES, packageData.id, packageData);
    } catch (e) {
        console.warn('Firestore save notice:', e.message);
    }

    // Update in-memory state & sync to persistent storage immediately
    state.packages = state.packages || [];
    const existingIdx = state.packages.findIndex(p => p.id === packageData.id);
    if (existingIdx !== -1) {
        state.packages[existingIdx] = packageData;
    } else {
        state.packages.unshift(packageData);
    }

    saveStore();
    console.log('Finished package save!');
    return { success: true, package: packageData, message: 'Package Saved Successfully' };
}

export const savePackageCloud = savePackageData;

export async function deletePackageData(packageId) {
    console.log('🔥 Deleting package:', packageId);
    
    const targetPkg = (state.packages || []).find(p => p.id === packageId);
    if (targetPkg) {
        if (targetPkg.coverImage) {
            deleteImageFromFirebaseStorage(targetPkg.coverImage);
        }
        if (Array.isArray(targetPkg.packageGallery)) {
            for (const imgUrl of targetPkg.packageGallery) {
                deleteImageFromFirebaseStorage(imgUrl);
            }
        }
    }

    deleteDocFromFirestore(COLLECTIONS.PACKAGES, packageId);
    state.packages = (state.packages || []).filter(p => p.id !== packageId);
    saveStore();

    return { success: true, packageId, message: 'Package Deleted Successfully' };
}

export const deletePackageCloud = deletePackageData;

export async function saveAlbumData(albumData) {
    console.log('🔥 Uploading album cover...');
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

    saveStore();
    return { success: true, album: albumData, message: 'Album Saved Successfully' };
}

export const saveAlbumCloud = saveAlbumData;

export async function deleteAlbumData(albumId) {
    console.log('🔥 Deleting album:', albumId);

    const targetAlb = (state.albums || []).find(a => a.id === albumId);
    if (targetAlb) {
        if (targetAlb.coverImage) {
            deleteImageFromFirebaseStorage(targetAlb.coverImage);
        }
        if (Array.isArray(targetAlb.photos)) {
            for (const p of targetAlb.photos) {
                if (p && p.image) deleteImageFromFirebaseStorage(p.image);
            }
        }
    }

    deleteDocFromFirestore(COLLECTIONS.ALBUMS, albumId);
    state.albums = (state.albums || []).filter(a => a.id !== albumId);
    saveStore();

    return { success: true, albumId, message: 'Album Deleted Successfully' };
}

export const deleteAlbumCloud = deleteAlbumData;

export async function saveSettingsData(settingsData) {
    console.log('🔥 Uploading logo / branding images...');
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
    saveStore();
    return { success: true, settings: state.settings, message: 'Settings Saved Successfully' };
}

export const saveSettingsCloud = saveSettingsData;
