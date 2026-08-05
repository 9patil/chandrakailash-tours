/* चंद्रकैलाश Tours & Travels - Master Admin CMS View Page */

import { state } from '../context/state.js';
import { renderAdminOverview } from '../components/admin/dashboard/overview.js';
import { renderBrandingManager } from '../components/admin/branding/brandingManager.js';
import { renderPackagesManager } from '../components/admin/packages/packagesManager.js';
import { renderAlbumsManager } from '../components/admin/gallery/albumsManager.js';
import { renderHeroManager } from '../components/admin/hero/heroManager.js';
import {
    renderEnquiriesManager,
    renderReviewsManager,
    renderContactSettings,
    renderSEOSettings,
    renderTranslationsSettings,
    renderSecuritySettings
} from '../components/admin/settings/settingsManagers.js';

export function renderAdminView() {
    const currentTab = state.adminActiveTab || 'overview';
    const totalEnquiries = state.bookings.length;

    const navTabs = [
        { id: 'overview', label: '📊 System Overview', icon: 'fa-chart-pie' },
        { id: 'hero', label: '🏞️ Hero Slider CMS', icon: 'fa-sliders' },
        { id: 'branding', label: '🏷️ Branding & Typography', icon: 'fa-palette' },
        { id: 'packages', label: '📦 Tour Packages CMS', icon: 'fa-suitcase' },
        { id: 'albums', label: '📸 Gallery Albums CMS', icon: 'fa-images' },
        { id: 'enquiries', label: '📋 Enquiry Manager (' + totalEnquiries + ')', icon: 'fa-headset' },
        { id: 'reviews', label: '⭐ Customer Reviews', icon: 'fa-star' },
        { id: 'contact', label: '📞 Contact Details', icon: 'fa-address-book' },
        { id: 'seo', label: '🔍 SEO Settings', icon: 'fa-magnifying-glass' },
        { id: 'translations', label: '🌐 Language Translations', icon: 'fa-language' },
        { id: 'security', label: '🔐 Password & Security', icon: 'fa-lock' }
    ];

    const currentTabObj = navTabs.find(t => t.id === currentTab) || navTabs[0];

    return `
        <div class="max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-6 admin-container">
            
            <!-- RESPONSIVE ADMIN HEADER (LOGO ↓ TITLE ↓ ACTIONS ON SMALL SCREENS) -->
            <div class="admin-header">
                <div class="admin-header-logo">
                    <div class="w-12 h-12 rounded-2xl bg-saffron-500 text-white flex items-center justify-center text-2xl font-bold shadow flex-shrink-0">
                        ⚙️
                    </div>
                    <div>
                        <h2 class="text-2xl font-extrabold text-white">CMS Admin Dashboard</h2>
                        <p class="text-xs text-saffron-400 font-medium">Logged in as Administrator • Full No-Code Management</p>
                    </div>
                </div>

                <div class="admin-header-actions">
                    <button onclick="window.toggleAdminDrawer()" class="md:hidden btn-touch-48 bg-navy-800 border border-saffron-500/40 text-saffron-400 font-bold px-4">
                        <i class="fa-solid fa-bars text-base mr-1.5"></i> Menu (${currentTabObj.label.split(' ')[1] || 'Tabs'})
                    </button>
                    <button onclick="window.navigate('home')" class="btn-touch-48 bg-navy-800 hover:bg-navy-700 text-white text-xs font-bold border border-slate-700">
                        <i class="fa-solid fa-globe mr-1.5"></i> Public Site
                    </button>
                    <button onclick="window.adminLogout()" class="btn-touch-48 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow">
                        Logout
                    </button>
                </div>
            </div>

            <!-- DESKTOP ADMIN TABS NAVIGATION BAR (HIDDEN ON MOBILE, USE DRAWER INSTEAD) -->
            <div class="hidden md:flex admin-nav-bar">
                ${navTabs.map(tab => `
                    <button 
                        onclick="window.setAdminTab('${tab.id}')" 
                        class="admin-nav-btn ${currentTab === tab.id ? 'active' : ''}"
                    >
                        <span>${tab.label}</span>
                    </button>
                `).join('')}
            </div>

            <!-- MOBILE OVERLAY SIDEBAR DRAWER MENU -->
            ${state.adminDrawerOpen ? `
                <div class="admin-drawer-overlay no-print" onclick="window.toggleAdminDrawer()">
                    <div class="admin-drawer-content" onclick="event.stopPropagation()">
                        <div class="flex justify-between items-center border-b border-navy-800 pb-3 mb-2">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-gear text-saffron-400 text-lg"></i>
                                <span class="font-bold text-white text-sm">CMS Admin Menu</span>
                            </div>
                            <button onclick="window.toggleAdminDrawer()" class="text-slate-400 hover:text-white text-lg font-bold p-1">✕</button>
                        </div>
                        <div class="space-y-1.5">
                            ${navTabs.map(tab => `
                                <button 
                                    onclick="window.setAdminTab('${tab.id}'); window.toggleAdminDrawer();" 
                                    class="w-full text-left py-3 px-3.5 rounded-xl font-bold text-xs flex items-center gap-3 ${currentTab === tab.id ? 'bg-saffron-500 text-white shadow' : 'text-slate-300 hover:bg-navy-900'}"
                                >
                                    <i class="fa-solid ${tab.icon} w-5 text-center text-saffron-400"></i>
                                    <span>${tab.label}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            ` : ''}

            <!-- TAB CONTENT CONTAINER -->
            <div class="w-full">
                ${currentTab === 'overview' ? renderAdminOverview() : ''}
                ${currentTab === 'hero' ? renderHeroManager() : ''}
                ${currentTab === 'branding' ? renderBrandingManager() : ''}
                ${currentTab === 'packages' ? renderPackagesManager() : ''}
                ${currentTab === 'albums' ? renderAlbumsManager() : ''}
                ${currentTab === 'enquiries' ? renderEnquiriesManager() : ''}
                ${currentTab === 'reviews' ? renderReviewsManager() : ''}
                ${currentTab === 'contact' ? renderContactSettings() : ''}
                ${currentTab === 'seo' ? renderSEOSettings() : ''}
                ${currentTab === 'translations' ? renderTranslationsSettings() : ''}
                ${currentTab === 'security' ? renderSecuritySettings() : ''}
            </div>

        </div>
    `;
}

window.setAdminTab = function(tabId) {
    state.adminActiveTab = tabId;
    if (window.renderApp) window.renderApp();
};

window.toggleAdminDrawer = function() {
    state.adminDrawerOpen = !state.adminDrawerOpen;
    if (window.renderApp) window.renderApp();
};

window.adminLogout = function() {
    state.adminLoggedIn = false;
    state.activeTab = 'home';
    if (window.renderApp) window.renderApp();
};
