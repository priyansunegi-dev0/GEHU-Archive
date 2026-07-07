import { SEO } from '@/components/SEO';
import { Link2, ExternalLink, BookOpen } from 'lucide-react';

export function About() {

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO page="about" />

      {/* Main Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-10">
        <h1 className="text-4xl font-extrabold text-black dark:text-white tracking-tight flex items-center gap-3">
          <span>About</span>
        </h1>
      </div>

      <div className="space-y-12 text-zinc-600 dark:text-zinc-400">

        {/* Section: Description */}
        <section className="space-y-4">
          <p className="text-lg leading-relaxed">
            This site is not affiliated with Graphic Era Hill University or any of its campuses. This site is created for the student of GEHU Dehradun Campus to access previous year question papers easily.
          </p>
        </section>

        {/* Section: Why this website? */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-black dark:text-white flex items-center gap-2">
            <span>Why this website?</span>
          </h2>
          <p className="text-lg italic pl-4 border-l-2 border-zinc-300 dark:border-zinc-700">
            Let's be honest, you already know why you're here.
          </p>
        </section>


        {/* Section: Also Check Out */}
        <section className="space-y-4">
          <h3 className="text-2xl font-bold text-black dark:text-white flex items-center gap-2">
            <Link2 className="h-5 w-5 text-zinc-500" />
            <span>Also Check Out</span>
          </h3>
          <p className="text-base">
            Join our WhatsApp Communities and Groups for discussions, circulars, and other resources:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">

            {/* Card 1: GRAPHIANS */}
            <a
              href="https://chat.whatsapp.com/CLCyjRtMnXWKwRpzh3TqFV"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-black dark:text-white group-hover:underline">
                    GRAPHIANS
                  </h4>
                  <p className="text-xs text-green-600 dark:text-green-500 font-medium mt-1">
                    1500+ Students
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors" />
              </div>
            </a>

            {/* Card 2: Discussions */}
            <a
              href="https://chat.whatsapp.com/CzxP4UDKIN7KRcetmntUrB"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-black dark:text-white group-hover:underline">
                    Discussions
                  </h4>
                  <p className="text-xs text-green-600 dark:text-green-500 font-medium mt-1">
                    500+ Students
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors" />
              </div>
            </a>

            {/* Card 3: GEU/GEHU Circular & Notices */}
            <a
              href="https://chat.whatsapp.com/IC99GsnUhbH5zCa6PJcpqq"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-black dark:text-white group-hover:underline">
                    Circular & Notices
                  </h4>
                  <p className="text-xs text-green-600 dark:text-green-500 font-medium mt-1">
                    600+ Students
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors" />
              </div>
            </a>

            {/* Card 4: GEU/GEHU Fest' Gallery */}
            <a
              href="https://chat.whatsapp.com/HlQ0RWgKc8c8hYdn0bEFzi"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-black dark:text-white group-hover:underline">
                    Fest' Gallery
                  </h4>
                  <p className="text-xs text-green-600 dark:text-green-500 font-medium mt-1">
                    1000+ Students
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors" />
              </div>
            </a>

            {/* Card 5: BTech Students */}
            <a
              href="https://chat.whatsapp.com/F9YOQTcSJALJRfPdQ12CoN"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-black dark:text-white group-hover:underline">
                    BTech Students
                  </h4>
                </div>
                <ExternalLink className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors" />
              </div>
            </a>

          </div>
        </section>

        {/* Section: Learning Programming (Chai aur Code) */}
        <section className="space-y-3">
          <h3 className="text-2xl font-bold text-black dark:text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-zinc-500" />
            <span>Chai aur Code</span>
          </h3>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Highly recommended platforms for beginners to learn programming, DSA, and computer science fundamentals from scratch:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>
              <a
                href="https://www.youtube.com/@chaiaurcode"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-white underline hover:opacity-80 inline-flex items-center gap-0.5"
              >
                YouTube Channel (Chai aur Code) <ExternalLink className="h-3.5 w-3.5 inline" />
              </a>
            </li>
            <li>
              <a
                href="https://chaicode.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-white underline hover:opacity-80 inline-flex items-center gap-0.5"
              >
                Official Website (ChaiCode) <ExternalLink className="h-3.5 w-3.5 inline" />
              </a>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
