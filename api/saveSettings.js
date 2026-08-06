import { commitFileToGithub } from './utils/github.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { settingsData } = body || {};

        if (!settingsData) {
            return res.status(400).json({ error: 'Missing settingsData' });
        }

        console.log('⚙️ Serverless API: Processing settings save');

        // Handle Logo Upload if base64
        if (settingsData.logoUrl && settingsData.logoUrl.startsWith('data:image/')) {
            const matches = settingsData.logoUrl.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
            if (matches) {
                const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
                const base64Data = matches[2];
                const fileName = `brand-logo-${Date.now()}.${ext}`;
                const filePath = `public/images/uploads/${fileName}`;

                await commitFileToGithub(filePath, base64Data, `CMS: Upload brand logo ${fileName}`, true);
                settingsData.logoUrl = `images/uploads/${fileName}`;
            }
        }

        // Handle Hero Background Upload if base64
        if (settingsData.heroBgImage && settingsData.heroBgImage.startsWith('data:image/')) {
            const matches = settingsData.heroBgImage.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
            if (matches) {
                const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
                const base64Data = matches[2];
                const fileName = `hero-bg-${Date.now()}.${ext}`;
                const filePath = `public/images/uploads/${fileName}`;

                await commitFileToGithub(filePath, base64Data, `CMS: Upload hero background ${fileName}`, true);
                settingsData.heroBgImage = `images/uploads/${fileName}`;
            }
        }

        const commitResult = await commitFileToGithub(
            'data/settings.json',
            settingsData,
            'CMS: Update website settings & branding'
        );

        return res.status(200).json({
            success: true,
            settings: settingsData,
            commitSha: commitResult.commitSha,
            message: 'Settings Saved Successfully'
        });

    } catch (err) {
        console.error('❌ saveSettings API Error:', err);
        return res.status(500).json({
            error: 'GitHub Settings Sync Failed: ' + (err.message || 'Unknown server error')
        });
    }
}
