import { state } from '../context/state.js';
import { INITIAL_SETTINGS } from '../data/initialData.js';
import { saveStore } from '../services/storage.js';

async function sha256(str) {
    const msgUint8 = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function handleAdminLogin(event) {
    if (event) event.preventDefault();
    const user = document.getElementById('adm_user')?.value.trim() || '';
    const pass = document.getElementById('adm_pass')?.value.trim() || '';

    if (!user || !pass) {
        state.loginErrorMessage = 'Please enter both username and password.';
        return;
    }

    const userHash = await sha256(user);
    const passHash = await sha256(pass);

    const validUserHash = state.settings.adminUserHash || INITIAL_SETTINGS.adminUserHash;
    const validPassHash = state.settings.adminPassHash || INITIAL_SETTINGS.adminPassHash;

    if (userHash === validUserHash && passHash === validPassHash) {
        state.adminLoggedIn = true;
        state.showLoginModal = false;
        state.loginErrorMessage = '';
        state.activeTab = 'admin';
        if (!state.settings.adminUserHash || !state.settings.adminPassHash) {
            state.settings.adminUserHash = INITIAL_SETTINGS.adminUserHash;
            state.settings.adminPassHash = INITIAL_SETTINGS.adminPassHash;
            saveStore(window.renderApp);
        }
    } else {
        state.loginErrorMessage = 'Incorrect admin username or password. Please try again.';
    }
}
