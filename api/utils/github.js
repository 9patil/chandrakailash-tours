/**
 * Helper to read and commit files to GitHub Repository via REST API
 */

const GITHUB_REPO = process.env.GITHUB_REPO || '9patil/chandrakailash-tours';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

export function getGithubToken() {
    return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.VERCEL_GITHUB_TOKEN;
}

export async function getFileFromGithub(path) {
    const token = getGithubToken();
    if (!token) {
        throw new Error('GITHUB_TOKEN environment variable is not configured.');
    }

    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
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
    const token = getGithubToken();
    if (!token) {
        throw new Error('GITHUB_TOKEN environment variable is not configured.');
    }

    // Get current SHA if file exists
    let sha = null;
    try {
        const existing = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
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
        branch: GITHUB_BRANCH
    };
    if (sha) body.sha = sha;

    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'User-Agent': 'Chandrakailash-CMS'
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`GitHub Commit Failed (${response.status}): ${errText}`);
    }

    const result = await response.json();
    return {
        commitSha: result.commit ? result.commit.sha : null,
        downloadUrl: result.content ? result.content.download_url : null,
        path: result.content ? result.content.path : path
    };
}
