import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { SEO } from '@/components/SEO';
import {
  LogOut, Trash2, MessageCircle, User as UserIcon,
  Clock, Shield, Loader2, CheckCircle, XCircle,
  Pencil, Check
} from 'lucide-react';
import type { User, Session } from '@supabase/supabase-js';

interface Doubt {
  id: string;
  question: string;
  posted_by: string;
  created_at: string;
}

interface Answer {
  id: string;
  doubt_id: string;
  answer: string;
  answered_by: string;
  created_at: string;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [isNavigatingAway, setIsNavigatingAway] = useState(false);

  // Admin email check
  const [adminEmails, setAdminEmails] = useState<string[]>([]);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  // Dashboard state
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [answers, setAnswers] = useState<Record<string, Answer[]>>({});
  const [fetchingData, setFetchingData] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState<Record<string, boolean>>({});
  const [deletingAnswer, setDeletingAnswer] = useState<Record<string, boolean>>({});

  // Edit state
  const [editingDoubt, setEditingDoubt] = useState<string | null>(null);
  const [editDoubtText, setEditDoubtText] = useState('');
  const [savingDoubt, setSavingDoubt] = useState(false);
  const [editingAnswer, setEditingAnswer] = useState<string | null>(null);
  const [editAnswerText, setEditAnswerText] = useState('');
  const [savingAnswer, setSavingAnswer] = useState(false);

  // ─── Auth listener ────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ─── Fetch admin emails + data when authenticated ─────────────
  useEffect(() => {
    if (session) {
      fetchAdminEmails();
      fetchData();
    }
  }, [session]);

  const fetchAdminEmails = async () => {
    setCheckingAdmin(true);
    try {
      const { data, error } = await supabase
        .from('admin_emails')
        .select('email');

      if (error) throw error;
      setAdminEmails((data ?? []).map((r: any) => r.email.toLowerCase()));
    } catch (err) {
      // silent fail
      setAdminEmails([]);
    } finally {
      setCheckingAdmin(false);
    }
  };

  const fetchData = async () => {
    setFetchingData(true);
    try {
      const { data: doubtsData } = await supabase
        .from('doubts')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: answersData } = await supabase
        .from('answers')
        .select('*')
        .order('created_at', { ascending: true });

      setDoubts(doubtsData ?? []);

      const grouped: Record<string, Answer[]> = {};
      (answersData ?? []).forEach((a: any) => {
        if (!grouped[a.doubt_id]) grouped[a.doubt_id] = [];
        grouped[a.doubt_id].push(a);
      });
      setAnswers(grouped);
    } catch (err) {
      // silent fail
    } finally {
      setFetchingData(false);
    }
  };

  // ─── Sign in with Google ──────────────────────────────────────
  const handleSignIn = async () => {
    setSigningIn(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/admin',
        },
      });
      if (error) throw error;
    } catch (err) {
      // silent fail
    } finally {
      setSigningIn(false);
    }
  };

  // ─── Sign out ─────────────────────────────────────────────────
  const handleSignOut = () => {
    setIsNavigatingAway(true);
    navigate('/pyqs');
    setTimeout(() => {
      supabase.auth.signOut().then(() => setSession(null));
    }, 100);
  };

  // ─── Delete a doubt (and its answers cascade) ─────────────────
  const handleDeleteDoubt = async (doubtId: string) => {
    const isAdmin = adminEmails.includes((session?.user?.email ?? '').toLowerCase());
    if (!isAdmin) return;

    if (!confirm('Delete this doubt and all its answers?')) return;
    setDeleting((prev) => ({ ...prev, [doubtId]: true }));
    try {
      // Delete answers first (in case cascade isn't configured)
      await supabase.from('answers').delete().eq('doubt_id', doubtId);
      await supabase.from('doubts').delete().eq('id', doubtId);

      setDoubts((prev) => prev.filter((d) => d.id !== doubtId));
      setAnswers((prev) => {
        const updated = { ...prev };
        delete updated[doubtId];
        return updated;
      });
    } catch (err) {
      // silent fail
    } finally {
      setDeleting((prev) => ({ ...prev, [doubtId]: false }));
    }
  };

  // ─── Delete a single answer ───────────────────────────────────
  const handleDeleteAnswer = async (answerId: string, doubtId: string) => {
    const isAdmin = adminEmails.includes((session?.user?.email ?? '').toLowerCase());
    if (!isAdmin) return;

    if (!confirm('Delete this answer?')) return;
    setDeletingAnswer((prev) => ({ ...prev, [answerId]: true }));
    try {
      await supabase.from('answers').delete().eq('id', answerId);

      setAnswers((prev) => ({
        ...prev,
        [doubtId]: (prev[doubtId] ?? []).filter((a) => a.id !== answerId),
      }));
    } catch (err) {
      // silent fail
    } finally {
      setDeletingAnswer((prev) => ({ ...prev, [answerId]: false }));
    }
  };

  // ─── Edit a doubt question ────────────────────────────────────
  const startEditDoubt = (doubt: Doubt) => {
    setEditingDoubt(doubt.id);
    setEditDoubtText(doubt.question);
  };

  const handleSaveDoubt = async (doubtId: string) => {
    const isAdmin = adminEmails.includes((session?.user?.email ?? '').toLowerCase());
    if (!isAdmin) return;

    if (!editDoubtText.trim()) return;
    setSavingDoubt(true);
    try {
      const { error } = await supabase
        .from('doubts')
        .update({ question: editDoubtText.trim() })
        .eq('id', doubtId);

      if (error) throw error;

      setDoubts((prev) =>
        prev.map((d) => d.id === doubtId ? { ...d, question: editDoubtText.trim() } : d)
      );
      setEditingDoubt(null);
      setEditDoubtText('');
    } catch (err) {
      // silent fail
    } finally {
      setSavingDoubt(false);
    }
  };

  // ─── Edit an answer ───────────────────────────────────────────
  const startEditAnswer = (ans: Answer) => {
    setEditingAnswer(ans.id);
    setEditAnswerText(ans.answer);
  };

  const handleSaveAnswer = async (answerId: string, doubtId: string) => {
    const isAdmin = adminEmails.includes((session?.user?.email ?? '').toLowerCase());
    if (!isAdmin) return;

    if (!editAnswerText.trim()) return;
    setSavingAnswer(true);
    try {
      const { error } = await supabase
        .from('answers')
        .update({ answer: editAnswerText.trim() })
        .eq('id', answerId);

      if (error) throw error;

      setAnswers((prev) => ({
        ...prev,
        [doubtId]: (prev[doubtId] ?? []).map((a) =>
          a.id === answerId ? { ...a, answer: editAnswerText.trim() } : a
        ),
      }));
      setEditingAnswer(null);
      setEditAnswerText('');
    } catch (err) {
      // silent fail
    } finally {
      setSavingAnswer(false);
    }
  };

  // ─── Toggle expand ────────────────────────────────────────────
  const toggleExpanded = (id: string) => {
    const s = new Set(expanded);
    s.has(id) ? s.delete(id) : s.add(id);
    setExpanded(s);
  };

  // ─── Time-ago helper ──────────────────────────────────────────
  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  // ─── Loading state ────────────────────────────────────────────
  if (loading || isNavigatingAway) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center bg-white dark:bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      </main>
    );
  }

  // ─── Not authenticated → Sign-in screen ───────────────────────
  if (!session) {
    return (
      <main className="flex flex-col items-center justify-start pt-6 sm:pt-10 bg-white dark:bg-black px-4">
        <SEO page="admin" />
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-lg text-center">
            <div className="flex justify-center mb-6">
              <img src="/logo.webp" alt="Logo" className="h-32 w-auto object-contain" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-8">
              Sign in with your Google account to manage doubts and answers.
            </p>

            <button
              onClick={handleSignIn}
              disabled={signingIn}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-black hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black rounded-xl text-sm font-semibold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signingIn ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <img src="/google.webp" alt="Google" className="h-5 w-5" />
              )}
              {signingIn ? 'Signing in…' : 'Sign in with Google'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ─── Authenticated → check admin email ─────────────────────────
  const user: User = session.user;

  if (checkingAdmin) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center bg-white dark:bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      </main>
    );
  }

  const isAdmin = adminEmails.includes((user.email ?? '').toLowerCase());

  // ─── Access Denied screen ─────────────────────────────────────
  if (!isAdmin) {
    return (
      <main className="flex flex-col items-center justify-start pt-6 sm:pt-10 bg-white dark:bg-black px-4">
        <SEO page="admin" />
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-zinc-950 border border-red-200 dark:border-red-900 rounded-3xl p-8 sm:p-10 shadow-lg text-center">
            <div className="flex justify-center mb-6">
              <img src="/logo.webp" alt="Logo" className="h-32 w-auto object-contain" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-2">
              Access Denied
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-8">
              This account does not have admin access.
            </p>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl font-medium transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ─── Authenticated Admin → Dashboard ──────────────────────────
  const totalAnswers = Object.values(answers).flat().length;

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEO page="admin" />

      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white flex items-center gap-2">
            <Shield className="h-6 w-6 text-zinc-500" />
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Signed in as <span className="font-medium text-black dark:text-white">{user.email}</span>
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Total Doubts</p>
          <p className="text-3xl font-bold text-black dark:text-white">{doubts.length}</p>
        </div>
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Total Answers</p>
          <p className="text-3xl font-bold text-black dark:text-white">{totalAnswers}</p>
        </div>
      </div>

      {/* Doubts management */}
      <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Manage Doubts</h2>

      {fetchingData ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
        </div>
      ) : doubts.length === 0 ? (
        <div className="text-center py-16">
          <MessageCircle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No doubts to manage yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {doubts.map((doubt) => {
            const isOpen = expanded.has(doubt.id);
            const doubtAnswers = answers[doubt.id] ?? [];
            const isDeletingDoubt = deleting[doubt.id];

            return (
              <div
                key={doubt.id}
                className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Doubt header */}
                <div className="px-5 py-4 flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    {editingDoubt === doubt.id ? (
                      <div className="flex items-start gap-2">
                        <textarea
                          value={editDoubtText}
                          onChange={(e) => setEditDoubtText(e.target.value)}
                          rows={2}
                          className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg text-black dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        />
                        <button
                          onClick={() => handleSaveDoubt(doubt.id)}
                          disabled={savingDoubt || !editDoubtText.trim()}
                          className="h-8 w-8 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors disabled:opacity-50"
                          title="Save"
                        >
                          {savingDoubt ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => { setEditingDoubt(null); setEditDoubtText(''); }}
                          className="h-8 w-8 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                          title="Cancel"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-black dark:text-white font-medium leading-snug text-sm">
                        {doubt.question}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <UserIcon className="h-3 w-3" />
                        {doubt.posted_by}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {timeAgo(doubt.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {doubtAnswers.length} answer{doubtAnswers.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Edit doubt */}
                    {editingDoubt !== doubt.id && (
                      <button
                        onClick={() => startEditDoubt(doubt)}
                        className="h-8 w-8 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title="Edit question"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    )}

                    {/* Expand/collapse answers */}
                    {doubtAnswers.length > 0 && (
                      <button
                        onClick={() => toggleExpanded(doubt.id)}
                        className="h-8 w-8 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title={isOpen ? 'Collapse' : 'Expand answers'}
                      >
                        {isOpen ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      </button>
                    )}

                    {/* Delete doubt */}
                    <button
                      onClick={() => handleDeleteDoubt(doubt.id)}
                      disabled={isDeletingDoubt}
                      className="h-8 w-8 flex items-center justify-center rounded-full border border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors disabled:opacity-50"
                      title="Delete doubt"
                    >
                      {isDeletingDoubt ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Answers list */}
                {isOpen && doubtAnswers.length > 0 && (
                  <div className="border-t border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 divide-y divide-zinc-200 dark:divide-zinc-800">
                    {doubtAnswers.map((ans) => (
                      <div key={ans.id} className="px-5 py-3 flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          {editingAnswer === ans.id ? (
                            <div className="flex items-start gap-2">
                              <textarea
                                value={editAnswerText}
                                onChange={(e) => setEditAnswerText(e.target.value)}
                                rows={2}
                                className="flex-1 px-3 py-2 text-sm bg-white dark:bg-black border border-zinc-300 dark:border-zinc-700 rounded-lg text-black dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-zinc-500"
                              />
                              <button
                                onClick={() => handleSaveAnswer(ans.id, doubt.id)}
                                disabled={savingAnswer || !editAnswerText.trim()}
                                className="h-7 w-7 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors disabled:opacity-50"
                                title="Save"
                              >
                                {savingAnswer ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                              </button>
                              <button
                                onClick={() => { setEditingAnswer(null); setEditAnswerText(''); }}
                                className="h-7 w-7 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                title="Cancel"
                              >
                                <XCircle className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <p className="text-black dark:text-white text-sm leading-relaxed">
                              {ans.answer}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <UserIcon className="h-3 w-3" />
                              {ans.answered_by}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {timeAgo(ans.created_at)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 flex-shrink-0">
                          {/* Edit answer */}
                          {editingAnswer !== ans.id && (
                            <button
                              onClick={() => startEditAnswer(ans)}
                              className="h-7 w-7 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                              title="Edit answer"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {/* Delete answer */}
                          <button
                            onClick={() => handleDeleteAnswer(ans.id, doubt.id)}
                            disabled={deletingAnswer[ans.id]}
                            className="h-7 w-7 flex items-center justify-center rounded-full border border-red-200 dark:border-red-900 text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors disabled:opacity-50"
                            title="Delete answer"
                          >
                            {deletingAnswer[ans.id] ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
