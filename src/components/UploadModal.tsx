import { useState, useRef } from 'react';
import { X, Upload, FileText, Loader2, CheckCircle2, ExternalLink } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  folderPath: string; // e.g. "BTECH/Cse/Sem 3/Data Structures With C"
  subjectName: string;
}

export function UploadModal({ isOpen, onClose, folderPath, subjectName }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [credit, setCredit] = useState('');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [prUrl, setPrUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (f: File | null) => {
    if (!f) return;
    if (f.type !== 'application/pdf') {
      setErrorMsg('Only PDF files are allowed.');
      return;
    }
    if (f.size > 4.5 * 1024 * 1024) {
      setErrorMsg('File size must be under 4.5 MB.');
      return;
    }
    setErrorMsg('');
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    handleFileChange(dropped);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Strip the data URL prefix (e.g. "data:application/pdf;base64,")
        resolve(result.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async () => {
    if (!file) {
      setErrorMsg('Please select a PDF file.');
      return;
    }
    setStatus('uploading');
    setErrorMsg('');
    try {
      const fileBase64 = await toBase64(file);
      const res = await fetch('/api/upload-pyq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileBase64,
          folderPath,
          credit: credit.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }
      setPrUrl(data.prUrl);
      setStatus('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setErrorMsg(message);
      setStatus('error');
    }
  };

  const handleClose = () => {
    setFile(null);
    setCredit('');
    setStatus('idle');
    setErrorMsg('');
    setPrUrl('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Upload PYQ PDF</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate max-w-[260px]">
              📁 {subjectName}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          {status === 'success' ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto" />
              <div>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">Upload Submitted! 🎉</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  A Pull Request has been created for review.
                  <br />Once approved, the PDF will appear on the site.
                </p>
              </div>
              {prUrl && (
                <a
                  href={prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Pull Request
                </a>
              )}
              <button
                onClick={handleClose}
                className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-sm mt-2 hover:opacity-90 transition-opacity"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Drag & Drop Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`cursor-pointer border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  dragOver
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                    : file
                      ? 'border-green-400 bg-green-50 dark:bg-green-950/20'
                      : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                />
                {file ? (
                  <div className="space-y-1">
                    <FileText className="h-8 w-8 text-green-500 mx-auto" />
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">{file.name}</p>
                    <p className="text-xs text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p className="text-xs text-blue-500 underline">Click to change</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-zinc-400 mx-auto" />
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      Drag & drop or <span className="text-blue-500 underline">browse</span>
                    </p>
                    <p className="text-xs text-zinc-400">PDF only · Max 4.5 MB</p>
                  </div>
                )}
              </div>

              {/* Credit Input */}
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Credit <span className="font-normal text-zinc-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={credit}
                  onChange={(e) => setCredit(e.target.value)}
                  placeholder="Your name or social handle"
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition"
                />
              </div>

              {/* Error Message */}
              {errorMsg && (
                <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
              )}

              {/* Upload Note */}
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Your upload will be reviewed before it goes live on the site.
              </p>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!file || status === 'uploading'}
                className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'uploading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Submit for Review
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
