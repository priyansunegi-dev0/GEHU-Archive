import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { ArrowUp } from 'lucide-react';
import type { Folder as FolderType, PDF } from '@/types';

const FolderImg = ({ name }: { name: string }) => {
  const isSpecial = name.toLowerCase() === "others" || name.toLowerCase() === "old";
  return (
    <img
      src={isSpecial ? "/folder-special.svg" : "/folder.webp"}
      alt="folder"
      className="h-11 w-11 sm:h-14 sm:w-14 flex-shrink-0"
      fetchPriority="high"
    />
  );
};

const FolderImgLg = () => (
  <img src="/folder.webp" alt="empty" className="h-20 w-20 mx-auto mb-4 opacity-40" fetchPriority="high" />
);

const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 64" className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
    <path d="M36 0H8C5.8 0 4 1.8 4 4v56c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V16L36 0z" fill="#E53935" />
    <path d="M36 0v12c0 2.2 1.8 4 4 4h12L36 0z" fill="#EF9A9A" />
    <text x="28" y="46" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">PDF</text>
  </svg>
);

// Format PDF filename into title + date
// e.g. bp105_t_sessional_1_2025_nov.pdf → { title: "BP105 - T • Sessional 1", date: "2025 Nov" }
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const formatPdfName = (fileName: string): { title: string; date: string } => {
  const name = fileName.replace(/\.pdf$/i, '');
  const parts = name.split('_');

  const code = parts[0].toUpperCase();
  const titleParts: string[] = [];
  const dateParts: string[] = [];
  let reachedDate = false;
  let hasSet = false;

  for (let i = 1; i < parts.length; i++) {
    const p = parts[i].toLowerCase();
    // Check if this is a year (4-digit number)
    if (/^\d{4}$/.test(p)) {
      reachedDate = true;
      dateParts.push(p);
    } else if (reachedDate) {
      // After year, everything is date (month, day, etc.)
      dateParts.push(months.includes(p) ? p.charAt(0).toUpperCase() + p.slice(1) : p);
    } else if (p.length === 1 && /[a-z]/.test(p)) {
      // Single letter = set letter
      hasSet = true;
      titleParts.push(p.toUpperCase());
    } else if (/^\d{1,2}$/.test(p)) {
      // 1-2 digit number (e.g. sessional number)
      titleParts.push(p);
    } else {
      // Exam type word - capitalize
      titleParts.push(p.charAt(0).toUpperCase() + p.slice(1));
    }
  }

  // Build formatted title: CODE - SET • Type Number
  let title = code;
  if (titleParts.length > 0) {
    if (hasSet) {
      // First part after code is the set letter
      const setIdx = titleParts.findIndex(t => t.length === 1 && /[A-Z]/.test(t));
      const setLetter = titleParts[setIdx];
      const rest = titleParts.filter((_, idx) => idx !== setIdx);
      title += ` - ${setLetter} • ${rest.join(' ')}`;
    } else {
      title += ` - ${titleParts.join(' ')}`;
    }
  }

  return { title, date: dateParts.join(' ') };
};

interface BreadcrumbItem {
  id: string | null;
  name: string;
}

let cachedManifest: { folders: FolderType[]; pdfs: PDF[] } | null = null;
const SESSION_CACHE_KEY = 'gehu-courses-manifest';

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const folderId = searchParams.get('f');

  const [allFolders, setAllFolders] = useState<FolderType[]>(() => {
    if (cachedManifest) return cachedManifest.folders;
    try {
      const stored = sessionStorage.getItem(SESSION_CACHE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        cachedManifest = parsed;
        return parsed.folders || [];
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [allPdfs, setAllPdfs] = useState<PDF[]>(() => {
    if (cachedManifest) return cachedManifest.pdfs;
    try {
      const stored = sessionStorage.getItem(SESSION_CACHE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        cachedManifest = parsed;
        return parsed.pdfs || [];
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [manifestLoading, setManifestLoading] = useState(() => {
    if (cachedManifest) return false;
    try {
      const stored = sessionStorage.getItem(SESSION_CACHE_KEY);
      if (stored) return false;
    } catch (e) { }
    return true;
  });

  useEffect(() => {
    let isMounted = true;
    fetch('/courses-manifest.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;

        // Detect actual difference to avoid unnecessary rendering
        const hasChanged = JSON.stringify(cachedManifest) !== JSON.stringify(data);
        if (hasChanged) {
          cachedManifest = data;
          try {
            sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(data));
          } catch (e) { }
          setAllFolders(data.folders || []);
          setAllPdfs(data.pdfs || []);
        }
        setManifestLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch courses manifest:', err);
        if (isMounted) {
          setManifestLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const currentFolder = useMemo(() => {
    if (!folderId) return null;
    return allFolders.find((f: FolderType) => f.id === folderId) || null;
  }, [folderId, allFolders]);

  const activeFolderId = currentFolder ? folderId : null;

  const breadcrumb = useMemo(() => {
    const crumbs: BreadcrumbItem[] = [];
    let currentId = activeFolderId;
    while (currentId) {
      const folder = allFolders.find((f: FolderType) => f.id === currentId);
      if (!folder) break;
      crumbs.unshift({ id: folder.id, name: folder.name });
      currentId = folder.parent_id;
    }
    crumbs.unshift({ id: null, name: 'PYQs' });
    return crumbs;
  }, [activeFolderId, allFolders]);

  const subFolders = useMemo(() => {
    return allFolders.filter((f: FolderType) => f.parent_id === activeFolderId);
  }, [activeFolderId, allFolders]);

  const pdfs = useMemo(() => {
    return activeFolderId ? allPdfs.filter((p: PDF) => p.folder_id === activeFolderId) : [];
  }, [activeFolderId, allPdfs]);

  const loading = manifestLoading;

  useEffect(() => {
    const siteTitle = "PYQs Archive - Graphic Era";
    if (breadcrumb.length === 1) {
      document.title = siteTitle;
    } else {
      const path = breadcrumb.map((item: BreadcrumbItem) => item.name).filter(Boolean).join(' / ');
      document.title = `${path} | ${siteTitle}`;
    }
  }, [breadcrumb]);

  useEffect(() => {
    const handleScroll = () => {
      try {
        window.scrollTo({ top: 0, behavior: 'instant' as any });
      } catch (e) {
        window.scrollTo(0, 0);
      }
      try {
        document.documentElement.scrollTop = 0;
      } catch (e) { }
      try {
        if (document.body) {
          document.body.scrollTop = 0;
        }
      } catch (e) { }
    };
    handleScroll();
    const timer = setTimeout(handleScroll, 50);
    return () => clearTimeout(timer);
  }, [folderId]);

  const openFolder = (folder: FolderType) => {
    setSearchParams({ f: folder.id });
  };

  const navigateBreadcrumb = (index: number) => {
    const crumb = breadcrumb[index];
    if (crumb.id) {
      setSearchParams({ f: crumb.id });
    } else {
      setSearchParams({});
    }
  };

  const goUpOneLevel = () => {
    if (breadcrumb.length > 1) {
      const newIndex = breadcrumb.length - 2;
      navigateBreadcrumb(newIndex);
    }
  };

  const isEmpty = !loading && subFolders.length === 0 && pdfs.length === 0;

  return (
    <main className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16 py-10">
      <SEO page="home" />

      {/* SEO H1 - visually hidden, keyword-rich for Google */}
      {!currentFolder && (
        <h1 className="sr-only">
          GEHU PYQs Archive – Previous Year Question Papers for Graphic Era Hill University Students (Dehradun Campus)
        </h1>
      )}

      {/* Top Header Section with Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <nav className="flex items-center gap-1 text-xl md:text-2xl flex-wrap">
          <ArrowUp
            className={`h-6 w-6 md:h-7 md:w-7 mr-2 transition-colors text-black dark:text-white ${currentFolder ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
            onClick={currentFolder ? goUpOneLevel : undefined}
          />
          {breadcrumb.map((crumb: BreadcrumbItem, index: number) => (
            <div key={index} className="flex items-center gap-1">
              {index > 0 && <span className="text-gray-400">/</span>}
              <button
                onClick={() => navigateBreadcrumb(index)}
                disabled={index === breadcrumb.length - 1}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors text-lg md:text-xl ${index === breadcrumb.length - 1
                  ? 'text-black dark:text-white font-semibold cursor-default'
                  : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                {crumb.name.toLowerCase()}
              </button>
            </div>
          ))}
        </nav>
      </div>

      {/* File Browser */}
      <div>
        {loading ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {[...Array(5)].map((_, i: number) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3 animate-pulse">
                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {isEmpty ? (
              <div className="py-16 text-center">
                <FolderImgLg />
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  {currentFolder ? 'This folder is empty' : 'No folders yet'}
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col mt-0 divide-y divide-zinc-200 dark:divide-zinc-800">
                  {subFolders.map((folder: FolderType) => (
                    <div key={folder.id} className="py-5">
                      <button
                        onClick={() => openFolder(folder)}
                        className="flex w-full items-center gap-4 text-left text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                      >
                        <FolderImg name={folder.name} />
                        <span style={{ fontFamily: "'Roboto', sans-serif" }} className="text-base sm:text-lg md:text-xl">
                          {!currentFolder
                            ? folder.name.toUpperCase()
                            : (folder.name.toUpperCase() === "OTHERS" || folder.name.toUpperCase() === "OLD")
                              ? folder.name.toUpperCase()
                              : folder.name.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
                {currentFolder?.id === 'BTECH-Year 1' && (
                  <div className="py-6 border-t border-zinc-200 dark:border-zinc-800 mt-2 flex flex-col gap-4">
                    <div>
                      <a
                        href="https://drive.google.com/drive/folders/1_ebYoj01H5qGAw5cMW_WDzwf7lymLkbW"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm md:text-base lg:text-lg font-bold text-black dark:text-white underline decoration-1 underline-offset-4 hover:opacity-85 transition-opacity"
                      >
                        Computer Science Study Material
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://drive.google.com/drive/folders/1pZ2F8_CXIqQb9NcTz5JmxIZbEtwHPLoW"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm md:text-base lg:text-lg font-bold text-black dark:text-white underline decoration-1 underline-offset-4 hover:opacity-85 transition-opacity"
                      >
                        Engineering Physics
                      </a>
                    </div>
                  </div>
                )}
                {pdfs.length > 0 && (
                  <div className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
                    {pdfs.map((pdf: PDF) => (
                      <div key={pdf.id} className="py-5">
                        <a
                          href={pdf.file_path || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                        >
                          <PdfIcon />
                          <div style={{ fontFamily: "'Roboto', sans-serif" }}>
                            <span className="text-sm sm:text-base md:text-lg block">{formatPdfName(pdf.file_name).title}</span>
                            {formatPdfName(pdf.file_name).date && (
                              <span className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 block mt-0.5">{formatPdfName(pdf.file_name).date}</span>
                            )}
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {currentFolder?.id === 'BTECH' && (
              <div className="py-6 border-t border-zinc-200 dark:border-zinc-800 mt-4">
                <a
                  href="https://chat.whatsapp.com/F9YOQTcSJALJRfPdQ12CoN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm md:text-base lg:text-lg font-bold text-black dark:text-white underline decoration-1 underline-offset-4 hover:opacity-85 transition-opacity"
                >
                  Join B.Tech Batchmates
                </a>
              </div>
            )}
          </>
        )}
      </div>

      {/* WhatsApp Community Section */}
      {!currentFolder && !loading && (
        <>
          <div className="mt-16 space-y-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-white">
              Join Whatsapp Community | 1500+ Students
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-zinc-400">
              Join{" "}
              <a
                href="https://chat.whatsapp.com/CLCyjRtMnXWKwRpzh3TqFV"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-white font-bold underline decoration-1 underline-offset-4 hover:opacity-85 transition-opacity"
              >
                GRAPHIANS
              </a>
            </p>
          </div>
        </>
      )}

    </main>
  );
}
