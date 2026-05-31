import { Mail, CheckCircle, ArrowRight, FolderPlus, UploadCloud, FileText } from 'lucide-react';

export function ContributePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            How to Contribute
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Help other students by sharing your study materials. Follow the simple steps below to upload your PDFs directly into the course folders.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">
          
          {/* Step by Step Guide */}
          <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-8 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Step-by-Step Guide
            </h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black dark:text-white mb-2 flex items-center gap-2">
                    Browse the Homepage
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Go to the main page and navigate through the course folders. Look for the folder where you want to add your study material.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black dark:text-white mb-2 flex items-center gap-2">
                    Open the Folder
                    <FolderPlus className="h-5 w-5 text-gray-500" />
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click on the desired folder to open it. If the folder is open for contributions, you will see a <span className="font-semibold text-black dark:text-white">"Upload PDF"</span> or <span className="font-semibold text-black dark:text-white">"+"</span> button at the top right of the folder view.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black dark:text-white mb-2 flex items-center gap-2">
                    Upload your PDF
                    <UploadCloud className="h-5 w-5 text-gray-500" />
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click the upload button. A dialog will appear asking you to select a PDF file from your device. Select the file, wait for the upload to complete, and it will instantly become available for everyone!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 flex gap-3 items-start">
              <FileText className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong className="text-gray-900 dark:text-gray-200">Note:</strong> Make sure your PDF is relevant to the folder topic and does not exceed the maximum file size. Uploading spam or unrelated files may result in access restrictions.
              </p>
            </div>
          </section>

          {/* Admin Access Section */}
          <section className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
                  Need Admin Panel Access?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  If you want to become a moderator to create new course folders, manage uploaded files, or oversee doubt resolutions, you can request admin access.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Contact:</span>
                  <a href="mailto:xyz@gmail.com" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    xyz@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
