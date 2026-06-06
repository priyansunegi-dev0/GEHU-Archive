import { useEffect } from 'react';

export function Contribute() {
  useEffect(() => {
    document.title = "GEHU Archive | Contribute";
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
        Contribute Materials
      </h1>
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
          Share Your Knowledge
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Help other students by contributing study materials, notes, and resources.
        </p>
        <ul className="list-disc list-inside text-gray-500 dark:text-gray-400 mt-4 space-y-2">
          <li>Upload study notes</li>
          <li>Share important links and resources</li>
          <li>Create summary documents</li>
          <li>Contribute practice problems</li>
        </ul>
      </div>
    </main>
  );
}
