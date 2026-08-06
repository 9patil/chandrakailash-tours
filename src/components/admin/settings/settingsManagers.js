/* चंद्रकैलाश Tours & Travels - Settings & Management Subcomponents */

import { state } from '../../../context/state.js';
import { saveStore, saveSettingsCloud } from '../../../services/storage.js';
import { exportToExcel } from '../../../utils/excelExporter.js';

/* 1. ENQUIRIES MANAGER (LEAD MANAGER) */
export function renderEnquiriesManager() {
    const totalEnquiries = state.bookings.length;
    const filteredEnquiries = (state.bookings || []).filter(b => {
        return state.enquiryStatusFilter === 'all' || b.status === state.enquiryStatusFilter;
    });

    return `
        <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border space-y-4 admin-container">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-3">
                <div>
                    <h4 class="font-bold text-navy-900 text-base">📋 Customer Booking & WhatsApp Enquiries (${totalEnquiries})</h4>
                    <p class="text-xs text-slate-500 mt-0.5">Track lead status (New, Contacted, Booked, Cancelled) and export to Excel.</p>
                </div>
                <button onclick="window.exportToExcelLeads()" class="btn-touch-48 bg-waGreen-500 hover:bg-waGreen-600 text-white shadow w-full sm:w-auto">
                    <i class="fa-solid fa-file-excel"></i> Export Leads to Excel
                </button>
            </div>

            <!-- ENQUIRY STATUS FILTER BAR -->
            <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span class="font-bold text-slate-500 flex-shrink-0">Filter Status:</span>
                ${['all', 'New', 'Contacted', 'Booked', 'Cancelled'].map(st => `
                    <button onclick="window.setEnquiryFilter('${st}')" class="px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition min-h-[44px] ${state.enquiryStatusFilter === st ? 'bg-navy-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                        ${st === 'all' ? 'All (' + state.bookings.length + ')' : st}
                    </button>
                `).join('')}
            </div>
            
            <!-- DESKTOP TABLE VIEW (≥768px) -->
            <div class="desktop-table-only responsive-table-wrap">
                <table class="w-full text-left text-xs">
                    <thead class="bg-slate-100 uppercase text-[11px]">
                        <tr>
                            <th class="p-3">Customer Name</th>
                            <th class="p-3">WhatsApp / Phone</th>
                            <th class="p-3">Tour Package</th>
                            <th class="p-3">Status</th>
                            <th class="p-3">Date & Message</th>
                            <th class="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y">
                        ${filteredEnquiries.map(b => `
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 font-bold text-navy-900">${b.name}</td>
                                <td class="p-3 font-medium text-emerald-700">
                                    <a href="https://wa.me/91${b.phone}?text=Namaskar%20${encodeURIComponent(b.name)},%20regards%20from%20Chandrakailash%20Tours!" target="_blank" class="hover:underline flex items-center gap-1 font-bold">
                                        <i class="fa-brands fa-whatsapp text-sm text-waGreen-500"></i> ${b.phone}
                                    </a>
                                </td>
                                <td class="p-3 font-semibold">${b.destination}</td>
                                <td class="p-3">
                                    <select onchange="window.updateEnquiryStatus('${b.id}', this.value)" class="p-2 border rounded-xl text-xs font-bold ${b.status==='Booked'?'bg-emerald-100 text-emerald-800':b.status==='Contacted'?'bg-blue-100 text-blue-800':b.status==='Cancelled'?'bg-rose-100 text-rose-800':'bg-amber-100 text-amber-800'}">
                                        <option value="New" ${b.status==='New'?'selected':''}>🟡 New</option>
                                        <option value="Contacted" ${b.status==='Contacted'?'selected':''}>🔵 Contacted</option>
                                        <option value="Booked" ${b.status==='Booked'?'selected':''}>🟢 Booked</option>
                                        <option value="Cancelled" ${b.status==='Cancelled'?'selected':''}>🔴 Cancelled</option>
                                    </select>
                                </td>
                                <td class="p-3 text-slate-600">
                                    <div>${b.createdAt || 'Recent'}</div>
                                    <div class="italic text-slate-400">${b.message || ''}</div>
                                </td>
                                <td class="p-3 text-right">
                                    <button onclick="window.deleteEnquiry('${b.id}')" class="btn-touch-48 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- MOBILE CARDS VIEW (<768px) -->
            <div class="mobile-cards-only">
                ${filteredEnquiries.map(b => `
                    <div class="mobile-row-card">
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 class="font-bold text-navy-900 text-base">${b.name}</h4>
                                <p class="text-xs text-saffron-600 font-bold">📦 ${b.destination}</p>
                            </div>
                            <span class="text-[11px] font-bold px-2.5 py-1 rounded-full ${b.status==='Booked'?'bg-emerald-100 text-emerald-800':b.status==='Contacted'?'bg-blue-100 text-blue-800':b.status==='Cancelled'?'bg-rose-100 text-rose-800':'bg-amber-100 text-amber-800'}">
                                ${b.status || 'New'}
                            </span>
                        </div>

                        <div class="space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border">
                            <div><strong>WhatsApp / Phone:</strong> <a href="https://wa.me/91${b.phone}" target="_blank" class="text-emerald-700 font-bold underline">${b.phone}</a></div>
                            <div><strong>Date:</strong> ${b.createdAt || 'Recent'}</div>
                            ${b.message ? `<div><strong>Message:</strong> "${b.message}"</div>` : ''}
                        </div>

                        <div class="flex flex-col gap-2 pt-2 border-t">
                            <label class="text-xs font-bold text-slate-700">Update Lead Status:</label>
                            <select onchange="window.updateEnquiryStatus('${b.id}', this.value)" class="admin-form-select font-bold">
                                <option value="New" ${b.status==='New'?'selected':''}>🟡 New Inquiry</option>
                                <option value="Contacted" ${b.status==='Contacted'?'selected':''}>🔵 Contacted Customer</option>
                                <option value="Booked" ${b.status==='Booked'?'selected':''}>🟢 Booking Confirmed</option>
                                <option value="Cancelled" ${b.status==='Cancelled'?'selected':''}>🔴 Cancelled</option>
                            </select>

                            <div class="flex gap-2 pt-1">
                                <a href="https://wa.me/91${b.phone}?text=Namaskar%20${encodeURIComponent(b.name)},%20regards%20from%20Chandrakailash%20Tours!" target="_blank" class="btn-touch-48 bg-waGreen-500 text-white font-bold flex-1">
                                    <i class="fa-brands fa-whatsapp text-lg"></i> WhatsApp
                                </a>
                                <button onclick="window.deleteEnquiry('${b.id}')" class="btn-touch-48 bg-rose-600 text-white font-bold flex-1">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

window.exportToExcelLeads = function() {
    exportToExcel();
};

window.setEnquiryFilter = function(st) {
    state.enquiryStatusFilter = st;
    if (window.renderApp) window.renderApp();
};

window.updateEnquiryStatus = function(id, val) {
    const b = state.bookings.find(x => x.id === id);
    if (b) {
        b.status = val;
        saveStore(window.renderApp);
    }
};

window.deleteEnquiry = function(id) {
    if (confirm('Delete this inquiry record?')) {
        state.bookings = state.bookings.filter(x => x.id !== id);
        saveStore(window.renderApp);
    }
};

/* 2. REVIEWS MANAGER */
export function renderReviewsManager() {
    const totalRev = state.reviews.length;

    return `
        <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border space-y-4 admin-container">
            <div class="flex justify-between items-center border-b pb-3 flex-wrap gap-2">
                <h4 class="font-bold text-navy-900 text-base">⭐ Customer Reviews Management (${totalRev})</h4>
                <button onclick="window.toggleAddReviewModal()" class="btn-touch-48 bg-navy-900 text-white font-bold text-xs shadow">+ Add Review</button>
            </div>
            <div class="admin-albums-grid">
                ${state.reviews.map(r => `
                    <div class="bg-slate-50 p-4 rounded-xl border space-y-3 text-xs flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between font-bold text-navy-900 items-center">
                                <span class="text-sm">${r.name}</span>
                                <button onclick="window.togglePinReview('${r.id}')" class="px-2 py-1 rounded-lg text-xs font-bold ${r.pinned ? 'bg-saffron-100 text-saffron-700 border border-saffron-300' : 'bg-slate-200 text-slate-600'}">
                                    ${r.pinned ? '📌 Pinned' : 'Pin'}
                                </button>
                            </div>
                            <p class="text-slate-600 italic mt-2 leading-relaxed font-marathi-body">"${r.review}"</p>
                        </div>
                        <div class="flex justify-between items-center pt-2 border-t text-[11px] gap-2">
                            <span class="text-slate-400 font-medium">${r.date || 'Recent'}</span>
                            <button onclick="window.deleteReview('${r.id}')" class="btn-touch-48 bg-rose-50 text-rose-600 border border-rose-200 px-3 py-1 font-bold">Delete</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

window.togglePinReview = function(id) {
    const r = state.reviews.find(x => x.id === id);
    if (r) {
        r.pinned = !r.pinned;
        saveStore(window.renderApp);
    }
};

window.deleteReview = function(id) {
    if (confirm('Delete this review?')) {
        state.reviews = state.reviews.filter(x => x.id !== id);
        saveStore(window.renderApp);
    }
};

/* 3. CONTACT SETTINGS */
export function renderContactSettings() {
    return `
        <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border space-y-4 max-w-2xl mx-auto admin-container">
            <h3 class="text-xl font-bold text-navy-900">📞 Contact Details & Office Settings</h3>
            <form onsubmit="window.handleSaveContact(event)" class="space-y-4 text-xs">
                <div class="admin-form-group">
                    <label class="font-bold">Phone Number</label>
                    <input type="text" id="ct_phone" value="${state.settings.phone}" required class="admin-form-input font-bold" />
                </div>
                <div class="admin-form-group">
                    <label class="font-bold">WhatsApp Number</label>
                    <input type="text" id="ct_wa" value="${state.settings.whatsapp}" required class="admin-form-input font-bold" />
                </div>
                <div class="admin-form-group">
                    <label class="font-bold">Email Address</label>
                    <input type="email" id="ct_email" value="${state.settings.email}" required class="admin-form-input" />
                </div>
                <div class="admin-form-group">
                    <label class="font-bold">Instagram Handle</label>
                    <input type="text" id="ct_insta" value="${state.settings.instagram}" required class="admin-form-input" />
                </div>
                <div class="admin-form-group">
                    <label class="font-bold">Office Address</label>
                    <input type="text" id="ct_addr" value="${state.settings.officeAddress}" required class="admin-form-input" />
                </div>
                <div class="admin-form-group">
                    <label class="font-bold">Google Maps URL</label>
                    <input type="text" id="ct_gmaps" value="${state.settings.googleMapsUrl}" required class="admin-form-input" />
                </div>
                <button type="submit" class="btn-touch-48 bg-saffron-500 hover:bg-saffron-600 text-white shadow w-full sm:w-auto">Save Contact Info</button>
            </form>
        </div>
    `;
}

window.handleSaveContact = async function(e) {
    if (e) e.preventDefault();
    state.settings.phone = document.getElementById('ct_phone').value;
    state.settings.whatsapp = document.getElementById('ct_wa').value;
    state.settings.email = document.getElementById('ct_email').value;
    state.settings.instagram = document.getElementById('ct_insta').value;
    state.settings.officeAddress = document.getElementById('ct_addr').value;
    state.settings.googleMapsUrl = document.getElementById('ct_gmaps').value;

    try {
        await saveSettingsCloud(state.settings);
        if (window.renderApp) window.renderApp();
        alert('✅ Contact details updated successfully!');
    } catch (err) {
        alert('❌ Failed to update contact details: ' + (err.message || 'Unknown error'));
    }
};

/* 4. SEO SETTINGS */
export function renderSEOSettings() {
    return `
        <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border space-y-4 max-w-2xl mx-auto admin-container">
            <h3 class="text-xl font-bold text-navy-900">🔍 SEO Meta Tags & Search Engine Optimization</h3>
            <form onsubmit="window.handleSaveSEO(event)" class="space-y-4 text-xs">
                <div class="admin-form-group">
                    <label class="font-bold">Meta Title</label>
                    <input type="text" id="seo_title" value="${state.settings.metaTitle}" required class="admin-form-input" />
                </div>
                <div class="admin-form-group">
                    <label class="font-bold">Meta Description</label>
                    <textarea id="seo_desc" rows="3" required class="admin-form-textarea">${state.settings.metaDescription}</textarea>
                </div>
                <div class="admin-form-group">
                    <label class="font-bold">Meta Keywords</label>
                    <input type="text" id="seo_kw" value="${state.settings.metaKeywords}" required class="admin-form-input" />
                </div>
                <button type="submit" class="btn-touch-48 bg-navy-900 hover:bg-navy-950 text-white shadow w-full sm:w-auto">Save SEO Meta</button>
            </form>
        </div>
    `;
}

window.handleSaveSEO = async function(e) {
    if (e) e.preventDefault();
    state.settings.metaTitle = document.getElementById('seo_title').value;
    state.settings.metaDescription = document.getElementById('seo_desc').value;
    state.settings.metaKeywords = document.getElementById('seo_kw').value;

    try {
        await saveSettingsCloud(state.settings);
        if (window.renderApp) window.renderApp();
        alert('✅ SEO meta settings saved successfully!');
    } catch (err) {
        alert('❌ Failed to save SEO meta: ' + (err.message || 'Unknown error'));
    }
};

/* 5. TRANSLATIONS SETTINGS */
export function renderTranslationsSettings() {
    return `
        <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border space-y-6 admin-container">
            <div class="flex justify-between items-center border-b pb-3 flex-wrap gap-2">
                <h3 class="text-xl font-bold text-navy-900">🌐 Multilingual i18n Dictionary</h3>
                <button onclick="window.toggleLangSwitchMaster()" class="btn-touch-48 bg-navy-800 text-white text-xs shadow">
                    ${state.settings.langSwitchEnabled !== false ? 'Disable Language Switcher' : 'Enable Language Switcher'}
                </button>
            </div>

            <form onsubmit="window.handleSaveTranslations(event)" class="space-y-4 text-xs">
                <div class="admin-form-grid admin-form-grid-2">
                    ${Object.keys(state.translations.en).map(k => `
                        <div class="bg-slate-50 p-3.5 rounded-xl border space-y-2">
                            <span class="font-bold text-navy-900 text-[11px] block uppercase font-mono">${k}</span>
                            <div>
                                <label class="block text-[10px] text-slate-500 mb-0.5">English (EN)</label>
                                <input type="text" id="tr_en_${k}" value="${state.translations.en[k]}" class="admin-form-input bg-white min-h-[40px]" />
                            </div>
                            <div>
                                <label class="block text-[10px] text-slate-500 mb-0.5">मराठी (MR)</label>
                                <input type="text" id="tr_mr_${k}" value="${state.translations.mr[k]}" class="admin-form-input bg-white font-marathi-body min-h-[40px]" />
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button type="submit" class="btn-touch-48 bg-saffron-500 hover:bg-saffron-600 text-white shadow w-full sm:w-auto">Save Translations</button>
            </form>
        </div>
    `;
}

window.toggleLangSwitchMaster = function() {
    state.settings.langSwitchEnabled = state.settings.langSwitchEnabled === false ? true : false;
    saveStore(window.renderApp);
};

window.handleSaveTranslations = function(e) {
    if (e) e.preventDefault();
    Object.keys(state.translations.en).forEach(k => {
        const enEl = document.getElementById(`tr_en_${k}`);
        const mrEl = document.getElementById(`tr_mr_${k}`);
        if (enEl) state.translations.en[k] = enEl.value;
        if (mrEl) state.translations.mr[k] = mrEl.value;
    });
    saveStore(window.renderApp);
    alert('Translations saved!');
};

/* 6. SECURITY SETTINGS */
export function renderSecuritySettings() {
    return `
        <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border space-y-4 max-w-xl mx-auto admin-container">
            <h3 class="text-xl font-bold text-navy-900">🔐 Security & Admin Password</h3>
            <form onsubmit="window.handleChangePassword(event)" class="space-y-4 text-xs" autocomplete="off">
                <div class="admin-form-group">
                    <label class="font-bold">New Admin Username</label>
                    <input type="text" id="sec_user" required placeholder="Enter Username" autocomplete="off" class="admin-form-input font-bold" />
                </div>
                <div class="admin-form-group">
                    <label class="font-bold">New Admin Password</label>
                    <input type="password" id="sec_pass" required placeholder="Enter Password" autocomplete="new-password" class="admin-form-input" />
                </div>
                <button type="submit" class="btn-touch-48 bg-navy-900 hover:bg-navy-950 text-white shadow w-full sm:w-auto">Update Admin Credentials</button>
            </form>
        </div>
    `;
}

async function sha256(str) {
    const buffer = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest('SHA-256', buffer);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

window.handleChangePassword = async function(e) {
    if (e) e.preventDefault();
    const user = document.getElementById('sec_user').value.trim();
    const pass = document.getElementById('sec_pass').value.trim();

    if (!user || !pass) {
        alert('Please enter both username and password.');
        return;
    }

    state.settings.adminUserHash = await sha256(user);
    state.settings.adminPassHash = await sha256(pass);

    saveStore(window.renderApp);
    alert('Admin credentials updated successfully!');
};
