import { commitFileToGithub } from './utils/github.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { imageDataUrl, folder = 'uploads', customFileName } = body || {};

        if (!imageDataUrl || !imageDataUrl.startsWith('data:image/')) {
            return res.status(400).json({ error: 'Invalid or missing imageDataUrl' });
        }

        const matches = imageDataUrl.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
        if (!matches) {
            return res.status(400).json({ error: 'Failed to parse base64 image data' });
        }

        const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
        const base64Data = matches[2];
        const fileName = customFileName || `img-${Date.now()}-${Math.floor(Math.random() * 1000)}.${ext}`;
        const filePath = `public/images/${folder}/${fileName}`;

        console.log('📸 Uploading image to GitHub repo path:', filePath);
        const result = await commitFileToGithub(filePath, base64Data, `CMS: Upload image ${fileName}`, true);

        return res.status(200).json({
            success: true,
            path: `images/${folder}/${fileName}`,
            downloadUrl: result.downloadUrl,
            commitSha: result.commitSha,
            message: 'Image Uploaded Successfully'
        });

    } catch (err) {
        console.error('❌ uploadImage API Error:', err);
        return res.status(500).json({
            error: 'Upload Failed: ' + (err.message || 'Unknown server error')
        });
    }
}
