/* चंद्रकैलाश Tours & Travels - Toast Notification System */

export function showToast(message, type = 'success', duration = 3500) {
    try {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 pointer-events-none max-w-sm w-full px-4';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        const isSuccess = type === 'success';
        const isError = type === 'error';
        const isWarning = type === 'warning';

        const bgClass = isSuccess 
            ? 'bg-navy-950 border-saffron-500 text-white shadow-saffron-500/20' 
            : (isError 
                ? 'bg-rose-950 border-rose-500 text-white shadow-rose-500/20' 
                : (isWarning ? 'bg-amber-950 border-amber-500 text-white shadow-amber-500/20' : 'bg-navy-900 border-sky-400 text-white'));

        const icon = isSuccess ? '✅' : (isError ? '🚨' : (isWarning ? '⚠️' : 'ℹ️'));

        toast.className = `pointer-events-auto p-4 rounded-2xl border-2 shadow-2xl ${bgClass} flex items-center justify-between gap-3 text-xs font-bold transition-all duration-300 transform translate-y-4 opacity-0`;
        toast.innerHTML = `
            <div class="flex items-center gap-2.5">
                <span class="text-base">${icon}</span>
                <span class="leading-snug">${message}</span>
            </div>
            <button type="button" onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white text-sm font-bold p-1 min-w-[28px] min-h-[28px] flex items-center justify-center rounded-lg hover:bg-white/10">✕</button>
        `;

        container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.remove('opacity-0', 'translate-y-4');
        });

        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-4');
            setTimeout(() => {
                try { toast.remove(); } catch (e) {}
            }, 300);
        }, duration);
    } catch (e) {
        console.log(message);
    }
}

if (typeof window !== 'undefined') {
    window.showToast = showToast;
}
