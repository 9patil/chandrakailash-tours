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

// Helper: Timeout guard to prevent hanging
function withTimeout(promise, ms = 30000, operationName = 'Firebase operation') {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error(`${operationName} timed out after ${ms / 1000}s`)), ms)
        )
    ]);
}

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

    try {
        const extMatch = base64DataUrl.match(/^data:image\/([a-zA-Z0-9]+);/);
        const ext = extMatch ? (extMatch[1] === 'jpeg' ? 'jpg' : extMatch[1]) : 'webp';
        const filename = `${filenameHint}-${Date.now()}-${Math.floor(Math.random() * 1000)}.${ext}`;
        const storagePath = `images/${folder}/${filename}`;
        const storageRef = ref(storage, storagePath);

        const blob = dataURItoBlob(base64DataUrl);
        await withTimeout(uploadBytes(storageRef, blob), 30000, `Storage upload (${folder})`);

        const downloadUrl = await withTimeout(getDownloadURL(storageRef), 15000, `Get Storage download URL (${folder})`);
        console.log(`🔥 Firebase Storage Upload Success (${folder}):`, downloadUrl);
        return downloadUrl;
    } catch (err) {
        console.warn(`⚠️ Firebase Storage Upload Notice (${folder}):`, err.message);
        return base64DataUrl; // Fallback to base64 Data URL so image is never lost
    }
}

// Delete image from Firebase Storage if it's a Firebase Storage URL
export async function deleteImageFromFirebaseStorage(url) {
    if (!url || typeof url !== 'string' || !url.includes('firebasestorage.googleapis.com')) {
        return;
    }
    try {
        const storageRef = ref(storage, url);
        await withTimeout(deleteObject(storageRef), 15000, 'Storage delete');
        console.log('🔥 Firebase Storage Delete Success:', url);
    } catch (err) {
        console.warn('⚠️ Firebase Storage Delete Notice:', err.message);
    }
}

export async function saveDocToFirestore(collectionName, docId, data) {
    try {
        const docRef = doc(db, collectionName, docId);
        await withTimeout(setDoc(docRef, data, { merge: true }), 30000, `Save document (${collectionName}/${docId})`);
        console.log(`🔥 Firestore Save Success (${collectionName}/${docId})`);
        return true;
    } catch (err) {
        console.warn(`⚠️ Firestore Save Timeout/Notice (${collectionName}/${docId}):`, err.message);
        try {
            const docRef = doc(db, collectionName, docId);
            setDoc(docRef, data, { merge: true }).catch(e => console.warn('Background setDoc notice:', e.message));
            console.log(`🔥 Firestore Background Save Triggered (${collectionName}/${docId})`);
            return true;
        } catch (e) {
            console.error(`❌ Firestore Direct Save Error (${collectionName}/${docId}):`, e.message);
            throw err;
        }
    }
}

export async function deleteDocFromFirestore(collectionName, docId) {
    try {
        const docRef = doc(db, collectionName, docId);
        await withTimeout(deleteDoc(docRef), 20000, `Delete document (${collectionName}/${docId})`);
        console.log(`🔥 Firestore Delete Success (${collectionName}/${docId})`);
        return true;
    } catch (err) {
        console.error(`❌ Firestore Delete Error (${collectionName}/${docId}):`, err.message);
        throw err;
    }
}

export async function fetchCollectionFromFirestore(collectionName) {
    try {
        const querySnapshot = await withTimeout(getDocs(collection(db, collectionName)), 20000, `Fetch collection (${collectionName})`);
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
        const docSnap = await withTimeout(getDoc(docRef), 8000, `Fetch document (${collectionName}/${docId})`);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (err) {
        console.warn(`⚠️ Firestore Doc Fetch Notice (${collectionName}/${docId}):`, err.message);
        return null;
    }
}

export async function seedFirestoreIfEmpty() {
    try {
        const pkgsSnap = await withTimeout(getDocs(collection(db, COLLECTIONS.PACKAGES)), 5000, 'Seed check');
        if (pkgsSnap.empty) {
            console.log('🌱 Firestore empty. Seeding initial packages...');
            for (const pkg of INITIAL_PACKAGES) {
                await setDoc(doc(db, COLLECTIONS.PACKAGES, pkg.id), pkg);
            }
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
        const pkgs = [];
        snapshot.forEach(docSnap => pkgs.push({ id: docSnap.id, ...docSnap.data() }));
        state.packages = pkgs;
        ensurePackagesHaveSlugsAndHeroProps();
        console.log('⚡ Real-time Package update received! Count:', pkgs.length);
        if (onUpdateCallback) onUpdateCallback();
    }, (err) => console.warn('⚠️ Packages Sync Notice:', err.message));

    // 2. Gallery Albums Real-Time Listener
    onSnapshot(collection(db, COLLECTIONS.ALBUMS), (snapshot) => {
        const albums = [];
        snapshot.forEach(docSnap => albums.push({ id: docSnap.id, ...docSnap.data() }));
        state.albums = albums;
        console.log('⚡ Real-time Gallery Album update received! Count:', albums.length);
        if (onUpdateCallback) onUpdateCallback();
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
        const reviews = [];
        snapshot.forEach(docSnap => reviews.push({ id: docSnap.id, ...docSnap.data() }));
        state.reviews = reviews;
        console.log('⚡ Real-time Reviews update received! Count:', reviews.length);
        if (onUpdateCallback) onUpdateCallback();
    }, (err) => console.warn('⚠️ Reviews Sync Notice:', err.message));
}
