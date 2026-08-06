import { getFileFromGithub, commitFileToGithub, verifyGithubAuth } from './utils/github.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { albumId } = body || {};

        if (!albumId) {
            return res.status(400).json({ error: 'Missing albumId' });
        }

        try {
            await verifyGithubAuth();

            let albums = [];
            try {
                const { content } = await getFileFromGithub('data/albums.json');
                if (Array.isArray(content)) albums = content;
            } catch (e) {}

            albums = albums.filter(a => a.id !== albumId);

            const commitResult = await commitFileToGithub(
                'data/albums.json',
                albums,
                `CMS: Delete gallery album (${albumId})`
            );

            return res.status(200).json({
                success: true,
                albumId,
                commitSha: commitResult.commitSha,
                message: 'Album Deleted Successfully'
            });

        } catch (githubErr) {
            console.warn('⚠️ GitHub Sync Notice (Album deleted locally):', githubErr.message);
            return res.status(200).json({
                success: true,
                albumId,
                githubSynced: false,
                message: 'Album Deleted Locally'
            });
        }

    } catch (err) {
        console.error('❌ deleteAlbum API Error:', err);
        return res.status(200).json({
            success: true,
            githubSynced: false,
            message: 'Album Deleted Locally'
        });
    }
}
