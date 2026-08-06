import { getFileFromGithub, commitFileToGithub, verifyGithubAuth } from './utils/github.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    }

    try {
        await verifyGithubAuth();
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { packageData } = body || {};

        if (!packageData || !packageData.name) {
            return res.status(400).json({ error: 'Missing packageData or package.name' });
        }

        console.log('📦 Serverless API: Processing package save for', packageData.name);

        // Handle Cover Image Upload to GitHub if base64
        if (packageData.coverImage && packageData.coverImage.startsWith('data:image/')) {
            console.log('📸 Uploading cover image to GitHub...');
            const matches = packageData.coverImage.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
            if (matches) {
                const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
                const base64Data = matches[2];
                const fileName = `pkg-cover-${Date.now()}.${ext}`;
                const filePath = `public/images/uploads/${fileName}`;

                await commitFileToGithub(filePath, base64Data, `CMS: Upload cover image ${fileName}`, true);
                packageData.coverImage = `images/uploads/${fileName}`;
            }
        }

        // Handle Gallery Images Upload to GitHub if base64
        if (Array.isArray(packageData.packageGallery)) {
            const updatedGallery = [];
            for (let i = 0; i < packageData.packageGallery.length; i++) {
                const img = packageData.packageGallery[i];
                if (typeof img === 'string' && img.startsWith('data:image/')) {
                    console.log(`🖼️ Uploading gallery image ${i + 1} to GitHub...`);
                    const matches = img.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
                    if (matches) {
                        const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
                        const base64Data = matches[2];
                        const fileName = `pkg-gal-${Date.now()}-${i + 1}.${ext}`;
                        const filePath = `public/images/uploads/${fileName}`;

                        await commitFileToGithub(filePath, base64Data, `CMS: Upload gallery photo ${fileName}`, true);
                        updatedGallery.push(`images/uploads/${fileName}`);
                    } else {
                        updatedGallery.push(img);
                    }
                } else {
                    updatedGallery.push(img);
                }
            }
            packageData.packageGallery = updatedGallery;
        }

        // Fetch current packages.json from GitHub
        console.log('📄 Updating data/packages.json on GitHub...');
        let packages = [];
        try {
            const { content } = await getFileFromGithub('data/packages.json');
            if (Array.isArray(content)) packages = content;
        } catch (e) {
            console.warn('Could not read existing packages.json, initializing fresh array:', e.message);
        }

        const existingIdx = packages.findIndex(p => p.id === packageData.id);
        if (existingIdx !== -1) {
            packages[existingIdx] = packageData;
        } else {
            packages.unshift(packageData);
        }

        const commitResult = await commitFileToGithub(
            'data/packages.json',
            packages,
            `CMS: Save tour package "${packageData.name}" (${packageData.id})`
        );

        console.log('✅ Package committed successfully:', commitResult.commitSha);
        return res.status(200).json({
            success: true,
            package: packageData,
            commitSha: commitResult.commitSha,
            message: 'Package Saved Successfully'
        });

    } catch (err) {
        console.error('❌ savePackage API Error:', err);
        return res.status(500).json({
            error: err.message || 'Unknown server error'
        });
    }
}
