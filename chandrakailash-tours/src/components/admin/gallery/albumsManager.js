/* चंद्रकैलाश Tours & Travels - Albums Manager Component */

import { state } from '../../../context/state.js';
import { saveStore } from '../../../services/storage.js';

export function renderAlbumsManager() {
    const totalAlbums = (state.albums || []).length;

    return `
        <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border space-y-6 admin-container">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-navy-900">📸 Main Gallery Albums Manager (${totalAlbums} Albums)</h3>
                    <p class="text-xs text-slate-500 mt-0.5">Create separate albums and upload photos with Drag & Drop.</p>
                </div>
                <button onclick="window.openAddAlbumModal()" class="btn-touch-48 bg-saffron-500 hover:bg-saffron-600 text-white shadow w-full sm:w-auto">
                    <i class="fa-solid fa-plus"></i> Create New Album
                </button>
            </div>

            <!-- ALBUMS GRID (1 COL ON MOBILE, 2 ON TABLET, 3 ON DESKTOP) -->
            <div class="admin-albums-grid">
                ${(state.albums || []).map(alb => `
                    <div class="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between w-full box-border">
                        <div class="space-y-3">
                            <div class="h-44 rounded-xl overflow-hidden bg-slate-900 relative">
                                <img src="${alb.coverImage || (alb.photos && alb.photos[0] ? alb.photos[0].image : 'images/himalayan_yatra.jpg')}" class="w-full h-full object-cover" />
                                <span class="absolute top-2 left-2 bg-saffron-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow">${alb.category}</span>
                                <span class="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow">${alb.year || '2026'}</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-base text-navy-900">${alb.title}</h4>
                                <p class="text-xs text-slate-500 line-clamp-2 mt-0.5">${alb.description || 'Album description'}</p>
                            </div>
                            <div class="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                                <i class="fa-solid fa-camera text-saffron-500"></i> ${(alb.photos || []).length} Photos uploaded
                            </div>
                        </div>

                        <div class="flex justify-between items-center pt-3 border-t text-xs gap-2 flex-wrap">
                            <button onclick="window.openEditAlbumModal('${alb.id}')" class="btn-touch-48 bg-navy-900 text-white font-bold flex-1">
                                <i class="fa-solid fa-images mr-1"></i> Manage Photos
                            </button>
                            <button onclick="window.deleteAlbum('${alb.id}')" class="btn-touch-48 bg-rose-50 text-rose-600 border border-rose-200 font-bold hover:bg-rose-100">
                                Delete
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

window.deleteAlbum = function(id) {
    if (confirm('Are you sure you want to delete this photo album?')) {
        state.albums = (state.albums || []).filter(a => a.id !== id);
        saveStore(window.renderApp);
    }
};
