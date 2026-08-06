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
                    <h4 class="font-bold text-navy-900 text-base">📡 GitHub Cloud Database Sync Status</h4>
                    <button id="gh-sync-test-btn" onclick="window.testGithubSyncConn()" class="btn-touch-48 bg-navy-900 hover:bg-navy-950 text-white text-xs font-bold px-4 py-2 rounded-xl shadow">
                        🔍 Test GitHub Sync Connection
                    </button>
                </div>
                <div id="gh-sync-status-box" class="p-4 bg-slate-50 border rounded-xl text-xs text-slate-600">
                    Click <strong>"Test GitHub Sync Connection"</strong> to verify serverless REST API authentication and Vercel environment variables.
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

window.testGithubSyncConn = async function() {
    const btn = document.getElementById('gh-sync-test-btn');
    const statusEl = document.getElementById('gh-sync-status-box');
    if (btn) btn.innerText = '⏳ Testing GitHub Sync...';
    
    try {
        const res = await fetch('/api/verifyGithub');
        const data = await res.json();
        if (statusEl) {
            if (data.success) {
                statusEl.className = 'p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold space-y-1';
                statusEl.innerHTML = `
                    <div class="font-bold flex items-center gap-2 text-sm text-emerald-900">
                        <span>✅ GitHub Cloud Sync Active</span>
                    </div>
                    <div>Repo: <strong>${data.config.repo}</strong> (branch: <strong>${data.config.branch}</strong>)</div>
                    <div class="text-[11px] text-emerald-700 mt-1">All CMS edits from any device will commit and push directly to GitHub main branch.</div>
                `;
            } else {
                statusEl.className = 'p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs font-semibold space-y-1.5';
                statusEl.innerHTML = `
                    <div class="font-bold flex items-center gap-2 text-sm text-amber-950">
                        <span>⚠️ GitHub Sync Configuration Required</span>
                    </div>
                    <div class="text-xs text-amber-900">${data.message}</div>
                    <div class="bg-white p-2.5 rounded-lg border border-amber-200 text-[11px] space-y-1 font-mono text-slate-700 mt-2">
                        <div class="font-bold">Required Vercel Environment Variables:</div>
                        <div>• <strong>GITHUB_TOKEN</strong> = [Your GitHub Personal Access Token]</div>
                        <div>• <strong>GITHUB_OWNER</strong> = ${data.config ? data.config.owner : '9patil'}</div>
                        <div>• <strong>GITHUB_REPO</strong> = ${data.config ? data.config.repoName || data.config.repo : 'chandrakailash-tours'}</div>
                        <div>• <strong>GITHUB_BRANCH</strong> = ${data.config ? data.config.branch : 'main'}</div>
                    </div>
                `;
            }
        }
    } catch (err) {
        if (statusEl) {
            statusEl.className = 'p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold';
            statusEl.innerHTML = `⚠️ Sync Check Error: ${err.message}`;
        }
    } finally {
        if (btn) btn.innerText = '🔄 Re-test GitHub Sync Connection';
    }
};
