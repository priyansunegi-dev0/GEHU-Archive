import { useEffect, useState } from 'react';
import { SEO } from '@/components/SEO';
import { ArrowUp, Eye } from 'lucide-react';
import type { Folder as FolderType, PDF } from '@/types';
import manifest from '@/courses-manifest.json';

const FolderImg = ({ name }: { name: string }) => {
  const isSpecial = name.toLowerCase() === "others" || name.toLowerCase() === "old";
  return (
    <img
      src={isSpecial ? "https://img.icons8.com/material-rounded/192/4D4D4D/folder-invoices.png" : "/folder.svg"}
      alt="folder"
      className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
    />
  );
};

const FolderImgLg = () => (
  <img src="/folder.svg" alt="empty" className="h-20 w-20 mx-auto mb-4 opacity-40" />
);

const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 64" className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0">
    <path d="M36 0H8C5.8 0 4 1.8 4 4v56c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V16L36 0z" fill="#E53935"/>
    <path d="M36 0v12c0 2.2 1.8 4 4 4h12L36 0z" fill="#EF9A9A"/>
    <text x="28" y="46" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">PDF</text>
  </svg>
);

interface BreadcrumbItem {
  id: string | null;
  name: string;
}

const FOLDERS: FolderType[] = manifest.folders;
const PDFS: PDF[] = manifest.pdfs;

export function Home() {
  const [currentFolder, setCurrentFolder] = useState<FolderType | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([{ id: null, name: 'PYQs' }]);
  const [subFolders, setSubFolders] = useState<FolderType[]>([]);
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hostname = window.location.hostname;
    let campusSuffix = "GEHU PYQs Archive";
    if (hostname.includes("dehradun")) campusSuffix = "Dehradun Campus";
    else if (hostname.includes("haldwani")) campusSuffix = "Haldwani Campus";
    else if (hostname.includes("bhimtal")) campusSuffix = "Bhimtal Campus";
    else if (hostname.includes("doubts")) campusSuffix = "Doubts Portal";

    const path = breadcrumb.map((item: BreadcrumbItem) => item.name).filter(Boolean).join(' / ');
    document.title = `${path} | ${campusSuffix}`;
  }, [breadcrumb]);

  useEffect(() => {
    const cleanup = fetchContents(currentFolder?.id ?? null);
    return cleanup;
  }, [currentFolder]);

  const fetchContents = (parentId: string | null) => {
    setLoading(true);
    const timer = setTimeout(() => {
      const folders = FOLDERS.filter((f: FolderType) => f.parent_id === parentId);
      const fileList = parentId ? PDFS.filter((p: PDF) => p.folder_id === parentId) : [];
      setSubFolders(folders);
      setPdfs(fileList);
      setLoading(false);
    }, 120);
    return () => clearTimeout(timer);
  };

  const openFolder = (folder: FolderType) => {
    setCurrentFolder(folder);
    setBreadcrumb(prev => [...prev, { id: folder.id, name: folder.name }]);
    // Scroll to top when opening a folder
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateBreadcrumb = (index: number) => {
    const crumb = breadcrumb[index];
    const newBreadcrumb = breadcrumb.slice(0, index + 1);
    setBreadcrumb(newBreadcrumb);
    if (crumb.id) {
      const found = FOLDERS.find((f: FolderType) => f.id === crumb.id);
      if (found) setCurrentFolder(found);
    } else {
      setCurrentFolder(null);
    }
  };

  const goUpOneLevel = () => {
    if (breadcrumb.length > 1) {
      const newIndex = breadcrumb.length - 2;
      navigateBreadcrumb(newIndex);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const isEmpty = !loading && subFolders.length === 0 && pdfs.length === 0;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEO page="home" />

      {/* Top Header Section with Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <nav className="flex items-center gap-1 text-base md:text-lg flex-wrap">
          {currentFolder && (
            <ArrowUp className="h-5 w-5 cursor-pointer mr-2" onClick={goUpOneLevel} />
          )}
          {breadcrumb.map((crumb: BreadcrumbItem, index: number) => (
            <div key={index} className="flex items-center gap-1">
              {index > 0 && <span className="text-gray-400">/</span>}
              <button
                onClick={() => navigateBreadcrumb(index)}
                disabled={index === breadcrumb.length - 1}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors text-sm md:text-base ${index === breadcrumb.length - 1
                  ? 'text-black dark:text-white font-semibold cursor-default'
                  : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                {crumb.name}
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
        ) : isEmpty ? (
          <div className="py-16 text-center">
            <FolderImgLg />
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              {currentFolder ? 'This folder is empty' : 'No folders yet'}
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
              {subFolders.map((folder: FolderType) => (
                <div key={folder.id} className="py-4">
                  <button
                    onClick={() => openFolder(folder)}
                    className="flex w-full items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <FolderImg name={folder.name} />
                    <span style={{ fontFamily: "'Roboto', sans-serif" }} className="text-xs md:text-sm lg:text-base">
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
            {pdfs.length > 0 && (
              <div className="mt-3 border border-zinc-300 dark:border-zinc-700 rounded-xl overflow-hidden bg-white dark:bg-black divide-y divide-gray-100 dark:divide-zinc-900">
                {pdfs.map((pdf: PDF) => (
                  <div key={pdf.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-zinc-950/40 transition-colors">
                    <PdfIcon />
                    <span style={{ fontFamily: "'Roboto', sans-serif" }} className="flex-1 text-black dark:text-white truncate font-medium text-sm md:text-base">{pdf.file_name}</span>
                    <span className="hidden sm:block w-24 text-right text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {formatFileSize(pdf.file_size)}
                    </span>
                    <span className="hidden sm:block w-28 text-right text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {new Date(pdf.created_at).toLocaleDateString()}
                    </span>
                    <a
                      href={pdf.file_path || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex-shrink-0 shadow-sm"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </a>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* WhatsApp Community Section */}
      {!currentFolder && !loading && (
        <div className="mt-16 space-y-3">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-white">
            Join Whatsapp Community | 1300+ students
          </h3>
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
      )}

    </main>
  );
}
