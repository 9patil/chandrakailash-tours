/* चंद्रकैलाश Tours & Travels - Central Firebase (Firestore & Storage) Integration */

import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { 
    getFirestore, collection, doc, getDoc, getDocs, setDoc, deleteDoc, onSnapshot 
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { 
    getStorage, ref, uploadBytes, getDownloadURL, deleteObject 
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';

import {
    DEFAULT_I18N,
    INITIAL_SETTINGS,
    INITIAL_PACKAGES,
    INITIAL_ALBUMS,
    INITIAL_REVIEWS,
    INITIAL_BOOKINGS
} from '../data/initialData.js';
import { state, ensurePackagesHaveSlugsAndHeroProps } from '../context/state.js';

const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "AIzaSyB_CKT_PublicWebKeyForFirebase99",
    authDomain: "chandrakailashtours.firebaseapp.com",
    projectId: "chandrakailashtours",
    storageBucket: "chandrakailashtours.appspot.com",
    messagingSenderId: "9960833090",
    appId: "1:9960833090:web:cktours2026"
};

const firebaseConfig = window.FIREBASE_CONFIG || DEFAULT_FIREBASE_CONFIG;

// Single Instance Initialization
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

export const db = getFirestore(app);
export const storage = getStorage(app);

export const COLLECTIONS = {
    PACKAGES: 'packages',
    ALBUMS: 'galleryAlbums',
    REVIEWS: 'reviews',
    BOOKINGS: 'bookings',
    SETTINGS: 'settings'
};

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

// Upload base64 image to Firebase Storage and return download URL
export async function uploadImageToFirebaseStorage(folder, base64DataUrl, filenameHint = 'img') {
    if (!base64DataUrl || typeof base64DataUrl !== 'string' || !base64DataUrl.startsWith('data:image/')) {
        return base64DataUrl; // Reuse existing URL if image was not changed!
    }

    console.log(`🔥 Uploading ${folder} image to Firebase Storage...`);
    try {
        const extMatch = base64DataUrl.match(/^data:image\/([a-zA-Z0-9]+);/);
        const ext = extMatch ? (extMatch[1] === 'jpeg' ? 'jpg' : extMatch[1]) : 'webp';
        const filename = `${filenameHint}-${Date.now()}-${Math.floor(Math.random() * 1000)}.${ext}`;
        const storagePath = `images/${folder}/${filename}`;
        const storageRef = ref(storage, storagePath);

        const blob = dataURItoBlob(base64DataUrl);
        await uploadBytes(storageRef, blob);

        console.log(`Waiting for download URL (${folder})...`);
        const downloadUrl = await getDownloadURL(storageRef);

        console.log(`🔥 Firebase Storage Upload Success (${folder}):`, downloadUrl);
        return downloadUrl;
    } catch (err) {
        console.error(`❌ Firebase Storage Upload Error (${folder}):`, err);
        let errorMsg = err.message || 'Storage upload failed';
        if (errorMsg.includes('permission-denied') || errorMsg.includes('403') || err.code === 'storage/unauthorized') {
            errorMsg = 'Storage permission denied: Check Firebase Storage Rules in Firebase Console.';
        } else if (errorMsg.includes('invalid-api-key') || errorMsg.includes('API key') || err.code === 'storage/invalid-api-key') {
            errorMsg = 'Invalid Firebase config: Check API Key in Firebase settings.';
        }
        throw new Error(`Storage upload failed: ${errorMsg}`);
    }
}

// Delete image from Firebase Storage if it's a Firebase Storage URL
export async function deleteImageFromFirebaseStorage(url) {
    if (!url || typeof url !== 'string' || !url.includes('firebasestorage.googleapis.com')) {
        return;
    }
    try {
        const storageRef = ref(storage, url);
        await deleteObject(storageRef);
        console.log('🔥 Firebase Storage Delete Success:', url);
    } catch (err) {
        console.warn('⚠️ Firebase Storage Delete Notice:', err.message);
    }
}

export async function saveDocToFirestore(collectionName, docId, data) {
    console.log(`🔥 Saving Firestore Document: ${collectionName}/${docId}...`);
    try {
        const docRef = doc(db, collectionName, docId);
        await setDoc(docRef, data, { merge: true });
        console.log(`🔥 Firestore Save Success: ${collectionName}/${docId}`);
        return true;
    } catch (err) {
        console.error(`❌ Firestore Save Error (${collectionName}/${docId}):`, err);
        let errorMsg = err.message || 'Firestore write failed';
        if (errorMsg.includes('permission-denied') || errorMsg.includes('403') || err.code === 'permission-denied') {
            errorMsg = 'Firestore permission denied: Check Security Rules in Firebase Console.';
        }
        throw new Error(errorMsg);
    }
}

export async function deleteDocFromFirestore(collectionName, docId) {
    console.log(`🔥 Deleting Firestore Document: ${collectionName}/${docId}...`);
    try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
        console.log(`🔥 Firestore Delete Success: ${collectionName}/${docId}`);
        return true;
    } catch (err) {
        console.error(`❌ Firestore Delete Error (${collectionName}/${docId}):`, err);
        throw err;
    }
}

export async function fetchCollectionFromFirestore(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const items = [];
        querySnapshot.forEach((docSnap) => {
            items.push({ id: docSnap.id, ...docSnap.data() });
        });
        return items;
    } catch (err) {
        console.warn(`⚠️ Firestore Fetch Notice (${collectionName}):`, err.message);
        return [];
    }
}

export async function fetchDocFromFirestore(collectionName, docId) {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (err) {
        console.warn(`⚠️ Firestore Doc Fetch Notice (${collectionName}/${docId}):`, err.message);
        return null;
    }
}

export async function seedFirestoreIfEmpty() {
    try {
        const pkgsSnap = await getDocs(collection(db, COLLECTIONS.PACKAGES));
        if (pkgsSnap.empty) {
            console.log('🌱 Firestore empty. Seeding initial packages...');
            for (const pkg of INITIAL_PACKAGES) {
                await setDoc(doc(db, COLLECTIONS.PACKAGES, pkg.id), pkg);
            }
        }

        const albSnap = await getDocs(collection(db, COLLECTIONS.ALBUMS));
        if (albSnap.empty) {
            console.log('🌱 Firestore empty. Seeding initial gallery albums...');
            for (const alb of INITIAL_ALBUMS) {
                await setDoc(doc(db, COLLECTIONS.ALBUMS, alb.id), alb);
            }
        }

        const revSnap = await getDocs(collection(db, COLLECTIONS.REVIEWS));
        if (revSnap.empty) {
            console.log('🌱 Firestore empty. Seeding initial reviews...');
            for (const rev of INITIAL_REVIEWS) {
                await setDoc(doc(db, COLLECTIONS.REVIEWS, rev.id), rev);
            }
        }

        const setSnap = await getDoc(doc(db, COLLECTIONS.SETTINGS, 'siteSettings'));
        if (!setSnap.exists()) {
            console.log('🌱 Firestore empty. Seeding initial settings...');
            await setDoc(doc(db, COLLECTIONS.SETTINGS, 'siteSettings'), INITIAL_SETTINGS);
        }

        const i18nSnap = await getDoc(doc(db, COLLECTIONS.SETTINGS, 'translations'));
        if (!i18nSnap.exists()) {
            console.log('🌱 Firestore empty. Seeding initial translations...');
            await setDoc(doc(db, COLLECTIONS.SETTINGS, 'translations'), DEFAULT_I18N);
        }
    } catch (err) {
        console.warn('⚠️ Firestore Seeding Notice:', err.message);
    }
}

// Real-Time Multi-Device Synchronization via Firestore onSnapshot
export function setupFirestoreRealtimeSync(onUpdateCallback) {
    console.log('🔥 Initializing Real-Time Firestore Synchronization...');

    // 1. Packages Real-Time Listener
    onSnapshot(collection(db, COLLECTIONS.PACKAGES), (snapshot) => {
        if (!snapshot.empty) {
            const pkgs = [];
            snapshot.forEach(docSnap => pkgs.push({ id: docSnap.id, ...docSnap.data() }));
            state.packages = pkgs;
            ensurePackagesHaveSlugsAndHeroProps();
            console.log('⚡ Real-time Package update received! Count:', pkgs.length);
            if (onUpdateCallback) onUpdateCallback();
        }
    }, (err) => console.warn('⚠️ Packages Sync Notice:', err.message));

    // 2. Gallery Albums Real-Time Listener
    onSnapshot(collection(db, COLLECTIONS.ALBUMS), (snapshot) => {
        if (!snapshot.empty) {
            const albums = [];
            snapshot.forEach(docSnap => albums.push({ id: docSnap.id, ...docSnap.data() }));
            state.albums = albums;
            console.log('⚡ Real-time Gallery Album update received! Count:', albums.length);
            if (onUpdateCallback) onUpdateCallback();
        }
    }, (err) => console.warn('⚠️ Gallery Sync Notice:', err.message));

    // 3. Site Settings Real-Time Listener
    onSnapshot(doc(db, COLLECTIONS.SETTINGS, 'siteSettings'), (docSnap) => {
        if (docSnap.exists()) {
            state.settings = { ...state.settings, ...docSnap.data() };
            console.log('⚡ Real-time Settings update received!');
            if (onUpdateCallback) onUpdateCallback();
        }
    }, (err) => console.warn('⚠️ Settings Sync Notice:', err.message));

    // 4. Reviews Real-Time Listener
    onSnapshot(collection(db, COLLECTIONS.REVIEWS), (snapshot) => {
        if (!snapshot.empty) {
            const reviews = [];
            snapshot.forEach(docSnap => reviews.push({ id: docSnap.id, ...docSnap.data() }));
            state.reviews = reviews;
            console.log('⚡ Real-time Reviews update received! Count:', reviews.length);
            if (onUpdateCallback) onUpdateCallback();
        }
    }, (err) => console.warn('⚠️ Reviews Sync Notice:', err.message));
}
