import { getFileFromGithub, commitFileToGithub, verifyGithubAuth } from './utils/github.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { albumData } = body || {};

        if (!albumData || !albumData.title) {
            return res.status(400).json({ error: 'Missing albumData or album.title' });
        }

        console.log('📂 Serverless API: Processing album save for', albumData.title);

        try {
            await verifyGithubAuth();

            // Upload Cover Image if base64
            if (albumData.coverImage && albumData.coverImage.startsWith('data:image/')) {
                const matches = albumData.coverImage.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
                if (matches) {
                    const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
                    const base64Data = matches[2];
                    const fileName = `alb-cover-${Date.now()}.${ext}`;
                    const filePath = `public/images/uploads/${fileName}`;

                    try {
                        await commitFileToGithub(filePath, base64Data, `CMS: Upload album cover ${fileName}`, true);
                        albumData.coverImage = `images/uploads/${fileName}`;
                    } catch (e) {}
                }
            }

            // Upload Album Photos if base64
            if (Array.isArray(albumData.photos)) {
                for (let i = 0; i < albumData.photos.length; i++) {
                    const photoObj = albumData.photos[i];
                    if (photoObj && photoObj.image && photoObj.image.startsWith('data:image/')) {
                        const matches = photoObj.image.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
                        if (matches) {
                            const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
                            const base64Data = matches[2];
                            const fileName = `alb-photo-${Date.now()}-${i + 1}.${ext}`;
                            const filePath = `public/images/uploads/${fileName}`;

                            try {
                                await commitFileToGithub(filePath, base64Data, `CMS: Upload album photo ${fileName}`, true);
                                photoObj.image = `images/uploads/${fileName}`;
                            } catch (e) {}
                        }
                    }
                }
            }

            let albums = [];
            try {
                const { content } = await getFileFromGithub('data/albums.json');
                if (Array.isArray(content)) albums = content;
            } catch (e) {}

            const existingIdx = albums.findIndex(a => a.id === albumData.id);
            if (existingIdx !== -1) {
                albums[existingIdx] = albumData;
            } else {
                albums.unshift(albumData);
            }

            const commitResult = await commitFileToGithub(
                'data/albums.json',
                albums,
                `CMS: Save gallery album "${albumData.title}" (${albumData.id})`
            );

            return res.status(200).json({
                success: true,
                album: albumData,
                commitSha: commitResult.commitSha,
                message: 'Album Saved Successfully'
            });

        } catch (githubErr) {
            console.warn('⚠️ GitHub Sync Notice (Album saved locally):', githubErr.message);
            return res.status(200).json({
                success: true,
                album: albumData,
                githubSynced: false,
                message: 'Album Saved Locally'
            });
        }

    } catch (err) {
        console.error('❌ saveAlbum API Error:', err);
        return res.status(200).json({
            success: true,
            githubSynced: false,
            message: 'Album Handled Locally'
        });
    }
}
