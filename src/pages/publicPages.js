/* चंद्रकैलाश Tours & Travels - Public Site Views & Modals Component */

import { state, uploaderState } from '../context/state.js';
import { t } from '../utils/i18n.js';
import { getWhatsAppUrl, getInstagramUrl, createSlug, renderMediaUploader } from '../utils/helpers.js';
import { openPrintablePdf, renderPrintableItineraryModal } from '../utils/pdfGenerator.js';
import { renderAdminView } from './adminPage.js';
import { saveStore, savePackageCloud, saveAlbumCloud, saveSettingsCloud } from '../services/storage.js';
import { renderLightboxModal } from '../components/public/lightbox.js';

export function getActiveHeroSlides() {
    const heroPkgs = (state.packages || [])
        .filter(p => p.visible !== false && p.showInHero !== false)
        .sort((a, b) => (a.heroOrder || 999) - (b.heroOrder || 999));
    return heroPkgs;
}

export function renderHeroBannerSlider() {
    const slides = getActiveHeroSlides();
    if (slides.length === 0) return '';

    const slideIndex = state.activeHeroSlide % slides.length;
    const currentPkg = slides[slideIndex];

    const bgImage = currentPkg.coverImage || state.settings.heroBgImage || 'images/himalayan_yatra.jpg';
    const pkgSlug = currentPkg.slug || createSlug(currentPkg.name);
    const waUrl = getWhatsAppUrl(currentPkg.name);

    return `
        <section class="relative bg-navy-950 text-white py-16 md:py-24 overflow-hidden border-b-4 border-saffron-500 w-full">
            <div class="absolute inset-0 z-0 pointer-events-none opacity-30 transition-all duration-700">
                <img src="${bgImage}" alt="${currentPkg.name}" class="w-full h-full object-cover mix-blend-overlay animate-cloud-slow" />
                <div class="absolute inset-0 hero-sunrise-radial"></div>
            </div>

            <div class="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div class="inline-flex items-center gap-2 bg-saffron-500/20 border border-saffron-500/40 text-saffron-400 text-xs font-bold px-4 py-1.5 rounded-full shadow">
                        <i class="fa-solid fa-om text-saffron-400"></i> <span>महाराष्ट्रातील अतिशय विश्वासू टूर कंपनी</span>
                    </div>

                    <h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-marathi-calligraphy tracking-tight leading-tight text-white drop-shadow-md">
                        ${state.settings.heroTagline || 'प्रवास फक्त ठिकाणांचा नाही... आठवणींचा असतो.'}
                    </h1>

                    <p class="text-slate-300 text-sm md:text-lg max-w-2xl font-light leading-relaxed">
                        ${state.settings.heroSubheading || 'Explore India\'s Most Trusted Religious & Family Tour Packages with Chandrakailash Tours & Travels.'}
                    </p>

                    <div class="max-w-xl space-y-4 pt-2">
                        <div class="flex flex-wrap justify-center lg:justify-start gap-3">
                            <button onclick="window.navigate('packages')" class="btn-premium btn-glow-saffron bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-xs sm:text-base px-6 py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 flex-1 sm:flex-none min-h-[48px]">
                                <span>🟠 ${t('btn_explore')}</span> <i class="fa-solid fa-arrow-right text-xs"></i>
                            </button>

                            <a href="${waUrl}" target="_blank" class="btn-premium btn-glow-green bg-waGreen-500 hover:bg-waGreen-600 text-white font-extrabold text-xs sm:text-base px-6 py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 flex-1 sm:flex-none min-h-[48px]">
                                <i class="fa-brands fa-whatsapp text-lg"></i> <span>🟢 ${t('btn_whatsapp')}</span>
                            </a>
                        </div>

                        <div class="flex justify-center lg:justify-start pt-1">
                            <a href="tel:+91${state.settings.phone}" class="btn-premium btn-glow-saffron bg-saffron-500 hover:bg-saffron-600 text-white font-black text-sm sm:text-lg px-8 py-3.5 rounded-2xl shadow-2xl flex items-center justify-center gap-3 w-full sm:w-auto border-2 border-saffron-300/50 min-h-[48px]">
                                <i class="fa-solid fa-phone text-xl text-white animate-bounce"></i> <span>📞 ${t('btn_call')} (${state.settings.phone})</span>
                            </a>
                        </div>
                    </div>

                    ${slides.length > 1 ? `
                        <div class="flex items-center justify-center lg:justify-start gap-3 pt-4">
                            <button onclick="window.prevHeroSlide()" class="w-9 h-9 rounded-full bg-navy-900/80 border border-saffron-500/40 text-saffron-400 hover:bg-saffron-500 hover:text-white flex items-center justify-center text-xs transition min-h-[36px]">
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>
                            
                            <div class="flex items-center gap-1.5">
                                ${slides.map((_, idx) => `
                                    <button onclick="state.activeHeroSlide=${idx}; window.renderApp();" class="h-2 rounded-full transition-all ${idx === slideIndex ? 'w-8 bg-saffron-500' : 'w-2 bg-slate-600'}"></button>
                                `).join('')}
                            </div>

                            <button onclick="window.nextHeroSlide()" class="w-9 h-9 rounded-full bg-navy-900/80 border border-saffron-500/40 text-saffron-400 hover:bg-saffron-500 hover:text-white flex items-center justify-center text-xs transition min-h-[36px]">
                                <i class="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    ` : ''}

                    <div class="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center lg:text-left text-xs text-slate-300">
                        <div><div class="font-extrabold text-saffron-400 text-lg sm:text-xl font-mono">10,000+</div><div>${t('stat_pilgrims')}</div></div>
                        <div><div class="font-extrabold text-saffron-400 text-lg sm:text-xl font-mono">100%</div><div>${t('stat_yatra')}</div></div>
                        <div><div class="font-extrabold text-saffron-400 text-lg sm:text-xl font-mono">24x7</div><div>${t('stat_support')}</div></div>
                    </div>
                </div>

                <!-- HERO RIGHT FEATURED CARD -->
                <div class="lg:col-span-5 card-perspective w-full">
                    <div onclick="window.openDetail('${pkgSlug}')" class="glass-card rounded-2xl p-5 sm:p-6 text-slate-900 shadow-2xl border border-saffron-500/40 relative card-3d-tilt cursor-pointer w-full box-border">
                        <div class="card-3d-glare"></div>
                        
                        <div class="card-3d-layer-badge flex justify-between items-center mb-3">
                            <span class="bg-saffron-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">${currentPkg.category ? currentPkg.category.toUpperCase() : 'FEATURED'} PILGRIMAGE</span>
                            <span class="text-xs font-bold ${currentPkg.seatsLeft > 0 ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'} px-2.5 py-0.5 rounded-full">
                                ${currentPkg.seatsLeft > 0 ? `🟢 ${currentPkg.seatsLeft} Seats Left` : '🔴 Sold Out'}
                            </span>
                        </div>

                        <div onclick="event.stopPropagation(); window.openDetail('${pkgSlug}')" class="card-3d-layer-img relative h-40 sm:h-44 rounded-xl overflow-hidden mb-4 group cursor-pointer">
                            <img src="${currentPkg.coverImage || 'images/himalayan_yatra.jpg'}" alt="${currentPkg.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>

                        <div class="card-3d-layer-content space-y-2">
                            <h3 onclick="event.stopPropagation(); window.openDetail('${pkgSlug}')" class="text-lg sm:text-xl font-bold text-navy-900 mb-1 hover:text-saffron-600 transition cursor-pointer">${currentPkg.name}</h3>
                            <p class="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-2">${currentPkg.shortDesc || currentPkg.destination}</p>

                            <div class="space-y-2 text-xs text-slate-700 mb-4 border-t border-slate-200 pt-3">
                                <div class="flex justify-between"><span>${t('label_duration')}:</span><span class="font-bold text-saffron-600">${currentPkg.duration}</span></div>
                                <div class="flex justify-between items-center pt-1">
                                    <span>${t('label_price')}:</span>
                                    <div>
                                        ${currentPkg.originalPrice ? `<span class="line-through text-slate-400 text-xs mr-2">₹${currentPkg.originalPrice.toLocaleString()}</span>` : ''}
                                        <span class="text-xl sm:text-2xl font-extrabold text-saffron-600">₹${currentPkg.price ? currentPkg.price.toLocaleString() : 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-3d-layer-actions flex gap-2" onclick="event.stopPropagation();">
                            <button onclick="window.openDetail('${pkgSlug}')" class="btn-premium btn-glow-navy flex-1 bg-navy-900 hover:bg-navy-950 text-white font-bold py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-xs min-h-[48px]">
                                <span>${t('btn_details')}</span> <i class="fa-solid fa-arrow-right text-saffron-400 text-xs"></i>
                            </button>
                            <button onclick="window.openPrintablePdf('${currentPkg.id}')" class="btn-premium bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-3 rounded-xl shadow transition text-xs flex items-center justify-center gap-1.5 min-h-[48px]" title="Download Printable PDF">
                                <i class="fa-solid fa-file-pdf text-rose-600 text-base"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

export function renderCard(p) {
    const slug = p.slug || createSlug(p.name);
    return `
        <div 
            onclick="window.openDetail('${slug}')"
            onkeydown="if(event.key==='Enter'||event.key===' '){ event.preventDefault(); window.openDetail('${slug}'); }"
            role="button"
            tabindex="0"
            aria-label="View details for ${p.name}"
            class="package-card-clickable card-3d-tilt bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between relative group select-none w-full box-border"
        >
            <div class="card-3d-glare"></div>
            
            <div>
                <div class="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
                    <img src="${p.coverImage}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 protected-media" loading="lazy" />
                    
                    <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                        ${p.isFeatured ? `<span class="badge-featured text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">⭐ FEATURED</span>` : ''}
                        ${p.isTrending ? `<span class="badge-trending text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">🔥 TRENDING</span>` : ''}
                        ${p.isNew ? `<span class="badge-new text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">✨ NEW BATCH</span>` : ''}
                        ${p.isSoldOut ? `<span class="badge-soldout text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">🛑 SOLD OUT</span>` : ''}
                    </div>

                    <span class="absolute bottom-3 right-3 bg-navy-950/90 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full backdrop-blur border border-emerald-500/30 shadow">
                        🟢 ${p.seatsLeft > 0 ? p.seatsLeft + ' Seats Left' : 'Full'}
                    </span>
                </div>

                <div class="p-4 sm:p-5 space-y-3">
                    <div>
                        <span class="text-[10px] font-bold uppercase tracking-widest text-saffron-600">📍 ${p.destination}</span>
                        <h3 class="text-lg sm:text-xl font-bold text-navy-900 group-hover:text-saffron-600 transition-colors mt-1 line-clamp-1">${p.name}</h3>
                    </div>

                    <p class="text-slate-600 text-xs line-clamp-2 leading-relaxed font-marathi-body">${p.shortDesc}</p>

                    <div class="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium text-slate-700">
                        <div>⏱️ ${p.duration}</div>
                        <div>📅 ${p.dates}</div>
                    </div>
                </div>
            </div>

            <div class="p-4 sm:p-5 pt-0 space-y-3 border-t border-slate-100">
                <div class="flex justify-between items-baseline pt-3">
                    <span class="text-xs text-slate-400">${t('label_price')}:</span>
                    <div>
                        ${p.originalPrice ? `<span class="line-through text-slate-400 text-xs mr-1.5">₹${p.originalPrice.toLocaleString()}</span>` : ''}
                        <span class="text-xl sm:text-2xl font-extrabold text-saffron-600">₹${p.price ? p.price.toLocaleString() : 0}</span>
                    </div>
                </div>

                <div class="flex gap-2">
                    <div class="btn-premium btn-glow-navy flex-1 bg-navy-900 group-hover:bg-saffron-500 text-white font-bold py-3 rounded-xl text-xs shadow flex items-center justify-center gap-1.5 transition-colors duration-300 min-h-[48px]">
                        <span>${t('btn_details')}</span> <i class="fa-solid fa-arrow-right text-[10px] text-saffron-400 group-hover:text-white transition"></i>
                    </div>

                    <button 
                        type="button"
                        onclick="event.stopPropagation(); window.openPrintablePdf('${p.id}');" 
                        class="btn-premium bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3.5 py-3 rounded-xl text-xs border shadow-sm flex items-center justify-center gap-1 transition min-h-[48px]" 
                        title="Printable PDF Brochure"
                    >
                        <i class="fa-solid fa-file-pdf text-rose-600 text-base"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

export function renderPublicGalleryView() {
    if (state.selectedAlbum) {
        const album = state.selectedAlbum;
        return `
            <div class="max-w-7xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                        <button onclick="window.backToGallery(event)" class="text-saffron-600 hover:text-saffron-700 font-extrabold text-xs sm:text-sm flex items-center gap-2 hover:underline mb-2 min-h-[44px] cursor-pointer select-none" aria-label="Back to Albums Gallery">
                            <i class="fa-solid fa-arrow-left"></i> <span>Back to Albums Gallery</span>
                        </button>
                        <h1 class="text-2xl sm:text-3xl font-extrabold text-navy-900 flex items-center gap-2">
                            📁 ${album.title}
                        </h1>
                        <p class="text-xs text-slate-500 mt-1">${album.description || 'Collection of sacred travel memories.'}</p>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3.5 py-2 rounded-xl border flex-wrap">
                        <span>📅 Year: ${album.year || '2026'}</span>
                        <span>•</span>
                        <span>📍 ${album.category}</span>
                        <span>•</span>
                        <span>📷 ${(album.photos || []).length} Photos</span>
                    </div>
                </div>

                ${(!album.photos || album.photos.length === 0) ? `
                    <div class="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs space-y-2">
                        <i class="fa-solid fa-images text-4xl text-saffron-500 mb-1"></i>
                        <p class="font-bold text-sm text-navy-900">No photos available in this album yet.</p>
                        <p class="text-slate-400">Photos will be uploaded soon by our tour managers.</p>
                    </div>
                ` : `
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                        ${album.photos.map((photo, idx) => `
                            <div 
                                onclick="window.openAlbumPhoto('${album.id}', ${idx})" 
                                class="h-60 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden shadow-sm cursor-pointer relative group border border-slate-200 album-card-hover"
                            >
                                <img src="${photo.image}" alt="${photo.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 protected-media" loading="lazy" oncontextmenu="return false;" />
                                
                                <div class="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4 text-white">
                                    <div class="space-y-1">
                                        <h4 class="font-bold text-xs line-clamp-1">${photo.title}</h4>
                                        <span class="text-[10px] text-saffron-400 font-semibold flex items-center gap-1">
                                            <i class="fa-solid fa-expand"></i> Click for Full View
                                        </span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        `;
    }

    const defaultCategories = ['all', 'Char Dham', 'Vrindavan', 'Rishikesh', 'Khatu Shyam', 'Dwarka', 'Rajasthan', 'Gujarat', 'Adventure', 'Family Tour', 'Customer Memories'];
    const albumCategories = (state.albums || []).map(a => a.category).filter(Boolean);
    const destinations = Array.from(new Set([...defaultCategories, ...albumCategories]));

    const extractedYears = Array.from(new Set((state.albums || []).map(a => a.year).filter(Boolean))).sort((a, b) => b.localeCompare(a));
    const years = ['all', ...extractedYears];

    const filteredAlbums = (state.albums || []).filter(a => {
        const matchDest = state.galleryDestFilter === 'all' || a.category === state.galleryDestFilter;
        const matchYear = state.galleryYearFilter === 'all' || a.year === state.galleryYearFilter;
        return matchDest && matchYear;
    });

    return `
        <div id="gallery-main-section" class="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
            <div class="text-center max-w-2xl mx-auto space-y-2">
                <span class="text-saffron-500 font-extrabold text-xs uppercase tracking-widest">✨ CHANDRAKAILASH TRAVEL MEMORIES</span>
                <h1 class="text-2xl sm:text-4xl font-extrabold text-navy-900">Photo Gallery & Tour Albums</h1>
                <p class="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">Relive unforgettable journeys from our religious, family and adventure tours across India.</p>
            </div>

            <!-- LUXURY STICKY DYNAMIC FILTER BAR (TWO ROWS) -->
            <div class="sticky top-16 z-30 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-200/80 space-y-4 max-w-7xl mx-auto transition-all">
                
                <!-- FIRST ROW: CATEGORIES -->
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="font-extrabold text-navy-900 text-xs sm:text-sm tracking-wide flex items-center gap-2">
                            <span>📂</span> <span>Categories</span>
                        </span>
                        ${state.galleryDestFilter !== 'all' ? `
                            <button onclick="window.setGalleryFilter('category', 'all')" class="text-[11px] text-saffron-600 hover:underline font-bold flex items-center gap-1">
                                <span>Reset Category</span> ✕
                            </button>
                        ` : ''}
                    </div>

                    <div class="relative group">
                        <!-- Fade Indicators -->
                        <div class="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10"></div>
                        <div class="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent z-10"></div>

                        <div 
                            class="flex items-center gap-2 sm:gap-2.5 overflow-x-auto py-1 px-1 scrollbar-none w-full select-none cursor-grab active:cursor-grabbing"
                            id="gallery-category-chips"
                            onwheel="window.handleChipWheelScroll(event)"
                        >
                            ${destinations.map(d => {
                                const isActive = state.galleryDestFilter === d;
                                return `
                                    <button 
                                        type="button"
                                        onclick="window.setGalleryFilter('category', '${d}', this)" 
                                        class="px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap min-h-[44px] flex items-center gap-2 cursor-pointer flex-shrink-0 ${
                                            isActive 
                                            ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 text-white shadow-lg shadow-saffron-500/30 scale-105 border border-saffron-400 font-extrabold' 
                                            : 'bg-white text-slate-700 hover:text-saffron-600 hover:border-saffron-400 hover:-translate-y-0.5 hover:shadow-md border border-slate-200/80 shadow-sm'
                                        }"
                                    >
                                        ${d === 'all' ? '📁 All Categories' : d}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>

                <!-- DIVIDER -->
                <div class="border-t border-slate-100"></div>

                <!-- SECOND ROW: BROWSE BY YEAR -->
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="font-extrabold text-navy-900 text-xs sm:text-sm tracking-wide flex items-center gap-2">
                            <span>🗓</span> <span>Browse by Year</span>
                        </span>
                        ${state.galleryYearFilter !== 'all' ? `
                            <button onclick="window.setGalleryFilter('year', 'all')" class="text-[11px] text-saffron-600 hover:underline font-bold flex items-center gap-1">
                                <span>Reset Year</span> ✕
                            </button>
                        ` : ''}
                    </div>

                    <div class="relative group">
                        <div 
                            class="flex items-center gap-2 sm:gap-2.5 overflow-x-auto py-1 px-1 scrollbar-none w-full select-none"
                            id="gallery-year-chips"
                            onwheel="window.handleChipWheelScroll(event)"
                        >
                            ${years.map(y => {
                                const isActive = state.galleryYearFilter === y;
                                return `
                                    <button 
                                        type="button"
                                        onclick="window.setGalleryFilter('year', '${y}', this)" 
                                        class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap min-h-[44px] flex items-center gap-1.5 cursor-pointer flex-shrink-0 ${
                                            isActive 
                                            ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 text-white shadow-lg shadow-saffron-500/30 scale-105 border border-saffron-400 font-extrabold' 
                                            : 'bg-white text-slate-700 hover:text-saffron-600 hover:border-saffron-400 hover:-translate-y-0.5 hover:shadow-md border border-slate-200/80 shadow-sm'
                                        }"
                                    >
                                        ${y === 'all' ? 'All Years' : y}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- ALBUMS GRID OR PREMIUM EMPTY STATE WITH 200ms FADE -->
            ${filteredAlbums.length === 0 ? `
                <div class="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-md mx-auto my-8 animate-fade-in">
                    <div class="w-20 h-20 bg-saffron-50 text-saffron-500 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner border border-saffron-200">
                        🖼️
                    </div>
                    <div class="space-y-1">
                        <h3 class="text-xl font-extrabold text-navy-900">No Albums Found</h3>
                        <p class="text-xs text-slate-500 leading-relaxed font-medium">No travel memories are available for this selection.</p>
                    </div>
                    <button onclick="window.clearGalleryFilters()" class="btn-touch-48 bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition transform hover:scale-105 inline-flex items-center gap-2">
                        <i class="fa-solid fa-rotate-left"></i> <span>Clear Filters</span>
                    </button>
                </div>
            ` : `
                <div class="admin-albums-grid transition-opacity duration-200 animate-fade-in">
                    ${filteredAlbums.map(alb => `
                        <div 
                            onclick="window.openAlbum('${alb.id}')" 
                            class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer group album-card-hover flex flex-col justify-between"
                        >
                            <div class="relative h-52 sm:h-56 bg-slate-900 overflow-hidden" onclick="window.openAlbum('${alb.id}')">
                                <img src="${alb.coverImage || (alb.photos && alb.photos[0] ? alb.photos[0].image : 'images/himalayan_yatra.jpg')}" alt="${alb.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 protected-media" loading="lazy" oncontextmenu="return false;" />
                                
                                <span class="absolute top-3 left-3 badge-featured text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow">
                                    📍 ${alb.category}
                                </span>
                                
                                <span class="absolute top-3 right-3 bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                                    📅 ${alb.year || '2026'}
                                </span>

                                <div class="absolute bottom-3 right-3 bg-navy-950/90 text-saffron-400 text-xs font-bold px-3 py-1 rounded-xl shadow backdrop-blur border border-saffron-500/30 flex items-center gap-1.5">
                                    <i class="fa-solid fa-camera"></i> ${(alb.photos || []).length} Photos
                                </div>
                            </div>

                            <div class="p-4 space-y-1 bg-white border-t">
                                <h3 class="font-bold text-base text-navy-900 group-hover:text-saffron-600 transition line-clamp-1">${alb.title}</h3>
                                <p class="text-xs text-slate-500 line-clamp-2">${alb.description || 'View divine journey photos and batch memories.'}</p>
                                
                                <button type="button" onclick="event.stopPropagation(); window.openAlbum('${alb.id}')" class="pt-2 text-xs text-saffron-600 font-bold flex items-center gap-1 hover:underline w-full text-left min-h-[36px]">
                                    <span>Open Album Gallery</span> <i class="fa-solid fa-arrow-right text-[10px]"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;
}

export function renderMainView(filteredPkgs) {
    if (state.activeTab === 'home') {
        return `
            ${renderHeroBannerSlider()}

            ${state.settings.secPackagesEnabled !== false ? `
                <section class="max-w-7xl mx-auto px-4 py-12 md:py-16 space-y-8">
                    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <span class="text-saffron-500 font-bold text-xs uppercase tracking-wider">${t('sec_packages_tag')}</span>
                            <h2 class="text-2xl sm:text-3xl font-extrabold text-navy-900">${t('sec_packages_title')}</h2>
                        </div>
                        <button onclick="window.navigate('packages')" class="text-saffron-600 font-bold text-xs flex items-center gap-1.5 hover:underline self-start md:self-auto min-h-[44px]">
                            <span>${t('btn_explore')}</span> <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        ${state.packages.slice(0, 6).map(p => renderCard(p)).join('')}
                    </div>
                </section>
            ` : ''}

            <section class="bg-navy-950 text-white py-12 md:py-16 border-y border-saffron-500/20 space-y-8">
                <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <span class="text-saffron-400 font-bold text-xs uppercase tracking-wider">Happy Memories</span>
                        <h2 class="text-2xl sm:text-3xl font-extrabold text-white">📸 Latest Photo Highlights</h2>
                    </div>
                    <button onclick="window.navigate('gallery')" class="btn-premium btn-glow-saffron bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow flex items-center gap-2 min-h-[48px]">
                        <span>View Complete Gallery (${(state.albums || []).reduce((acc, a) => acc + (a.photos ? a.photos.length : 0), 0)} Photos)</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>

                <div class="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    ${(state.albums || []).flatMap(a => (a.photos || []).map((p, idx) => ({ ...p, albumId: a.id, photoIdx: idx }))).slice(0, 8).map(p => `
                        <div onclick="window.openAlbumPhoto('${p.albumId}', ${p.photoIdx})" class="h-40 sm:h-48 rounded-xl overflow-hidden shadow-md cursor-pointer relative group border border-slate-800">
                            <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500 protected-media" loading="lazy" />
                            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-3 text-xs font-bold text-white">
                                <span class="line-clamp-1">${p.title}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            ${state.settings.secReviewsEnabled !== false ? `
                <section class="max-w-7xl mx-auto px-4 py-12 md:py-16 space-y-8">
                    <div class="flex justify-between items-end gap-2 flex-wrap">
                        <div>
                            <span class="text-saffron-500 font-bold text-xs uppercase tracking-wider">Testimonials</span>
                            <h2 class="text-2xl sm:text-3xl font-extrabold text-navy-900">${t('sec_reviews_title')}</h2>
                            <p class="text-xs text-slate-500 mt-1">${t('sec_reviews_sub')}</p>
                        </div>
                        <button onclick="window.toggleAddReviewModal()" class="btn-touch-48 bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs shadow">
                            + Add Review
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${state.reviews.map(r => `
                            <div class="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition ${r.pinned ? 'border-l-4 border-saffron-500' : ''}">
                                <div>
                                    <div class="text-amber-400 font-bold text-xs mb-3">⭐⭐⭐⭐⭐ ${r.pinned ? '📌 Featured' : ''}</div>
                                    <p class="text-slate-700 text-xs italic mb-4 leading-relaxed font-marathi-body">"${r.review}"</p>
                                </div>
                                <div class="border-t pt-3 flex justify-between items-center text-xs">
                                    <span class="font-bold text-navy-900">${r.name}</span>
                                    <span class="text-slate-400 text-[11px]">${r.date}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}
        `;
    }

    if (state.activeTab === 'packages') {
        return `
            <div class="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <div class="flex justify-between items-center border-b pb-4">
                    <div>
                        <span class="text-saffron-500 font-bold text-xs uppercase tracking-wider">${t('sec_packages_tag')}</span>
                        <h1 class="text-2xl sm:text-3xl font-extrabold text-navy-900">${t('sec_packages_title')}</h1>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    ${filteredPkgs.map(p => renderCard(p)).join('')}
                </div>
            </div>
        `;
    }

    if (state.activeTab === 'gallery') {
        return renderPublicGalleryView();
    }

    if (state.activeTab === 'about') {
        return `
            <div class="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <div class="text-center space-y-2">
                    <span class="text-saffron-500 font-bold text-xs uppercase tracking-wider">${t('nav_about')}</span>
                    <h1 class="text-3xl sm:text-5xl font-extrabold font-marathi-calligraphy text-navy-900">${state.settings.companyName}</h1>
                    <p class="text-saffron-600 font-marathi-heading font-bold text-base sm:text-lg">"${state.settings.heroTagline}"</p>
                </div>

                <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
                    <h3 class="text-lg sm:text-xl font-bold text-navy-900">Our Heritage & Promise</h3>
                    <p>
                        Chandrakailash Tours & Travels was established to provide sacred, safe, and premium yatra experiences for families, senior citizens, and religious pilgrims across India.
                    </p>
                    <p>
                        Under the expert leadership of <strong>Yogesh Patil Sir</strong>, our company organizes specialized tour batches covering Char Dham Yatra, Kedarnath, Badrinath, Vrindavan, Mathura, Khatu Shyam, Salasar Balaji, and Rajasthan Family Tours.
                    </p>
                    <p>
                        We take complete responsibility for your comfort — from luxury AC bus transport, hygienic pure veg meals, 3-Star clean hotel stays, to guided temple darshan passes.
                    </p>
                </div>
            </div>
        `;
    }

    if (state.activeTab === 'contact') {
        return `
            <div class="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-10">
                <div class="text-center max-w-xl mx-auto">
                    <h1 class="text-2xl sm:text-3xl font-extrabold text-navy-900">${t('cnt_title')}</h1>
                    <p class="text-xs text-slate-500 mt-1">${t('cnt_sub')}</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div class="lg:col-span-5 bg-navy-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
                        <h3 class="text-xl font-bold text-saffron-400">Reach Out To Us</h3>
                        
                        <div class="space-y-4 text-xs">
                            <p class="flex items-center gap-3">
                                <i class="fa-solid fa-phone text-saffron-500 text-base"></i>
                                <a href="tel:+91${state.settings.phone}" class="text-sm font-bold text-white hover:text-saffron-400">${state.settings.phone}</a>
                            </p>
                            <p class="flex items-center gap-3">
                                <i class="fa-brands fa-whatsapp text-waGreen-500 text-base"></i>
                                <span>+91 ${state.settings.whatsapp} (24x7 Support)</span>
                            </p>
                            <p class="flex items-center gap-3">
                                <i class="fa-solid fa-envelope text-saffron-500 text-base"></i>
                                <span>${state.settings.email}</span>
                            </p>
                            <p class="flex items-center gap-3">
                                <i class="fa-brands fa-instagram text-pink-500 text-base"></i>
                                <a href="${getInstagramUrl()}" target="_blank" class="hover:text-saffron-400 font-medium">${state.settings.instagram}</a>
                            </p>
                            <p class="flex items-center gap-3">
                                <i class="fa-solid fa-location-dot text-saffron-500 text-base"></i>
                                <a href="${state.settings.googleMapsUrl}" target="_blank" class="hover:text-saffron-400 font-medium">${state.settings.officeAddress}</a>
                            </p>
                        </div>

                        <div class="pt-4 space-y-3">
                            <a href="${getWhatsAppUrl()}" target="_blank" class="btn-touch-48 btn-glow-green w-full bg-waGreen-500 hover:bg-waGreen-600 text-white text-xs shadow flex items-center justify-center gap-2">
                                <i class="fa-brands fa-whatsapp text-lg"></i> WhatsApp Quick Inquiry
                            </a>
                            <a href="tel:+91${state.settings.phone}" class="btn-touch-48 btn-glow-saffron w-full bg-saffron-500 hover:bg-saffron-600 text-white text-xs shadow flex items-center justify-center gap-2">
                                <i class="fa-solid fa-phone text-base"></i> Call ${state.settings.phone}
                            </a>
                        </div>
                    </div>

                    <div class="lg:col-span-7 space-y-6">
                        <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
                            <h3 class="text-xl font-bold text-navy-900 mb-4">${t('cnt_form_title')}</h3>
                            <form onsubmit="window.handleContactSubmit(event)" class="space-y-4 text-xs">
                                <div>
                                    <label class="block font-bold text-slate-700 mb-1.5">${t('cnt_name')}</label>
                                    <input type="text" id="cnt_name" required placeholder="e.g. Suresh Patil" class="admin-form-input" />
                                </div>
                                <div>
                                    <label class="block font-bold text-slate-700 mb-1.5">${t('cnt_phone')}</label>
                                    <input type="tel" id="cnt_phone" required placeholder="9960833090" class="admin-form-input" />
                                </div>
                                <div>
                                    <label class="block font-bold text-slate-700 mb-1.5">${t('cnt_pkg')}</label>
                                    <select id="cnt_pkg" class="admin-form-select">
                                        ${state.packages.map(p => `<option value="${p.name}">${p.name} (₹${p.price ? p.price.toLocaleString() : 0})</option>`).join('')}
                                    </select>
                                </div>
                                <div>
                                    <label class="block font-bold text-slate-700 mb-1.5">${t('cnt_msg')}</label>
                                    <textarea id="cnt_msg" rows="3" placeholder="Number of people, senior citizens count..." class="admin-form-textarea"></textarea>
                                </div>
                                <button type="submit" class="btn-touch-48 btn-glow-navy w-full bg-navy-900 hover:bg-navy-950 text-white shadow-lg">
                                    ${t('cnt_submit')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    if (state.activeTab === 'admin') {
        return renderAdminView();
    }

    return '';
}

export function renderModals() {
    let html = '';

    if (state.selectedPkg) {
        const pkg = state.selectedPkg;
        const pkgGallery = pkg.packageGallery || [pkg.coverImage];
        const itineraryList = pkg.itinerary || [];

        html += `
            <div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 overflow-y-auto">
                <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto p-5 sm:p-8 space-y-6">
                    <button onclick="window.closeDetail()" class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 w-9 h-9 rounded-full font-bold shadow min-h-[36px] flex items-center justify-center">✕</button>
                    
                    <div class="relative h-56 sm:h-80 rounded-xl overflow-hidden shadow">
                        <img src="${pkg.coverImage}" alt="${pkg.name}" class="w-full h-full object-cover" />
                        
                        <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            ${pkg.isFeatured ? `<span class="badge-featured text-white text-[10px] font-bold px-3 py-1 rounded-full shadow">⭐ FEATURED</span>` : ''}
                            ${pkg.isTrending ? `<span class="badge-trending text-white text-[10px] font-bold px-3 py-1 rounded-full shadow">🔥 TRENDING</span>` : ''}
                            ${pkg.isNew ? `<span class="badge-new text-white text-[10px] font-bold px-3 py-1 rounded-full shadow">✨ NEW</span>` : ''}
                        </div>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                            <span class="bg-saffron-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">${pkg.category || 'religious'} TOUR</span>
                            <h2 class="text-xl sm:text-3xl font-extrabold text-navy-900 mt-2">${pkg.name}</h2>
                            <p class="text-xs text-slate-500 mt-1">📍 ${pkg.destination}</p>
                        </div>
                        <button onclick="window.openPrintablePdf('${pkg.id}')" class="btn-touch-48 bg-slate-100 hover:bg-slate-200 text-navy-900 text-xs border self-start">
                            <i class="fa-solid fa-file-pdf text-rose-600 text-base"></i> Download / Print PDF Itinerary
                        </button>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl font-medium border border-slate-200">
                        <div>${t('label_duration')}: <div class="font-bold text-saffron-600 text-xs sm:text-base">${pkg.duration}</div></div>
                        <div>${t('label_dates')}: <div class="font-bold text-slate-800 text-xs">${pkg.dates}</div></div>
                        <div>Transport: <div class="font-bold text-slate-800 text-xs">${pkg.transport}</div></div>
                        <div>${t('label_price')}: <div class="font-extrabold text-saffron-600 text-sm sm:text-lg">₹${pkg.price ? pkg.price.toLocaleString() : 0}</div></div>
                    </div>

                    ${pkgGallery.length > 0 ? `
                        <div class="space-y-2 border-t pt-4">
                            <h4 class="font-bold text-navy-900 text-xs flex items-center gap-1.5">
                                <i class="fa-solid fa-camera text-saffron-500"></i> Package Gallery Photos (${pkgGallery.length} Photos)
                            </h4>
                            <div class="flex items-center gap-3 overflow-x-auto pb-2">
                                ${pkgGallery.map((img, idx) => `
                                    <div onclick="window.openPackagePhoto('${pkg.id}', ${idx})" class="w-28 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-sm cursor-pointer border hover:border-saffron-500 transition relative group">
                                        <img src="${img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300 protected-media" oncontextmenu="return false;" />
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <div class="space-y-3 border-t pt-4">
                        <div class="flex border-b border-slate-200 text-xs font-bold gap-2 overflow-x-auto">
                            <button onclick="window.toggleAccordion('itinerary')" class="py-2.5 px-4 border-b-2 transition whitespace-nowrap min-h-[44px] ${state.activeAccordion === 'itinerary' ? 'border-saffron-500 text-saffron-600' : 'border-transparent text-slate-500'}">${t('tab_itinerary')} (${itineraryList.length} Days)</button>
                            <button onclick="window.toggleAccordion('services')" class="py-2.5 px-4 border-b-2 transition whitespace-nowrap min-h-[44px] ${state.activeAccordion === 'services' ? 'border-saffron-500 text-saffron-600' : 'border-transparent text-slate-500'}">${t('tab_included')}</button>
                            <button onclick="window.toggleAccordion('rules')" class="py-2.5 px-4 border-b-2 transition whitespace-nowrap min-h-[44px] ${state.activeAccordion === 'rules' ? 'border-saffron-500 text-saffron-600' : 'border-transparent text-slate-500'}">${t('tab_rules')}</button>
                        </div>

                        <div class="pt-2">
                            ${state.activeAccordion === 'itinerary' ? `
                                <div class="space-y-3 text-xs">
                                    ${itineraryList.map(i => `
                                        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                                            <div class="flex justify-between items-start gap-2">
                                                <span class="bg-saffron-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                                                    <i class="fa-solid ${i.icon || 'fa-route'}"></i> Day ${i.day}: ${i.title}
                                                </span>
                                            </div>

                                            <p class="text-slate-700 whitespace-pre-line leading-relaxed font-marathi-body">${i.description || i.desc || ''}</p>

                                            <div class="flex flex-wrap gap-2 text-[11px] pt-1">
                                                ${i.hotel ? `<span class="bg-white text-navy-900 font-bold px-2.5 py-1 rounded-lg border">🏨 Hotel: ${i.hotel}</span>` : ''}
                                                ${i.meal ? `<span class="bg-white text-emerald-800 font-bold px-2.5 py-1 rounded-lg border border-emerald-200">🍽️ Meals: ${i.meal}</span>` : ''}
                                                ${i.transport ? `<span class="bg-white text-amber-800 font-bold px-2.5 py-1 rounded-lg border border-amber-200">🚌 Transport: ${i.transport}</span>` : ''}
                                            </div>

                                            ${i.image ? `
                                                <div class="h-32 sm:h-40 rounded-xl overflow-hidden mt-2 bg-slate-900 max-w-sm">
                                                    <img src="${i.image}" alt="${i.title}" class="w-full h-full object-cover protected-media" />
                                                </div>
                                            ` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}

                            ${state.activeAccordion === 'services' ? `
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                    <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                                        <h5 class="font-bold text-emerald-900 mb-2">✓ What's Included:</h5>
                                        <ul class="space-y-1.5 text-emerald-950">
                                            ${(pkg.includedServices || []).map(inc => `<li>✓ ${inc}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <div class="bg-rose-50 p-4 rounded-xl border border-rose-200">
                                        <h5 class="font-bold text-rose-900 mb-2">✗ What's Excluded:</h5>
                                        <ul class="space-y-1.5 text-rose-950">
                                            ${(pkg.excludedServices || []).map(exc => `<li>✗ ${exc}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            ` : ''}

                            ${state.activeAccordion === 'rules' ? `
                                <div class="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs space-y-2">
                                    <h5 class="font-bold text-amber-900 mb-2">⚠️ Rules & Regulations:</h5>
                                    <ul class="space-y-1.5 text-amber-950 list-disc pl-4">
                                        ${(pkg.rules || []).map(r => `<li>${r}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <div class="flex gap-3 pt-4 border-t flex-col sm:flex-row">
                        <a href="${getWhatsAppUrl(pkg.name)}" target="_blank" class="btn-touch-48 btn-glow-green flex-1 bg-waGreen-500 hover:bg-waGreen-600 text-white font-bold shadow-lg flex items-center justify-center gap-2">
                            <i class="fa-brands fa-whatsapp text-xl"></i> ${t('btn_book_wa')}
                        </a>
                        <a href="tel:+91${state.settings.phone}" class="btn-touch-48 btn-glow-saffron flex-1 bg-saffron-500 hover:bg-saffron-600 text-white font-bold shadow-lg flex items-center justify-center gap-2">
                            <i class="fa-solid fa-phone text-base"></i> ${t('btn_call')}
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    if (state.showAddPkgModal) {
        const pkg = state.editingPkg || {};
        const coverImg = state.tempPkgCoverImage !== undefined ? state.tempPkgCoverImage : (pkg.coverImage || '');
        const pkgGallery = state.tempPkgGallery !== undefined ? state.tempPkgGallery : (pkg.packageGallery || []);
        const itineraryItems = state.tempItinerary || [];

        html += `
            <div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 overflow-y-auto">
                <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[94vh] overflow-y-auto p-5 sm:p-8 shadow-2xl my-auto space-y-6">
                    <div class="flex justify-between items-center pb-2 border-b border-slate-100">
                        <h3 class="text-xl font-bold text-navy-900">${pkg.id ? 'Edit Tour Package' : 'Add New Tour Package'}</h3>
                        <button type="button" onclick="window.handlePkgEditorCancel()" class="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg hover:bg-slate-100" title="Close / Cancel">✕</button>
                    </div>
                    
                    <form onsubmit="window.handleAddPkgSubmit(event)" class="space-y-5 text-xs">
                        <div class="admin-form-group">
                            <label class="font-bold">Package Name *</label>
                            <input type="text" id="np_name" value="${pkg.name || ''}" oninput="window.syncPkgFormToState()" required placeholder="e.g. Complete Char Dham Yatra 2026" class="admin-form-input font-bold" />
                        </div>
                        
                        <div class="admin-form-grid admin-form-grid-2">
                            <div class="admin-form-group">
                                <label class="font-bold">Price (₹) *</label>
                                <input type="number" id="np_price" value="${pkg.price || ''}" oninput="window.syncPkgFormToState()" required placeholder="32500" class="admin-form-input font-bold" />
                            </div>
                            <div class="admin-form-group">
                                <label class="font-bold">Category *</label>
                                <select id="np_cat" onchange="window.syncPkgFormToState()" class="admin-form-select">
                                    <option value="religious" ${pkg.category==='religious'?'selected':''}>Religious</option>
                                    <option value="family" ${pkg.category==='family'?'selected':''}>Family</option>
                                    <option value="adventure" ${pkg.category==='adventure'?'selected':''}>Adventure</option>
                                </select>
                            </div>
                        </div>

                        <div class="admin-form-grid admin-form-grid-2">
                            <div class="admin-form-group">
                                <label class="font-bold">Duration *</label>
                                <input type="text" id="np_dur" value="${pkg.duration || ''}" oninput="window.syncPkgFormToState()" required placeholder="12 Days / 11 Nights" class="admin-form-input" />
                            </div>
                            <div class="admin-form-group">
                                <label class="font-bold">Travel Dates *</label>
                                <input type="text" id="np_dates" value="${pkg.dates || ''}" oninput="window.syncPkgFormToState()" required placeholder="15 May - 26 May 2026" class="admin-form-input" />
                            </div>
                        </div>

                        <div class="bg-slate-50 p-4 rounded-xl border space-y-2">
                            <label class="block font-bold text-navy-900">Package Display Badges & Visibility:</label>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <label class="flex items-center gap-2 cursor-pointer bg-saffron-50 text-saffron-900 font-bold px-3 py-2 rounded-xl border border-saffron-300">
                                    <input type="checkbox" id="np_show_hero" onchange="window.syncPkgFormToState()" ${pkg.showInHero !== false ? 'checked' : ''} />
                                    <span>⭐ Show in Homepage Hero Slider</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer p-1.5">
                                    <input type="checkbox" id="np_badge_featured" onchange="window.syncPkgFormToState()" ${pkg.isFeatured ? 'checked' : ''} />
                                    <span>⭐ Featured Package</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer p-1.5">
                                    <input type="checkbox" id="np_badge_trending" onchange="window.syncPkgFormToState()" ${pkg.isTrending ? 'checked' : ''} />
                                    <span>🔥 Trending Badge</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer p-1.5">
                                    <input type="checkbox" id="np_badge_new" onchange="window.syncPkgFormToState()" ${pkg.isNew ? 'checked' : ''} />
                                    <span>✨ New Batch Badge</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer p-1.5">
                                    <input type="checkbox" id="np_badge_soldout" onchange="window.syncPkgFormToState()" ${pkg.isSoldOut ? 'checked' : ''} />
                                    <span>🛑 Sold Out Badge</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer p-1.5">
                                    <input type="checkbox" id="np_badge_upcoming" onchange="window.syncPkgFormToState()" ${pkg.isUpcoming ? 'checked' : ''} />
                                    <span>⏳ Upcoming Badge</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            ${renderMediaUploader({
                                id: 'pkg_cover',
                                label: 'Package Cover Image *',
                                currentImage: coverImg,
                                helperText: 'Click or drop cover photo from computer.'
                            })}
                        </div>

                        <div class="bg-slate-50 p-4 rounded-xl border space-y-3">
                            <label class="block font-bold text-navy-900">Package Gallery Photos (${pkgGallery.length} Uploaded)</label>
                            ${renderMediaUploader({
                                id: 'pkg_gallery_uploader',
                                label: '',
                                allowMultiple: true,
                                helperText: 'Drag & drop multiple photos belonging ONLY to this package.'
                            })}

                            ${pkgGallery.length > 0 ? `
                                <div class="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2 border-t">
                                    ${pkgGallery.map((img, idx) => `
                                        <div class="relative h-20 rounded-lg overflow-hidden border group">
                                            <img src="${img}" class="w-full h-full object-cover" />
                                            <button type="button" onclick="window.removePkgGalleryImage(${idx})" class="absolute top-1 right-1 bg-rose-600 text-white w-6 h-6 rounded-full text-[10px] font-bold shadow flex items-center justify-center">✕</button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>

                        <div class="admin-form-group">
                            <label class="font-bold">Short Description *</label>
                            <textarea id="np_desc" rows="2" oninput="window.syncPkgFormToState()" required placeholder="Brief tour overview..." class="admin-form-textarea">${pkg.shortDesc || ''}</textarea>
                        </div>

                        <!-- 📅 DYNAMIC DAY-WISE ITINERARY BUILDER -->
                        <div class="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                                <div>
                                    <h4 class="font-extrabold text-navy-900 text-sm sm:text-base flex items-center gap-2">
                                        <span>📅 Day Wise Itinerary Builder</span>
                                        <span class="bg-saffron-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full">${itineraryItems.length} Days</span>
                                    </h4>
                                    <p class="text-[11px] text-slate-500">Create unlimited itinerary days with reordering, hotel, meal, and transport info.</p>
                                </div>
                                <button type="button" onclick="window.addItineraryDay()" class="btn-touch-48 bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs shadow self-start sm:self-auto">
                                    ➕ Add New Day
                                </button>
                            </div>

                            <div class="space-y-3">
                                ${itineraryItems.map((item, idx) => `
                                    <div 
                                        class="itinerary-builder-card ${item.collapsed ? 'collapsed' : ''}"
                                        draggable="true"
                                        ondragstart="window.handleItineraryDragStart(event, ${idx})"
                                        ondragover="event.preventDefault();"
                                        ondrop="window.handleItineraryDrop(event, ${idx})"
                                    >
                                        <!-- CARD HEADER -->
                                        <div class="itinerary-card-header" onclick="window.toggleCollapseItineraryDay(${idx})">
                                            <div class="flex items-center gap-2">
                                                <i class="fa-solid fa-grip-vertical itinerary-drag-handle" title="Drag to reorder day"></i>
                                                <span class="bg-navy-900 text-saffron-400 font-extrabold text-xs px-2.5 py-1 rounded-lg">Day ${idx + 1}</span>
                                                <span class="font-bold text-navy-900 text-xs line-clamp-1">${item.title || `Day ${idx + 1} Plan`}</span>
                                            </div>

                                            <div class="itinerary-action-btns" onclick="event.stopPropagation();">
                                                <button type="button" onclick="window.toggleCollapseItineraryDay(${idx})" class="btn-itinerary-action" title="${item.collapsed ? 'Expand Day' : 'Collapse Day'}">
                                                    <i class="fa-solid ${item.collapsed ? 'fa-chevron-down' : 'fa-chevron-up'}"></i>
                                                </button>
                                                <button type="button" onclick="window.moveItineraryDay(${idx}, -1)" ${idx === 0 ? 'disabled class="btn-itinerary-action opacity-40"' : 'class="btn-itinerary-action"'} title="Move Up">
                                                    ↑
                                                </button>
                                                <button type="button" onclick="window.moveItineraryDay(${idx}, 1)" ${idx === itineraryItems.length - 1 ? 'disabled class="btn-itinerary-action opacity-40"' : 'class="btn-itinerary-action"'} title="Move Down">
                                                    ↓
                                                </button>
                                                <button type="button" onclick="window.duplicateItineraryDay(${idx})" class="btn-itinerary-action" title="Duplicate Day">
                                                    📋
                                                </button>
                                                <button type="button" onclick="window.deleteItineraryDay(${idx})" class="btn-itinerary-action danger" title="Delete Day">
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>

                                        <!-- CARD BODY -->
                                        ${!item.collapsed ? `
                                            <div class="itinerary-card-body">
                                                <div class="admin-form-group">
                                                    <label class="font-bold text-slate-700">Day Title *</label>
                                                    <input 
                                                        type="text" 
                                                        value="${item.title || ''}" 
                                                        oninput="window.updateItineraryField(${idx}, 'title', this.value)" 
                                                        required 
                                                        placeholder="e.g. Departure Journey / Temple Darshan" 
                                                        class="admin-form-input font-bold" 
                                                    />
                                                </div>

                                                <div class="admin-form-group">
                                                    <label class="font-bold text-slate-700">Description (Multi-line) *</label>
                                                    <textarea 
                                                        rows="3" 
                                                        oninput="window.updateItineraryField(${idx}, 'description', this.value)" 
                                                        required 
                                                        placeholder="Detailed day-wise travel schedule, sightseeings..." 
                                                        class="admin-form-textarea font-marathi-body"
                                                    >${item.description || item.desc || ''}</textarea>
                                                </div>

                                                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                    <div class="admin-form-group">
                                                        <label class="font-bold text-slate-700">Optional Hotel</label>
                                                        <input 
                                                            type="text" 
                                                            value="${item.hotel || ''}" 
                                                            oninput="window.updateItineraryField(${idx}, 'hotel', this.value)" 
                                                            placeholder="e.g. Hotel Himalayan" 
                                                            class="admin-form-input" 
                                                        />
                                                    </div>

                                                    <div class="admin-form-group">
                                                        <label class="font-bold text-slate-700">Optional Meals</label>
                                                        <input 
                                                            type="text" 
                                                            value="${item.meal || ''}" 
                                                            oninput="window.updateItineraryField(${idx}, 'meal', this.value)" 
                                                            placeholder="e.g. Breakfast & Dinner" 
                                                            class="admin-form-input" 
                                                        />
                                                    </div>

                                                    <div class="admin-form-group">
                                                        <label class="font-bold text-slate-700">Optional Transport</label>
                                                        <input 
                                                            type="text" 
                                                            value="${item.transport || ''}" 
                                                            oninput="window.updateItineraryField(${idx}, 'transport', this.value)" 
                                                            placeholder="e.g. AC Bus / Train" 
                                                            class="admin-form-input" 
                                                        />
                                                    </div>
                                                </div>

                                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <div class="admin-form-group">
                                                        <label class="font-bold text-slate-700">Highlight Icon Class</label>
                                                        <select 
                                                            onchange="window.updateItineraryField(${idx}, 'icon', this.value)" 
                                                            class="admin-form-select"
                                                        >
                                                            <option value="fa-bus" ${(item.icon==='fa-bus'||!item.icon)?'selected':''}>🚌 Bus / Transit (fa-bus)</option>
                                                            <option value="fa-hotel" ${item.icon==='fa-hotel'?'selected':''}>🏨 Hotel / Stay (fa-hotel)</option>
                                                            <option value="fa-utensils" ${item.icon==='fa-utensils'?'selected':''}>🍽️ Meals (fa-utensils)</option>
                                                            <option value="fa-mountain" ${item.icon==='fa-mountain'?'selected':''}>🏔️ Mountain / Trek (fa-mountain)</option>
                                                            <option value="fa-om" ${item.icon==='fa-om'?'selected':''}>🕉️ Temple Darshan (fa-om)</option>
                                                            <option value="fa-plane" ${item.icon==='fa-plane'?'selected':''}>✈️ Flight (fa-plane)</option>
                                                            <option value="fa-route" ${item.icon==='fa-route'?'selected':''}>📍 Route (fa-route)</option>
                                                        </select>
                                                    </div>

                                                    <div class="admin-form-group">
                                                        <label class="font-bold text-slate-700">Optional Day Image URL</label>
                                                        <input 
                                                            type="text" 
                                                            value="${item.image || ''}" 
                                                            oninput="window.updateItineraryField(${idx}, 'image', this.value)" 
                                                            placeholder="e.g. images/himalayan_yatra.jpg" 
                                                            class="admin-form-input" 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>

                            <div class="pt-2">
                                <button type="button" onclick="window.addItineraryDay()" class="btn-touch-48 w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs">
                                    ➕ Add New Day
                                </button>
                            </div>
                        </div>

                        <div class="flex gap-2 pt-2">
                            <button type="button" onclick="window.handlePkgEditorCancel()" class="btn-touch-48 flex-1 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl font-bold">Cancel</button>
                            <button type="submit" class="btn-touch-48 flex-1 bg-saffron-500 hover:bg-saffron-600 text-white font-bold shadow rounded-xl">Save Package</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    if (state.showDiscardPkgConfirmModal) {
        html += `
            <div id="discard-pkg-modal" class="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100 text-center animate-fade-in">
                    <div class="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-xl font-bold">
                        ⚠️
                    </div>
                    <h4 class="text-lg font-extrabold text-navy-900">Discard Changes?</h4>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        You have unsaved changes. Are you sure you want to leave this page?
                    </p>
                    <div class="flex flex-col sm:flex-row gap-2 pt-2">
                        <button type="button" onclick="window.continuePkgEditing()" class="btn-touch-48 flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300">
                            Continue Editing
                        </button>
                        <button type="button" onclick="window.confirmDiscardPkgChanges()" class="btn-touch-48 flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow">
                            Discard Changes
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    if (state.showAddAlbumModal) {
        const alb = state.editingAlbum || {};
        const coverImg = state.tempAlbumCoverImage !== undefined ? state.tempAlbumCoverImage : (alb.coverImage || '');
        const photos = state.tempAlbumPhotos !== undefined ? state.tempAlbumPhotos : (alb.photos || []);

        html += `
            <div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 overflow-y-auto">
                <div class="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl my-auto space-y-4">
                    <div class="flex justify-between items-center pb-2 border-b border-slate-100">
                        <h3 class="text-xl font-bold text-navy-900">${alb.id ? 'Manage Album & Photos' : 'Create New Gallery Album'}</h3>
                        <button type="button" onclick="window.handleAlbumEditorCancel()" class="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg hover:bg-slate-100" title="Close / Cancel">✕</button>
                    </div>
                    <form onsubmit="window.handleCreateAlbumSubmit(event)" class="space-y-4 text-xs">
                        <div class="admin-form-group">
                            <label class="font-bold">Album Title *</label>
                            <input type="text" id="alb_title" value="${alb.title || ''}" required placeholder="e.g. Char Dham Yatra 2026" class="admin-form-input font-bold" />
                        </div>
                        <div class="admin-form-grid admin-form-grid-2">
                            <div class="admin-form-group">
                                <label class="font-bold">Year Tag *</label>
                                <input 
                                    type="number" 
                                    id="alb_year" 
                                    value="${alb.year || '2026'}" 
                                    required 
                                    min="2020" 
                                    max="2100" 
                                    maxLength="4"
                                    oninput="if(this.value.length > 4) this.value = this.value.slice(0, 4);"
                                    placeholder="2026" 
                                    class="admin-form-input font-bold" 
                                />
                            </div>
                            <div class="admin-form-group">
                                <label class="font-bold">Category / Destination *</label>
                                <input type="text" id="alb_cat" value="${alb.category || 'Char Dham'}" required placeholder="Char Dham, Vrindavan..." class="admin-form-input font-bold" />
                            </div>
                        </div>

                        <div class="admin-form-group">
                            <label class="font-bold">Album Description</label>
                            <textarea id="alb_desc" rows="2" placeholder="Brief album overview..." class="admin-form-textarea">${alb.description || ''}</textarea>
                        </div>

                        <div>
                            ${renderMediaUploader({
                                id: 'album_cover',
                                label: 'Album Cover Image',
                                currentImage: coverImg,
                                helperText: 'Click or drop cover photo for this album card.'
                            })}
                        </div>

                        <div class="bg-slate-50 p-4 rounded-xl border space-y-3">
                            <label class="block font-bold text-navy-900">Upload Photos into Album (${photos.length} Photos)</label>
                            ${renderMediaUploader({
                                id: 'album_photos_uploader',
                                label: '',
                                allowMultiple: true,
                                helperText: 'Drag & drop multiple photos directly into this album.'
                            })}

                            ${photos.length > 0 ? `
                                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t">
                                    ${photos.map((p, idx) => `
                                        <div class="bg-white p-2 rounded-xl border shadow-sm space-y-1 relative">
                                            <div class="h-24 rounded-lg overflow-hidden bg-slate-900">
                                                <img src="${p.image}" class="w-full h-full object-cover" />
                                            </div>
                                            <input type="text" value="${p.title}" onchange="state.tempAlbumPhotos[${idx}].title = this.value" class="w-full p-1 border rounded text-[10px] font-semibold" placeholder="Photo caption..." />
                                            <button type="button" onclick="window.removeAlbumPhoto(${idx})" class="text-rose-600 text-[10px] font-bold hover:underline block text-right pt-0.5 min-h-[32px]">Delete</button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>

                        <div class="flex gap-2 pt-2">
                            <button type="button" onclick="window.handleAlbumEditorCancel()" class="btn-touch-48 flex-1 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl font-bold">Cancel</button>
                            <button type="submit" class="btn-touch-48 flex-1 bg-saffron-500 hover:bg-saffron-600 text-white font-bold shadow rounded-xl">Save Album</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    if (state.showDiscardAlbumConfirmModal) {
        html += `
            <div id="discard-album-modal" class="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100 text-center animate-fade-in">
                    <div class="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-xl font-bold">
                        ⚠️
                    </div>
                    <h4 class="text-lg font-extrabold text-navy-900">Discard Changes?</h4>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        You have unsaved changes. Are you sure you want to leave this page?
                    </p>
                    <div class="flex flex-col sm:flex-row gap-2 pt-2">
                        <button type="button" onclick="window.continueAlbumEditing()" class="btn-touch-48 flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300">
                            Continue Editing
                        </button>
                        <button type="button" onclick="window.confirmDiscardAlbumChanges()" class="btn-touch-48 flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow">
                            Discard Changes
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    if (state.showLoginModal && !state.adminLoggedIn) {
        html += `
            <div id="admin-login-backdrop" onclick="window.closeAdminLoginModal(event)" class="fixed inset-0 z-[9998] bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto cursor-pointer" style="pointer-events: auto;">
                <div id="admin-login-modal-card" onclick="event.stopPropagation()" class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-slate-200 z-[9999] cursor-default my-auto" style="pointer-events: auto;">
                    <button type="button" id="admin-login-close-btn" onclick="window.closeAdminLoginModal(event)" class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-600 w-9 h-9 rounded-full font-bold shadow flex items-center justify-center text-sm transition min-h-[36px] min-w-[36px] z-[10000] cursor-pointer" style="pointer-events: auto;" title="Close Modal">✕</button>
                    
                    <div class="text-center space-y-2">
                        <div class="w-14 h-14 rounded-2xl bg-navy-900 text-saffron-400 flex items-center justify-center mx-auto text-2xl shadow-lg border border-saffron-500/30">
                            <i class="fa-solid fa-user-shield"></i>
                        </div>
                        <h3 class="text-2xl font-extrabold text-navy-900">Admin CMS Portal</h3>
                        <p class="text-xs text-slate-500">Chandrakailash Tours & Travels Management</p>
                    </div>

                    ${state.loginErrorMessage ? `
                        <div class="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-700 font-bold text-center">
                            ⚠️ ${state.loginErrorMessage}
                        </div>
                    ` : ''}

                    <form onsubmit="window.handleAdminLogin(event)" class="space-y-4 text-xs" autocomplete="off">
                        <div>
                            <label class="block font-bold text-navy-900 mb-1.5">Username *</label>
                            <input 
                                type="text" 
                                id="adm_user" 
                                required 
                                placeholder="Enter Username" 
                                class="admin-form-input font-bold" 
                            />
                        </div>

                        <div>
                            <label class="block font-bold text-navy-900 mb-1.5">Password *</label>
                            <input 
                                type="password" 
                                id="adm_pass" 
                                required 
                                placeholder="Enter Password" 
                                class="admin-form-input" 
                            />
                        </div>

                        <div class="pt-2 flex gap-2">
                            <button type="button" id="admin-login-cancel-btn" onclick="window.closeAdminLoginModal(event)" class="btn-touch-48 flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer" style="pointer-events: auto;">
                                Cancel
                            </button>
                            <button type="submit" id="admin-login-submit-btn" class="btn-touch-48 btn-glow-navy flex-1 bg-navy-900 hover:bg-navy-950 text-white font-extrabold shadow-lg cursor-pointer" style="pointer-events: auto;">
                                Login to CMS
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    html += renderLightboxModal();

    if (state.showPdfModal) {
        html += renderPrintableItineraryModal();
    }

    if (state.showAddReviewModal) {
        html += `
            <div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
                    <h3 class="text-xl font-bold text-navy-900">Add Customer Review</h3>
                    <form onsubmit="window.handleAddReviewSubmit(event)" class="space-y-3 text-xs">
                        <div class="admin-form-group">
                            <label class="font-bold">Your Name *</label>
                            <input type="text" id="rv_name" required placeholder="e.g. Ramesh Patil" class="admin-form-input" />
                        </div>
                        <div class="admin-form-group">
                            <label class="font-bold">Your Review / Experience *</label>
                            <textarea id="rv_text" rows="3" required placeholder="Write review in Marathi or English..." class="admin-form-textarea"></textarea>
                        </div>
                        <div class="flex gap-2 pt-2">
                            <button type="button" onclick="state.showAddReviewModal=false; window.renderApp();" class="btn-touch-48 flex-1 border border-slate-200 font-bold">Cancel</button>
                            <button type="submit" class="btn-touch-48 flex-1 bg-navy-900 text-white font-bold shadow">Submit Review</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    return html;
}

window.openAddPkgModal = function() {
    const draftRestored = window.restorePkgDraftFromLocalStorage();
    if (!draftRestored || (state.editingPkg && state.editingPkg.id)) {
        state.editingPkg = null;
        state.tempPkgCoverImage = undefined;
        state.tempPkgGallery = [];
        state.tempItinerary = [
            { day: 1, title: 'Day 1: Departure & Journey', description: 'Departure by AC Bus / Train. Overnight journey.', hotel: '', meal: 'Dinner Included', transport: 'AC Bus', icon: 'fa-bus', image: '', collapsed: false }
        ];
        uploaderState.previews['pkg_cover'] = undefined;
        uploaderState.previews['pkg_gallery_uploader'] = undefined;

        state.pkgEditorInitialSnapshot = {
            isEdit: false,
            pkgId: null,
            name: '',
            price: '',
            category: 'religious',
            duration: '',
            dates: '',
            shortDesc: '',
            showInHero: true,
            isFeatured: false,
            isTrending: false,
            isNew: false,
            isSoldOut: false,
            isUpcoming: false,
            coverImage: '',
            packageGallery: [],
            itinerary: [
                { day: 1, title: 'Day 1: Departure & Journey', description: 'Departure by AC Bus / Train. Overnight journey.', hotel: '', meal: 'Dinner Included', transport: 'AC Bus', icon: 'fa-bus', image: '', collapsed: false }
            ]
        };
    }

    state.showAddPkgModal = true;
    state.showDiscardPkgConfirmModal = false;
    try {
        history.pushState({ pkgModal: true }, '', location.href);
    } catch (e) {}

    if (window.renderApp) window.renderApp();
};

window.openEditPkgModal = function(id) {
    const draftRestored = window.restorePkgDraftFromLocalStorage();
    const isMatchingDraft = draftRestored && state.editingPkg && state.editingPkg.id === id;

    if (!isMatchingDraft) {
        const origPkg = state.packages.find(p => p.id === id);
        state.editingPkg = origPkg ? JSON.parse(JSON.stringify(origPkg)) : null;
        state.tempPkgCoverImage = state.editingPkg ? state.editingPkg.coverImage : undefined;
        state.tempPkgGallery = state.editingPkg ? [...(state.editingPkg.packageGallery || [])] : [];
        
        if (state.editingPkg && Array.isArray(state.editingPkg.itinerary) && state.editingPkg.itinerary.length > 0) {
            state.tempItinerary = state.editingPkg.itinerary.map((item, idx) => ({
                day: idx + 1,
                title: item.title || `Day ${idx + 1}`,
                description: item.description || item.desc || '',
                hotel: item.hotel || '',
                meal: item.meal || '',
                transport: item.transport || '',
                icon: item.icon || 'fa-route',
                image: item.image || '',
                collapsed: false
            }));
        } else {
            state.tempItinerary = [
                { day: 1, title: 'Day 1: Departure & Journey', description: 'Departure by AC Bus / Train. Overnight journey.', hotel: '', meal: 'Dinner Included', transport: 'AC Bus', icon: 'fa-bus', image: '', collapsed: false }
            ];
        }

        uploaderState.previews['pkg_cover'] = undefined;
        uploaderState.previews['pkg_gallery_uploader'] = undefined;

        state.pkgEditorInitialSnapshot = {
            isEdit: true,
            pkgId: id,
            name: origPkg ? (origPkg.name || '') : '',
            price: origPkg && origPkg.price !== undefined ? origPkg.price : '',
            category: origPkg ? (origPkg.category || 'religious') : 'religious',
            duration: origPkg ? (origPkg.duration || '') : '',
            dates: origPkg ? (origPkg.dates || '') : '',
            shortDesc: origPkg ? (origPkg.shortDesc || '') : '',
            showInHero: origPkg ? (origPkg.showInHero !== false) : true,
            isFeatured: origPkg ? Boolean(origPkg.isFeatured) : false,
            isTrending: origPkg ? Boolean(origPkg.isTrending) : false,
            isNew: origPkg ? Boolean(origPkg.isNew) : false,
            isSoldOut: origPkg ? Boolean(origPkg.isSoldOut) : false,
            isUpcoming: origPkg ? Boolean(origPkg.isUpcoming) : false,
            coverImage: origPkg ? (origPkg.coverImage || '') : '',
            packageGallery: origPkg ? [...(origPkg.packageGallery || [])] : [],
            itinerary: state.tempItinerary.map(item => ({ ...item }))
        };
    }

    state.showAddPkgModal = true;
    state.showDiscardPkgConfirmModal = false;
    try {
        history.pushState({ pkgModal: true }, '', location.href);
    } catch (e) {}

    if (window.renderApp) window.renderApp();
};

window.savePkgDraftToLocalStorage = function() {
    try {
        if (state.showAddPkgModal) {
            const draft = {
                editingPkg: state.editingPkg,
                tempPkgCoverImage: state.tempPkgCoverImage,
                tempPkgGallery: state.tempPkgGallery || [],
                tempItinerary: state.tempItinerary || [],
                pkgEditorInitialSnapshot: state.pkgEditorInitialSnapshot
            };
            localStorage.setItem('ck_pkg_draft_v1', JSON.stringify(draft));
        }
    } catch (e) {}
};

window.clearPkgDraftFromLocalStorage = function() {
    try {
        localStorage.removeItem('ck_pkg_draft_v1');
    } catch (e) {}
};

window.restorePkgDraftFromLocalStorage = function() {
    try {
        const raw = localStorage.getItem('ck_pkg_draft_v1');
        if (raw) {
            const draft = JSON.parse(raw);
            if (draft && (draft.tempItinerary || draft.editingPkg)) {
                state.editingPkg = draft.editingPkg;
                state.tempPkgCoverImage = draft.tempPkgCoverImage;
                state.tempPkgGallery = draft.tempPkgGallery || [];
                state.tempItinerary = draft.tempItinerary || [];
                if (draft.pkgEditorInitialSnapshot) state.pkgEditorInitialSnapshot = draft.pkgEditorInitialSnapshot;
                return true;
            }
        }
    } catch (e) {}
    return false;
};

window.syncPkgFormToState = function() {
    if (!state.showAddPkgModal) return;
    const current = getPkgEditorCurrentData();

    if (!state.editingPkg) {
        state.editingPkg = {
            id: null,
            name: current.name,
            price: current.price,
            category: current.category,
            duration: current.duration,
            dates: current.dates,
            shortDesc: current.shortDesc,
            showInHero: current.showInHero,
            isFeatured: current.isFeatured,
            isTrending: current.isTrending,
            isNew: current.isNew,
            isSoldOut: current.isSoldOut,
            isUpcoming: current.isUpcoming,
            coverImage: current.coverImage,
            packageGallery: current.packageGallery,
            itinerary: current.itinerary
        };
    } else {
        state.editingPkg.name = current.name;
        state.editingPkg.price = current.price;
        state.editingPkg.category = current.category;
        state.editingPkg.duration = current.duration;
        state.editingPkg.dates = current.dates;
        state.editingPkg.shortDesc = current.shortDesc;
        state.editingPkg.showInHero = current.showInHero;
        state.editingPkg.isFeatured = current.isFeatured;
        state.editingPkg.isTrending = current.isTrending;
        state.editingPkg.isNew = current.isNew;
        state.editingPkg.isSoldOut = current.isSoldOut;
        state.editingPkg.isUpcoming = current.isUpcoming;
        state.editingPkg.coverImage = current.coverImage;
        state.editingPkg.packageGallery = current.packageGallery;
        state.editingPkg.itinerary = current.itinerary;
    }

    state.tempPkgCoverImage = current.coverImage;
    state.tempPkgGallery = current.packageGallery;
    state.tempItinerary = current.itinerary;

    window.savePkgDraftToLocalStorage();
};

window.addItineraryDay = function() {
    window.syncPkgFormToState();
    state.tempItinerary = state.tempItinerary || [];
    const nextDayNum = state.tempItinerary.length + 1;
    state.tempItinerary.push({
        day: nextDayNum,
        title: `Day ${nextDayNum}: Sightseeing & Travel`,
        description: '',
        hotel: '',
        meal: '',
        transport: '',
        icon: 'fa-route',
        image: '',
        collapsed: false
    });
    if (state.editingPkg) state.editingPkg.itinerary = [...state.tempItinerary];
    window.savePkgDraftToLocalStorage();
    if (window.renderApp) window.renderApp();
};

window.deleteItineraryDay = function(idx) {
    window.syncPkgFormToState();
    if (state.tempItinerary && state.tempItinerary.length > idx) {
        state.tempItinerary.splice(idx, 1);
        state.tempItinerary.forEach((item, dIdx) => {
            item.day = dIdx + 1;
        });
        if (state.editingPkg) state.editingPkg.itinerary = [...state.tempItinerary];
        window.savePkgDraftToLocalStorage();
        if (window.renderApp) window.renderApp();
    }
};

window.moveItineraryDay = function(idx, direction) {
    window.syncPkgFormToState();
    if (!state.tempItinerary) return;
    const newIdx = idx + direction;
    if (newIdx >= 0 && newIdx < state.tempItinerary.length) {
        const temp = state.tempItinerary[idx];
        state.tempItinerary[idx] = state.tempItinerary[newIdx];
        state.tempItinerary[newIdx] = temp;
        state.tempItinerary.forEach((item, dIdx) => {
            item.day = dIdx + 1;
        });
        if (state.editingPkg) state.editingPkg.itinerary = [...state.tempItinerary];
        window.savePkgDraftToLocalStorage();
        if (window.renderApp) window.renderApp();
    }
};

window.duplicateItineraryDay = function(idx) {
    window.syncPkgFormToState();
    if (!state.tempItinerary || !state.tempItinerary[idx]) return;
    const clone = JSON.parse(JSON.stringify(state.tempItinerary[idx]));
    clone.title = clone.title + ' (Copy)';
    state.tempItinerary.splice(idx + 1, 0, clone);
    state.tempItinerary.forEach((item, dIdx) => {
        item.day = dIdx + 1;
    });
    if (state.editingPkg) state.editingPkg.itinerary = [...state.tempItinerary];
    window.savePkgDraftToLocalStorage();
    if (window.renderApp) window.renderApp();
};

window.toggleCollapseItineraryDay = function(idx) {
    window.syncPkgFormToState();
    if (state.tempItinerary && state.tempItinerary[idx]) {
        state.tempItinerary[idx].collapsed = !state.tempItinerary[idx].collapsed;
        window.savePkgDraftToLocalStorage();
        if (window.renderApp) window.renderApp();
    }
};

window.updateItineraryField = function(idx, field, value) {
    if (state.tempItinerary && state.tempItinerary[idx]) {
        state.tempItinerary[idx][field] = value;
        if (state.editingPkg && state.editingPkg.itinerary && state.editingPkg.itinerary[idx]) {
            state.editingPkg.itinerary[idx][field] = value;
        }
        window.savePkgDraftToLocalStorage();
    }
};

let draggedItineraryIdx = null;

window.handleItineraryDragStart = function(e, idx) {
    draggedItineraryIdx = idx;
    if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
    }
};

window.handleItineraryDrop = function(e, targetIdx) {
    e.preventDefault();
    window.syncPkgFormToState();
    if (draggedItineraryIdx === null || draggedItineraryIdx === targetIdx) return;
    if (!state.tempItinerary) return;

    const [moved] = state.tempItinerary.splice(draggedItineraryIdx, 1);
    state.tempItinerary.splice(targetIdx, 0, moved);
    state.tempItinerary.forEach((item, dIdx) => {
        item.day = dIdx + 1;
    });
    if (state.editingPkg) state.editingPkg.itinerary = [...state.tempItinerary];

    draggedItineraryIdx = null;
    window.savePkgDraftToLocalStorage();
    if (window.renderApp) window.renderApp();
};

window.removePkgGalleryImage = function(index) {
    if (state.tempPkgGallery) {
        state.tempPkgGallery.splice(index, 1);
        if (window.renderApp) window.renderApp();
    }
};

window.openAddAlbumModal = function() {
    state.editingAlbum = null;
    state.tempAlbumCoverImage = undefined;
    state.tempAlbumPhotos = [];
    uploaderState.previews['album_cover'] = undefined;
    uploaderState.previews['album_photos_uploader'] = undefined;

    state.albumEditorInitialSnapshot = {
        isEdit: false,
        albumId: null,
        title: '',
        year: '2026',
        category: 'Char Dham',
        description: '',
        coverImage: '',
        photos: []
    };

    state.showAddAlbumModal = true;
    state.showDiscardAlbumConfirmModal = false;
    try {
        history.pushState({ albumModal: true }, '', location.href);
    } catch (e) {}

    if (window.renderApp) window.renderApp();
};

window.openEditAlbumModal = function(id) {
    const origAlb = (state.albums || []).find(a => a.id === id);
    state.editingAlbum = origAlb ? JSON.parse(JSON.stringify(origAlb)) : null;
    state.tempAlbumCoverImage = state.editingAlbum ? state.editingAlbum.coverImage : undefined;
    state.tempAlbumPhotos = state.editingAlbum ? JSON.parse(JSON.stringify(state.editingAlbum.photos || [])) : [];
    uploaderState.previews['album_cover'] = undefined;
    uploaderState.previews['album_photos_uploader'] = undefined;

    state.albumEditorInitialSnapshot = {
        isEdit: true,
        albumId: id,
        title: origAlb ? (origAlb.title || '') : '',
        year: origAlb ? (origAlb.year || '2026') : '2026',
        category: origAlb ? (origAlb.category || 'Char Dham') : 'Char Dham',
        description: origAlb ? (origAlb.description || '') : '',
        coverImage: origAlb ? (origAlb.coverImage || '') : '',
        photos: origAlb ? JSON.parse(JSON.stringify(origAlb.photos || [])) : []
    };

    state.showAddAlbumModal = true;
    state.showDiscardAlbumConfirmModal = false;
    try {
        history.pushState({ albumModal: true }, '', location.href);
    } catch (e) {}

    if (window.renderApp) window.renderApp();
};

window.removeAlbumPhoto = function(index) {
    if (state.tempAlbumPhotos) {
        state.tempAlbumPhotos.splice(index, 1);
        if (window.renderApp) window.renderApp();
    }
};

window.handleAddPkgSubmit = async function(e) {
    if (e) e.preventDefault();
    if (window.syncPkgFormToState) window.syncPkgFormToState();

    const submitBtn = document.querySelector('form button[type="submit"]') || (e && e.target ? e.target.querySelector('button[type="submit"]') : null);
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Save Package';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Saving Package...';
    }

    try {
        console.log('📦 Saving Package...');
        const nameEl = document.getElementById('np_name');
        const priceEl = document.getElementById('np_price');
        const durEl = document.getElementById('np_dur');
        const datesEl = document.getElementById('np_dates');
        const descEl = document.getElementById('np_desc');

        const name = nameEl ? nameEl.value.trim() : '';
        const priceRaw = priceEl ? priceEl.value : '';
        const price = Number(priceRaw);
        const cat = document.getElementById('np_cat') ? document.getElementById('np_cat').value : 'religious';
        const dur = durEl ? durEl.value.trim() : '';
        const dates = datesEl ? datesEl.value.trim() : '';
        const desc = descEl ? descEl.value.trim() : '';

        if (!name) throw new Error('Package Name is required.');
        if (!priceRaw || isNaN(price) || price < 0) throw new Error('A valid Package Price (₹) is required.');
        if (!dur) throw new Error('Package Duration is required.');
        if (!dates) throw new Error('Travel Dates are required.');
        if (!desc) throw new Error('Package Short Description is required.');

        const showInHero = document.getElementById('np_show_hero') ? document.getElementById('np_show_hero').checked : true;
        const isFeatured = document.getElementById('np_badge_featured') ? document.getElementById('np_badge_featured').checked : false;
        const isTrending = document.getElementById('np_badge_trending') ? document.getElementById('np_badge_trending').checked : false;
        const isNew = document.getElementById('np_badge_new') ? document.getElementById('np_badge_new').checked : false;
        const isSoldOut = document.getElementById('np_badge_soldout') ? document.getElementById('np_badge_soldout').checked : false;
        const isUpcoming = document.getElementById('np_badge_upcoming') ? document.getElementById('np_badge_upcoming').checked : false;

        let coverImg = 'images/himalayan_yatra.jpg';
        if (state.tempPkgCoverImage !== undefined && state.tempPkgCoverImage !== '') {
            coverImg = state.tempPkgCoverImage;
        } else if (state.editingPkg && state.editingPkg.coverImage) {
            coverImg = state.editingPkg.coverImage;
        }

        console.log('📸 Uploading Cover:', coverImg ? (coverImg.substring(0, 30) + '...') : 'Default');
        console.log('🖼️ Uploading Gallery:', (state.tempPkgGallery || []).length, 'images');

        const packageGallery = state.tempPkgGallery || [];
        const finalItinerary = (state.tempItinerary || []).map((item, dIdx) => ({
            day: dIdx + 1,
            title: item.title || `Day ${dIdx + 1}`,
            description: item.description || item.desc || '',
            hotel: item.hotel || '',
            meal: item.meal || '',
            transport: item.transport || '',
            icon: item.icon || 'fa-route',
            image: item.image || ''
        }));

        console.log('📅 Saving Itinerary:', finalItinerary.length, 'days');

        let targetPkg = null;
        if (state.editingPkg && state.editingPkg.id) {
            const existing = state.packages.find(p => p.id === state.editingPkg.id);
            targetPkg = existing ? { ...existing } : { id: state.editingPkg.id };
            targetPkg.name = name;
            targetPkg.slug = createSlug(name);
            targetPkg.showInHero = showInHero;
            targetPkg.price = price;
            targetPkg.originalPrice = targetPkg.originalPrice || (price + 3500);
            targetPkg.category = cat;
            targetPkg.duration = dur;
            targetPkg.dates = dates;
            targetPkg.destination = targetPkg.destination || name;
            targetPkg.coverImage = coverImg;
            targetPkg.packageGallery = packageGallery;
            targetPkg.itinerary = finalItinerary;
            targetPkg.shortDesc = desc;
            targetPkg.isFeatured = isFeatured;
            targetPkg.isTrending = isTrending;
            targetPkg.isNew = isNew;
            targetPkg.isSoldOut = isSoldOut;
            targetPkg.isUpcoming = isUpcoming;
            targetPkg.seatsLeft = isSoldOut ? 0 : (targetPkg.seatsLeft !== undefined ? targetPkg.seatsLeft : 15);
            targetPkg.status = isSoldOut ? 'full' : (targetPkg.seatsLeft === 0 ? 'full' : 'open');
        } else {
            const savedPkgId = 'pkg-' + Date.now();
            const newSlug = createSlug(name);
            targetPkg = {
                id: savedPkgId,
                name,
                slug: newSlug,
                showInHero,
                heroOrder: state.packages.length + 1,
                destination: name,
                coverImage: coverImg,
                packageGallery,
                price,
                originalPrice: price + 3500,
                duration: dur,
                dates,
                transport: 'AC Bus',
                hotelDetails: '3-Star Clean AC Hotels',
                meals: 'Pure Veg Meals Included',
                shortDesc: desc,
                includedServices: ['Travel', 'Hotel Stay', 'Pure Veg Meals'],
                excludedServices: ['Personal Expenses'],
                rules: ['Aadhaar Card Compulsory'],
                itinerary: finalItinerary,
                seatsLeft: isSoldOut ? 0 : 15,
                status: isSoldOut ? 'full' : 'open',
                visible: true,
                category: cat,
                isFeatured,
                isTrending,
                isNew,
                isSoldOut,
                isUpcoming
            };
        }

        await savePackageCloud(targetPkg);

        console.log('💾 Database Write Success');
        console.log('Package ID:', targetPkg.id);

        state.showAddPkgModal = false;
        state.showDiscardPkgConfirmModal = false;
        state.editingPkg = null;
        state.tempPkgCoverImage = undefined;
        state.tempPkgGallery = [];
        state.tempItinerary = [];
        state.pkgEditorInitialSnapshot = null;
        uploaderState.previews['pkg_cover'] = undefined;
        uploaderState.previews['pkg_gallery_uploader'] = undefined;
        window.clearPkgDraftFromLocalStorage();

        if (window.renderApp) window.renderApp();
        console.log('Save Complete');

        alert('✅ Package Saved Successfully');
    } catch (err) {
        console.error('❌ Save Error:', err.message || err);
        alert('❌ Failed to save package: ' + (err.message || 'Unknown error'));
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }
};

function getPkgEditorCurrentData() {
    const nameEl = document.getElementById('np_name');
    const priceEl = document.getElementById('np_price');
    const catEl = document.getElementById('np_cat');
    const durEl = document.getElementById('np_dur');
    const datesEl = document.getElementById('np_dates');
    const descEl = document.getElementById('np_desc');
    const showHeroEl = document.getElementById('np_show_hero');
    const featEl = document.getElementById('np_badge_featured');
    const trendEl = document.getElementById('np_badge_trending');
    const newEl = document.getElementById('np_badge_new');
    const soldEl = document.getElementById('np_badge_soldout');
    const upEl = document.getElementById('np_badge_upcoming');

    const name = nameEl ? nameEl.value : (state.editingPkg ? (state.editingPkg.name || '') : '');
    const priceRaw = priceEl ? priceEl.value : (state.editingPkg ? (state.editingPkg.price !== undefined ? state.editingPkg.price : '') : '');
    const price = priceRaw === '' ? '' : Number(priceRaw);
    const category = catEl ? catEl.value : (state.editingPkg ? (state.editingPkg.category || 'religious') : 'religious');
    const duration = durEl ? durEl.value : (state.editingPkg ? (state.editingPkg.duration || '') : '');
    const dates = datesEl ? datesEl.value : (state.editingPkg ? (state.editingPkg.dates || '') : '');
    const shortDesc = descEl ? descEl.value : (state.editingPkg ? (state.editingPkg.shortDesc || '') : '');
    const showInHero = showHeroEl ? showHeroEl.checked : (state.editingPkg ? (state.editingPkg.showInHero !== false) : true);
    const isFeatured = featEl ? featEl.checked : (state.editingPkg ? Boolean(state.editingPkg.isFeatured) : false);
    const isTrending = trendEl ? trendEl.checked : (state.editingPkg ? Boolean(state.editingPkg.isTrending) : false);
    const isNew = newEl ? newEl.checked : (state.editingPkg ? Boolean(state.editingPkg.isNew) : false);
    const isSoldOut = soldEl ? soldEl.checked : (state.editingPkg ? Boolean(state.editingPkg.isSoldOut) : false);
    const isUpcoming = upEl ? upEl.checked : (state.editingPkg ? Boolean(state.editingPkg.isUpcoming) : false);

    let coverImage = '';
    if (state.tempPkgCoverImage !== undefined) {
        coverImage = state.tempPkgCoverImage;
    } else if (state.editingPkg && state.editingPkg.coverImage) {
        coverImage = state.editingPkg.coverImage;
    }

    const packageGallery = state.tempPkgGallery !== undefined ? state.tempPkgGallery : (state.editingPkg ? (state.editingPkg.packageGallery || []) : []);
    const itinerary = state.tempItinerary !== undefined ? state.tempItinerary : [];

    return {
        name,
        price,
        category,
        duration,
        dates,
        shortDesc,
        showInHero,
        isFeatured,
        isTrending,
        isNew,
        isSoldOut,
        isUpcoming,
        coverImage,
        packageGallery: [...packageGallery],
        itinerary: itinerary.map(item => ({ ...item }))
    };
}

function normalizeItinList(list) {
    if (!Array.isArray(list)) return [];
    return list.map((item, idx) => ({
        day: idx + 1,
        title: (item.title || '').trim(),
        description: (item.description || item.desc || '').trim(),
        hotel: (item.hotel || '').trim(),
        meal: (item.meal || '').trim(),
        transport: (item.transport || '').trim(),
        icon: (item.icon || 'fa-route').trim(),
        image: (item.image || '').trim()
    }));
}

window.hasPkgEditorUnsavedChanges = function() {
    if (!state.showAddPkgModal) return false;
    const initial = state.pkgEditorInitialSnapshot;
    if (!initial) return false;

    const current = getPkgEditorCurrentData();

    if (!initial.isEdit) {
        if ((current.name || '').trim() !== '') return true;
        if (current.price !== '' && current.price !== 0 && !isNaN(current.price)) return true;
        if (current.category !== 'religious') return true;
        if ((current.duration || '').trim() !== '') return true;
        if ((current.dates || '').trim() !== '') return true;
        if ((current.shortDesc || '').trim() !== '') return true;
        if ((current.coverImage || '').trim() !== '') return true;
        if (current.packageGallery && current.packageGallery.length > 0) return true;
        if (current.showInHero !== true) return true;
        if (current.isFeatured || current.isTrending || current.isNew || current.isSoldOut || current.isUpcoming) return true;
        
        const currentItin = normalizeItinList(current.itinerary);
        const initialItin = normalizeItinList(initial.itinerary);
        if (JSON.stringify(currentItin) !== JSON.stringify(initialItin)) return true;

        return false;
    } else {
        if ((current.name || '').trim() !== (initial.name || '').trim()) return true;
        if (String(current.price !== undefined && current.price !== null ? current.price : '') !== String(initial.price !== undefined && initial.price !== null ? initial.price : '')) return true;
        if (current.category !== initial.category) return true;
        if ((current.duration || '').trim() !== (initial.duration || '').trim()) return true;
        if ((current.dates || '').trim() !== (initial.dates || '').trim()) return true;
        if ((current.shortDesc || '').trim() !== (initial.shortDesc || '').trim()) return true;
        if (Boolean(current.showInHero) !== Boolean(initial.showInHero)) return true;
        if (Boolean(current.isFeatured) !== Boolean(initial.isFeatured)) return true;
        if (Boolean(current.isTrending) !== Boolean(initial.isTrending)) return true;
        if (Boolean(current.isNew) !== Boolean(initial.isNew)) return true;
        if (Boolean(current.isSoldOut) !== Boolean(initial.isSoldOut)) return true;
        if (Boolean(current.isUpcoming) !== Boolean(initial.isUpcoming)) return true;
        if ((current.coverImage || '').trim() !== (initial.coverImage || '').trim()) return true;
        
        if (JSON.stringify(current.packageGallery || []) !== JSON.stringify(initial.packageGallery || [])) return true;

        const currentItin = normalizeItinList(current.itinerary);
        const initialItin = normalizeItinList(initial.itinerary);
        if (JSON.stringify(currentItin) !== JSON.stringify(initialItin)) return true;

        return false;
    }
};

window.handlePkgEditorCancel = function() {
    if (window.hasPkgEditorUnsavedChanges && window.hasPkgEditorUnsavedChanges()) {
        state.showDiscardPkgConfirmModal = true;
        if (window.renderApp) window.renderApp();
    } else {
        window.confirmDiscardPkgChanges();
    }
};

window.continuePkgEditing = function() {
    state.showDiscardPkgConfirmModal = false;
    if (window.renderApp) window.renderApp();
};

window.confirmDiscardPkgChanges = function() {
    state.showAddPkgModal = false;
    state.showDiscardPkgConfirmModal = false;
    state.editingPkg = null;
    state.tempPkgCoverImage = undefined;
    state.tempPkgGallery = [];
    state.tempItinerary = [];
    state.pkgEditorInitialSnapshot = null;
    uploaderState.previews['pkg_cover'] = undefined;
    uploaderState.previews['pkg_gallery_uploader'] = undefined;
    window.clearPkgDraftFromLocalStorage();
    if (window.renderApp) window.renderApp();
};

window.openAdminLoginModal = function() {
    state.showLoginModal = true;
    state.loginErrorMessage = '';
    document.body.style.overflow = 'hidden';
    if (window.renderApp) window.renderApp();
};

window.closeAdminLoginModal = function(e) {
    if (e && e.target && e.target !== e.currentTarget && e.target.closest('#admin-login-modal-card') && !e.target.closest('#admin-login-close-btn') && !e.target.closest('#admin-login-cancel-btn')) {
        return;
    }
    state.showLoginModal = false;
    state.loginErrorMessage = '';
    document.body.style.overflow = '';
    if (window.renderApp) window.renderApp();
};

if (!window._pkgEditorListenersAttached) {
    window._pkgEditorListenersAttached = true;

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (state.showLoginModal) {
                e.preventDefault();
                window.closeAdminLoginModal();
            } else if (state.showDiscardPkgConfirmModal) {
                e.preventDefault();
                window.continuePkgEditing();
            } else if (state.showAddPkgModal) {
                e.preventDefault();
                window.handlePkgEditorCancel();
            } else if (state.showDiscardAlbumConfirmModal) {
                e.preventDefault();
                window.continueAlbumEditing();
            } else if (state.showAddAlbumModal) {
                e.preventDefault();
                window.handleAlbumEditorCancel();
            } else if (state.selectedPkg) {
                e.preventDefault();
                window.closeDetail();
            }
        }
    });

    window.addEventListener('beforeunload', (e) => {
        if ((state.showAddPkgModal && window.hasPkgEditorUnsavedChanges && window.hasPkgEditorUnsavedChanges()) ||
            (state.showAddAlbumModal && window.hasAlbumEditorUnsavedChanges && window.hasAlbumEditorUnsavedChanges())) {
            const warningMsg = '⚠️ You have unsaved changes. Leave anyway?';
            e.preventDefault();
            e.returnValue = warningMsg;
            return warningMsg;
        }
    });

    window.addEventListener('popstate', () => {
        if (state.showAddAlbumModal && window.hasAlbumEditorUnsavedChanges && window.hasAlbumEditorUnsavedChanges()) {
            try {
                history.pushState({ albumModal: true }, '', location.href);
            } catch(e) {}
            window.handleAlbumEditorCancel();
        } else if (state.showAddAlbumModal) {
            window.confirmDiscardAlbumChanges();
        } else if (state.showAddPkgModal && window.hasPkgEditorUnsavedChanges && window.hasPkgEditorUnsavedChanges()) {
            try {
                history.pushState({ pkgModal: true }, '', location.href);
            } catch(e) {}
            window.handlePkgEditorCancel();
        } else if (state.showAddPkgModal) {
            window.confirmDiscardPkgChanges();
        }
    });
}

function getAlbumEditorCurrentData() {
    const titleEl = document.getElementById('alb_title');
    const yearEl = document.getElementById('alb_year');
    const catEl = document.getElementById('alb_cat');
    const descEl = document.getElementById('alb_desc');

    const title = titleEl ? titleEl.value : (state.editingAlbum ? (state.editingAlbum.title || '') : '');
    const year = yearEl ? yearEl.value : (state.editingAlbum ? (state.editingAlbum.year || '2026') : '2026');
    const category = catEl ? catEl.value : (state.editingAlbum ? (state.editingAlbum.category || 'Char Dham') : 'Char Dham');
    const description = descEl ? descEl.value : (state.editingAlbum ? (state.editingAlbum.description || '') : '');

    let coverImage = '';
    if (state.tempAlbumCoverImage !== undefined) {
        coverImage = state.tempAlbumCoverImage;
    } else if (state.editingAlbum && state.editingAlbum.coverImage) {
        coverImage = state.editingAlbum.coverImage;
    }

    const photos = state.tempAlbumPhotos !== undefined ? state.tempAlbumPhotos : (state.editingAlbum ? (state.editingAlbum.photos || []) : []);

    return {
        title,
        year,
        category,
        description,
        coverImage,
        photos: photos.map(p => ({ id: p.id, image: p.image, title: p.title || '' }))
    };
}

window.hasAlbumEditorUnsavedChanges = function() {
    if (!state.showAddAlbumModal) return false;
    const initial = state.albumEditorInitialSnapshot;
    if (!initial) return false;

    const current = getAlbumEditorCurrentData();

    if (!initial.isEdit) {
        if ((current.title || '').trim() !== '') return true;
        if (String(current.year).trim() !== '2026') return true;
        if ((current.category || '').trim() !== 'Char Dham') return true;
        if ((current.description || '').trim() !== '') return true;
        if ((current.coverImage || '').trim() !== '') return true;
        if (current.photos && current.photos.length > 0) return true;
        return false;
    } else {
        if ((current.title || '').trim() !== (initial.title || '').trim()) return true;
        if (String(current.year).trim() !== String(initial.year).trim()) return true;
        if ((current.category || '').trim() !== (initial.category || '').trim()) return true;
        if ((current.description || '').trim() !== (initial.description || '').trim()) return true;
        if ((current.coverImage || '').trim() !== (initial.coverImage || '').trim()) return true;
        
        if (JSON.stringify(current.photos || []) !== JSON.stringify(initial.photos || [])) return true;
        return false;
    }
};

window.handleAlbumEditorCancel = function() {
    if (window.hasAlbumEditorUnsavedChanges && window.hasAlbumEditorUnsavedChanges()) {
        state.showDiscardAlbumConfirmModal = true;
        if (window.renderApp) window.renderApp();
    } else {
        window.confirmDiscardAlbumChanges();
    }
};

window.continueAlbumEditing = function() {
    state.showDiscardAlbumConfirmModal = false;
    if (window.renderApp) window.renderApp();
};

window.confirmDiscardAlbumChanges = function() {
    state.showAddAlbumModal = false;
    state.showDiscardAlbumConfirmModal = false;
    state.editingAlbum = null;
    state.tempAlbumCoverImage = undefined;
    state.tempAlbumPhotos = [];
    state.albumEditorInitialSnapshot = null;
    uploaderState.previews['album_cover'] = undefined;
    uploaderState.previews['album_photos_uploader'] = undefined;
    if (window.renderApp) window.renderApp();
};

window.handleCreateAlbumSubmit = async function(e) {
    if (e) e.preventDefault();
    const title = document.getElementById('alb_title').value.trim();
    const yearVal = (document.getElementById('alb_year').value || '').trim();
    const cat = document.getElementById('alb_cat').value.trim();
    const desc = document.getElementById('alb_desc').value.trim();

    const year = yearVal || '2026';

    let coverImg = state.tempAlbumCoverImage || 'images/himalayan_yatra.jpg';
    if (!coverImg && state.tempAlbumPhotos && state.tempAlbumPhotos.length > 0) {
        coverImg = state.tempAlbumPhotos[0].image;
    }

    const photos = state.tempAlbumPhotos || [];

    let targetAlbum = null;
    if (state.editingAlbum) {
        const existing = (state.albums || []).find(a => a.id === state.editingAlbum.id);
        targetAlbum = existing ? { ...existing } : { id: state.editingAlbum.id };
        targetAlbum.title = title;
        targetAlbum.year = year;
        targetAlbum.category = cat;
        targetAlbum.description = desc;
        targetAlbum.coverImage = coverImg;
        targetAlbum.photos = photos;
    } else {
        targetAlbum = {
            id: 'alb-' + Date.now(),
            title,
            year,
            category: cat,
            description: desc,
            coverImage: coverImg,
            photos
        };
    }

    try {
        await saveAlbumCloud(targetAlbum);
        state.showAddAlbumModal = false;
        state.showDiscardAlbumConfirmModal = false;
        state.editingAlbum = null;
        state.tempAlbumCoverImage = undefined;
        state.tempAlbumPhotos = [];
        state.albumEditorInitialSnapshot = null;
        uploaderState.previews['album_cover'] = undefined;
        uploaderState.previews['album_photos_uploader'] = undefined;

        if (window.renderApp) window.renderApp();
        alert('✅ Album Saved Successfully');
    } catch (err) {
        alert('❌ Failed to save album: ' + (err.message || 'Unknown error'));
    }
};

window.handleAdminLogin = async function(e) {
    if (e) e.preventDefault();
    await handleAdminLogin(e);
    if (window.renderApp) window.renderApp();
};

window.openPrintablePdf = function(id) {
    openPrintablePdf(id, window.renderApp);
};

window.closePdfModal = function() {
    state.showPdfModal = null;
    if (window.renderApp) window.renderApp();
};

window.openDetail = function(idOrSlug) {
    if (!idOrSlug) return;
    const pkg = (state.packages || []).find(p => p.id === idOrSlug || p.slug === idOrSlug || (p.name && createSlug(p.name) === idOrSlug));
    if (pkg) {
        state.selectedPkg = pkg;
        state.activeAccordion = 'itinerary';
        if (window.renderApp) window.renderApp();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

window.closeDetail = function() {
    state.selectedPkg = null;
    if (window.renderApp) window.renderApp();
};

window.toggleAccordion = function(tabName) {
    state.activeAccordion = tabName;
    if (window.renderApp) window.renderApp();
};

window.prevHeroSlide = function() {
    const slides = getActiveHeroSlides();
    if (slides.length > 0) {
        state.activeHeroSlide = (state.activeHeroSlide - 1 + slides.length) % slides.length;
        if (window.renderApp) window.renderApp();
    }
};

window.nextHeroSlide = function() {
    const slides = getActiveHeroSlides();
    if (slides.length > 0) {
        state.activeHeroSlide = (state.activeHeroSlide + 1) % slides.length;
        if (window.renderApp) window.renderApp();
    }
};

window.openAlbumLightbox = function(albumId, index) {
    const album = (state.albums || []).find(a => a.id === albumId);
    if (album && album.photos && album.photos.length > 0) {
        state.lightboxPhotoList = album.photos;
        state.lightboxPhotoIndex = index || 0;
        state.activeLightboxPhoto = album.photos[state.lightboxPhotoIndex];
        if (window.renderApp) window.renderApp();
    }
};

window.openLightboxSingle = function(image, title) {
    if (!image) return;
    const photoObj = { image, title: title || 'Photo Preview' };
    state.lightboxPhotoList = [photoObj];
    state.lightboxPhotoIndex = 0;
    state.activeLightboxPhoto = photoObj;
    if (window.renderApp) window.renderApp();
};

window.closeLightbox = function() {
    state.activeLightboxPhoto = null;
    state.lightboxPhotoList = [];
    state.lightboxPhotoIndex = 0;
    if (window.renderApp) window.renderApp();
};

window.prevLightboxPhoto = function() {
    const list = state.lightboxPhotoList || [];
    if (list.length > 0) {
        state.lightboxPhotoIndex = (state.lightboxPhotoIndex - 1 + list.length) % list.length;
        state.activeLightboxPhoto = list[state.lightboxPhotoIndex];
        if (window.renderApp) window.renderApp();
    }
};

window.nextLightboxPhoto = function() {
    const list = state.lightboxPhotoList || [];
    if (list.length > 0) {
        state.lightboxPhotoIndex = (state.lightboxPhotoIndex + 1) % list.length;
        state.activeLightboxPhoto = list[state.lightboxPhotoIndex];
        if (window.renderApp) window.renderApp();
    }
};

window.toggleAddReviewModal = function() {
    state.showAddReviewModal = !state.showAddReviewModal;
    if (window.renderApp) window.renderApp();
};

window.handleChipWheelScroll = function(e) {
    if (!e.currentTarget) return;
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        e.currentTarget.scrollLeft += e.deltaY * 0.8;
    }
};

window.setGalleryFilter = function(type, value, btnEl) {
    if (type === 'category') {
        state.galleryDestFilter = value;
    } else if (type === 'year') {
        state.galleryYearFilter = value;
    }

    window.updateGalleryURLParams();

    if (btnEl && typeof btnEl.scrollIntoView === 'function') {
        try {
            btnEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } catch (e) {}
    }

    if (window.renderApp) window.renderApp();
};

window.clearGalleryFilters = function() {
    state.galleryDestFilter = 'all';
    state.galleryYearFilter = 'all';
    window.updateGalleryURLParams();
    if (window.renderApp) window.renderApp();
};

window.updateGalleryURLParams = function() {
    try {
        const url = new URL(window.location.href);
        if (state.galleryDestFilter && state.galleryDestFilter !== 'all') {
            url.searchParams.set('category', state.galleryDestFilter);
        } else {
            url.searchParams.delete('category');
        }

        if (state.galleryYearFilter && state.galleryYearFilter !== 'all') {
            url.searchParams.set('year', state.galleryYearFilter);
        } else {
            url.searchParams.delete('year');
        }

        window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch (e) {}
};

window.backToGallery = function(e) {
    if (e) e.preventDefault();

    state.activeLightboxPhoto = null;
    state.selectedAlbum = null;
    state.activeTab = 'gallery';

    if (window.location.hash !== '#gallery') {
        try {
            history.pushState(null, '', '#gallery');
        } catch (err) {
            window.location.hash = '#gallery';
        }
    }

    if (window.renderApp) window.renderApp();

    setTimeout(() => {
        const galleryEl = document.getElementById('gallery-main-section');
        if (galleryEl) {
            galleryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (state.galleryScrollPos !== undefined) {
            window.scrollTo({ top: state.galleryScrollPos, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 50);
};

window.syncRouteFromURL = function() {
    try {
        const url = new URL(window.location.href);
        const catParam = url.searchParams.get('category');
        const yearParam = url.searchParams.get('year');
        if (catParam) state.galleryDestFilter = catParam;
        if (yearParam) state.galleryYearFilter = yearParam;
    } catch (e) {}

    const hash = window.location.hash || '';
    const path = window.location.pathname || '';

    // 1. Album routing: #gallery/alb-1 or #album/alb-1
    const matchAlbumHash = hash.match(/#\/?(?:gallery|album)[\/-]([^\/]+)/i);
    const matchAlbumPath = path.match(/\/album\/([^\/]+)/i);
    const albumId = (matchAlbumHash && matchAlbumHash[1]) ? decodeURIComponent(matchAlbumHash[1]) : (matchAlbumPath && matchAlbumPath[1] ? decodeURIComponent(matchAlbumPath[1]) : null);

    if (albumId) {
        const alb = (state.albums || []).find(a => a.id === albumId || (a.title && createSlug(a.title) === albumId));
        if (alb) {
            state.activeTab = 'gallery';
            state.selectedAlbum = alb;
            return;
        }
    }

    // 2. Main Gallery route: #gallery
    if (hash === '#gallery' || hash === '#/gallery' || path.endsWith('/gallery')) {
        state.activeTab = 'gallery';
        state.selectedAlbum = null;
        return;
    }

    // 3. Package routing: #package/pkg-1
    let targetIdentifier = null;
    const matchPkgPath = path.match(/\/package\/([^\/]+)/i);
    const matchPkgHash = hash.match(/#\/?package[\/-]([^\/]+)/i);

    if (matchPkgPath && matchPkgPath[1]) {
        targetIdentifier = decodeURIComponent(matchPkgPath[1]);
    } else if (matchPkgHash && matchPkgHash[1]) {
        targetIdentifier = decodeURIComponent(matchPkgHash[1]);
    }

    if (targetIdentifier) {
        const pkg = (state.packages || []).find(p =>
            p.id === targetIdentifier ||
            p.slug === targetIdentifier ||
            (p.name && createSlug(p.name) === targetIdentifier)
        );
        if (pkg) {
            state.selectedPkg = pkg;
            state.activeAccordion = 'itinerary';
            return;
        }
    }

    // 4. Standard tab routing: #packages, #about, #contact, #home
    const tabMatch = hash.match(/#\/?(home|packages|gallery|about|contact|admin)/i);
    if (tabMatch && tabMatch[1]) {
        state.activeTab = tabMatch[1].toLowerCase();
        if (state.activeTab !== 'gallery') {
            state.selectedAlbum = null;
        }
    }
};

window.sendWhatsAppEnquiry = function({ name, phone, tourPackage, message }) {
    const rawPhone = (state.settings && (state.settings.whatsapp || state.settings.phone))
        ? (state.settings.whatsapp || state.settings.phone).replace(/\D/g, '')
        : '9960833090';

    const targetPhone = rawPhone.length === 10 ? ('91' + rawPhone) : rawPhone;

    const msgLines = [
        '🙏 Namaskar Chandrakailash Tours,',
        '',
        'I would like to enquire about the following tour.',
        '',
        `👤 Name: ${name}`,
        '',
        `📱 Mobile: ${phone}`,
        '',
        `🚌 Tour Package: ${tourPackage}`,
        '',
        '📝 Message:',
        message || 'No additional message.',
        '',
        'Please share the complete itinerary, pricing, booking process, and available dates.',
        '',
        'Thank you.'
    ];

    const messageText = msgLines.join('\n');
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
};

window.handleContactSubmit = function(e) {
    if (e) e.preventDefault();

    const nameEl = document.getElementById('cnt_name');
    const phoneEl = document.getElementById('cnt_phone');
    const pkgEl = document.getElementById('cnt_pkg');
    const msgEl = document.getElementById('cnt_msg');

    const name = nameEl ? nameEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const tourPackage = pkgEl ? pkgEl.value.trim() : '';
    const message = msgEl ? msgEl.value.trim() : '';

    if (!name) {
        alert('Please enter your Full Name.');
        if (nameEl) nameEl.focus();
        return;
    }
    if (!phone) {
        alert('Please enter your Mobile / WhatsApp Number.');
        if (phoneEl) phoneEl.focus();
        return;
    }
    if (!tourPackage) {
        alert('Please select a Tour Package.');
        if (pkgEl) pkgEl.focus();
        return;
    }

    // Direct WhatsApp enquiry without saving to Admin Panel or Database
    window.sendWhatsAppEnquiry({ name, phone, tourPackage, message });
};
