/* Vercel Serverless Function: Multi-Device Cloud Database REST API */

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const dataDir = path.join(process.cwd(), 'data');

    try {
        if (req.method === 'GET') {
            const pkgsPath = path.join(dataDir, 'packages.json');
            const albumsPath = path.join(dataDir, 'albums.json');
            const settingsPath = path.join(dataDir, 'settings.json');
            const reviewsPath = path.join(dataDir, 'reviews.json');

            const packages = fs.existsSync(pkgsPath) ? JSON.parse(fs.readFileSync(pkgsPath, 'utf8')) : [];
            const albums = fs.existsSync(albumsPath) ? JSON.parse(fs.readFileSync(albumsPath, 'utf8')) : [];
            const settings = fs.existsSync(settingsPath) ? JSON.parse(fs.readFileSync(settingsPath, 'utf8')) : {};
            const reviews = fs.existsSync(reviewsPath) ? JSON.parse(fs.readFileSync(reviewsPath, 'utf8')) : [];

            return res.status(200).json({
                packages,
                albums,
                settings,
                reviews
            });
        }

        if (req.method === 'POST') {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            const { type, data } = body || {};

            if (!type || data === undefined) {
                return res.status(400).json({ error: 'Missing type or data' });
            }

            const targetFile = path.join(dataDir, `${type}.json`);
            fs.writeFileSync(targetFile, JSON.stringify(data, null, 2), 'utf8');

            return res.status(200).json({
                success: true,
                message: `${type} updated successfully in cloud store`,
                type,
                timestamp: new Date().toISOString()
            });
        }

        return res.status(405).json({ error: 'Method Not Allowed' });
    } catch (err) {
        console.error('Cloud DB API Error:', err);
        return res.status(500).json({ error: err.message || 'Cloud Database Sync Error' });
    }
}
