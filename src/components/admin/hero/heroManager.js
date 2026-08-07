/* चंद्रकैलाश Tours & Travels - Hero Slider Manager Component */

import { state } from '../../../context/state.js';
import { savePackageCloud } from '../../../services/storage.js';

export function renderHeroManager() {
    const totalActive = (state.packages || []).filter(p => p.showInHero !== false).length;
    const totalPackages = state.packages.length;

    const filteredPackages = (state.packages || [])
        .filter(p => {
            const q = (state.heroSearchQuery || '').toLowerCase();
            return !q || p.name.toLowerCase().includes(q) || p.destination.toLowerCase().includes(q);
        })
        .sort((a, b) => (a.heroOrder || 999) - (b.heroOrder || 999));

    return `
        <div class="bg-white p-4 sm:p-6 md:p-8 rounded-[20px] shadow-sm border border-slate-200 space-y-6 w-full max-w-5xl mx-auto admin-container">
            <!-- HEADER -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
                <div>
                    <h3 class="text-xl md:text-2xl font-extrabold text-navy-900 flex items-center gap-2">
                        <span>🏞️</span> Homepage Hero Slider Manager
                    </h3>
                    <p class="text-xs md:text-sm text-slate-500 mt-1">Directly syncs from Tour Packages. Drag handle to reorder, or toggle to hide/show packages on the Hero Slider.</p>
                </div>
                <div class="text-xs md:text-sm font-bold bg-saffron-50 border border-saffron-200 text-saffron-700 px-4 py-2 rounded-xl flex items-center gap-2 shadow-xs shrink-0">
                    <span>⭐ ${totalActive} / ${totalPackages} Active Hero Slides</span>
                </div>
            </div>

            <!-- SEARCH BAR (STICKY TOP FULL WIDTH) -->
            <div class="sticky top-0 z-10 bg-white/95 backdrop-blur-sm pb-2 pt-1 border-b border-slate-100">
                <div class="relative w-full">
                    <input 
                        type="text" 
                        id="hero_search_query"
                        value="${state.heroSearchQuery || ''}"
                        oninput="window.handleHeroSearch(this.value)"
                        placeholder="Search tour packages by title or destination..." 
                        class="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500 transition shadow-inner min-h-[48px]"
                    />
                    <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"></i>
                </div>
            </div>

            <!-- PACKAGES SLIDER REORDER & TOGGLE LIST -->
            <div class="space-y-4" id="hero-sortable-container">
                ${filteredPackages.length === 0 ? `
                    <div class="text-center py-14 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-400 text-sm">
                        <i class="fa-solid fa-compass text-4xl mb-3 text-slate-300"></i>
                        <p class="font-semibold">No matching packages found for "${state.heroSearchQuery}".</p>
                    </div>
                ` : filteredPackages.map((p, idx, arr) => {
                    const isHeroOn = p.showInHero !== false;
                    return `
                    <div 
                        class="bg-white border border-slate-200 rounded-[16px] p-4 sm:p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col md:flex-row items-center justify-between gap-4 w-full box-border relative group"
                        draggable="true" 
                        ondragstart="window.handleHeroDragStart(event, '${p.id}')"
                        ondragover="window.handleHeroDragOver(event)"
                        ondrop="window.handleHeroDrop(event, '${p.id}')"
                    >
                        <!-- LEFT / MAIN SECTION: DRAG HANDLE + THUMBNAIL IMAGE + DETAILS -->
                        <div class="flex flex-col sm:flex-row items-center sm:items-center gap-4 w-full md:w-auto flex-1 min-w-0">
                            
                            <!-- DRAG GRIP & INDEX BADGE -->
                            <div class="flex items-center gap-2 shrink-0 self-start sm:self-center">
                                <div 
                                    class="cursor-grab active:cursor-grabbing text-slate-400 hover:text-saffron-500 p-2 rounded-lg hover:bg-saffron-50 transition min-w-[44px] min-h-[44px] flex items-center justify-center select-none"
                                    title="Drag to reorder slide"
                                >
                                    <i class="fa-solid fa-grip-vertical text-lg"></i>
                                </div>
                                <span class="text-xs font-mono font-extrabold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
                                    #${idx + 1}
                                </span>
                            </div>

                            <!-- THUMBNAIL IMAGE (110x75 px on desktop) -->
                            <div class="w-full sm:w-[110px] h-36 sm:h-[75px] rounded-[12px] overflow-hidden bg-slate-900 border border-slate-200 shrink-0 relative shadow-xs">
                                <img 
                                    src="${p.coverImage || 'images/himalayan_yatra.jpg'}" 
                                    alt="${p.name}" 
                                    class="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                                />
                            </div>

                            <!-- PACKAGE DETAILS -->
                            <div class="space-y-1 text-center sm:text-left flex-1 min-w-0 w-full">
                                <h4 class="font-bold text-navy-900 text-sm md:text-base break-words line-clamp-2 md:line-clamp-1 group-hover:text-saffron-600 transition" title="${p.name}">
                                    ${p.name}
                                </h4>
                                <div class="text-xs text-slate-500 font-medium">
                                    📍 ${p.destination}
                                </div>
                                <div class="flex items-center justify-center sm:justify-start gap-2 text-xs flex-wrap pt-0.5">
                                    <span class="font-extrabold text-saffron-600">₹${p.price ? p.price.toLocaleString() : 0}</span>
                                    <span class="text-slate-300">•</span>
                                    <span class="font-medium text-slate-600">⏱️ ${p.duration || 'N/A'}</span>
                                    ${p.dates ? `<span class="text-slate-300">•</span><span class="text-slate-500">📅 ${p.dates}</span>` : ''}
                                </div>
                            </div>
                        </div>

                        <!-- RIGHT SECTION: HERO TOGGLE + COMPACT MOVE BUTTONS -->
                        <div class="flex items-center justify-between sm:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 shrink-0">
                            
                            <!-- MODERN iOS-STYLE HERO TOGGLE SWITCH -->
                            <div class="flex items-center gap-2.5">
                                <span class="text-xs font-bold ${isHeroOn ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-slate-500 bg-slate-100 border border-slate-200'} px-2.5 py-1 rounded-full whitespace-nowrap shadow-2xs">
                                    ${isHeroOn ? '⭐ Hero ON' : 'Hero OFF'}
                                </span>

                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked="${isHeroOn}"
                                    onclick="window.togglePackageHeroDisplay('${p.id}')"
                                    class="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:ring-offset-2 ${isHeroOn ? 'bg-emerald-500' : 'bg-slate-300'}"
                                    title="${isHeroOn ? 'Turn Off Hero Slide' : 'Turn On Hero Slide'}"
                                >
                                    <span class="sr-only">Toggle Hero Slide</span>
                                    <span
                                        class="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${isHeroOn ? 'translate-x-5' : 'translate-x-0'}"
                                    ></span>
                                </button>
                            </div>

                            <!-- COMPACT MOVE UP / DOWN BUTTONS (40x40 px, 44px min touch target) -->
                            <div class="flex items-center gap-1.5">
                                <button 
                                    type="button"
                                    onclick="window.moveHeroPackageOrder('${p.id}', -1)" 
                                    ${idx === 0 ? 'disabled' : ''}
                                    class="w-10 h-10 min-w-[44px] min-h-[44px] rounded-xl border flex items-center justify-center text-sm font-bold transition-all duration-150 ${idx === 0 ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed opacity-50' : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-navy-900 hover:scale-105 active:scale-95 shadow-2xs'}"
                                    title="Move Up"
                                    aria-label="Move Up"
                                >
                                    <i class="fa-solid fa-arrow-up text-xs"></i>
                                </button>
                                <button 
                                    type="button"
                                    onclick="window.moveHeroPackageOrder('${p.id}', 1)" 
                                    ${idx === arr.length - 1 ? 'disabled' : ''}
                                    class="w-10 h-10 min-w-[44px] min-h-[44px] rounded-xl border flex items-center justify-center text-sm font-bold transition-all duration-150 ${idx === arr.length - 1 ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed opacity-50' : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-navy-900 hover:scale-105 active:scale-95 shadow-2xs'}"
                                    title="Move Down"
                                    aria-label="Move Down"
                                >
                                    <i class="fa-solid fa-arrow-down text-xs"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// Global Event Handlers for Hero Manager
window.handleHeroSearch = function(val) {
    state.heroSearchQuery = val;
    if (window.renderApp) window.renderApp();
};

window.togglePackageHeroDisplay = async function(id) {
    const pkg = state.packages.find(p => p.id === id);
    if (pkg) {
        pkg.showInHero = !(pkg.showInHero !== false);
        try {
            await savePackageCloud(pkg);
            if (window.renderApp) window.renderApp();
        } catch (e) {
            alert('❌ Failed to update hero status: ' + (e.message || 'Unknown error'));
        }
    }
};

window.moveHeroPackageOrder = async function(id, direction) {
    const sorted = [...state.packages].sort((a, b) => (a.heroOrder || 999) - (b.heroOrder || 999));
    const index = sorted.findIndex(p => p.id === id);
    if (index === -1) return;

    if (direction === 'up' && index > 0) {
        const prev = sorted[index - 1];
        const curr = sorted[index];
        const tempOrder = curr.heroOrder || (index + 1);
        curr.heroOrder = prev.heroOrder || index;
        prev.heroOrder = tempOrder;
        try {
            await Promise.all([savePackageCloud(curr), savePackageCloud(prev)]);
            if (window.renderApp) window.renderApp();
        } catch (e) {
            alert('❌ Failed to update hero order: ' + (e.message || 'Unknown error'));
        }
    } else if (direction === 'down' && index < sorted.length - 1) {
        const next = sorted[index + 1];
        const curr = sorted[index];
        const tempOrder = curr.heroOrder || (index + 1);
        curr.heroOrder = next.heroOrder || (index + 2);
        next.heroOrder = tempOrder;
        try {
            await Promise.all([savePackageCloud(curr), savePackageCloud(next)]);
            if (window.renderApp) window.renderApp();
        } catch (e) {
            alert('❌ Failed to update hero order: ' + (e.message || 'Unknown error'));
        }
    }
};

let draggedHeroId = null;

window.handleHeroDragStart = function(e, id) {
    draggedHeroId = id;
    e.dataTransfer.effectAllowed = 'move';
};

window.handleHeroDragOver = function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
};

window.handleHeroDrop = function(e, targetId) {
    e.preventDefault();
    if (!draggedHeroId || draggedHeroId === targetId) return;

    const sorted = [...state.packages].sort((a, b) => (a.heroOrder || 999) - (b.heroOrder || 999));
    const draggedIdx = sorted.findIndex(p => p.id === draggedHeroId);
    const targetIdx = sorted.findIndex(p => p.id === targetId);

    if (draggedIdx !== -1 && targetIdx !== -1) {
        const item = sorted.splice(draggedIdx, 1)[0];
        sorted.splice(targetIdx, 0, item);
        sorted.forEach((p, idx) => { p.heroOrder = idx + 1; });
        saveStore(window.renderApp);
    }
    draggedHeroId = null;
};
