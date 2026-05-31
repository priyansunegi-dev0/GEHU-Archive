import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Plus, X, Send, MessageCircle,
  User, Clock, Loader2, AlertCircle, Trash2, Edit2, Check
} from 'lucide-react';

interface Doubt {
  id: string;
  question: string;
  posted_by: string;
  created_at: string;
  answer_count?: number;
}

interface Answer {
  id: string;
  doubt_id: string;
  answer: string;
  answered_by: string;
  created_at: string;
}

interface DoubtsProps {
  hideForm?: boolean;
}

export function Doubts({ hideForm = false }: DoubtsProps) {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState('');

  // Per-doubt expanded state + answers + reply inputs
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [answers, setAnswers] = useState<Record<string, Answer[]>>({});
  const [answerLoading, setAnswerLoading] = useState<Record<string, boolean>>({});
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replyName, setReplyName] = useState<Record<string, string>>({});
  const [replying, setReplying] = useState<Record<string, boolean>>({});

  const [isAdmin, setIsAdmin] = useState(false);
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [editAnswerText, setEditAnswerText] = useState('');

  useEffect(() => {
    fetchDoubts();
    checkAdmin();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAdmin(!!session);
      }
    );
    return () => subscription?.unsubscribe();
  }, []);

  const checkAdmin = async () => {
    const { data } = await supabase.auth.getSession();
    setIsAdmin(!!data.session);
  };

  const fetchDoubts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('doubts')
      .select('*, answers(count)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setDoubts(
        data.map((d: any) => ({
          ...d,
          answer_count: d.answers?.[0]?.count ?? 0,
        }))
      );
    }
    setLoading(false);
  };

  const handlePostDoubt = async () => {
    if (!question.trim()) return;
    setPosting(true);
    setPostError('');
    const { error } = await supabase.from('doubts').insert([{
      question: question.trim(),
      posted_by: name.trim() || 'Anonymous',
    }]);

    if (error) {
      setPostError('Failed to post doubt. Please try again.');
    } else {
      setQuestion('');
      setName('');
      fetchDoubts();
    }
    setPosting(false);
  };

  const toggleExpanded = async (doubtId: string) => {
    const newSet = new Set(expanded);
    if (newSet.has(doubtId)) {
      newSet.delete(doubtId);
      setExpanded(newSet);
    } else {
      newSet.add(doubtId);
      setExpanded(newSet);
      if (!answers[doubtId]) {
        await fetchAnswers(doubtId);
      }
    }
  };

  const fetchAnswers = async (doubtId: string) => {
    setAnswerLoading(prev => ({ ...prev, [doubtId]: true }));
    const { data, error } = await supabase
      .from('answers')
      .select('*')
      .eq('doubt_id', doubtId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setAnswers(prev => ({ ...prev, [doubtId]: data }));
    }
    setAnswerLoading(prev => ({ ...prev, [doubtId]: false }));
  };

  const handlePostAnswer = async (doubtId: string) => {
    const text = replyText[doubtId]?.trim();
    if (!text) return;

    setReplying(prev => ({ ...prev, [doubtId]: true }));
    const { error } = await supabase.from('answers').insert([{
      doubt_id: doubtId,
      answer: text,
      answered_by: replyName[doubtId]?.trim() || 'Anonymous',
    }]);

    if (!error) {
      setReplyText(prev => ({ ...prev, [doubtId]: '' }));
      setReplyName(prev => ({ ...prev, [doubtId]: '' }));
      await fetchAnswers(doubtId);
      // Update answer count on the doubt
      setDoubts(prev =>
        prev.map(d => d.id === doubtId ? { ...d, answer_count: (d.answer_count ?? 0) + 1 } : d)
      );
    }
    setReplying(prev => ({ ...prev, [doubtId]: false }));
  };

  const handleDeleteDoubt = async (doubtId: string) => {
    if (!confirm('Are you sure you want to delete this doubt?')) return;
    const { error } = await supabase.from('doubts').delete().eq('id', doubtId);
    if (!error) {
      setDoubts(prev => prev.filter(d => d.id !== doubtId));
    }
  };

  const handleDeleteAnswer = async (answerId: string, doubtId: string) => {
    if (!confirm('Are you sure you want to delete this answer?')) return;
    const { error } = await supabase.from('answers').delete().eq('id', answerId);
    if (!error) {
      await fetchAnswers(doubtId);
      setDoubts(prev =>
        prev.map(d => d.id === doubtId ? { ...d, answer_count: Math.max(0, (d.answer_count ?? 1) - 1) } : d)
      );
    }
  };

  const startEditAnswer = (answer: Answer) => {
    setEditingAnswerId(answer.id);
    setEditAnswerText(answer.answer);
  };

  const handleUpdateAnswer = async (answerId: string, doubtId: string) => {
    if (!editAnswerText.trim()) return;
    const { error } = await supabase.from('answers').update({ answer: editAnswerText }).eq('id', answerId);
    if (!error) {
      setEditingAnswerId(null);
      await fetchAnswers(doubtId);
    }
  };

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white flex items-center gap-3">
          <MessageCircle className="h-8 w-8 text-blue-600" />
          Doubts & Q&A
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Ask your doubt — the community will answer.
        </p>
      </div>

      {/* Post a Doubt */}
      {!hideForm && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 mb-8 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
            Ask a Doubt
          </h2>
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Type your doubt or question here..."
            rows={3}
            className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
          />
          <div className="flex items-center gap-3 mt-3">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              onClick={handlePostDoubt}
              disabled={!question.trim() || posting}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white disabled:text-gray-400 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              {posting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Post
            </button>
          </div>
          {postError && (
            <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {postError}
            </p>
          )}
        </div>
      )}

      {/* Doubts List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : doubts.length === 0 ? (
        <div className="text-center py-16">
          <MessageCircle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">No doubts yet. Be the first to ask!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {doubts.map(doubt => {
            const isOpen = expanded.has(doubt.id);
            const doubtAnswers = answers[doubt.id] ?? [];
            const isLoadingAnswers = answerLoading[doubt.id];
            const isReplying = replying[doubt.id];

            return (
              <div
                key={doubt.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                {/* Doubt Row */}
                <div className="px-5 py-4 flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-black dark:text-white font-medium leading-snug">
                      {doubt.question}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {doubt.posted_by}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {timeAgo(doubt.created_at)}
                      </span>
                      {(doubt.answer_count ?? 0) > 0 ? (
                        <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                          <MessageCircle className="h-3 w-3" />
                          {doubt.answer_count} answer{doubt.answer_count !== 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-orange-500 dark:text-orange-400 font-medium bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded">
                          Unanswered
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Toggle button & Admin Delete */}
                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteDoubt(doubt.id)}
                        className="flex-shrink-0 p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete doubt (Admin)"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => toggleExpanded(doubt.id)}
                      className={`flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full border transition-all ${
                        isOpen
                          ? 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300'
                          : 'bg-blue-600 hover:bg-blue-700 border-blue-600 text-white'
                      }`}
                      title={isOpen ? 'Close answers' : 'View / Add answers'}
                    >
                      {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Answers Panel */}
                {isOpen && (
                  <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40">
                    {/* Existing answers */}
                    {isLoadingAnswers ? (
                      <div className="px-5 py-4 flex items-center gap-2 text-sm text-gray-500">
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading answers...
                      </div>
                    ) : doubtAnswers.length > 0 ? (
                      <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {doubtAnswers.map(ans => (
                          <div key={ans.id} className="px-5 py-4">
                            {editingAnswerId === ans.id ? (
                              <div className="space-y-2">
                                <textarea
                                  value={editAnswerText}
                                  onChange={(e) => setEditAnswerText(e.target.value)}
                                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-black dark:text-white"
                                  rows={2}
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleUpdateAnswer(ans.id, doubt.id)}
                                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs flex items-center gap-1"
                                  >
                                    <Check className="h-3 w-3" /> Save
                                  </button>
                                  <button
                                    onClick={() => setEditingAnswerId(null)}
                                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-black dark:text-white text-sm leading-relaxed">
                                {ans.answer}
                              </p>
                            )}
                            
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {ans.answered_by}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {timeAgo(ans.created_at)}
                                </span>
                              </div>
                              {isAdmin && (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => startEditAnswer(ans)}
                                    className="p-1 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                                    title="Edit answer (Admin)"
                                  >
                                    <Edit2 className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAnswer(ans.id, doubt.id)}
                                    className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                    title="Delete answer (Admin)"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="px-5 py-3 text-sm text-gray-400 dark:text-gray-500 italic">
                        No answers yet — be the first!
                      </p>
                    )}

                    {/* Reply box */}
                    <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800">
                      <textarea
                        value={replyText[doubt.id] ?? ''}
                        onChange={e => setReplyText(prev => ({ ...prev, [doubt.id]: e.target.value }))}
                        placeholder="Write your answer..."
                        rows={2}
                        className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          value={replyName[doubt.id] ?? ''}
                          onChange={e => setReplyName(prev => ({ ...prev, [doubt.id]: e.target.value }))}
                          placeholder="Your name (optional)"
                          className="flex-1 px-3 py-1.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                        <button
                          onClick={() => handlePostAnswer(doubt.id)}
                          disabled={!replyText[doubt.id]?.trim() || isReplying}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 dark:disabled:bg-gray-700 text-white disabled:text-gray-400 rounded-lg text-sm font-medium transition-colors"
                        >
                          {isReplying ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                          Post
                        </button>
                      </div>
                    </div>
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
