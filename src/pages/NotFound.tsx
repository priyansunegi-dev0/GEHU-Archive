import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-black text-zinc-200 dark:text-zinc-800 select-none">404</p>
      <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-black dark:text-white">
        Page Not Found
      </h1>
      <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md text-sm sm:text-base">
        The page you're looking for doesn't exist or has been moved.
        Head back to the PYQs archive to find what you need.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          to="/pyqs"
          className="px-6 py-2.5 rounded-lg bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-80 transition-opacity"
        >
          Browse PYQs
        </Link>
        <Link
          to="/pyqs/doubts"
          className="px-6 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-black dark:text-white font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          Go to Doubts
        </Link>
      </div>
    </main>
  );
}
