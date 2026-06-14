import { useEffect, useState } from 'react';
import { SEO } from '@/components/SEO';

export function Disclaimer() {
  const [campusName, setCampusName] = useState('GEHU Archive');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes("dehradun")) setCampusName("Dehradun Campus");
      else if (hostname.includes("haldwani")) setCampusName("Haldwani Campus");
      else if (hostname.includes("bhimtal")) setCampusName("Bhimtal Campus");

    }
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO page="disclaimer" /> {/* Using about metadata mapping or customize if needed */}
      <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
        Disclaimer
      </h1>
      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-4">
        <p>
          Last updated: June 11, 2026
        </p>
        <p>
          The information contained on the GEHU Archive ({campusName}) website (accessible from in-gehu.in) is for general educational and informational purposes only.
        </p>

        <h2 className="text-xl font-semibold text-black dark:text-white mt-6 mb-2">No Official Affiliation</h2>
        <p>
          GEHU Archive is a completely student-driven, community-run initiative. It is <strong>NOT</strong> affiliated with, associated with, authorized by, endorsed by, or in any way officially connected to Graphic Era Hill University (GEHU), Graphic Era University (GEU), or any of their subsidiaries or affiliates. The official website of Graphic Era Hill University can be found at <a href="https://gehu.ac.in" className="text-black dark:text-white underline" target="_blank" rel="noopener noreferrer">https://gehu.ac.in</a>.
        </p>

        <h2 className="text-xl font-semibold text-black dark:text-white mt-6 mb-2">Educational Purposes Only</h2>
        <p>
          All previous year question papers (PYQs), notes, study materials, and references provided on this website are collected, uploaded, and shared by students to help peers prepare for exams. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the study materials. Any reliance you place on such information is strictly at your own risk.
        </p>

        <h2 className="text-xl font-semibold text-black dark:text-white mt-6 mb-2">External Links Disclaimer</h2>
        <p>
          This website may contain links to external websites that are not provided or maintained by or in any way affiliated with GEHU Archive. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
        </p>
      </div>
    </main>
  );
}
