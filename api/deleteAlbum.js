import { getFileFromGithub, commitFileToGithub, verifyGithubAuth } from './utils/github.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    }

    try {
        await verifyGithubAuth();
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { albumId } = body || {};

        if (!albumId) {
            return res.status(400).json({ error: 'Missing albumId' });
        }

        console.log('🗑️ Serverless API: Deleting album ID', albumId);

        const { content } = await getFileFromGithub('data/albums.json');
        let albums = Array.isArray(content) ? content : [];

        const targetAlb = albums.find(a => a.id === albumId);
        albums = albums.filter(a => a.id !== albumId);

        const albTitle = targetAlb ? targetAlb.title : albumId;
        const commitResult = await commitFileToGithub(
            'data/albums.json',
            albums,
            `CMS: Delete album "${albTitle}" (${albumId})`
        );

        return res.status(200).json({
            success: true,
            albumId,
            commitSha: commitResult.commitSha,
            message: 'Album Deleted Successfully'
        });

    } catch (err) {
        console.error('❌ deleteAlbum API Error:', err);
        return res.status(500).json({
            error: 'GitHub Delete Sync Failed: ' + (err.message || 'Unknown server error')
        });
    }
}
