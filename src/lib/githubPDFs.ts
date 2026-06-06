/**
 * Fetches the list of PDF files from GitHub for a given folder path.
 * Reads from: public/pdfs/<folderPath>/
 * This reads directly from the GitHub contents API (no auth needed for public repos,
 * but works for private repos if VITE_GITHUB_TOKEN is set).
 */

const REPO_OWNER = 'priyansunegi-dev0';
const REPO_NAME = 'GEHU-Archive';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // optional, for private repos

export interface GitHubPDF {
  id: string;
  name: string;
  download_url: string;
  html_url: string;
  size: number;
  path: string;
}

export async function fetchPDFsFromGitHub(folderPath: string): Promise<GitHubPDF[]> {
  // folderPath example: "BTECH/Cse/Sem 3/Data Structures With C"
  const apiPath = `public/pdfs/${folderPath}`;
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIPath(apiPath)}`;

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(url, { headers });
    if (res.status === 404) return []; // folder doesn't exist yet
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data
      .filter((item: { type: string }) => item.type === 'file' && item.name.toLowerCase().endsWith('.pdf'))
      .map((item: { sha: string; name: string; download_url: string; html_url: string; size: number; path: string }) => ({
        id: item.sha,
        name: item.name,
        download_url: item.download_url,
        html_url: item.html_url,
        size: item.size,
        path: item.path,
      }));
  } catch {
    return [];
  }
}

// Encode path segments individually (preserving slashes)
function encodeURIPath(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}

/**
 * Given a breadcrumb array (from Home.tsx), constructs the GitHub folder path.
 * Breadcrumb items after the root "PYQs" item make up the path.
 * E.g. breadcrumb = ["PYQs", "BTECH", "Cse", "Sem 3", "Data Structures With C"]
 * => "BTECH/Cse/Sem 3/Data Structures With C"
 */
export function buildFolderPath(breadcrumbNames: string[]): string {
  // Skip the first "PYQs" element
  return breadcrumbNames.slice(1).join('/');
}
