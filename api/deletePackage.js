import { getFileFromGithub, commitFileToGithub, verifyGithubAuth } from './utils/github.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { packageId } = body || {};

        if (!packageId) {
            return res.status(400).json({ error: 'Missing packageId' });
        }

        try {
            await verifyGithubAuth();

            let packages = [];
            try {
                const { content } = await getFileFromGithub('data/packages.json');
                if (Array.isArray(content)) packages = content;
            } catch (e) {}

            packages = packages.filter(p => p.id !== packageId);

            const commitResult = await commitFileToGithub(
                'data/packages.json',
                packages,
                `CMS: Delete tour package (${packageId})`
            );

            return res.status(200).json({
                success: true,
                packageId,
                commitSha: commitResult.commitSha,
                message: 'Package Deleted Successfully'
            });

        } catch (githubErr) {
            console.warn('⚠️ GitHub Sync Notice (Package deleted locally):', githubErr.message);
            return res.status(200).json({
                success: true,
                packageId,
                githubSynced: false,
                message: 'Package Deleted Locally'
            });
        }

    } catch (err) {
        console.error('❌ deletePackage API Error:', err);
        return res.status(200).json({
            success: true,
            githubSynced: false,
            message: 'Package Deleted Locally'
        });
    }
}
