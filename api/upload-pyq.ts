import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Octokit } from '@octokit/rest';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'priyansunegi-dev0';
const REPO_NAME = 'GEHU-Archive';
const BASE_BRANCH = 'main';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: 'Server misconfiguration: GitHub token missing.' });
  }

  try {
    const { fileName, fileBase64, folderPath, credit } = req.body;

    if (!fileName || !fileBase64 || !folderPath) {
      return res.status(400).json({ error: 'fileName, fileBase64, and folderPath are required.' });
    }

    // Sanitize file name (keep alphanumeric, spaces, dots, dashes, underscores)
    const safeName = fileName.replace(/[^a-zA-Z0-9 ._\-]/g, '_');

    // Build the file path inside the repo: public/pdfs/<folderPath>/<filename>
    const filePath = `public/pdfs/${folderPath}/${safeName}`;

    const octokit = new Octokit({ auth: GITHUB_TOKEN });

    // 1. Get base branch SHA
    const { data: refData } = await octokit.git.getRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: `heads/${BASE_BRANCH}`,
    });
    const baseSha = refData.object.sha;

    // 2. Create a unique new branch
    const timestamp = Date.now();
    const newBranch = `pyq-upload-${timestamp}`;
    await octokit.git.createRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: `refs/heads/${newBranch}`,
      sha: baseSha,
    });

    // 3. Upload the file to the new branch
    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      message: `Add PYQ: ${safeName}`,
      content: fileBase64, // already base64 encoded
      branch: newBranch,
    });

    // 4. Create the Pull Request
    const prBody = [
      `## New PYQ Upload 📄`,
      ``,
      `**File:** \`${safeName}\``,
      `**Folder Path:** \`${folderPath}\``,
      credit ? `**Credit:** ${credit}` : `**Credit:** Anonymous`,
      ``,
      `---`,
      `*This PR was automatically generated via the GEHU Archive upload feature.*`,
    ].join('\n');

    const { data: pr } = await octokit.pulls.create({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      title: `New PYQ: ${safeName}`,
      head: newBranch,
      base: BASE_BRANCH,
      body: prBody,
    });

    return res.status(200).json({
      success: true,
      message: 'Pull Request created successfully!',
      prUrl: pr.html_url,
      prNumber: pr.number,
    });
  } catch (error: unknown) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(500).json({ error: `Failed to create PR: ${message}` });
  }
}
