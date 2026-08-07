/* चंद्रकैलाश Tours & Travels - Professional Lightbox Component */

import { state } from '../../context/state.js';
import { getDynamicPackageAlbums } from '../../utils/helpers.js';

let preloadedImagesCache = new Map();


/**
 * Preload next and previous images in background for zero lag navigation
 */
export function preloadAdjacentImages() {
    const list = state.lightboxPhotoList || [];
    const index = state.lightboxPhotoIndex || 0;
    if (list.length <= 1) return;

    const prevIndex = (index - 1 + list.length) % list.length;
    const nextIndex = (index + 1) % list.length;

    const urlsToPreload = [
        typeof list[prevIndex] === 'string' ? list[prevIndex] : list[prevIndex]?.image,
        typeof list[nextIndex] === 'string' ? list[nextIndex] : list[nextIndex]?.image
    ].filter(Boolean);

    urlsToPreload.forEach(url => {
        if (!preloadedImagesCache.has(url)) {
            const img = new Image();
            img.src = url;
            preloadedImagesCache.set(url, img);
        }
    });
}

/**
 * Render Lightbox Modal HTML
 */
export function renderLightboxModal() {
    if (!state.activeLightboxPhoto) return '';

    const list = state.lightboxPhotoList || [];
    const index = state.lightboxPhotoIndex || 0;
    const total = list.length;
    const photo = state.activeLightboxPhoto;

    const imageUrl = typeof photo === 'string' ? photo : (photo.image || '');
    const title = typeof photo === 'string' ? (state.lightboxCustomTitle || 'Gallery Preview') : (photo.title || state.lightboxCustomTitle || 'Sacred Moment');
    const albumTitle = state.lightboxAlbumTitle || '';
    const scale = state.lightboxScale || 1;
    const pan = state.lightboxPan || { x: 0, y: 0 };

    preloadAdjacentImages();

    return `
        <div 
            id="lightbox-backdrop"
            class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 no-print select-none animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label="${title}"
            onclick="window.handleLightboxBackdropClick(event)"
        >
            <!-- TOP BAR (ALBUM NAME, TITLE, COUNTER, CLOSE BUTTON) -->
            <div class="flex justify-between items-center text-white z-20 px-2 sm:px-4 py-2 border-b border-white/10 bg-black/30 backdrop-blur-md rounded-2xl">
                <div class="space-y-0.5 max-w-[65%]">
                    ${albumTitle ? `<span class="text-[10px] sm:text-xs text-saffron-400 font-extrabold uppercase tracking-wider block line-clamp-1">📁 ${albumTitle}</span>` : ''}
                    <h3 class="font-bold text-xs sm:text-base text-white line-clamp-1">${title}</h3>
                </div>

                <div class="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                    <!-- IMAGE COUNTER (REQUIREMENT 4: TOP-RIGHT CORNER) -->
                    ${total > 0 ? `
                        <div class="bg-white/10 border border-white/20 text-saffron-400 font-extrabold text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-inner flex items-center gap-1">
                            <span>${index + 1}</span>
                            <span class="text-white/60">/</span>
                            <span>${total}</span>
                        </div>
                    ` : ''}

                    <!-- CLOSE BUTTON (REQUIREMENT 1 & 9) -->
                    <button 
                        onclick="window.closeLightbox()" 
                        class="bg-white/10 hover:bg-rose-600 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full font-bold shadow-lg transition-all transform hover:scale-110 active:scale-95 border border-white/20 flex items-center justify-center min-h-[36px]"
                        aria-label="Close photo gallery"
                        title="Close (Esc)"
                    >
                        ✕
                    </button>
                </div>
            </div>

            <!-- MAIN VIEWPORT WITH TOUCH & SWIPE & ZOOM HANDLERS -->
            <div 
                id="lightbox-viewport"
                class="flex-1 flex items-center justify-center relative overflow-hidden my-auto p-2 cursor-grab active:cursor-grabbing touch-action-none"
                ontouchstart="window.handleLightboxTouchStart(event)"
                ontouchmove="window.handleLightboxTouchMove(event)"
                ontouchend="window.handleLightboxTouchEnd(event)"
                onwheel="window.handleLightboxWheel(event)"
            >
                <!-- PREVIOUS ARROW -->
                ${total > 1 ? `
                    <button 
                        onclick="window.prevLightboxPhoto(event)" 
                        class="absolute left-2 sm:left-6 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-saffron-500 text-white text-base sm:text-xl font-bold flex items-center justify-center backdrop-blur-md border border-white/20 transition-all shadow-2xl hover:scale-110 active:scale-95 min-h-[44px]"
                        aria-label="Previous photo"
                        title="Previous photo (Left Arrow)"
                    >
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                ` : ''}

                <!-- IMAGE DISPLAY (STRETCH PREVENTED, SMOOTH ZOOM & SPRING SCALE) -->
                <div class="relative max-h-[82vh] max-w-full flex items-center justify-center transition-transform duration-200 ease-out">
                    <img 
                        id="lightbox-active-img"
                        src="${imageUrl}" 
                        alt="${title}" 
                        class="max-h-[80vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-2xl shadow-2xl transition-transform duration-300 protected-media animate-scale-in"
                        style="transform: scale(${scale}) translate3d(${pan.x}px, ${pan.y}px, 0);"
                        ondblclick="window.toggleLightboxZoom(event)"
                        oncontextmenu="return false;"
                        loading="eager"
                    />
                </div>

                <!-- NEXT ARROW -->
                ${total > 1 ? `
                    <button 
                        onclick="window.nextLightboxPhoto(event)" 
                        class="absolute right-2 sm:right-6 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-saffron-500 text-white text-base sm:text-xl font-bold flex items-center justify-center backdrop-blur-md border border-white/20 transition-all shadow-2xl hover:scale-110 active:scale-95 min-h-[44px]"
                        aria-label="Next photo"
                        title="Next photo (Right Arrow)"
                    >
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                ` : ''}
            </div>

            <!-- BOTTOM FOOTER HELPER HINTS -->
            <div class="flex justify-between items-center text-[11px] text-slate-400 z-20 pt-2 border-t border-white/10 px-2 sm:px-4">
                <span class="hidden sm:block">💡 Use <strong>← →</strong> keys to navigate, <strong>Esc</strong> to close, <strong>Scroll/Double-Tap</strong> to zoom</span>
                <span class="sm:hidden text-center w-full">💡 Swipe left/right to navigate • Double tap to zoom</span>
                <span class="hidden sm:block font-medium text-slate-500">Chandrakailash Tours & Travels</span>
            </div>
        </div>
    `;
}

window.openAlbum = function(albumId) {
    const albums = getDynamicPackageAlbums();
    const album = albums.find(a => a.id === albumId) || (state.albums || []).find(a => a.id === albumId);
    if (!album) return;

    state.galleryScrollPos = window.scrollY || 0;
    state.activeTab = 'gallery';
    state.selectedAlbum = album;

    if (location.hash !== `#gallery/${albumId}`) {
        try {
            history.pushState({ galleryAlbum: albumId }, '', `#gallery/${albumId}`);
        } catch (e) {
            location.hash = `#gallery/${albumId}`;
        }
    }

    if (window.renderApp) window.renderApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.openAlbumPhoto = function(albumId, index) {
    const albums = getDynamicPackageAlbums();
    const album = albums.find(a => a.id === albumId) || (state.albums || []).find(a => a.id === albumId);
    if (!album || !album.photos || album.photos.length === 0) return;

    state.lightboxPhotoList = album.photos;
    state.lightboxPhotoIndex = index !== undefined ? index : 0;
    state.activeLightboxPhoto = album.photos[state.lightboxPhotoIndex];
    state.lightboxAlbumTitle = album.title;
    state.lightboxCustomTitle = album.photos[state.lightboxPhotoIndex]?.title || album.title;
    state.lightboxScale = 1;
    state.lightboxPan = { x: 0, y: 0 };

    if (window.renderApp) window.renderApp();
};

window.openPackagePhoto = function(pkgId, index) {
    const pkg = (state.packages || []).find(p => p.id === pkgId);
    if (!pkg) return;

    const list = pkg.packageGallery && pkg.packageGallery.length > 0 ? pkg.packageGallery : [pkg.coverImage];
    state.lightboxPhotoList = list.map((img, i) => ({
        image: img,
        title: `${pkg.name} - Photo ${i + 1}`
    }));
    state.lightboxPhotoIndex = index !== undefined ? index : 0;
    state.activeLightboxPhoto = state.lightboxPhotoList[state.lightboxPhotoIndex];
    state.lightboxAlbumTitle = pkg.name;
    state.lightboxCustomTitle = state.lightboxPhotoList[state.lightboxPhotoIndex]?.title;
    state.lightboxScale = 1;
    state.lightboxPan = { x: 0, y: 0 };

    if (window.renderApp) window.renderApp();
};

window.openSinglePhoto = function(imageUrl, customTitle) {
    if (!imageUrl) return;

    const photoObj = {
        image: imageUrl,
        title: customTitle || 'Photo Preview'
    };

    state.lightboxPhotoList = [photoObj];
    state.lightboxPhotoIndex = 0;
    state.activeLightboxPhoto = photoObj;
    state.lightboxAlbumTitle = '';
    state.lightboxCustomTitle = photoObj.title;
    state.lightboxScale = 1;
    state.lightboxPan = { x: 0, y: 0 };

    if (window.renderApp) window.renderApp();
};

window.closeLightbox = function() {
    state.activeLightboxPhoto = null;
    state.lightboxPhotoList = [];
    state.lightboxPhotoIndex = 0;
    state.lightboxScale = 1;
    state.lightboxPan = { x: 0, y: 0 };
    if (window.renderApp) window.renderApp();
};

window.prevLightboxPhoto = function(e) {
    if (e) e.stopPropagation();
    const list = state.lightboxPhotoList || [];
    if (list.length <= 1) return;

    state.lightboxPhotoIndex = (state.lightboxPhotoIndex - 1 + list.length) % list.length;
    state.activeLightboxPhoto = list[state.lightboxPhotoIndex];
    state.lightboxScale = 1;
    state.lightboxPan = { x: 0, y: 0 };
    if (window.renderApp) window.renderApp();
};

window.nextLightboxPhoto = function(e) {
    if (e) e.stopPropagation();
    const list = state.lightboxPhotoList || [];
    if (list.length <= 1) return;

    state.lightboxPhotoIndex = (state.lightboxPhotoIndex + 1) % list.length;
    state.activeLightboxPhoto = list[state.lightboxPhotoIndex];
    state.lightboxScale = 1;
    state.lightboxPan = { x: 0, y: 0 };
    if (window.renderApp) window.renderApp();
};

window.handleLightboxBackdropClick = function(e) {
    if (e.target && e.target.id === 'lightbox-backdrop') {
        window.closeLightbox();
    }
};

/* DOUBLE-TAP & MOUSE WHEEL ZOOM */
window.toggleLightboxZoom = function(e) {
    if (e) e.stopPropagation();
    if ((state.lightboxScale || 1) > 1.2) {
        state.lightboxScale = 1;
        state.lightboxPan = { x: 0, y: 0 };
    } else {
        state.lightboxScale = 2.5;
    }
    const img = document.getElementById('lightbox-active-img');
    if (img) {
        img.style.transform = `scale(${state.lightboxScale}) translate3d(${state.lightboxPan.x}px, ${state.lightboxPan.y}px, 0)`;
    }
};

window.handleLightboxWheel = function(e) {
    if (!state.activeLightboxPhoto) return;
    e.preventDefault();

    let currentScale = state.lightboxScale || 1;
    if (e.deltaY < 0) {
        currentScale = Math.min(currentScale + 0.25, 4);
    } else {
        currentScale = Math.max(currentScale - 0.25, 1);
    }

    state.lightboxScale = currentScale;
    if (currentScale === 1) state.lightboxPan = { x: 0, y: 0 };

    const img = document.getElementById('lightbox-active-img');
    if (img) {
        img.style.transform = `scale(${state.lightboxScale}) translate3d(${state.lightboxPan.x}px, ${state.lightboxPan.y}px, 0)`;
    }
};

/* TOUCH & PINCH SWIPE GESTURES FOR MOBILE */
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let initialPinchDist = 0;
let lastTapTime = 0;

window.handleLightboxTouchStart = function(e) {
    if (e.touches.length === 1) {
        const now = Date.now();
        if (now - lastTapTime < 300) {
            window.toggleLightboxZoom(e);
            lastTapTime = 0;
            return;
        }
        lastTapTime = now;

        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
        initialPinchDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
    }
};

window.handleLightboxTouchMove = function(e) {
    if (e.touches.length === 1 && (state.lightboxScale || 1) <= 1.2) {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
        const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
        if (initialPinchDist > 0) {
            const factor = dist / initialPinchDist;
            let targetScale = Math.min(Math.max((state.lightboxScale || 1) * factor, 1), 4);
            state.lightboxScale = targetScale;
            const img = document.getElementById('lightbox-active-img');
            if (img) {
                img.style.transform = `scale(${state.lightboxScale})`;
            }
        }
    }
};

window.handleLightboxTouchEnd = function(e) {
    if ((state.lightboxScale || 1) > 1.2) return;

    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
            window.nextLightboxPhoto();
        } else {
            window.prevLightboxPhoto();
        }
    }

    touchStartX = 0;
    touchEndX = 0;
};
