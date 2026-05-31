import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail } from 'lucide-react';

const ALLOWED_EMAIL = 'prriiyansunegi@gmail.com';

export function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      // Clear any stale sessions that might cause 401 errors on callback
      await supabase.auth.signOut();
      localStorage.clear();

      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (signInError) {
        throw signInError;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
              GEHU Archive Admin
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Secure admin access
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-300">
                Only <span className="font-semibold">{ALLOWED_EMAIL}</span> can access
              </p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail className="h-5 w-5 text-black dark:text-white" />
              <span className="text-black dark:text-white font-medium">
                {loading ? 'Signing in...' : 'Sign in with Google'}
              </span>
            </button>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-900 dark:text-red-300">
                  {error}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              This is a secure admin area. Your sign-in activity is logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
