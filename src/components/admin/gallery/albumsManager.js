/* चंद्रकैलाश Tours & Travels - Package Photo Albums Manager Component */

import { state } from '../../../context/state.js';
import { getDynamicPackageAlbums } from '../../../utils/helpers.js';

export function renderAlbumsManager() {
    const pkgAlbums = getDynamicPackageAlbums();
    const totalPhotos = pkgAlbums.reduce((acc, a) => acc + (a.photos ? a.photos.length : 0), 0);

    return `
        <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border space-y-6 admin-container">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-navy-900">📸 Package Photo Albums (${pkgAlbums.length} Albums • ${totalPhotos} Photos)</h3>
                    <p class="text-xs text-slate-500 mt-0.5">Photos uploaded inside Tour Packages are automatically displayed in the Public Gallery.</p>
                </div>
            </div>

            <!-- AUTOMATIC SYNC INFO BANNER -->
            <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 shadow-sm">
                <i class="fa-solid fa-circle-info text-amber-600 text-lg mt-0.5 flex-shrink-0"></i>
                <div class="space-y-1">
                    <p class="font-bold">⚡ Direct Package Gallery Integration Active</p>
                    <p class="text-amber-800 leading-relaxed font-medium">
                        Separate album uploading is disabled. All photos uploaded directly under <span class="font-bold underline cursor-pointer" onclick="window.setAdminTab('packages')">Tour Packages CMS</span> automatically form the public photo gallery albums. This ensures zero redundant uploads and prevents memory errors.
                    </p>
                </div>
            </div>

            <!-- PACKAGE ALBUMS GRID -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${pkgAlbums.map(alb => `
                    <div class="border rounded-2xl p-4 space-y-3 bg-slate-50 relative group flex flex-col justify-between">
                        <div class="space-y-3">
                            <div class="h-36 rounded-xl overflow-hidden bg-slate-900 border relative">
                                <img src="${alb.coverImage}" class="w-full h-full object-cover" />
                                <span class="absolute top-2 left-2 bg-saffron-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">${alb.category}</span>
                                <span class="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">${alb.year}</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-navy-900 text-sm line-clamp-1">${alb.title}</h4>
                                <p class="text-xs text-slate-500 line-clamp-2 mt-1">${alb.description}</p>
                                <p class="text-[11px] text-slate-500 font-bold mt-2 flex items-center gap-1.5">
                                    <span>🖼️ ${alb.photos.length} Photos Uploaded</span>
                                </p>
                            </div>
                        </div>

                        <div class="pt-3 border-t text-xs">
                            <button onclick="window.setAdminTab('packages')" class="w-full btn-touch-48 bg-navy-900 text-white font-bold rounded-xl hover:bg-saffron-600 transition flex items-center justify-center gap-2">
                                <i class="fa-solid fa-pen-to-square"></i> Manage Photos in Tour Packages
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

