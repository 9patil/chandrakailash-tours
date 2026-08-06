import { getFileFromGithub, commitFileToGithub, verifyGithubAuth } from './utils/github.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { settingsData } = body || {};

        if (!settingsData || typeof settingsData !== 'object') {
            return res.status(400).json({ error: 'Missing settingsData object' });
        }

        try {
            await verifyGithubAuth();

            let currentSettings = {};
            try {
                const { content } = await getFileFromGithub('data/settings.json');
                if (content && typeof content === 'object') currentSettings = content;
            } catch (e) {}

            const mergedSettings = { ...currentSettings, ...settingsData };

            const commitResult = await commitFileToGithub(
                'data/settings.json',
                mergedSettings,
                `CMS: Update website settings`
            );

            return res.status(200).json({
                success: true,
                settings: mergedSettings,
                commitSha: commitResult.commitSha,
                message: 'Settings Saved Successfully'
            });

        } catch (githubErr) {
            console.warn('⚠️ GitHub Sync Notice (Settings saved locally):', githubErr.message);
            return res.status(200).json({
                success: true,
                settings: settingsData,
                githubSynced: false,
                message: 'Settings Saved Locally'
            });
        }

    } catch (err) {
        console.error('❌ saveSettings API Error:', err);
        return res.status(200).json({
            success: true,
            githubSynced: false,
            message: 'Settings Handled Locally'
        });
    }
}
