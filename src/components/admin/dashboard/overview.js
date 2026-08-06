/* चंद्रकैलाश Tours & Travels - Admin Overview Component */

import { state } from '../../../context/state.js';

export function renderAdminOverview() {
    const totalPkgs = state.packages.length;
    const totalEnquiries = state.bookings.length;
    const totalAlbums = (state.albums || []).length;
    const totalRev = state.reviews.length;

    return `
        <div class="space-y-6 w-full">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white p-5 rounded-2xl border shadow-sm space-y-1">
                    <span class="text-xs text-slate-500 uppercase font-semibold">Total Tour Packages</span>
                    <div class="text-3xl font-extrabold text-navy-900">${totalPkgs}</div>
                </div>
                <div class="bg-white p-5 rounded-2xl border shadow-sm space-y-1">
                    <span class="text-xs text-slate-500 uppercase font-semibold">Customer Enquiries</span>
                    <div class="text-3xl font-extrabold text-saffron-600">${totalEnquiries}</div>
                </div>
                <div class="bg-white p-5 rounded-2xl border shadow-sm space-y-1">
                    <span class="text-xs text-slate-500 uppercase font-semibold">Gallery Albums</span>
                    <div class="text-3xl font-extrabold text-emerald-600">${totalAlbums}</div>
                </div>
                <div class="bg-white p-5 rounded-2xl border shadow-sm space-y-1">
                    <span class="text-xs text-slate-500 uppercase font-semibold">Customer Reviews</span>
                    <div class="text-3xl font-extrabold text-purple-600">${totalRev}</div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
                <div class="flex justify-between items-center flex-wrap gap-2">
                    <h4 class="font-bold text-navy-900 text-base">💾 Database Storage Status</h4>
                    <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">🟢 Browser Storage (Zero Tokens Required)</span>
                </div>
                <div class="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1.5">
                    <div class="font-bold text-sm text-emerald-950">✅ 100% Free Plan Mode Active</div>
                    <div>All changes (packages, gallery, hero, settings) save instantly to browser storage. No GitHub tokens, API keys, or backend secrets are needed.</div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
                <h4 class="font-bold text-navy-900 text-base">⚡ Quick System Status</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div class="p-3.5 bg-slate-50 rounded-xl border">
                        <strong>Language Switcher:</strong>
                        <span class="ml-2 font-bold ${state.settings.langSwitchEnabled !== false ? 'text-emerald-600' : 'text-slate-400'}">${state.settings.langSwitchEnabled !== false ? '🟢 Active' : '🔴 Disabled'}</span>
                    </div>
                    <div class="p-3.5 bg-slate-50 rounded-xl border">
                        <strong>Popular Packages Section:</strong>
                        <span class="ml-2 font-bold ${state.settings.secPackagesEnabled !== false ? 'text-emerald-600' : 'text-slate-400'}">${state.settings.secPackagesEnabled !== false ? '🟢 Active' : '🔴 Disabled'}</span>
                    </div>
                    <div class="p-3.5 bg-slate-50 rounded-xl border">
                        <strong>Customer Reviews Section:</strong>
                        <span class="ml-2 font-bold ${state.settings.secReviewsEnabled !== false ? 'text-emerald-600' : 'text-slate-400'}">${state.settings.secReviewsEnabled !== false ? '🟢 Active' : '🔴 Disabled'}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}
