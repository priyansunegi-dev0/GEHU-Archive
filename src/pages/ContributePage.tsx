import { CheckCircle, Mail, GitBranch, FileText } from 'lucide-react';
import { SEO } from '@/components/SEO';

export function ContributePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEO page="contribute" />
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-black dark:text-white mb-6 tracking-tight leading-none">
          How to Contribute
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-xl sm:text-2xl leading-relaxed max-w-3xl">
          Help other students by sharing your study materials. Follow the simple steps below to submit your PDFs to our archive.
        </p>
      </div>

      <div className="space-y-16">
        {/* Step by Step Guide */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-10 flex items-center gap-3">
            <CheckCircle className="h-7 w-7 text-green-500 flex-shrink-0" />
            Contribution Options
          </h2>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-3 flex items-center gap-2">
                  Prepare Your PDF
                  <FileText className="h-6 w-6 text-gray-500" />
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl leading-relaxed">
                  Gather previous years' question papers, study materials, or notes. Ensure the files are clear, legible, and formatted as a PDF.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-3 flex items-center gap-2">
                  Send via Email
                  <Mail className="h-6 w-6 text-gray-500" />
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl leading-relaxed">
                  Email your PDFs to <a href="mailto:workwithpndev0@gmail.com" className="font-bold text-zinc-900 dark:text-white hover:underline">workwithpndev0@gmail.com</a>. Please mention the specific Course, Semester, and Subject in your email so we can organize it in the correct folder.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-3 flex items-center gap-2">
                  Submit via GitHub
                  <GitBranch className="h-6 w-6 text-gray-500" />
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl leading-relaxed">
                  If you are a developer, you can fork our repository, add the files directly, and submit a Pull Request to merge your contributions.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-5 border-l-4 border-zinc-300 dark:border-zinc-700 flex gap-4 items-start">
            <FileText className="h-6 w-6 text-zinc-400 flex-shrink-0 mt-0.5" />
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong className="text-black dark:text-white font-bold">Note:</strong> Please make sure your contributions are relevant to Graphic Era courses. Unrelated or spam resources will not be merged.
            </p>
          </div>
        </section>

        {/* New Courses & Contact Section */}
        <section className="pt-12 border-t border-gray-200 dark:border-zinc-800">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
              New Courses Added
            </h2>
            <ul className="list-disc list-inside text-lg sm:text-xl text-gray-700 dark:text-gray-300">
              <li>B.Tech – Mechanical Engineering</li>
              <li>B.Tech – Computer Science & Engineering</li>
              <li>MCA – Data Science</li>
              <li>M.Tech – Robotics</li>
            </ul>

            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
              Have a Question? Contact Us
            </h2>
            <div className="inline-flex items-center gap-3 text-lg sm:text-xl">
              <span className="text-gray-500 dark:text-gray-400">Email:</span>
              <a href="mailto:workwithpndev0@gmail.com" className="font-bold text-zinc-900 dark:text-white hover:underline decoration-2">
                workwithpndev0@gmail.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
