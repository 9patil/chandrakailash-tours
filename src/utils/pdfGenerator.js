/* चंद्रकैलाश Tours & Travels - Printable PDF Itinerary Generator */

import { state } from '../context/state.js';
import { getInstagramUrl } from './helpers.js';

export function openPrintablePdf(id, renderCallback) {
    state.showPdfModal = state.packages.find(p => p.id === id || p.slug === id);
    if (renderCallback && typeof renderCallback === 'function') {
        renderCallback();
    }
}

export function renderPrintableItineraryModal() {
    if (!state.showPdfModal) return '';

    const pkg = state.showPdfModal;
    const cleanInsta = (state.settings.instagram || 'chandrakailash_tours').replace('@', '').trim();
    const waLink = `https://wa.me/${state.settings.whatsapp || '919960833090'}`;
    const instaLink = getInstagramUrl();
    const itineraryList = pkg.itinerary || [];

    return `
        <div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 overflow-y-auto" id="printable-modal-overlay">
            <div class="bg-white rounded-3xl max-w-4xl w-full max-h-[96vh] overflow-y-auto shadow-2xl relative my-auto p-6 md:p-8 space-y-5 font-sans text-navy-950 border border-slate-200" id="printable-itinerary-modal">
                
                <!-- ACTION BUTTONS (HIDDEN IN PRINT) -->
                <div class="flex justify-between items-center border-b border-slate-100 pb-3 no-print">
                    <div class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                        <span class="font-bold text-navy-900 text-xs uppercase tracking-wider">Luxury Travel Itinerary Brochure (${itineraryList.length} Days)</span>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="window.print()" class="btn-premium btn-glow-green bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2 rounded-xl shadow flex items-center gap-1.5 transition">
                            <i class="fa-solid fa-print"></i> Print / Save PDF
                        </button>
                        <button onclick="window.closePdfModal()" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl border transition">
                            Close
                        </button>
                    </div>
                </div>

                <!-- BROCHURE HEADER -->
                <div class="flex flex-col md:flex-row justify-between items-center border-b-2 border-saffron-500 pb-4 gap-4 pdf-itinerary-card" style="break-inside: avoid; page-break-inside: avoid;">
                    <div class="text-center md:text-left space-y-1">
                        <h1 class="text-3xl md:text-4xl font-extrabold font-marathi-calligraphy text-navy-900 tracking-tight leading-none">
                            ${state.settings.brandMarathi || 'चंद्रकैलाश'}
                        </h1>
                        <div class="text-[11px] font-black tracking-[0.25em] uppercase text-saffron-500">
                            ${state.settings.brandEnglish || 'TOURS & TRAVELS'}
                        </div>
                    </div>

                    <div class="flex flex-wrap items-center justify-center md:justify-end gap-3 text-xs">
                        <a href="tel:+91${state.settings.phone}" class="bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 font-bold text-navy-900 flex items-center gap-1.5 transition">
                            <i class="fa-solid fa-phone text-saffron-500"></i> +91 ${state.settings.phone}
                        </a>
                        <a href="${waLink}" target="_blank" class="bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 font-bold text-emerald-800 flex items-center gap-1.5 transition">
                            <i class="fa-brands fa-whatsapp text-emerald-600 text-sm"></i> WhatsApp Chat
                        </a>
                        <a href="${instaLink}" target="_blank" class="bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-xl border border-pink-200 font-bold text-pink-800 flex items-center gap-1.5 transition">
                            <i class="fa-brands fa-instagram text-pink-600 text-sm"></i> ${cleanInsta}
                        </a>
                    </div>
                </div>

                <!-- PACKAGE HERO BANNER & SUMMARY -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 items-center pdf-itinerary-card" style="break-inside: avoid; page-break-inside: avoid;">
                    <div class="md:col-span-5 h-44 rounded-xl overflow-hidden shadow-sm relative bg-slate-900">
                        <img src="${pkg.coverImage}" alt="${pkg.name}" class="w-full h-full object-cover" />
                        <span class="absolute top-2 left-2 badge-featured text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow">
                            📍 ${(pkg.category || 'religious').toUpperCase()}
                        </span>
                    </div>

                    <div class="md:col-span-7 space-y-2 text-xs">
                        <h2 class="text-2xl font-extrabold text-navy-900 leading-tight">${pkg.name}</h2>
                        <p class="text-slate-600 font-medium text-[11px]">📍 Destination: <strong>${pkg.destination}</strong></p>
                        
                        <div class="grid grid-cols-2 gap-2 text-[11px] pt-1">
                            <div class="bg-white p-2 rounded-lg border">⏱️ Duration: <strong>${pkg.duration}</strong></div>
                            <div class="bg-white p-2 rounded-lg border">📅 Dates: <strong>${pkg.dates}</strong></div>
                            <div class="bg-white p-2 rounded-lg border">🚌 Transport: <strong>${pkg.transport}</strong></div>
                            <div class="bg-white p-2 rounded-lg border">🏨 Hotel: <strong>${pkg.hotelDetails || '3-Star AC Stay'}</strong></div>
                        </div>

                        <div class="flex items-center justify-between pt-1 border-t border-slate-200">
                            <span class="text-slate-500 font-bold">Package Price Per Person:</span>
                            <span class="text-2xl font-extrabold text-saffron-600">₹${pkg.price.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <!-- TIMELINE DAY-WISE ITINERARY -->
                <div class="space-y-3 pt-2">
                    <h3 class="font-extrabold text-navy-900 text-xs uppercase tracking-wider border-b pb-1 flex items-center justify-between">
                        <span class="flex items-center gap-1.5"><i class="fa-solid fa-route text-saffron-500"></i> Day-Wise Complete Travel Itinerary</span>
                        <span class="text-saffron-600 font-bold">${itineraryList.length} Days Plan</span>
                    </h3>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-[11px]">
                        ${itineraryList.map(i => `
                            <div class="pdf-itinerary-card bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-2" style="break-inside: avoid; page-break-inside: avoid; -webkit-column-break-inside: avoid;">
                                <div class="flex justify-between items-center gap-2">
                                    <span class="bg-saffron-500 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full inline-block">Day ${i.day}</span>
                                    <span class="font-bold text-navy-900 text-xs line-clamp-1">${i.title}</span>
                                </div>
                                <p class="text-slate-600 text-[11px] whitespace-pre-line leading-relaxed font-marathi-body">${i.description || i.desc || ''}</p>
                                
                                ${(i.hotel || i.meal || i.transport) ? `
                                    <div class="flex flex-wrap gap-1 text-[9px] pt-1.5 border-t border-slate-100">
                                        ${i.hotel ? `<span class="bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded">🏨 ${i.hotel}</span>` : ''}
                                        ${i.meal ? `<span class="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">🍽️ ${i.meal}</span>` : ''}
                                        ${i.transport ? `<span class="bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded">🚌 ${i.transport}</span>` : ''}
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- FOOTER WITH QR CODE -->
                <div class="border-t-2 border-saffron-500 pt-3 flex justify-between items-center text-xs pdf-itinerary-card" style="break-inside: avoid; page-break-inside: avoid;">
                    <div class="space-y-1">
                        <div class="font-extrabold text-navy-900 text-sm">${state.settings.companyName}</div>
                        <div class="flex items-center gap-3 text-[11px] text-slate-600">
                            <span>📞 +91 ${state.settings.phone}</span>
                            <span>•</span>
                            <a href="${waLink}" target="_blank" class="text-emerald-700 font-bold hover:underline">💬 WhatsApp</a>
                            <span>•</span>
                            <a href="${instaLink}" target="_blank" class="text-pink-700 font-bold hover:underline">📷 ${cleanInsta}</a>
                        </div>
                        <p class="text-[10px] text-saffron-600 font-bold italic pt-0.5">
                            "Thank You for Choosing Chandrakailash Tours & Travels"
                        </p>
                    </div>

                    <div class="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border">
                        <div class="text-[9px] text-right font-bold text-slate-500 leading-tight">
                            <div>Scan QR to</div>
                            <div class="text-emerald-600 font-extrabold">Book on WhatsApp</div>
                        </div>
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(waLink)}" alt="WhatsApp QR Code" class="w-12 h-12 rounded-lg border border-slate-300 shadow-sm" />
                    </div>
                </div>

            </div>
        </div>
    `;
}
