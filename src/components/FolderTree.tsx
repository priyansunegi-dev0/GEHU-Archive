import { useState } from 'react';
import { ChevronRight, ChevronDown, Trash2 } from 'lucide-react';
import type { Folder } from '@/types';

const FolderImg = () => (
  <img
    src="/folder.svg"
    alt="folder"
    className="h-8 w-8 flex-shrink-0"
  />
);

interface FolderTreeProps {
  folders: Folder[];
  onSelectFolder: (folder: Folder) => void;
  selectedFolder: Folder | null;
  onDeleteFolder: (folderId: string) => void;
  level?: number;
}

export function FolderTree({
  folders,
  onSelectFolder,
  selectedFolder,
  onDeleteFolder,
  level = 0,
}: FolderTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleExpand = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  return (
    <div className="space-y-1">
      {folders.map((folder) => (
        <div key={folder.id}>
          <div
            className={`flex items-center gap-1 px-2 py-2 rounded-lg cursor-pointer transition-colors ${
              selectedFolder?.id === folder.id
                ? 'bg-blue-100 dark:bg-blue-900/30'
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={{ paddingLeft: `${(level + 1) * 12}px` }}
            onClick={() => onSelectFolder(folder)}
          >
            {folder.children && folder.children.length > 0 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(folder.id);
                }}
                className="flex-shrink-0 p-0 hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
              >
                {expandedFolders.has(folder.id) ? (
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            ) : (
              <div className="w-4" />
            )}

            <FolderImg />

            <span className="flex-1 font-semibold text-black dark:text-white truncate uppercase tracking-wide px-2">
              {folder.name}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteFolder(folder.id);
              }}
              className="flex-shrink-0 p-1 opacity-0 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-all"
            >
              <Trash2 className="h-3 w-3 text-red-600" />
            </button>
          </div>

          {expandedFolders.has(folder.id) && folder.children && folder.children.length > 0 && (
            <FolderTree
              folders={folder.children}
              onSelectFolder={onSelectFolder}
              selectedFolder={selectedFolder}
              onDeleteFolder={onDeleteFolder}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
}
