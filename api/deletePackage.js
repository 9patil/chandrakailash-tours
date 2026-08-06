import { getFileFromGithub, commitFileToGithub } from './utils/github.js';

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

        console.log('🗑️ Serverless API: Deleting package ID', packageId);

        const { content } = await getFileFromGithub('data/packages.json');
        let packages = Array.isArray(content) ? content : [];

        const targetPkg = packages.find(p => p.id === packageId);
        packages = packages.filter(p => p.id !== packageId);

        const pkgName = targetPkg ? targetPkg.name : packageId;
        const commitResult = await commitFileToGithub(
            'data/packages.json',
            packages,
            `CMS: Delete tour package "${pkgName}" (${packageId})`
        );

        return res.status(200).json({
            success: true,
            packageId,
            commitSha: commitResult.commitSha,
            message: 'Package Deleted Successfully'
        });

    } catch (err) {
        console.error('❌ deletePackage API Error:', err);
        return res.status(500).json({
            error: 'GitHub Delete Sync Failed: ' + (err.message || 'Unknown server error')
        });
    }
}
