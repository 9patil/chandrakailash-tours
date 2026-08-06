/**
 * Helper to read and commit files to GitHub Repository via REST API
 */

export function getGithubConfig() {
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.VERCEL_GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER || '9patil';
    let repoName = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG || 'chandrakailash-tours';
    const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main';

    let fullRepo = repoName;
    if (!fullRepo.includes('/') && owner) {
        fullRepo = `${owner}/${repoName}`;
    }

    return {
        token,
        owner,
        repo: fullRepo,
        repoName: repoName.includes('/') ? repoName.split('/')[1] : repoName,
        branch
    };
}

export function validateGithubConfig() {
    const config = getGithubConfig();
    if (!config.token) {
        throw new Error('GitHub Sync Failed: GITHUB_TOKEN environment variable is not configured. Please add GITHUB_TOKEN under Vercel Project Settings ➔ Environment Variables.');
    }
    return config;
}

export async function verifyGithubAuth() {
    const config = validateGithubConfig();
    const url = `https://api.github.com/repos/${config.repo}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${config.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Chandrakailash-CMS'
        }
    });

    if (!response.ok) {
        const errText = await response.text();
        if (response.status === 401 || response.status === 403) {
            throw new Error(`GitHub Authentication Failed (${response.status}): Invalid token or insufficient permissions. Ensure GITHUB_TOKEN has 'Contents: Read and write' permissions for '${config.repo}'.`);
        } else if (response.status === 404) {
            throw new Error(`GitHub Repository Not Found (${response.status}): Repository '${config.repo}' does not exist or token lacks access.`);
        } else {
            throw new Error(`GitHub API Verification Error (${response.status}): ${errText}`);
        }
    }

    return true;
}

export async function getFileFromGithub(path) {
    const config = validateGithubConfig();

    const url = `https://api.github.com/repos/${config.repo}/contents/${path}?ref=${config.branch}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${config.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Chandrakailash-CMS'
        }
    });

    if (!response.ok) {
        if (response.status === 404) return { sha: null, content: null };
        const errText = await response.text();
        throw new Error(`GitHub API fetch error (${response.status}): ${errText}`);
    }

    const json = await response.json();
    const content = Buffer.from(json.content, 'base64').toString('utf-8');
    return { sha: json.sha, content: JSON.parse(content) };
}

export async function commitFileToGithub(path, content, message, isBase64 = false) {
    const config = validateGithubConfig();

    // Get current SHA if file exists
    let sha = null;
    try {
        const existing = await fetch(`https://api.github.com/repos/${config.repo}/contents/${path}?ref=${config.branch}`, {
            headers: {
                'Authorization': `Bearer ${config.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Chandrakailash-CMS'
            }
        });
        if (existing.ok) {
            const data = await existing.json();
            sha = data.sha;
        }
    } catch (e) {}

    const base64Content = isBase64 
        ? content 
        : Buffer.from(typeof content === 'string' ? content : JSON.stringify(content, null, 2)).toString('base64');

    const body = {
        message: message,
        content: base64Content,
        branch: config.branch
    };
    if (sha) body.sha = sha;

    const url = `https://api.github.com/repos/${config.repo}/contents/${path}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${config.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'User-Agent': 'Chandrakailash-CMS'
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errText = await response.text();
        if (response.status === 403) {
            throw new Error(`GitHub Permission Error (403): Your GITHUB_TOKEN does not have write access to repository '${config.repo}'. Please edit your token on GitHub ➔ set 'Repository Permissions' ➔ 'Contents' to 'Read and write'.`);
        }
        throw new Error(`GitHub Commit Failed (${response.status}): ${errText}`);
    }

    const result = await response.json();
    return {
        commitSha: result.commit ? result.commit.sha : null,
        downloadUrl: result.content ? result.content.download_url : null,
        path: result.content ? result.content.path : path
    };
}
