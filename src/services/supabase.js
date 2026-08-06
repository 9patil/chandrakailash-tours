/* चंद्रकैलाश Tours & Travels - Supabase Central Database Service */

import { state, ensurePackagesHaveSlugsAndHeroProps } from '../context/state.js';

// Default Supabase project credentials (can be configured via Admin Settings or window.ENV_SUPABASE_URL)
const DEFAULT_SUPABASE_URL = 'https://chandrakailashtours.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoYW5kcmFrYWlsYXNodG91cnMiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoyMDE1NTc2MDAwfQ.demo_key';

export function getSupabaseCredentials() {
    const customUrl = state.settings && state.settings.supabaseUrl;
    const customKey = state.settings && state.settings.supabaseKey;

    const url = (customUrl && customUrl.trim()) ? customUrl.trim() : (window.ENV_SUPABASE_URL || DEFAULT_SUPABASE_URL);
    const key = (customKey && customKey.trim()) ? customKey.trim() : (window.ENV_SUPABASE_KEY || DEFAULT_SUPABASE_ANON_KEY);

    return { url: (url || '').replace(/\/+$/, ''), key: (key || '').trim() };
}

export function isSupabaseConfigured() {
    const { url, key } = getSupabaseCredentials();
    return Boolean(url && key && url.startsWith('http') && !url.includes('demo_key') && !url.includes('xyzcompany'));
}

async function supabaseRequest(table, options = {}) {
    const { url, key } = getSupabaseCredentials();
    if (!url || !key || url.includes('demo_key')) {
        throw new Error('Supabase project URL or Key not configured.');
    }

    const endpoint = `${url}/rest/v1/${table}${options.query || ''}`;
    const headers = {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };

    const response = await fetch(endpoint, {
        method: options.method || 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Supabase HTTP ${response.status}: ${errorText}`);
    }

    if (response.status === 204) return null;
    return await response.json();
}

/**
 * Hydrates state from Supabase central cloud database
 */
export async function fetchStateFromSupabase() {
    try {
        if (!isSupabaseConfigured()) return false;

        const rows = await supabaseRequest('ck_cms_store', { query: '?select=*' });
        if (!Array.isArray(rows) || rows.length === 0) return false;

        let loadedSections = 0;
        rows.forEach(row => {
            if (row.id === 'settings' && row.content) {
                state.settings = { ...state.settings, ...row.content };
                loadedSections++;
            } else if (row.id === 'packages' && Array.isArray(row.content)) {
                state.packages = row.content;
                loadedSections++;
            } else if (row.id === 'albums' && Array.isArray(row.content)) {
                state.albums = row.content;
                loadedSections++;
            } else if (row.id === 'reviews' && Array.isArray(row.content)) {
                state.reviews = row.content;
                loadedSections++;
            } else if (row.id === 'bookings' && Array.isArray(row.content)) {
                state.bookings = row.content;
                loadedSections++;
            } else if (row.id === 'translations' && row.content) {
                state.translations = row.content;
                loadedSections++;
            }
        });

        ensurePackagesHaveSlugsAndHeroProps();
        return loadedSections > 0;
    } catch (err) {
        console.warn('ℹ️ Supabase Cloud Sync:', err.message);
        return false;
    }
}

/**
 * Upsert a single CMS section to Supabase
 */
export async function saveSectionToSupabase(sectionId, contentData) {
    try {
        if (!isSupabaseConfigured()) return false;

        await supabaseRequest('ck_cms_store', {
            method: 'POST',
            headers: { 'Prefer': 'resolution=merge-duplicates' },
            body: {
                id: sectionId,
                content: contentData,
                updated_at: new Date().toISOString()
            }
        });

        return true;
    } catch (err) {
        console.warn(`⚠️ Supabase save failed for ${sectionId}:`, err.message);
        return false;
    }
}

/**
 * Push all CMS state sections to Supabase
 */
export async function saveAllToSupabase() {
    try {
        if (!isSupabaseConfigured()) return false;

        await Promise.all([
            saveSectionToSupabase('settings', state.settings),
            saveSectionToSupabase('packages', state.packages),
            saveSectionToSupabase('albums', state.albums),
            saveSectionToSupabase('reviews', state.reviews),
            saveSectionToSupabase('bookings', state.bookings),
            saveSectionToSupabase('translations', state.translations)
        ]);

        return true;
    } catch (err) {
        console.error('Supabase full sync error:', err);
        return false;
    }
}

/**
 * Test Supabase Database Connection
 */
export async function testSupabaseConnection() {
    try {
        const { url, key } = getSupabaseCredentials();
        if (!url || !key) return { success: false, message: 'Supabase URL or Key missing.' };

        const rows = await supabaseRequest('ck_cms_store', { query: '?select=id&limit=1' });
        return { success: true, message: 'Successfully connected to Supabase Database!' };
    } catch (err) {
        return { success: false, message: err.message };
    }
}
