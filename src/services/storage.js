/* चंद्रकैलाश Tours & Travels - Complete Firestore & Firebase Storage Service */

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
        console.log('✅ Firestore Load Success! Loaded package count:', (state.packages || []).length);
    } catch (err) {
        console.error('❌ Cloud unavailable:', err.message);
    }
}

export const fetchCloudData = fetchStorageData;

export function saveStore(renderCallback) {
    if (renderCallback && typeof renderCallback === 'function') {
        renderCallback();
    }
}

export async function initStorage(handleRouteCallback) {
    try {
        await fetchStorageData();
        setupFirestoreRealtimeSync(() => {
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

    // 1. Upload Cover Image to Firebase Storage (if changed/base64)
    if (packageData.coverImage && packageData.coverImage.startsWith('data:image/')) {
        console.log('Uploading cover image to Firebase Storage...');
        packageData.coverImage = await uploadImageToFirebaseStorage('packages', packageData.coverImage, 'pkg-cover');
    }

    // 2. Upload Gallery Images to Firebase Storage (if changed/base64)
    if (Array.isArray(packageData.packageGallery)) {
        console.log('Uploading gallery images to Firebase Storage...');
        for (let i = 0; i < packageData.packageGallery.length; i++) {
            const img = packageData.packageGallery[i];
            if (typeof img === 'string' && img.startsWith('data:image/')) {
                packageData.packageGallery[i] = await uploadImageToFirebaseStorage('packages', img, `pkg-gal-${i + 1}`);
            }
        }
    }

    // 3. Save Package Document to Firestore
    console.log('Saving package document into Firestore...');
    await saveDocToFirestore(COLLECTIONS.PACKAGES, packageData.id, packageData);

    // Update in-memory state
    state.packages = state.packages || [];
    const existingIdx = state.packages.findIndex(p => p.id === packageData.id);
    if (existingIdx !== -1) {
        state.packages[existingIdx] = packageData;
    } else {
        state.packages.unshift(packageData);
    }

    console.log('Finished package save!');
    return { success: true, package: packageData, message: 'Package Saved Successfully into Firestore' };
}

export const savePackageCloud = savePackageData;

export async function deletePackageData(packageId) {
    console.log('🔥 Deleting package from Firestore:', packageId);
    
    const targetPkg = (state.packages || []).find(p => p.id === packageId);
    if (targetPkg) {
        if (targetPkg.coverImage) {
            await deleteImageFromFirebaseStorage(targetPkg.coverImage);
        }
        if (Array.isArray(targetPkg.packageGallery)) {
            for (const imgUrl of targetPkg.packageGallery) {
                await deleteImageFromFirebaseStorage(imgUrl);
            }
        }
    }

    await deleteDocFromFirestore(COLLECTIONS.PACKAGES, packageId);
    state.packages = (state.packages || []).filter(p => p.id !== packageId);

    return { success: true, packageId, message: 'Package Deleted Successfully from Firestore' };
}

export const deletePackageCloud = deletePackageData;

export async function saveAlbumData(albumData) {
    console.log('🔥 Uploading album cover to Firebase Storage...');
    if (albumData.coverImage && albumData.coverImage.startsWith('data:image/')) {
        albumData.coverImage = await uploadImageToFirebaseStorage('gallery', albumData.coverImage, 'alb-cover');
    }

    if (Array.isArray(albumData.photos)) {
        console.log('🔥 Uploading album photos to Firebase Storage...');
        for (let i = 0; i < albumData.photos.length; i++) {
            const photo = albumData.photos[i];
            if (photo && photo.image && photo.image.startsWith('data:image/')) {
                photo.image = await uploadImageToFirebaseStorage('gallery', photo.image, `alb-photo-${i + 1}`);
            }
        }
    }

    console.log('🔥 Saving album document into Firestore...');
    await saveDocToFirestore(COLLECTIONS.ALBUMS, albumData.id, albumData);

    state.albums = state.albums || [];
    const existingIdx = state.albums.findIndex(a => a.id === albumData.id);
    if (existingIdx !== -1) {
        state.albums[existingIdx] = albumData;
    } else {
        state.albums.unshift(albumData);
    }

    return { success: true, album: albumData, message: 'Album Saved Successfully into Firestore' };
}

export const saveAlbumCloud = saveAlbumData;

export async function deleteAlbumData(albumId) {
    console.log('🔥 Deleting album from Firestore:', albumId);

    const targetAlb = (state.albums || []).find(a => a.id === albumId);
    if (targetAlb) {
        if (targetAlb.coverImage) {
            await deleteImageFromFirebaseStorage(targetAlb.coverImage);
        }
        if (Array.isArray(targetAlb.photos)) {
            for (const p of targetAlb.photos) {
                if (p && p.image) await deleteImageFromFirebaseStorage(p.image);
            }
        }
    }

    await deleteDocFromFirestore(COLLECTIONS.ALBUMS, albumId);
    state.albums = (state.albums || []).filter(a => a.id !== albumId);

    return { success: true, albumId, message: 'Album Deleted Successfully from Firestore' };
}

export const deleteAlbumCloud = deleteAlbumData;

export async function saveSettingsData(settingsData) {
    console.log('🔥 Uploading logo / branding images to Firebase Storage...');
    if (settingsData.logoUrl && settingsData.logoUrl.startsWith('data:image/')) {
        settingsData.logoUrl = await uploadImageToFirebaseStorage('logo', settingsData.logoUrl, 'brand-logo');
    }
    if (settingsData.heroBgImage && settingsData.heroBgImage.startsWith('data:image/')) {
        settingsData.heroBgImage = await uploadImageToFirebaseStorage('hero', settingsData.heroBgImage, 'hero-bg');
    }

    console.log('🔥 Saving siteSettings document into Firestore...');
    await saveDocToFirestore(COLLECTIONS.SETTINGS, 'siteSettings', settingsData);

    state.settings = { ...state.settings, ...settingsData };
    return { success: true, settings: state.settings, message: 'Settings Saved Successfully into Firestore' };
}

export const saveSettingsCloud = saveSettingsData;
