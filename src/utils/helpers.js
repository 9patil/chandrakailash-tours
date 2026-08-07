/* चंद्रकैलाश Tours & Travels - General Utility Helpers & Media Engine */

import { state, uploaderState } from '../context/state.js';

export function getWhatsAppUrl(pkgName = '') {
    if (!pkgName || pkgName === 'General Enquiry') {
        const text = `🙏 Namaskar Chandrakailash Tours & Travels,\n\nI am interested in your tour packages.\n\nCould you please share details of available tour packages?\n\nThank you!`;
        return `https://wa.me/${state.settings.whatsapp || '919960833090'}?text=${encodeURIComponent(text)}`;
    }
    const text = `🙏 Namaskar Chandrakailash Tours & Travels,\n\nI am interested in the *${pkgName}* tour package.\n\nCould you please share:\n\n• Complete Tour Plan / Itinerary\n• Available Travel Dates\n• Price Details\n• Booking Process\n\nThank you!`;
    return `https://wa.me/${state.settings.whatsapp || '919960833090'}?text=${encodeURIComponent(text)}`;
}

export function getInstagramUrl() {
    let handle = state.settings.instagram || 'chandrakailash_tours';
    handle = handle.replace('@', '').trim();
    if (handle.startsWith('http://') || handle.startsWith('https://')) {
        return handle;
    }
    return `https://instagram.com/${handle}`;
}

export function createSlug(text) {
    if (!text) return '';
    return text.toString().toLowerCase()
        .trim()
        .replace(/[\s_\-]+/g, '-')
        .replace(/[^a-z0-9\-]+/g, '')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export function renderLogoSvg(variant = 'horizontal') {
    if (state.settings.logoUrl) {
        return `
            <div class="flex items-center gap-3">
                <img src="${state.settings.logoUrl}" alt="${state.settings.companyName}" class="h-10 w-auto object-contain" />
                <div>
                    <span class="text-2xl md:text-3xl font-extrabold font-marathi-calligraphy tracking-tight drop-shadow-sm text-white">${state.settings.brandMarathi || 'चंद्रकैलाश'}</span>
                    <div class="text-[10px] md:text-xs font-bold tracking-widest uppercase text-saffron-400">${state.settings.brandEnglish || 'TOURS & TRAVELS'}</div>
                </div>
            </div>
        `;
    }

    const isDarkBackground = variant === 'white' || variant === 'dark' || variant === 'square';
    const textColorPrimary = isDarkBackground ? '#FFFFFF' : '#0B1F3A';
    const textColorSecondary = '#FF9800';
    const mountainColor = isDarkBackground ? '#FFFFFF' : '#0B1F3A';

    return `
        <div class="flex items-center gap-3">
            <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0">
                <circle cx="50" cy="40" r="26" fill="url(#sunGlowHoriz)"/>
                <defs>
                    <radialGradient id="sunGlowHoriz" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 40) rotate(90) scale(26)">
                        <stop stop-color="#FF9800"/>
                        <stop offset="1" stop-color="#E65100"/>
                    </radialGradient>
                </defs>
                <path d="M12 78L40 38L56 58L72 32L90 78H12Z" fill="${mountainColor}" stroke="#FF9800" stroke-width="3"/>
                <rect x="30" y="68" width="40" height="14" rx="3" fill="#F57C00"/>
                <circle cx="38" cy="82" r="2.5" fill="#FFFFFF"/>
                <circle cx="62" cy="82" r="2.5" fill="#FFFFFF"/>
            </svg>
            <div>
                <span class="text-2xl md:text-3xl font-extrabold font-marathi-calligraphy tracking-tight drop-shadow-sm" style="color: ${textColorPrimary};">${state.settings.brandMarathi || 'चंद्रकैलाश'}</span>
                <div class="flex items-center gap-1.5 leading-none">
                    <span class="text-[10px] md:text-xs font-bold tracking-widest uppercase" style="color: ${textColorSecondary};">${state.settings.brandEnglish || 'TOURS & TRAVELS'}</span>
                </div>
            </div>
        </div>
    `;
}

export function compressBase64Image(base64Str, maxWidth = 800, quality = 0.6) {
    return new Promise((resolve) => {
        if (!base64Str || typeof base64Str !== 'string' || !base64Str.startsWith('data:image/')) {
            return resolve(base64Str);
        }
        const img = new Image();
        img.onload = () => {
            let width = img.width;
            let height = img.height;
            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', quality);
            resolve(compressed);
        };
        img.onerror = () => resolve(base64Str);
        img.src = base64Str;
    });
}

export function compressImageFile(file, options = {}) {
    return new Promise((resolve, reject) => {
        const maxWidth = options.maxWidth || 1200;
        const maxHeight = options.maxHeight || 1200;
        const quality = options.quality || 0.75;
        const maxSizeMB = 10;

        if (file.size > maxSizeMB * 1024 * 1024) {
            const fileMB = (file.size / (1024 * 1024)).toFixed(1);
            return reject(new Error(`File "${file.name}" (${fileMB} MB) exceeds the 10 MB maximum limit. Please select an image under 10 MB.`));
        }

        const fileNameLower = (file.name || '').toLowerCase();
        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        const isValidExt = validExtensions.some(ext => fileNameLower.endsWith(ext));
        const isValidType = file.type ? file.type.toLowerCase().startsWith('image/') : isValidExt;

        if (!isValidType && !isValidExt) {
            return reject(new Error(`Invalid file format for "${file.name}". Only JPG, JPEG, PNG, and WEBP images are allowed.`));
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > maxWidth || height > maxHeight) {
                    if (width / height > maxWidth / maxHeight) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    } else {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);

                let mimeType = 'image/webp';
                let dataUrl = canvas.toDataURL(mimeType, quality);

                if (!dataUrl || !dataUrl.startsWith('data:image/webp')) {
                    mimeType = 'image/jpeg';
                    dataUrl = canvas.toDataURL(mimeType, quality);
                }

                const base64Str = dataUrl.split(',')[1] || '';
                const compressedSize = Math.round((base64Str.length * 3) / 4);
                const savingsPercent = Math.max(0, Math.round(((file.size - compressedSize) / file.size) * 100));

                resolve({
                    dataUrl,
                    originalSize: file.size,
                    compressedSize,
                    savingsPercent,
                    width,
                    height,
                    fileName: file.name,
                    mimeType
                });
            };
            img.onerror = () => reject(new Error(`Could not decode image "${file.name}".`));
            img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error(`Failed to read file "${file.name}".`));
        reader.readAsDataURL(file);
    });
}

export function renderMediaUploader({ id, label, currentImage, allowMultiple = false, helperText = '' }) {
    const prog = uploaderState.progress[id];
    const isDragOver = uploaderState.dragOver[id];
    
    let activeImage = currentImage;
    if (uploaderState.previews[id] !== undefined) {
        activeImage = uploaderState.previews[id];
    }

    let html = `<div class="media-uploader-wrapper space-y-2 w-full">`;
    if (label) {
        html += `<label class="block font-bold text-slate-700 text-xs">${label}</label>`;
    }

    if (prog && prog.active) {
        html += `
            <div class="bg-saffron-50 border-2 border-saffron-300 rounded-2xl p-5 text-center space-y-3 shadow-inner w-full">
                <div class="flex items-center justify-center gap-2 text-saffron-600 font-bold text-xs">
                    <i class="fa-solid fa-spinner fa-spin text-lg"></i>
                    <span>${prog.status || 'Compressing & Optimizing Image...'}</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div class="bg-saffron-500 h-2.5 rounded-full transition-all duration-300" style="width: ${prog.percent || 50}%"></div>
                </div>
                <p class="text-[11px] text-slate-500 font-medium">${prog.fileName ? 'File: ' + prog.fileName : 'Optimizing image resolution...'}</p>
            </div>
        `;
    } 
    else if (activeImage && !allowMultiple) {
        html += `
            <div class="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 shadow-md group transition hover:shadow-lg w-full">
                <div class="h-44 w-full flex items-center justify-center bg-slate-950/60 backdrop-blur overflow-hidden relative">
                    <img src="${activeImage}" alt="Uploaded Image" class="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105" />
                    <span class="absolute top-2.5 left-2.5 bg-emerald-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1 backdrop-blur-sm">
                        <i class="fa-solid fa-shield-halved"></i> Web Optimized
                    </span>
                </div>

                <div class="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                    <button type="button" onclick="triggerFilePicker('${id}')" class="btn-premium bg-slate-100 hover:bg-slate-200 text-navy-900 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm min-h-[48px]">
                        <i class="fa-solid fa-arrows-rotate text-saffron-500"></i> Replace Image
                    </button>
                    
                    <div class="flex items-center gap-2">
                        <button type="button" onclick="openLightboxSingle('${activeImage}', '${label || 'Preview'}')" class="text-slate-500 hover:text-navy-900 text-xs font-bold px-2 py-1 min-h-[48px]">
                            <i class="fa-solid fa-eye"></i> Preview
                        </button>
                        <button type="button" onclick="removeUploaderImage('${id}')" class="btn-premium bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 border border-rose-200 min-h-[48px]">
                            <i class="fa-solid fa-trash-can"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    else {
        html += `
            <div 
                id="dropzone_${id}"
                ondragover="handleUploaderDragOver(event, '${id}')"
                ondragleave="handleUploaderDragLeave(event, '${id}')"
                ondrop="handleUploaderDrop(event, '${id}', ${allowMultiple})"
                onclick="triggerFilePicker('${id}')"
                class="uploader-box-responsive border-2 border-dashed ${isDragOver ? 'border-saffron-500 bg-saffron-50/80 scale-[1.01]' : 'border-slate-300 bg-slate-50/80 hover:bg-saffron-50/40 hover:border-saffron-400'} rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 relative group shadow-sm flex flex-col items-center justify-center min-h-[140px] w-full"
            >
                <div class="w-11 h-11 rounded-full bg-saffron-100 text-saffron-600 flex items-center justify-center text-lg mb-2 group-hover:scale-110 group-hover:bg-saffron-500 group-hover:text-white transition duration-300 shadow-sm">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                </div>
                <h4 class="font-bold text-navy-900 text-xs md:text-sm">
                    Drag & drop ${allowMultiple ? 'images' : 'image'} here, or <span class="text-saffron-600 underline font-extrabold">Browse Files</span>
                </h4>
                <p class="text-[11px] text-slate-400 mt-1 font-medium">
                    Accepted formats: <span class="font-bold text-slate-600">JPG, JPEG, PNG, WEBP</span> • Max size: <span class="font-bold text-slate-600">10 MB</span> per image
                </p>
                ${helperText ? `<p class="text-[10px] text-saffron-600 font-semibold mt-1">${helperText}</p>` : ''}
            </div>
        `;
    }

    html += `
        <input 
            type="file" 
            id="file_input_${id}" 
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" 
            ${allowMultiple ? 'multiple' : ''} 
            onchange="handleUploaderFileSelect(event, '${id}', ${allowMultiple})" 
            class="hidden" 
        />
    </div>`;

    return html;
}

const isDefaultBusImage = (url) => typeof url === 'string' && (url.includes('photo-1561361513-2d000a50f0dc') || (url.includes('bus') && url.includes('unsplash')));

export function getDynamicPackageAlbums() {
    return (state.packages || []).map(pkg => {
        const rawGallery = Array.isArray(pkg.packageGallery) ? pkg.packageGallery : [];
        const cleanGallery = rawGallery.filter(img => img && typeof img === 'string' && !isDefaultBusImage(img));

        const coverImg = (pkg.coverImage && !isDefaultBusImage(pkg.coverImage))
            ? pkg.coverImage
            : (cleanGallery[0] || 'https://images.unsplash.com/photo-1609946850426-3023b49c716d?auto=format&fit=crop&w=1000&q=80');

        const uniqueImgs = Array.from(new Set([coverImg, ...cleanGallery].filter(Boolean)));
        
        const yearMatch = (pkg.dates || '').match(/20\d\d/);
        const year = yearMatch ? yearMatch[0] : '2026';
        
        const photos = uniqueImgs.map((img, idx) => ({
            id: `${pkg.id}_img_${idx}`,
            title: `${pkg.name} - Photo ${idx + 1}`,
            image: img
        }));

        let category = 'Family Tour';
        if (pkg.destination) {
            category = pkg.destination.split('(')[0].trim();
        } else if (pkg.category) {
            category = pkg.category;
        }

        return {
            id: pkg.id,
            title: pkg.name,
            description: pkg.shortDesc || `Official tour photos from ${pkg.name}.`,
            coverImage: coverImg,
            category: category,
            year: year,
            photos: photos
        };
    });
}

