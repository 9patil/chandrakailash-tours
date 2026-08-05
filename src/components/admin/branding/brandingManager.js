/* चंद्रकैलाश Tours & Travels - Branding Manager Component */

import { state } from '../../../context/state.js';
import { renderMediaUploader } from '../../../utils/helpers.js';
import { saveStore } from '../../../services/storage.js';

export function renderBrandingManager() {
    return `
        <div class="space-y-6 w-full max-w-4xl mx-auto admin-container">
            <div class="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
                <div class="border-b pb-3">
                    <h3 class="text-xl font-bold text-navy-900">🏷️ Branding & Typography CMS</h3>
                    <p class="text-xs text-slate-500 mt-1">Manage brand name, slogans, logo image and homepage fallback banners.</p>
                </div>

                <form onsubmit="window.handleSaveBranding(event)" class="space-y-5 text-xs">
                    <div class="admin-form-grid admin-form-grid-2">
                        <div class="admin-form-group">
                            <label class="font-bold text-slate-700">Marathi Brand Name (चंद्रकैलाश)</label>
                            <input type="text" id="bm_marathi" value="${state.settings.brandMarathi || 'चंद्रकैलाश'}" class="admin-form-input font-marathi-calligraphy text-lg font-bold" />
                        </div>
                        <div class="admin-form-group">
                            <label class="font-bold text-slate-700">English Subtitle (Tours & Travels)</label>
                            <input type="text" id="bm_english" value="${state.settings.brandEnglish || 'Tours & Travels'}" class="admin-form-input uppercase font-bold" />
                        </div>
                    </div>

                    <div class="admin-form-group">
                        <label class="font-bold text-slate-700">Hero Tagline / Slogan</label>
                        <input type="text" id="bm_slogan" value="${state.settings.heroTagline || ''}" class="admin-form-input font-marathi-heading font-bold" />
                    </div>

                    <div class="admin-form-group">
                        <label class="font-bold text-slate-700">Hero Subheading</label>
                        <textarea id="bm_subhead" rows="2" class="admin-form-textarea">${state.settings.heroSubheading || ''}</textarea>
                    </div>

                    <div class="admin-form-grid admin-form-grid-2 pt-2 border-t">
                        <div>
                            ${renderMediaUploader({ 
                                id: 'bm_logo', 
                                label: 'Company Brand Logo Image', 
                                currentImage: state.tempBrandingLogo !== undefined ? state.tempBrandingLogo : state.settings.logoUrl, 
                                helperText: 'Click or drop logo image file from computer.' 
                            })}
                        </div>
                        <div>
                            ${renderMediaUploader({ 
                                id: 'bm_herobg', 
                                label: 'Main Homepage Background Fallback', 
                                currentImage: state.tempBrandingHeroBg !== undefined ? state.tempBrandingHeroBg : state.settings.heroBgImage, 
                                helperText: 'Click or drop default hero background photo.' 
                            })}
                        </div>
                    </div>

                    <div class="pt-3">
                        <button type="submit" class="btn-touch-48 bg-saffron-500 hover:bg-saffron-600 text-white shadow w-full sm:w-auto">
                            Save Branding Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

window.handleSaveBranding = function(e) {
    if (e) e.preventDefault();
    state.settings.brandMarathi = document.getElementById('bm_marathi').value;
    state.settings.brandEnglish = document.getElementById('bm_english').value;
    state.settings.heroTagline = document.getElementById('bm_slogan').value;
    state.settings.heroSubheading = document.getElementById('bm_subhead').value;

    if (state.tempBrandingLogo !== undefined) {
        state.settings.logoUrl = state.tempBrandingLogo;
    }
    if (state.tempBrandingHeroBg !== undefined) {
        state.settings.heroBgImage = state.tempBrandingHeroBg;
    }

    saveStore(window.renderApp);
    alert('Branding settings saved successfully!');
};
