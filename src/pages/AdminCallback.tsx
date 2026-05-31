import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Spinner } from '@/components/ui/spinner';

const ALLOWED_EMAIL = 'prriiyansunegi@gmail.com';

export function AdminCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('Processing OAuth callback...');
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    let authCompleted = false;

    // Capture the hash for debugging if it fails
    if (window.location.hash) {
      const hash = window.location.hash;
      let debugText = '\nHash found: ' + hash.substring(0, 40) + '...';
      
      try {
        const tokenMatch = hash.match(/access_token=([^&]+)/);
        if (tokenMatch && tokenMatch[1]) {
          const token = tokenMatch[1];
          const payloadBase64 = token.split('.')[1];
          const payloadDecoded = JSON.parse(atob(payloadBase64));
          debugText += '\n\nToken Payload: ' + JSON.stringify(payloadDecoded, null, 2);
        }
      } catch (e) {
        debugText += '\nFailed to decode token payload.';
      }
      
      setDebugInfo(prev => prev + debugText);
    }

    const verifyAdmin = async (session: any) => {
      if (!mounted || authCompleted) return;
      authCompleted = true;
      
      try {
        setStatus('Verifying email...');
        const userEmail = session?.user?.email;
        console.log('User authenticated with email:', userEmail);
        
        if (userEmail !== ALLOWED_EMAIL) {
          console.warn('Email not authorized:', userEmail);
          await supabase.auth.signOut();
          if (mounted) {
            setError(`Access denied. Only ${ALLOWED_EMAIL} can access this area.`);
            setDebugInfo(prev => prev + '\nEmail was: ' + userEmail);
          }
          return;
        }
        
        if (mounted) {
          setStatus('Authentication successful! Redirecting...');
          console.log('Email verified, redirecting to dashboard');
          setTimeout(() => navigate('/admin/dashboard'), 500);
        }
      } catch (err) {
        if (mounted) {
          console.error('Callback error:', err);
          const message = err instanceof Error ? err.message : 'Authentication failed';
          setError(message);
        }
      }
    };

    supabase.auth.getSession().then(({ data: { session }, error: sessionError }) => {
      if (sessionError) {
        console.error('Session error:', sessionError);
        if (mounted) {
          setError('Session error: ' + sessionError.message);
          setDebugInfo(prev => prev + '\ngetSession error: ' + sessionError.message);
        }
        return;
      }
      if (session) {
        verifyAdmin(session);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted) setDebugInfo(prev => prev + '\nEvent: ' + event);
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session) {
        verifyAdmin(session);
      }
    });

    const timeoutId = setTimeout(() => {
      if (mounted && !authCompleted && !error) {
        setError('Authentication failed. No session found. Please try again.');
        setDebugInfo(prev => prev + '\nTimed out waiting for session.');
      }
    }, 4000);

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [navigate, error]);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error}
          </p>
          
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded text-left text-xs text-gray-500 overflow-auto whitespace-pre-wrap font-mono">
            <strong>Debug Info:</strong>
            {debugInfo}
          </div>

          <button onClick={() => navigate('/admin')} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <Spinner />
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {status}
        </p>
      </div>
    </div>
  );
}


