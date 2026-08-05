/* चंद्रकैलाश Tours & Travels - Packages Manager Component */

import { state } from '../../../context/state.js';
import { saveStore } from '../../../services/storage.js';

export function renderPackagesManager() {
    const totalPkgs = state.packages.length;

    return `
        <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border space-y-6 admin-container">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-navy-900">📦 Tour Packages Manager (${totalPkgs} Packages)</h3>
                    <p class="text-xs text-slate-500 mt-1">Add, edit, duplicate, upload package cover & gallery, update prices and badges.</p>
                </div>
                <button onclick="window.openAddPkgModal()" class="btn-touch-48 bg-saffron-500 hover:bg-saffron-600 text-white shadow w-full sm:w-auto">
                    <i class="fa-solid fa-plus"></i> + Add New Tour Package
                </button>
            </div>

            <!-- DESKTOP TABLE VIEW (≥768px) -->
            <div class="desktop-table-only responsive-table-wrap">
                <table class="w-full text-left text-xs">
                    <thead class="bg-navy-900 text-white uppercase text-[11px]">
                        <tr>
                            <th class="p-3.5">Package Name</th>
                            <th class="p-3.5">Price (₹)</th>
                            <th class="p-3.5">Seats Left</th>
                            <th class="p-3.5">Badges & Status</th>
                            <th class="p-3.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y">
                        ${state.packages.map(p => `
                            <tr class="hover:bg-slate-50">
                                <td class="p-3.5 font-bold text-navy-950">
                                    <div class="flex items-center gap-3">
                                        <img src="${p.coverImage || 'images/himalayan_yatra.jpg'}" class="w-12 h-12 rounded-xl object-cover border" />
                                        <div>
                                            <div class="font-bold text-navy-900 text-sm">${p.name}</div>
                                            <div class="text-[11px] text-slate-400">📍 ${p.destination} • 🖼️ ${(p.packageGallery||[]).length} Photos</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="p-3.5 text-saffron-600 font-extrabold text-sm">₹${p.price ? p.price.toLocaleString() : 0}</td>
                                <td class="p-3.5">
                                    <input type="number" value="${p.seatsLeft !== undefined ? p.seatsLeft : 10}" onchange="window.updateSeats('${p.id}', this.value)" class="w-16 p-2 border rounded-xl text-center font-bold text-emerald-700 bg-emerald-50 focus:outline-none" />
                                </td>
                                <td class="p-3.5">
                                    <div class="flex flex-wrap gap-1.5">
                                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${p.status==='open'?'bg-emerald-100 text-emerald-800':'bg-rose-100 text-rose-800'}">${(p.status || 'open').toUpperCase()}</span>
                                        <button onclick="window.togglePackageHeroDisplay('${p.id}')" class="px-2.5 py-1 rounded-full text-[10px] font-bold transition ${p.showInHero !== false ? 'bg-saffron-100 text-saffron-800 border border-saffron-300' : 'bg-slate-100 text-slate-500'}" title="Toggle Homepage Hero Slider">
                                            ${p.showInHero !== false ? '⭐ HERO ON' : 'HERO OFF'}
                                        </button>
                                        ${p.isFeatured ? '<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">⭐ FEATURED</span>' : ''}
                                        ${p.isTrending ? '<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-pink-100 text-pink-800">🔥 TRENDING</span>' : ''}
                                        ${p.isNew ? '<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">✨ NEW</span>' : ''}
                                    </div>
                                </td>
                                <td class="p-3.5 text-right space-x-1.5">
                                    <button onclick="window.openPrintablePdf('${p.id}')" class="btn-touch-48 bg-slate-700 hover:bg-slate-800 text-white px-3 py-1.5 text-xs font-semibold" title="Printable Brochure PDF">PDF</button>
                                    <button onclick="window.openEditPkgModal('${p.id}')" class="btn-touch-48 bg-navy-800 hover:bg-navy-900 text-white px-3.5 py-1.5 text-xs font-semibold">Edit</button>
                                    <button onclick="window.duplicatePackage('${p.id}')" class="btn-touch-48 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 text-xs font-semibold">Duplicate</button>
                                    <button onclick="window.deletePackage('${p.id}')" class="btn-touch-48 bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 text-xs font-semibold">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- MOBILE CARDS VIEW (<768px) -->
            <div class="mobile-cards-only">
                ${state.packages.map(p => `
                    <div class="mobile-row-card">
                        <div class="mobile-card-header">
                            <img src="${p.coverImage || 'images/himalayan_yatra.jpg'}" class="w-16 h-16 rounded-xl object-cover border flex-shrink-0" />
                            <div class="min-w-0 flex-1">
                                <h4 class="font-bold text-navy-900 text-sm truncate">${p.name}</h4>
                                <p class="text-slate-500 text-xs truncate">📍 ${p.destination}</p>
                                <div class="text-saffron-600 font-extrabold text-sm mt-0.5">₹${p.price ? p.price.toLocaleString() : 0}</div>
                            </div>
                        </div>

                        <div class="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-xl text-xs border">
                            <div class="flex items-center gap-1.5">
                                <span class="text-slate-500 font-medium">Seats Left:</span>
                                <input type="number" value="${p.seatsLeft !== undefined ? p.seatsLeft : 10}" onchange="window.updateSeats('${p.id}', this.value)" class="w-14 p-1 border rounded-lg text-center font-bold text-emerald-700 bg-white" />
                            </div>

                            <button onclick="window.togglePackageHeroDisplay('${p.id}')" class="px-2.5 py-1 rounded-full text-[10px] font-bold transition ${p.showInHero !== false ? 'bg-saffron-100 text-saffron-800 border border-saffron-300' : 'bg-slate-200 text-slate-600'}">
                                ${p.showInHero !== false ? '⭐ HERO ON' : 'HERO OFF'}
                            </button>
                        </div>

                        <div class="mobile-card-actions">
                            <button onclick="window.openPrintablePdf('${p.id}')" class="btn-admin-action bg-slate-700 text-white">
                                <i class="fa-solid fa-file-pdf mr-1"></i> PDF
                            </button>
                            <button onclick="window.openEditPkgModal('${p.id}')" class="btn-admin-action bg-navy-800 text-white">
                                <i class="fa-solid fa-pen mr-1"></i> Edit
                            </button>
                            <button onclick="window.duplicatePackage('${p.id}')" class="btn-admin-action bg-emerald-600 text-white">
                                <i class="fa-solid fa-copy mr-1"></i> Copy
                            </button>
                            <button onclick="window.deletePackage('${p.id}')" class="btn-admin-action bg-rose-600 text-white">
                                <i class="fa-solid fa-trash mr-1"></i> Delete
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Global Handlers
window.updateSeats = function(id, val) {
    const pkg = state.packages.find(p => p.id === id);
    if (pkg) {
        pkg.seatsLeft = parseInt(val) || 0;
        saveStore(window.renderApp);
    }
};

window.duplicatePackage = function(id) {
    const pkg = state.packages.find(p => p.id === id);
    if (pkg) {
        const copy = JSON.parse(JSON.stringify(pkg));
        copy.id = 'pkg-' + Date.now();
        copy.name = copy.name + ' (Copy)';
        copy.slug = copy.slug + '-copy';
        copy.heroOrder = state.packages.length + 1;
        state.packages.push(copy);
        saveStore(window.renderApp);
    }
};

window.deletePackage = function(id) {
    if (confirm('Are you sure you want to delete this tour package?')) {
        state.packages = state.packages.filter(p => p.id !== id);
        saveStore(window.renderApp);
    }
};
