/* चंद्रकैलाश Tours & Travels - i18n Translation Utilities */

import { state } from '../context/state.js';
import { DEFAULT_I18N } from '../data/initialData.js';

export function t(key) {
    const langDict = state.translations[state.currentLang] || state.translations.en;
    return langDict[key] || DEFAULT_I18N.en[key] || key;
}

export function toggleLanguage(renderCallback) {
    state.currentLang = state.currentLang === 'en' ? 'mr' : 'en';
    if (renderCallback && typeof renderCallback === 'function') {
        renderCallback();
    }
}
