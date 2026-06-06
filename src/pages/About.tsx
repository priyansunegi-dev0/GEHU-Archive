import { useEffect, useState } from 'react';
import { SEO } from '@/components/SEO';

export function About() {
  const [campusName, setCampusName] = useState('Dehradun Campus');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes("haldwani")) setCampusName("Haldwani Campus");
      else if (hostname.includes("bhimtal")) setCampusName("Bhimtal Campus");
      else if (hostname.includes("doubts")) setCampusName("Doubts Portal");
    }
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO page="about" />
      <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
        About GEHU Archive
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-500 dark:text-gray-400">
          GEHU Archive is a student‑driven collection of previous‑year question papers of Graphic Era Hill University, {campusName}.
        </p>
        <p className="text-gray-500 dark:text-gray-400 mt-4">
          Our mission is to provide easy access to past exam papers to help students prepare effectively.
        </p>
      </div>
    </main>
  );
}
