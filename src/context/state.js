/* चंद्रकैलाश Tours & Travels - Central State Context */

import {
    DEFAULT_I18N,
    INITIAL_SETTINGS,
    INITIAL_PACKAGES,
    INITIAL_ALBUMS,
    INITIAL_REVIEWS,
    INITIAL_BOOKINGS
} from '../data/initialData.js';

export const uploaderState = {
    progress: {}, // id -> { active: boolean, percent: number, status: string, fileName: string }
    previews: {}, // id -> dataUrl
    dragOver: {}  // id -> boolean
};

function getInitialState(key, defaultVal) {
    try {
        const saved = localStorage.getItem(key);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(defaultVal) && Array.isArray(parsed) && parsed.length > 0) return parsed;
            if (!Array.isArray(defaultVal) && parsed && typeof parsed === 'object') return { ...defaultVal, ...parsed };
        }
    } catch (e) {}
    return defaultVal;
}

export const state = {
    activeTab: 'home',
    currentLang: 'en',
    settings: getInitialState('ck_set_v21', INITIAL_SETTINGS),
    packages: getInitialState('ck_pkgs_v21', INITIAL_PACKAGES),
    albums: getInitialState('ck_alb_v21', INITIAL_ALBUMS),
    reviews: getInitialState('ck_rev_v21', INITIAL_REVIEWS),
    bookings: getInitialState('ck_bk_v21', INITIAL_BOOKINGS),
    translations: getInitialState('ck_i18n_v21', DEFAULT_I18N),
    selectedPkg: null,
    editingPkg: null,
    editingAlbum: null,
    selectedAlbum: null,
    activeHeroSlide: 0,
    adminLoggedIn: false,
    adminActiveTab: 'overview',
    showLoginModal: false,
    adminDrawerOpen: false, // For mobile sidebar overlay drawer
    csrfToken: Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2, '0')).join(''),
    loginFailures: 0,
    lockoutUntil: 0,
    loginErrorMessage: '',
    lastActivityTime: Date.now(),
    showAddPkgModal: false,
    showDiscardPkgConfirmModal: false,
    pkgEditorInitialSnapshot: null,
    showAddAlbumModal: false,
    showDiscardAlbumConfirmModal: false,
    albumEditorInitialSnapshot: null,
    showAddReviewModal: false,
    showPdfModal: null,
    mobileNavOpen: false,

    // Lightbox state
    activeLightboxPhoto: null,
    lightboxPhotoIndex: 0,
    lightboxPhotoList: [],
    lightboxAlbumTitle: '',
    lightboxCustomTitle: '',
    lightboxScale: 1,
    lightboxPan: { x: 0, y: 0 },
    lightboxZoomed: false,

    // Filters
    searchQuery: '',
    categoryFilter: 'all',
    maxPriceFilter: 40000,
    galleryYearFilter: 'all',
    galleryDestFilter: 'all',
    enquiryStatusFilter: 'all',
    heroSearchQuery: '',

    activeAccordion: 'itinerary',
    secretClickCount: 0,

    // Temp Uploader Storage
    tempBrandingLogo: undefined,
    tempBrandingHeroBg: undefined,
    tempPkgCoverImage: undefined,
    tempPkgGallery: [],
    tempAlbumCoverImage: undefined,
    tempAlbumPhotos: [],
    tempItinerary: []
};

export function createSlug(text) {
    if (!text) return '';
    return text.toString().toLowerCase()
        .trim()
        .replace(/[\s\-_]+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export function ensurePackagesHaveSlugsAndHeroProps() {
    if (!state.packages || state.packages.length === 0) {
        state.packages = INITIAL_PACKAGES;
    }
    state.packages.forEach((p, idx) => {
        if (!p.slug) {
            if (p.id === 'pkg-1') p.slug = 'char-dham-yatra';
            else if (p.id === 'pkg-2') p.slug = 'vrindavan-mathura';
            else if (p.id === 'pkg-3') p.slug = 'khatu-shyam-salasar';
            else if (p.id === 'pkg-4') p.slug = 'rishikesh-ganga-aarti';
            else if (p.id === 'pkg-5') p.slug = 'rajasthan-tour';
            else p.slug = createSlug(p.name);
        }
        if (p.showInHero === undefined) {
            p.showInHero = true;
        }
        if (p.heroOrder === undefined) {
            p.heroOrder = idx + 1;
        }
        if (!Array.isArray(p.itinerary) || p.itinerary.length === 0) {
            p.itinerary = [
                { day: 1, title: 'Day 1: Departure & Arrival', description: 'Journey begins.', hotel: '', meal: '', transport: '', icon: 'fa-bus', image: '', collapsed: false }
            ];
        } else {
            p.itinerary.forEach((item, dIdx) => {
                item.day = dIdx + 1;
                item.title = item.title || `Day ${item.day}`;
                item.description = item.description || item.desc || '';
                item.hotel = item.hotel || '';
                item.meal = item.meal || '';
                item.transport = item.transport || '';
                item.icon = item.icon || 'fa-route';
                item.image = item.image || '';
                if (item.collapsed === undefined) item.collapsed = false;
            });
        }
    });
}

ensurePackagesHaveSlugsAndHeroProps();
