import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import {
  FileText, ChevronRight, Home as HomeIcon,
  ArrowLeft, Upload, Eye, X, CheckCircle, AlertCircle
} from 'lucide-react';

const FolderImg = () => (
  <img
    src="/folder.svg"
    alt="folder"
    className="h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0"
  />
);

const FolderImgLg = () => (
  <img
    src="/folder.svg"
    alt="folder"
    className="h-12 w-12 mx-auto mb-3 opacity-40"
  />
);
import type { Folder as FolderType, PDF } from '@/types';

interface BreadcrumbItem {
  id: string | null;
  name: string;
}

export function Home() {
  const [currentFolder, setCurrentFolder] = useState<FolderType | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([{ id: null, name: 'Home' }]);
  const [subFolders, setSubFolders] = useState<FolderType[]>([]);
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(true);

  // Contribute modal state
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchContents(currentFolder?.id ?? null);
  }, [currentFolder]);

  const fetchContents = async (parentId: string | null) => {
    setLoading(true);
    try {
      const folderQuery = supabase
        .from('folders')
        .select('*')
        .order('name', { ascending: true });

      if (parentId) {
        folderQuery.eq('parent_id', parentId);
      } else {
        folderQuery.is('parent_id', null);
      }

      const { data: folderData, error: folderError } = await folderQuery;
      if (folderError) throw folderError;
      setSubFolders(folderData || []);

      if (parentId) {
        const { data: pdfData, error: pdfError } = await supabase
          .from('pdfs')
          .select('*')
          .eq('folder_id', parentId)
          .order('created_at', { ascending: false });

        if (pdfError) throw pdfError;
        setPdfs(pdfData || []);
      } else {
        setPdfs([]);
      }
    } catch (err) {
      console.error('Failed to fetch contents:', err);
    } finally {
      setLoading(false);
    }
  };

  const openFolder = (folder: FolderType) => {
    setCurrentFolder(folder);
    setBreadcrumb(prev => [...prev, { id: folder.id, name: folder.name }]);
  };

  const navigateBreadcrumb = (index: number) => {
    if (index === 0) {
      setCurrentFolder(null);
      setBreadcrumb([{ id: null, name: 'Home' }]);
    } else {
      const crumb = breadcrumb[index];
      const newBreadcrumb = breadcrumb.slice(0, index + 1);
      setBreadcrumb(newBreadcrumb);
      if (crumb.id) {
        supabase.from('folders').select('*').eq('id', crumb.id).single()
          .then(({ data }) => { if (data) setCurrentFolder(data as FolderType); });
      }
    }
  };

  const getPdfUrl = (filePath: string) => {
    const { data } = supabase.storage.from('pdfs').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const openContributeModal = () => {
    setFile(null);
    setUploadStatus({ type: null, message: '' });
    setShowContributeModal(true);
  };

  const closeContributeModal = () => {
    if (uploading) return;
    setShowContributeModal(false);
    setFile(null);
    setUploadStatus({ type: null, message: '' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
      setUploadStatus({ type: null, message: '' });
    } else if (selected) {
      setUploadStatus({ type: 'error', message: 'Only PDF files are allowed.' });
    }
  };

  const handleUpload = async () => {
    if (!file || !currentFolder) return;
    setUploading(true);
    setUploadStatus({ type: null, message: '' });

    try {
      const { data: authData } = await supabase.auth.getSession();
      const userId = authData.session?.user.id ?? '00000000-0000-0000-0000-000000000000';

      const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const filePath = `${currentFolder.id}/${fileId}.pdf`;

      const { error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(filePath, file, { upsert: false });

      if (uploadError) throw new Error('Storage upload failed: ' + uploadError.message);

      const { error: dbError } = await supabase.from('pdfs').insert([{
        folder_id: currentFolder.id,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        uploaded_by: userId,
      }]);

      if (dbError) throw new Error('Database insert failed: ' + dbError.message);

      setUploadStatus({ type: 'success', message: `"${file.name}" uploaded successfully!` });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      // Refresh PDFs in current folder
      fetchContents(currentFolder.id);

      setTimeout(() => {
        setShowContributeModal(false);
        setUploadStatus({ type: null, message: '' });
      }, 2000);
    } catch (err) {
      setUploadStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Upload failed. Please try again.',
      });
    } finally {
      setUploading(false);
    }
  };

  const isEmpty = !loading && subFolders.length === 0 && pdfs.length === 0;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Title */}
      {/* Page Title Removed as requested */}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm mb-6 flex-wrap">
        {breadcrumb.map((crumb, index) => (
          <div key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />}
            <button
              onClick={() => navigateBreadcrumb(index)}
              disabled={index === breadcrumb.length - 1}
              className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                index === breadcrumb.length - 1
                  ? 'text-black dark:text-white font-semibold cursor-default'
                  : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {index === 0 && <HomeIcon className="h-3.5 w-3.5" />}
              {crumb.name}
            </button>
          </div>
        ))}
      </nav>

      {/* Back button */}
      {currentFolder && (
        <button
          onClick={() => navigateBreadcrumb(breadcrumb.length - 2)}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      )}

      {/* File Browser */}
      <div>
        {/* Header row - hidden for grid view as requested */}

        {loading ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {[...Array(5)].map((_, i) => (
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
          <div className="grid grid-cols-2 gap-3">
            {subFolders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => openFolder(folder)}
                className="w-full px-5 py-5 flex items-center gap-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all text-left group"
              >
                <FolderImg />
                <span className="flex-1 text-black dark:text-white font-semibold tracking-wide uppercase truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {folder.name}
                </span>
              </button>
            ))}
          </div>
          {/* PDFs in a separate full-width list below folders */}
          {pdfs.length > 0 && (
            <div className="mt-3 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
              {pdfs.map((pdf) => (
                <div key={pdf.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <FileText className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <span className="flex-1 text-black dark:text-white truncate font-medium">{pdf.file_name}</span>
                  <span className="hidden sm:block w-24 text-right text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                    {formatFileSize(pdf.file_size)}
                  </span>
                  <span className="hidden sm:block w-28 text-right text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                    {new Date(pdf.created_at).toLocaleDateString()}
                  </span>
                  <a
                    href={getPdfUrl(pdf.file_path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
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

      {/* Bottom bar when inside a folder */}
      {currentFolder && !loading && (
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {subFolders.length} folder{subFolders.length !== 1 ? 's' : ''}, {pdfs.length} file{pdfs.length !== 1 ? 's' : ''}
          </p>
          {currentFolder.allow_contributions ? (
            <button
              onClick={openContributeModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 active:scale-95 text-white rounded-lg text-sm font-medium transition-all shadow-sm"
            >
              <Upload className="h-4 w-4" />
              Contribute
            </button>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg text-sm">
              🔒 Contributions not allowed
            </span>
          )}
        </div>
      )}

      {/* ── Upload Modal ── */}
      {showContributeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeContributeModal}
          />

          {/* Dialog */}
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-semibold text-black dark:text-white">Upload PDF</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  To: <span className="font-medium text-black dark:text-white">{currentFolder?.name}</span>
                </p>
              </div>
              <button
                onClick={closeContributeModal}
                disabled={uploading}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-5">
              {/* File picker */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  id="modal-pdf-input"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="hidden"
                />
                <label
                  htmlFor="modal-pdf-input"
                  className={`flex flex-col items-center justify-center gap-3 w-full border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors ${
                    file
                      ? 'border-green-400 bg-green-50 dark:bg-green-900/10 dark:border-green-600'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10'
                  }`}
                >
                  {file ? (
                    <>
                      <FileText className="h-10 w-10 text-green-600 dark:text-green-400" />
                      <div className="text-center">
                        <p className="text-sm font-medium text-green-700 dark:text-green-300 break-all">{file.name}</p>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">{formatFileSize(file.size)}</p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Click to change file</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-gray-400" />
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Click to select a PDF</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">PDF files only · Max 50MB</p>
                      </div>
                    </>
                  )}
                </label>
              </div>

              {/* Status message */}
              {uploadStatus.type && (
                <div className={`flex items-start gap-3 p-3 rounded-lg text-sm ${
                  uploadStatus.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                }`}>
                  {uploadStatus.type === 'success'
                    ? <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    : <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />}
                  {uploadStatus.message}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={closeContributeModal}
                disabled={uploading}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white disabled:text-gray-500 rounded-lg text-sm font-medium transition-colors"
              >
                {uploading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
