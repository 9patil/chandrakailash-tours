import { getGithubConfig, verifyGithubAuth } from './utils/github.js';

export default async function handler(req, res) {
    try {
        const config = getGithubConfig();
        const hasToken = Boolean(config.token);

        if (!hasToken) {
            return res.status(400).json({
                success: false,
                configured: false,
                message: 'GITHUB_TOKEN environment variable is not configured. Please add GITHUB_TOKEN under Vercel Project Settings ➔ Environment Variables.',
                config: {
                    owner: config.owner,
                    repo: config.repo,
                    branch: config.branch,
                    hasToken: false
                }
            });
        }

        await verifyGithubAuth();

        return res.status(200).json({
            success: true,
            configured: true,
            message: 'GitHub API Authentication & Sync Verified Successfully!',
            config: {
                owner: config.owner,
                repo: config.repo,
                branch: config.branch,
                hasToken: true
            }
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            configured: false,
            message: err.message || 'GitHub Verification Failed',
            config: getGithubConfig()
        });
    }
}
