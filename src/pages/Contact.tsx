import { useState } from 'react';
import { SEO } from '@/components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('Name and Message are required.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeqnsyr6lgaa0YpJo35QIBx9Dobh1-n7Sm2MJGqdhz9EhgPjA/formResponse';

    // Crucial: Passing URLSearchParams object directly as the body (instead of .toString())
    // forces the browser to set Content-Type to 'application/x-www-form-urlencoded' even in no-cors mode.
    const formData = new URLSearchParams();
    formData.append('entry.2005620554', name);
    formData.append('entry.1045781291', email);
    formData.append('entry.1065046570', message);

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Submission failed:', err);
      setError('Something went wrong. Please check your network connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
      <SEO page="contact" />
      <div className="text-center max-w-xl mb-10">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
          Contact Us
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Have any queries, suggestions, or found any incorrect paper? Please reach out to us. We will get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-xl w-full mx-auto">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="contact-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-sm outline-none transition-all focus:border-zinc-500 focus:ring-2 focus:ring-zinc-500/10 dark:text-white dark:focus:border-zinc-700"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Email <span className="text-zinc-400 text-xs">(Optional - Enter only if you expect us to contact you back)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-sm outline-none transition-all focus:border-zinc-500 focus:ring-2 focus:ring-zinc-500/10 dark:text-white dark:focus:border-zinc-700"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your query or suggestion here..."
                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-sm outline-none transition-all focus:border-zinc-500 focus:ring-2 focus:ring-zinc-500/10 dark:text-white dark:focus:border-zinc-700 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-black dark:bg-white text-white dark:text-black py-3 font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 text-center shadow-sm"
            >
              <div className="flex justify-center mb-4 text-green-500">
                <CheckCircle2 className="h-16 w-16" />
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                Thank You!
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Your message has been sent successfully. We will check it and get back to you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="inline-flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 px-6 py-2.5 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-black dark:text-white cursor-pointer"
              >
                Send another message
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
