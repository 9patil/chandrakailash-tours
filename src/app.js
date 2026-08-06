/**
 * चंद्रकैलाश Tours & Travels - World-Class CMS & Web Application
 * Main Application ES Module Entry Point
 */

import { state, uploaderState } from './context/state.js';
import { initStorage, saveStore } from './services/storage.js';
import { t, toggleLanguage } from './utils/i18n.js';
import { getWhatsAppUrl, getInstagramUrl, renderLogoSvg, compressImageFile } from './utils/helpers.js';
import { renderMainView, renderModals } from './pages/publicPages.js';

export function render() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
        loadingScreen.style.opacity = '0';
        loadingScreen.remove();
    }

    const root = document.getElementById('app');
    if (!root) return;

    const filteredPkgs = state.packages.filter(p => {
        if (p.visible === false && !state.adminLoggedIn) return false;
        const matchSearch = (p.name || '').toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                            (p.destination || '').toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchCat = state.categoryFilter === 'all' || p.category === state.categoryFilter;
        const matchPrice = (p.price || 0) <= state.maxPriceFilter;
        return matchSearch && matchCat && matchPrice;
    });

    root.innerHTML = `
        <header class="sticky top-0 z-40 glass-header-transparent text-white shadow-md w-full">
            <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                
                <div onclick="window.navigate('home')" class="cursor-pointer">
                    ${renderLogoSvg('white')}
                </div>

                <nav class="hidden lg:flex items-center gap-7 text-sm font-medium">
                    ${[
                        { id: 'home', label: t('nav_home') },
                        { id: 'packages', label: t('nav_packages') },
                        { id: 'gallery', label: t('nav_gallery') },
                        { id: 'about', label: t('nav_about') },
                        { id: 'contact', label: t('nav_contact') }
                    ].map(link => `
                        <button onclick="window.navigate('${link.id}')" class="transition py-1 border-b-2 ${state.activeTab === link.id ? 'text-saffron-400 border-saffron-500 font-bold' : 'text-slate-200 border-transparent hover:text-saffron-400'}">
                            ${link.label}
                        </button>
                    `).join('')}
                    ${state.adminLoggedIn ? `
                        <button onclick="window.navigate('admin')" class="bg-saffron-500/20 border border-saffron-500/50 text-saffron-400 font-bold px-3 py-1 rounded-lg text-xs min-h-[36px]">
                            ⚙️ Admin CMS
                        </button>
                    ` : ''}
                </nav>

                <div class="hidden sm:flex items-center gap-3">
                    ${state.settings.langSwitchEnabled !== false ? `
                        <button onclick="window.toggleLanguage()" class="bg-navy-800/90 hover:bg-navy-800 border border-saffron-500/40 text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition text-saffron-400 shadow-sm min-h-[44px]" title="Switch Language">
                            <i class="fa-solid fa-globe text-saffron-400"></i>
                            <span class="${state.currentLang === 'en' ? 'text-white font-extrabold underline' : 'text-slate-400'}">EN</span>
                            <span class="text-slate-600">|</span>
                            <span class="${state.currentLang === 'mr' ? 'text-saffron-400 font-extrabold underline' : 'text-slate-400'}">मराठी</span>
                        </button>
                    ` : ''}

                    <a href="${getWhatsAppUrl()}" target="_blank" class="btn-premium btn-glow-green bg-waGreen-500 hover:bg-waGreen-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center gap-2 min-h-[44px]">
                        <i class="fa-brands fa-whatsapp text-lg"></i> <span>${t('btn_whatsapp')}</span>
                    </a>
                    
                    <a href="tel:+91${state.settings.phone}" class="btn-premium btn-glow-saffron bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg flex items-center gap-2 border border-saffron-400/40 min-h-[44px]">
                        <i class="fa-solid fa-phone text-base"></i> <span>${t('btn_call')}</span>
                    </a>
                </div>

                <div class="lg:hidden flex items-center gap-2">
                    <button onclick="window.toggleLanguage()" class="bg-navy-800 border border-saffron-500/40 text-[11px] font-bold px-3 py-1.5 rounded-full text-saffron-400 min-h-[36px]">
                        ${state.currentLang === 'en' ? 'मराठी' : 'EN'}
                    </button>
                    <button onclick="window.toggleMobileNav()" class="text-slate-200 text-2xl p-1.5 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <i class="fa-solid ${state.mobileNavOpen ? 'fa-xmark' : 'fa-bars'}"></i>
                    </button>
                </div>
            </div>

            ${state.mobileNavOpen ? `
                <div class="lg:hidden bg-navy-950 border-t border-navy-800 px-4 py-4 space-y-2 text-sm">
                    ${[
                        { id: 'home', label: t('nav_home'), icon: 'fa-house' },
                        { id: 'packages', label: t('nav_packages'), icon: 'fa-suitcase-rolling' },
                        { id: 'gallery', label: t('nav_gallery'), icon: 'fa-images' },
                        { id: 'about', label: t('nav_about'), icon: 'fa-address-card' },
                        { id: 'contact', label: t('nav_contact'), icon: 'fa-envelope' }
                    ].map(m => `
                        <button onclick="window.navigate('${m.id}'); state.mobileNavOpen=false; window.renderApp();" class="w-full text-left py-3 px-4 rounded-xl flex items-center gap-3 min-h-[48px] ${state.activeTab === m.id ? 'bg-saffron-500 text-white font-bold' : 'text-slate-300 hover:bg-navy-900'}">
                            <i class="fa-solid ${m.icon} w-5"></i> <span>${m.label}</span>
                        </button>
                    `).join('')}
                    ${state.adminLoggedIn ? `
                        <button onclick="window.navigate('admin'); state.mobileNavOpen=false; window.renderApp();" class="w-full text-left py-3 px-4 rounded-xl text-saffron-400 font-bold bg-navy-900 border border-saffron-500/30 flex items-center gap-3 min-h-[48px]">
                            <i class="fa-solid fa-gear"></i> <span>Admin CMS</span>
                        </button>
                    ` : ''}
                </div>
            ` : ''}
        </header>

        <main class="flex-grow fade-in-section w-full">
            ${renderMainView(filteredPkgs)}
        </main>

        <footer class="bg-navy-950 text-white pt-12 pb-24 md:pb-8 border-t-4 border-saffron-500 no-print w-full">
            <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                <div class="space-y-3">
                    ${renderLogoSvg('white')}
                    <p class="text-slate-400 text-xs leading-relaxed">
                        Maharashtra's premier luxury travel company for religious pilgrimages and family vacations across India.
                    </p>
                    <p class="text-saffron-400 font-marathi-heading font-bold text-base border-l-2 border-saffron-500 pl-3">
                        "${state.settings.heroTagline}"
                    </p>
                </div>

                <div>
                    <h4 class="font-bold text-saffron-400 mb-3 border-b border-navy-800 pb-1">Popular Yatra Packages</h4>
                    <ul class="space-y-1.5 text-xs text-slate-300">
                        ${state.packages.map(p => `
                            <li>
                                <a 
                                    href="#package-${p.id}" 
                                    onclick="window.handleFooterPackageClick(event, '${p.id}')"
                                    class="footer-pkg-link group flex items-center justify-between py-1 px-1 rounded-lg text-slate-300 hover:text-saffron-400 transition-all duration-200 cursor-pointer select-none"
                                    title="View details for ${p.name}"
                                >
                                    <span class="flex items-center gap-2 font-medium">
                                        <span class="text-saffron-500 text-[11px] group-hover:scale-110 transition-transform">🚩</span>
                                        <span class="line-clamp-1 group-hover:translate-x-0.5 transition-transform duration-200">${p.name}</span>
                                    </span>
                                    <i class="fa-solid fa-arrow-right footer-link-arrow text-[10px] text-saffron-400 opacity-0 transition-all duration-200 flex-shrink-0 ml-1"></i>
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div>
                    <h4 class="font-bold text-saffron-400 mb-3 border-b border-navy-800 pb-1">Direct Contact</h4>
                    <div class="space-y-2.5 text-xs text-slate-300">
                        <p class="font-bold text-white"><i class="fa-solid fa-phone text-saffron-500 mr-2"></i> ${state.settings.phone}</p>
                        <p><i class="fa-brands fa-whatsapp text-waGreen-500 mr-2"></i> WhatsApp 24x7 Support</p>
                        <a href="${getInstagramUrl()}" target="_blank" class="flex items-center gap-2 hover:text-saffron-400 transition font-medium">
                            <i class="fa-brands fa-instagram text-pink-500 text-base"></i> <span>${state.settings.instagram}</span>
                        </a>
                    </div>
                </div>

                <div>
                    <h4 class="font-bold text-saffron-400 mb-3 border-b border-navy-800 pb-1">Management</h4>
                    <p class="text-xs text-slate-300 mb-3">All tour batches are personally curated & managed by <strong>Yogesh Patil Sir</strong>.</p>
                    <a href="${getWhatsAppUrl()}" target="_blank" class="btn-premium btn-glow-green inline-flex items-center gap-2 bg-waGreen-500 hover:bg-waGreen-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow min-h-[44px]">
                        <i class="fa-brands fa-whatsapp text-lg"></i> Connect on WhatsApp
                    </a>
                </div>
            </div>

            <div onclick="window.handleSecretAdminTrigger()" class="max-w-7xl mx-auto px-4 mt-10 pt-4 border-t border-navy-900 text-center text-xs text-slate-500 cursor-pointer select-none">
                ${state.settings.copyrightText}
            </div>
        </footer>

        <div class="fixed bottom-6 right-6 z-40 hidden md:block no-print">
            <a href="${getWhatsAppUrl()}" target="_blank" class="w-14 h-14 bg-waGreen-500 hover:bg-waGreen-600 text-white rounded-full flex items-center justify-center text-2xl shadow-2xl wa-pulse-floating transition transform hover:scale-110" title="Instant WhatsApp Booking">
                <i class="fa-brands fa-whatsapp"></i>
            </a>
        </div>

        <div class="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-navy-950/95 backdrop-blur border-t border-saffron-500/30 p-2.5 flex gap-2.5 no-print shadow-2xl">
            <a href="${getWhatsAppUrl()}" target="_blank" class="btn-premium btn-glow-green flex-1 bg-waGreen-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-lg min-h-[48px]">
                <i class="fa-brands fa-whatsapp text-xl"></i> <span>${t('btn_whatsapp')}</span>
            </a>
            <a href="tel:+91${state.settings.phone}" class="btn-premium btn-glow-saffron flex-1 bg-saffron-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-lg min-h-[48px]">
                <i class="fa-solid fa-phone text-base"></i> <span>${t('btn_call')}</span>
            </a>
        </div>

        ${renderModals()}
    `;

    attachMicroAnimations();
}

window.renderApp = render;
window.navigate = function(tabId) {
    if (tabId === 'admin' && !state.adminLoggedIn) {
        if (window.openAdminLoginModal) {
            window.openAdminLoginModal();
        } else {
            state.showLoginModal = true;
            state.loginErrorMessage = '';
            render();
        }
        return;
    }
    state.activeTab = tabId;
    state.selectedAlbum = null;
    render();
    window.scrollTo(0, 0);
};

window.toggleLanguage = function() {
    toggleLanguage(render);
};

window.toggleMobileNav = function() {
    state.mobileNavOpen = !state.mobileNavOpen;
    render();
};

window.handleSecretAdminTrigger = function() {
    state.secretClickCount = (state.secretClickCount || 0) + 1;
    if (state.secretClickCount >= 3) {
        state.secretClickCount = 0;
        if (!state.adminLoggedIn) {
            if (window.openAdminLoginModal) window.openAdminLoginModal();
            else state.showLoginModal = true;
        } else {
            state.activeTab = 'admin';
        }
        render();
    }
};

window.handleFooterPackageClick = function(event, pkgId) {
    if (event) event.preventDefault();
    const pkg = state.packages.find(p => p.id === pkgId || p.slug === pkgId);
    const targetId = pkg ? (pkg.slug || pkg.id) : pkgId;
    if (state.selectedPkg && (state.selectedPkg.id === pkgId || state.selectedPkg.slug === pkgId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const modalEl = document.querySelector('#printable-itinerary-modal') || document.querySelector('.bg-white.rounded-2xl');
        if (modalEl) modalEl.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    window.openDetail(targetId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// File Uploader Global Helpers
window.triggerFilePicker = function(id) {
    const el = document.getElementById(`file_input_${id}`);
    if (el) el.click();
};

window.handleUploaderDragOver = function(e, id) {
    e.preventDefault();
    e.stopPropagation();
    if (!uploaderState.dragOver[id]) {
        uploaderState.dragOver[id] = true;
        render();
    }
};

window.handleUploaderDragLeave = function(e, id) {
    e.preventDefault();
    e.stopPropagation();
    if (uploaderState.dragOver[id]) {
        uploaderState.dragOver[id] = false;
        render();
    }
};

window.handleUploaderDrop = async function(e, id, allowMultiple = false) {
    e.preventDefault();
    e.stopPropagation();
    uploaderState.dragOver[id] = false;
    const files = Array.from(e.dataTransfer ? e.dataTransfer.files : []);
    if (files.length > 0) {
        await processUploaderFiles(id, files, allowMultiple);
    }
};

window.handleUploaderFileSelect = async function(e, id, allowMultiple = false) {
    const files = Array.from(e.target ? e.target.files : []);
    if (files.length > 0) {
        await processUploaderFiles(id, files, allowMultiple);
    }
};

async function processUploaderFiles(id, files, allowMultiple) {
    if (!files || files.length === 0) return;

    if (window.syncPkgFormToState) window.syncPkgFormToState();
    if (window.syncAlbumFormToState) window.syncAlbumFormToState();

    if (!allowMultiple) {
        const file = files[0];
        uploaderState.progress[id] = { active: true, percent: 30, status: 'Reading Image...', fileName: file.name };
        render();

        try {
            uploaderState.progress[id].percent = 60;
            uploaderState.progress[id].status = 'Compressing & Optimizing Image (WebP)...';
            render();

            console.log('📸 Uploading Cover:', file.name);
            const res = await compressImageFile(file);

            uploaderState.progress[id].percent = 100;
            uploaderState.progress[id].status = `Optimized! (${(res.originalSize/1024).toFixed(0)}KB ➔ ${(res.compressedSize/1024).toFixed(0)}KB, -${res.savingsPercent}%)`;
            render();

            uploaderState.previews[id] = res.dataUrl;

            if (id === 'bm_logo') state.tempBrandingLogo = res.dataUrl;
            if (id === 'bm_herobg') state.tempBrandingHeroBg = res.dataUrl;
            if (id === 'pkg_cover') {
                state.tempPkgCoverImage = res.dataUrl;
                if (state.editingPkg) state.editingPkg.coverImage = res.dataUrl;
            }
            if (id === 'album_cover') {
                state.tempAlbumCoverImage = res.dataUrl;
                if (state.editingAlbum) state.editingAlbum.coverImage = res.dataUrl;
            }
            if (id === 'hero_banner_img') state.tempHeroBannerImg = res.dataUrl;

            if (window.savePkgDraftToLocalStorage) window.savePkgDraftToLocalStorage();

        } catch (err) {
            console.error('❌ Upload Error:', err);
            alert(err.message || 'Image processing failed.');
        } finally {
            uploaderState.progress[id] = { active: false };
            render();
        }
    } else {
        uploaderState.progress[id] = { active: true, percent: 10, status: `Processing 0 of ${files.length} images...` };
        render();

        let count = 0;
        const total = files.length;

        if (id === 'pkg_gallery_uploader') {
            console.log('🖼️ Uploading Gallery:', total, 'images');
            const currentPkgGallery = [...(state.tempPkgGallery || [])];
            for (const file of files) {
                count++;
                uploaderState.progress[id] = { active: true, percent: Math.round((count / total) * 100), status: `Compressing package photo ${count} of ${total}...`, fileName: file.name };
                render();
                try {
                    const res = await compressImageFile(file);
                    currentPkgGallery.push(res.dataUrl);
                } catch (err) {
                    console.error('❌ Gallery Upload Error:', err);
                    alert(`Skipped file ${file.name}: ${err.message}`);
                }
            }
            state.tempPkgGallery = currentPkgGallery;
            if (state.editingPkg) state.editingPkg.packageGallery = [...currentPkgGallery];
            if (window.savePkgDraftToLocalStorage) window.savePkgDraftToLocalStorage();
        } else if (id === 'album_photos_uploader') {
            const currentAlbumPhotos = [...(state.tempAlbumPhotos || [])];
            for (const file of files) {
                count++;
                uploaderState.progress[id] = { active: true, percent: Math.round((count / total) * 100), status: `Compressing album photo ${count} of ${total}...`, fileName: file.name };
                render();
                try {
                    const res = await compressImageFile(file);
                    const defaultTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
                    currentAlbumPhotos.push({
                        id: 'ap-' + Date.now() + '-' + count,
                        image: res.dataUrl,
                        title: defaultTitle
                    });
                } catch (err) {
                    alert(`Skipped file ${file.name}: ${err.message}`);
                }
            }
            state.tempAlbumPhotos = currentAlbumPhotos;
            if (state.editingAlbum) state.editingAlbum.photos = [...currentAlbumPhotos];
        }

        uploaderState.progress[id] = { active: false };
        render();
    }
}

window.removeUploaderImage = function(id) {
    if (window.syncPkgFormToState) window.syncPkgFormToState();
    uploaderState.previews[id] = '';
    if (id === 'bm_logo') state.tempBrandingLogo = '';
    if (id === 'bm_herobg') state.tempBrandingHeroBg = '';
    if (id === 'pkg_cover') {
        state.tempPkgCoverImage = '';
        if (state.editingPkg) state.editingPkg.coverImage = '';
    }
    if (id === 'album_cover') {
        state.tempAlbumCoverImage = '';
        if (state.editingAlbum) state.editingAlbum.coverImage = '';
    }
    if (id === 'hero_banner_img') state.tempHeroBannerImg = '';
    if (window.savePkgDraftToLocalStorage) window.savePkgDraftToLocalStorage();
    render();
};

function attachMicroAnimations() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (dot && ring) {
        window.addEventListener('mousemove', (e) => {
            dot.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
            ring.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
        });
    }

    document.querySelectorAll('.card-3d-tilt').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((centerY - y) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            
            card.style.setProperty('--glare-x', `${glareX}%`);
            card.style.setProperty('--glare-y', `${glareY}%`);
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0px)`;
        });
    });
}

// Global Keyboard Navigation for Lightbox & Modals
window.addEventListener('keydown', (e) => {
    if (!state.activeLightboxPhoto) return;

    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        window.prevLightboxPhoto();
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        window.nextLightboxPhoto();
    } else if (e.key === 'Escape') {
        e.preventDefault();
        window.closeLightbox();
    }
});

// Initial App Bootstrapping & Dynamic Route Listener
window.addEventListener('hashchange', () => {
    if (window.syncRouteFromURL) window.syncRouteFromURL();
    if (window.renderApp) window.renderApp();
});

window.addEventListener('popstate', () => {
    if (window.syncRouteFromURL) window.syncRouteFromURL();
    if (window.renderApp) window.renderApp();
});

initStorage(() => {
    if (window.syncRouteFromURL) window.syncRouteFromURL();
    render();
});

if (window.syncRouteFromURL) window.syncRouteFromURL();
render();

