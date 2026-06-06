import React, { useEffect, useState, useCallback } from 'react';
import { SEO } from '@/components/SEO';
import { supabase } from '@/lib/supabaseClient';
import {
  Plus, X, Send, MessageCircle,
  User, Clock, Loader2, AlertCircle
} from 'lucide-react';

interface Doubt {
  id: string;
  question: string;
  posted_by: string;
  created_at: string;
  answer_count: number;
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
  const [answers, setAnswers] = useState<Record<string, Answer[]>>({});
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState('');

  // Per-doubt expanded state + reply inputs
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replyName, setReplyName] = useState<Record<string, string>>({});
  const [replying, setReplying] = useState<Record<string, boolean>>({});

  // ─── Fetch doubts from Supabase ───────────────────────────────
  const fetchDoubts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('doubts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Compute answer_count client-side from the answers table
      const doubtsWithCount: Doubt[] = (data ?? []).map((d: any) => ({
        id: d.id,
        question: d.question,
        posted_by: d.posted_by,
        created_at: d.created_at,
        answer_count: 0, // will be updated after fetching answers
      }));

      setDoubts(doubtsWithCount);

      // Fetch all answers in one go
      const { data: ansData, error: ansError } = await supabase
        .from('answers')
        .select('*')
        .order('created_at', { ascending: true });

      if (ansError) throw ansError;

      const grouped: Record<string, Answer[]> = {};
      const countMap: Record<string, number> = {};

      (ansData ?? []).forEach((a: any) => {
        const key = a.doubt_id;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push({
          id: a.id,
          doubt_id: a.doubt_id,
          answer: a.answer,
          answered_by: a.answered_by,
          created_at: a.created_at,
        });
        countMap[key] = (countMap[key] ?? 0) + 1;
      });

      setAnswers(grouped);

      // Patch answer counts
      setDoubts((prev) =>
        prev.map((d) => ({
          ...d,
          answer_count: countMap[d.id] ?? 0,
        }))
      );
    } catch (err) {
      // silent fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoubts();
  }, [fetchDoubts]);

  // ─── Post a new doubt ─────────────────────────────────────────
  const handlePostDoubt = async () => {
    if (!question.trim()) return;
    setPosting(true);
    setPostError('');

    try {
      const { data, error } = await supabase
        .from('doubts')
        .insert({
          question: question.trim(),
          posted_by: name.trim() || 'Anonymous',
        })
        .select()
        .single();

      if (error) throw error;

      const newDoubt: Doubt = {
        id: data.id,
        question: data.question,
        posted_by: data.posted_by,
        created_at: data.created_at,
        answer_count: 0,
      };

      setDoubts((prev) => [newDoubt, ...prev]);
      setQuestion('');
      setName('');
    } catch (err: any) {
      setPostError('Failed to post doubt. Please try again.');
    } finally {
      setPosting(false);
    }
  };

  // ─── Toggle expand/collapse ───────────────────────────────────
  const toggleExpanded = (doubtId: string) => {
    const newSet = new Set(expanded);
    if (newSet.has(doubtId)) {
      newSet.delete(doubtId);
    } else {
      newSet.add(doubtId);
    }
    setExpanded(newSet);
  };

  // ─── Post an answer ───────────────────────────────────────────
  const handlePostAnswer = async (doubtId: string) => {
    const text = replyText[doubtId]?.trim();
    if (!text) return;

    setReplying((prev) => ({ ...prev, [doubtId]: true }));

    try {
      const { data, error } = await supabase
        .from('answers')
        .insert({
          doubt_id: doubtId,
          answer: text,
          answered_by: replyName[doubtId]?.trim() || 'Anonymous',
        })
        .select()
        .single();

      if (error) throw error;

      const newAnswer: Answer = {
        id: data.id,
        doubt_id: data.doubt_id,
        answer: data.answer,
        answered_by: data.answered_by,
        created_at: data.created_at,
      };

      setAnswers((prev) => ({
        ...prev,
        [doubtId]: [...(prev[doubtId] ?? []), newAnswer],
      }));

      // Increment answer count
      setDoubts((prev) =>
        prev.map((d) =>
          d.id === doubtId ? { ...d, answer_count: (d.answer_count ?? 0) + 1 } : d
        )
      );

      setReplyText((prev) => ({ ...prev, [doubtId]: '' }));
      setReplyName((prev) => ({ ...prev, [doubtId]: '' }));
    } catch (err) {
      // silent fail
    } finally {
      setReplying((prev) => ({ ...prev, [doubtId]: false }));
    }
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

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEO page="doubts" />
      {/* Post a Doubt */}
      {!hideForm && (
        <div className="bg-white dark:bg-black border border-zinc-400 dark:border-zinc-800 rounded-2xl p-5 mb-8 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
            Ask a Doubt
          </h2>
          <textarea
            value={question}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)}
            placeholder="Type your doubt or question here..."
            rows={3}
            className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent resize-none transition-all"
          />
          <div className="flex items-center gap-3 mt-3">
            <input
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all"
            />
            <button
              onClick={handlePostDoubt}
              disabled={!question.trim() || posting}
              className="flex items-center gap-2 px-5 py-2 bg-black hover:bg-zinc-900 border border-black text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-black dark:border-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors shadow-sm"
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
          {[...Array(4)].map((_, i: number) => (
            <div key={i} className="bg-white dark:bg-black border border-zinc-400 dark:border-zinc-800 rounded-2xl p-5 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-zinc-900 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-100 dark:bg-zinc-800 rounded w-1/4" />
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
          {doubts.map((doubt: Doubt) => {
            const isOpen = expanded.has(doubt.id);
            const doubtAnswers = answers[doubt.id] ?? [];
            const isReplying = replying[doubt.id];

            return (
              <div
                key={doubt.id}
                className="bg-white dark:bg-black border border-zinc-400 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm transition-all"
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
                        <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 font-medium">
                          <MessageCircle className="h-3 w-3" />
                          {doubt.answer_count} answer{doubt.answer_count !== 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-orange-500 dark:text-orange-400 font-medium bg-orange-50 dark:bg-zinc-950/40 px-2 py-0.5 rounded">
                          Unanswered
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleExpanded(doubt.id)}
                      className={`flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full border transition-all ${
                        isOpen
                          ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                          : 'bg-black hover:bg-zinc-900 border-black text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-black dark:border-zinc-300 shadow-sm'
                      }`}
                      title={isOpen ? 'Close answers' : 'View / Add answers'}
                    >
                      {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Answers Panel */}
                {isOpen && (
                  <div className="border-t border-zinc-200 dark:border-zinc-900 bg-gray-50 dark:bg-zinc-950/40">
                    {/* Existing answers */}
                    {doubtAnswers.length > 0 ? (
                      <div className="divide-y divide-zinc-200 dark:divide-zinc-900">
                        {doubtAnswers.map((ans: Answer) => (
                          <div key={ans.id} className="px-5 py-4">
                            <p className="text-black dark:text-white text-sm leading-relaxed">
                              {ans.answer}
                            </p>
                            
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
                    <div className="px-5 py-4 border-t border-zinc-200 dark:border-zinc-900">
                      <textarea
                        value={replyText[doubt.id] ?? ''}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                          const val = e.target.value;
                          setReplyText((prev: Record<string, string>) => ({ ...prev, [doubt.id]: val }));
                        }}
                        placeholder="Write your answer..."
                        rows={2}
                        className="w-full px-3 py-2 text-sm bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 rounded-xl text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent resize-none transition-all"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          value={replyName[doubt.id] ?? ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const val = e.target.value;
                            setReplyName((prev: Record<string, string>) => ({ ...prev, [doubt.id]: val }));
                          }}
                          placeholder="Your name (optional)"
                          className="flex-1 px-3 py-1.5 text-sm bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 rounded-lg text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all"
                        />
                        <button
                          onClick={() => handlePostAnswer(doubt.id)}
                          disabled={!replyText[doubt.id]?.trim() || isReplying}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-black hover:bg-zinc-900 border border-black text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-black dark:border-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
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
