/* चंद्रकैलाश Tours & Travels - Direct Firestore Real-Time Multi-Device Storage Service */

import { state, ensurePackagesHaveSlugsAndHeroProps } from '../context/state.js';
import { INITIAL_SETTINGS } from '../data/initialData.js';
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
    if (renderCallback && typeof renderCallback === 'function') {
        renderCallback();
    }
}

export async function syncToCloudDatabase() {
    // Firestore onSnapshot handles multi-device sync automatically
}

export async function fetchStorageData() {
    console.log('🔥 Fetching live data directly from Firestore...');
    try {
        const [pkgs, albums, reviews, siteSettings] = await Promise.all([
            fetchCollectionFromFirestore(COLLECTIONS.PACKAGES),
            fetchCollectionFromFirestore(COLLECTIONS.ALBUMS),
            fetchCollectionFromFirestore(COLLECTIONS.REVIEWS),
            fetchDocFromFirestore(COLLECTIONS.SETTINGS, 'siteSettings')
        ]);

        if (Array.isArray(pkgs)) {
            state.packages = pkgs;
            ensurePackagesHaveSlugsAndHeroProps();
        }
        if (Array.isArray(albums)) {
            state.albums = albums;
        }
        if (Array.isArray(reviews)) {
            state.reviews = reviews;
        }
        if (siteSettings && typeof siteSettings === 'object') {
            state.settings = { ...INITIAL_SETTINGS, ...state.settings, ...siteSettings };
        }

        console.log('✅ Live Firestore Data Loaded! Packages count:', state.packages.length);
    } catch (err) {
        console.error('❌ Error fetching live Firestore data:', err);
    }
}

export const fetchCloudData = fetchStorageData;

export async function initStorage(handleRouteCallback) {
    console.log('🚀 Initializing Firestore Storage...');
    try {
        await seedFirestoreIfEmpty();
        await fetchStorageData();
        
        setupFirestoreRealtimeSync(() => {
            if (state.activeTab === 'gallery' && window.updateGalleryGridFLIP && !state.selectedAlbum) {
                const updatedFLIP = window.updateGalleryGridFLIP();
                if (!updatedFLIP && window.renderApp) {
                    window.renderApp();
                }
            } else {
                if (window.renderApp) window.renderApp();
            }
        });
    } catch (err) {
        console.warn('⚠️ Storage initialization notice:', err.message);
    }

    if (handleRouteCallback && typeof handleRouteCallback === 'function') {
        handleRouteCallback();
    }
}

export async function savePackageData(packageData) {
    console.log('🔥 Starting package save to Firestore...', packageData.id);

    // 1. Upload Cover Image (if base64)
    if (packageData.coverImage && packageData.coverImage.startsWith('data:image/')) {
        console.log('Uploading cover image to Firebase Storage...');
        packageData.coverImage = await uploadImageToFirebaseStorage('packages', packageData.coverImage, 'pkg-cover');
    }

    // 2. Upload Gallery Images (in parallel)
    if (Array.isArray(packageData.packageGallery)) {
        packageData.packageGallery = await Promise.all(
            packageData.packageGallery.map((img, i) => {
                if (typeof img === 'string' && img.startsWith('data:image/')) {
                    return uploadImageToFirebaseStorage('packages', img, `pkg-gal-${i + 1}`);
                }
                return Promise.resolve(img);
            })
        );
    }

    // 3. Upload Day-wise Itinerary Images (in parallel)
    if (Array.isArray(packageData.itinerary)) {
        await Promise.all(
            packageData.itinerary.map(async (day, i) => {
                if (day && day.image && typeof day.image === 'string' && day.image.startsWith('data:image/')) {
                    day.image = await uploadImageToFirebaseStorage('packages', day.image, `pkg-day-${i + 1}`);
                }
            })
        );
    }

    // 4. Save Package Document to Firestore
    const success = await saveDocToFirestore(COLLECTIONS.PACKAGES, packageData.id, packageData);
    if (!success) {
        throw new Error(`Failed to save package ${packageData.id} to Firestore.`);
    }

    // 5. Update local state
    state.packages = state.packages || [];
    const existingIdx = state.packages.findIndex(p => p.id === packageData.id);
    if (existingIdx !== -1) {
        state.packages[existingIdx] = { ...state.packages[existingIdx], ...packageData };
    } else {
        state.packages.unshift(packageData);
    }
    ensurePackagesHaveSlugsAndHeroProps();

    if (window.renderApp) window.renderApp();
    console.log('✅ Package saved to Firestore successfully! ID:', packageData.id);
    return { success: true, package: packageData, message: 'Package Saved Successfully' };
}

export const savePackageCloud = savePackageData;

export async function deletePackageData(packageId) {
    console.log('🔥 Permanently deleting package from Firestore & Storage:', packageId);
    
    const targetPkg = (state.packages || []).find(p => p.id === packageId);
    if (targetPkg) {
        // Delete Cover Image from Firebase Storage
        if (targetPkg.coverImage) {
            await deleteImageFromFirebaseStorage(targetPkg.coverImage);
        }
        // Delete Gallery Images from Firebase Storage
        if (Array.isArray(targetPkg.packageGallery)) {
            for (const imgUrl of targetPkg.packageGallery) {
                await deleteImageFromFirebaseStorage(imgUrl);
            }
        }
        // Delete Day-wise Itinerary Images from Firebase Storage
        if (Array.isArray(targetPkg.itinerary)) {
            for (const day of targetPkg.itinerary) {
                if (day && day.image) {
                    await deleteImageFromFirebaseStorage(day.image);
                }
            }
        }
    }

    // Delete Firestore Document permanently
    const success = await deleteDocFromFirestore(COLLECTIONS.PACKAGES, packageId);
    if (!success) {
        throw new Error(`Failed to delete package document ${packageId} from Firestore.`);
    }

    // Immediately remove from in-memory state
    state.packages = (state.packages || []).filter(p => p.id !== packageId);
    ensurePackagesHaveSlugsAndHeroProps();

    if (window.renderApp) window.renderApp();
    console.log('✅ Package deleted permanently! ID:', packageId);
    return { success: true, packageId, message: 'Package Deleted Successfully' };
}

export const deletePackageCloud = deletePackageData;

export async function saveAlbumData(albumData) {
    console.log('🔥 Saving gallery album to Firestore:', albumData.id);

    if (albumData.coverImage && albumData.coverImage.startsWith('data:image/')) {
        albumData.coverImage = await uploadImageToFirebaseStorage('gallery', albumData.coverImage, 'alb-cover');
    }

    if (Array.isArray(albumData.photos)) {
        for (let i = 0; i < albumData.photos.length; i++) {
            const photo = albumData.photos[i];
            if (photo && photo.image && photo.image.startsWith('data:image/')) {
                photo.image = await uploadImageToFirebaseStorage('gallery', photo.image, `alb-photo-${i + 1}`);
            }
        }
    }

    const success = await saveDocToFirestore(COLLECTIONS.ALBUMS, albumData.id, albumData);
    if (!success) {
        throw new Error(`Failed to save album ${albumData.id} to Firestore.`);
    }

    state.albums = state.albums || [];
    const existingIdx = state.albums.findIndex(a => a.id === albumData.id);
    if (existingIdx !== -1) {
        state.albums[existingIdx] = albumData;
    } else {
        state.albums.unshift(albumData);
    }

    if (state.activeTab === 'gallery' && window.updateGalleryGridFLIP && !state.selectedAlbum) {
        if (!window.updateGalleryGridFLIP() && window.renderApp) window.renderApp();
    } else {
        if (window.renderApp) window.renderApp();
    }
    return { success: true, album: albumData, message: 'Album Saved Successfully' };
}

export const saveAlbumCloud = saveAlbumData;

export async function deleteAlbumData(albumId) {
    console.log('🔥 Deleting gallery album from Firestore:', albumId);

    const targetAlb = (state.albums || []).find(a => a.id === albumId);
    if (targetAlb) {
        if (targetAlb.coverImage) await deleteImageFromFirebaseStorage(targetAlb.coverImage);
        if (Array.isArray(targetAlb.photos)) {
            for (const p of targetAlb.photos) {
                if (p && p.image) await deleteImageFromFirebaseStorage(p.image);
            }
        }
    }

    const success = await deleteDocFromFirestore(COLLECTIONS.ALBUMS, albumId);
    if (!success) {
        throw new Error(`Failed to delete album ${albumId} from Firestore.`);
    }

    state.albums = (state.albums || []).filter(a => a.id !== albumId);
    if (state.activeTab === 'gallery' && window.updateGalleryGridFLIP && !state.selectedAlbum) {
        if (!window.updateGalleryGridFLIP() && window.renderApp) window.renderApp();
    } else {
        if (window.renderApp) window.renderApp();
    }
    return { success: true, albumId, message: 'Album Deleted Successfully' };
}

export const deleteAlbumCloud = deleteAlbumData;

export async function saveSettingsData(settingsData) {
    if (settingsData.logoUrl && settingsData.logoUrl.startsWith('data:image/')) {
        settingsData.logoUrl = await uploadImageToFirebaseStorage('logo', settingsData.logoUrl, 'brand-logo');
    }
    if (settingsData.heroBgImage && settingsData.heroBgImage.startsWith('data:image/')) {
        settingsData.heroBgImage = await uploadImageToFirebaseStorage('hero', settingsData.heroBgImage, 'hero-bg');
    }

    const success = await saveDocToFirestore(COLLECTIONS.SETTINGS, 'siteSettings', settingsData);
    if (!success) {
        throw new Error('Failed to save site settings to Firestore.');
    }

    state.settings = { ...state.settings, ...settingsData };
    if (window.renderApp) window.renderApp();
    return { success: true, settings: state.settings, message: 'Settings Saved Successfully' };
}

export const saveSettingsCloud = saveSettingsData;
