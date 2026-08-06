/* चंद्रकैलाश Tours & Travels - Albums Manager Component */

import { state } from '../../../context/state.js';
import { saveStore, deleteAlbumCloud } from '../../../services/storage.js';

export function renderAlbumsManager() {
    const totalAlbums = (state.albums || []).length;

    return `
        <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border space-y-6 admin-container">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-navy-900">📸 Main Gallery Albums Manager (${totalAlbums} Albums)</h3>
                    <p class="text-xs text-slate-500 mt-0.5">Create separate albums and upload photos with Drag & Drop.</p>
                </div>
                <button onclick="window.openAddAlbumModal()" class="btn-touch-48 bg-saffron-500 hover:bg-saffron-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow">
                    <i class="fa-solid fa-plus"></i> Add New Album
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${(state.albums || []).map(alb => `
                    <div class="border rounded-2xl p-4 space-y-3 bg-slate-50 relative group">
                        <div class="h-36 rounded-xl overflow-hidden bg-slate-200 border">
                            <img src="${alb.coverImage || (alb.photos && alb.photos[0] ? alb.photos[0].image : 'images/himalayan_yatra.jpg')}" class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div class="flex justify-between items-start">
                                <h4 class="font-bold text-navy-900 text-sm">${alb.title}</h4>
                                <span class="text-[10px] bg-saffron-100 text-saffron-800 font-bold px-2 py-0.5 rounded-full border border-saffron-300">${alb.year || '2026'}</span>
                            </div>
                            <p class="text-xs text-slate-500 line-clamp-2 mt-1">${alb.description || 'No description'}</p>
                            <p class="text-[11px] text-slate-400 font-medium mt-1">📂 ${alb.category} • 🖼️ ${(alb.photos || []).length} Photos</p>
                        </div>
                        <div class="flex gap-2 pt-2 border-t text-xs">
                            <button onclick="window.openEditAlbumModal('${alb.id}')" class="btn-touch-48 flex-1 bg-white text-navy-800 border font-bold hover:bg-slate-100">
                                <i class="fa-solid fa-pen-to-square"></i> Edit
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

window.deleteAlbum = async function(id) {
    if (confirm('Are you sure you want to delete this photo album?')) {
        try {
            await deleteAlbumCloud(id);
            if (window.renderApp) window.renderApp();
            alert('✅ Album Deleted Successfully');
        } catch (err) {
            alert('❌ Failed to delete album: ' + (err.message || 'Unknown error'));
        }
    }
};
