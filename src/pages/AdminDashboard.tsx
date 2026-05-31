import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { LogOut, User, Folder as FolderIcon, Plus, Trash2, Lock, Unlock } from 'lucide-react';
import { FolderTree } from '@/components/FolderTree';
import { CreateFolderDialog } from '@/components/CreateFolderDialog';
import { Doubts } from './Doubts';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { Folder } from '@/types';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'folders' | 'doubts'>('folders');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: authData } = await supabase.auth.getSession();

        if (authData.session) {
          setUser(authData.session.user);
          setLoading(false);
          return;
        }

        navigate('/admin');
      } catch (err) {
        console.error('Auth check failed:', err);
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          navigate('/admin');
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchFolders();
    }
  }, [user, refreshKey]);

  const fetchFolders = async () => {
    try {
      const { data, error } = await supabase
        .from('folders')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      const folderMap = new Map<string, Folder>();
      const rootFolders: Folder[] = [];

      data?.forEach((folder) => {
        folderMap.set(folder.id, { ...folder, children: [] });
      });

      data?.forEach((folder) => {
        if (folder.parent_id) {
          const parent = folderMap.get(folder.parent_id);
          if (parent) {
            if (!parent.children) parent.children = [];
            parent.children.push(folderMap.get(folder.id)!);
          }
        } else {
          rootFolders.push(folderMap.get(folder.id)!);
        }
      });

      setFolders(rootFolders);
    } catch (err) {
      console.error('Failed to fetch folders:', err);
    }
  };

  const handleCreateFolder = async (name: string, parentId?: string) => {
    try {
      if (!user) return;

      const { error } = await supabase.from('folders').insert([
        {
          name,
          parent_id: parentId || null,
          created_by: user.id,
          allow_contributions: true,
        },
      ]);

      if (error) throw error;
      setShowCreateDialog(false);
      setRefreshKey(k => k + 1);
    } catch (err) {
      console.error('Failed to create folder:', err);
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    if (!confirm('Delete this folder and all its contents?')) return;

    try {
      const { error } = await supabase
        .from('folders')
        .delete()
        .eq('id', folderId);

      if (error) throw error;
      setSelectedFolder(null);
      setRefreshKey(k => k + 1);
    } catch (err) {
      console.error('Failed to delete folder:', err);
    }
  };

  const handleToggleContributions = async (folderId: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from('folders')
        .update({ allow_contributions: !currentState })
        .eq('id', folderId);

      if (error) throw error;

      // Update selectedFolder state immediately so UI reflects change
      if (selectedFolder && selectedFolder.id === folderId) {
        setSelectedFolder({ ...selectedFolder, allow_contributions: !currentState });
      }
      setRefreshKey(k => k + 1);
    } catch (err) {
      console.error('Failed to toggle contributions:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            GEHU Archive Admin
          </h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="mb-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
                Welcome, {user.email}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage your course folders and PDF contributions below
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
          <button
            onClick={() => setActiveTab('folders')}
            className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'folders'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            Course Folders
          </button>
          <button
            onClick={() => setActiveTab('doubts')}
            className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'doubts'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            Manage Doubts
          </button>
        </div>

        {activeTab === 'folders' ? (
          <>
            {/* Folder Management Section */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-black dark:text-white flex items-center gap-2">
                  <FolderIcon className="h-6 w-6" />
                  Course Folders
                </h2>
                <Button
                  onClick={() => setShowCreateDialog(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create Folder
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Folder Tree */}
                <div className="lg:col-span-2 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 max-h-96 overflow-y-auto">
                  {folders.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      No folders yet. Create one to get started!
                    </p>
                  ) : (
                    <FolderTree
                      folders={folders}
                      onSelectFolder={setSelectedFolder}
                      selectedFolder={selectedFolder}
                      onDeleteFolder={handleDeleteFolder}
                    />
                  )}
                </div>

                {/* Selected Folder Details */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-black dark:text-white mb-4">
                    {selectedFolder ? 'Folder Details' : 'Select a Folder'}
                  </h3>
                  {selectedFolder ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Name
                        </p>
                        <p className="text-black dark:text-white font-semibold">
                          {selectedFolder.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Created
                        </p>
                        <p className="text-black dark:text-white">
                          {new Date(selectedFolder.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                          Contributions
                        </p>
                        <button
                          onClick={() =>
                            handleToggleContributions(
                              selectedFolder.id,
                              selectedFolder.allow_contributions
                            )
                          }
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm font-medium mb-1 ${
                            selectedFolder.allow_contributions
                              ? 'bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-800 dark:text-green-300'
                              : 'bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-800 dark:text-red-300'
                          }`}
                        >
                          <span>
                            {selectedFolder.allow_contributions ? '✓ Contributions Allowed' : '✗ Contributions Locked'}
                          </span>
                          {selectedFolder.allow_contributions ? (
                            <Unlock className="h-4 w-4" />
                          ) : (
                            <Lock className="h-4 w-4" />
                          )}
                        </button>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          Click to toggle
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteFolder(selectedFolder.id)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Folder
                      </button>
                      <button
                        onClick={() => setShowCreateDialog(true)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <Plus className="h-4 w-4" />
                        Add Subfolder
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
                      Click a folder to view details
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <Doubts hideForm={true} />
          </div>
        )}
      </main>

      {/* Create Folder Dialog */}
      <CreateFolderDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreateFolder={handleCreateFolder}
        parentFolderId={selectedFolder?.id}
        parentFolderName={selectedFolder?.name}
      />
    </div>
  );
}
