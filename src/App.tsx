import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { ThemeProvider } from "next-themes"
import { lazy, Suspense, useEffect } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Toaster } from "@/components/ui/sonner"

const Home = lazy(() => import("@/pages/Home").then(m => ({ default: m.Home })))
const Doubts = lazy(() => import("@/pages/Doubts").then(m => ({ default: m.Doubts })))
const About = lazy(() => import("@/pages/About").then(m => ({ default: m.About })))
const Disclaimer = lazy(() => import("@/pages/Disclaimer").then(m => ({ default: m.Disclaimer })))
const Contact = lazy(() => import("@/pages/Contact").then(m => ({ default: m.Contact })))
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard").then(m => ({ default: m.AdminDashboard })))
const NotFound = lazy(() => import("@/pages/NotFound").then(m => ({ default: m.NotFound })))

const PageSkeleton = () => (
  <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white animate-pulse">
    {/* Header Skeleton */}
    <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-zinc-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-28 sm:w-36" />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-16" />
            <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          </div>
        </div>
      </div>
    </header>

    {/* Main Content Skeleton */}
    <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-16" />
        <span className="text-zinc-300 dark:text-zinc-700">/</span>
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-20" />
      </div>

      <div className="flex flex-col mt-4 divide-y divide-zinc-200 dark:divide-zinc-800 border-t border-zinc-200 dark:border-zinc-800">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="py-4 flex items-center gap-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg flex-shrink-0" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4 sm:w-1/3" />
          </div>
        ))}
      </div>
    </main>

    {/* Footer Skeleton */}
    <footer className="bg-zinc-100 dark:bg-[#111111] border-t border-zinc-200 dark:border-zinc-800 mt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-32" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-48" />
            <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded max-w-xl w-full" />
          </div>
          <div className="space-y-3">
            <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-24" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-16" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20" />
          </div>
        </div>
      </div>
    </footer>
  </div>
);

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as any
      });
    } catch (e) {
      try {
        window.scrollTo(0, 0);
      } catch (err) {}
    }
    
    try {
      document.documentElement.scrollTop = 0;
    } catch (e) {}
    try {
      if (document.body) {
        document.body.scrollTop = 0;
      }
    } catch (e) {}
  }, [pathname, search]);

  return null;
}

export function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Toaster />
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            {/* Redirect root to /pyqs */}
          <Route path="/" element={<Navigate to="/pyqs" replace />} />

          {/* Redirect legacy paths to new nested paths */}
          <Route path="/doubts" element={<Navigate to="/pyqs/doubts" replace />} />
          <Route path="/about" element={<Navigate to="/pyqs/about" replace />} />
          <Route path="/disclaimer" element={<Navigate to="/pyqs/disclaimer" replace />} />
          <Route path="/contact" element={<Navigate to="/pyqs/contact" replace />} />

          {/* Public routes with header and footer */}
          <Route
            path="/pyqs"
            element={
              <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
                <Header />
                <div className="flex-grow">
                  <Home />
                </div>
                <Footer />
              </div>
            }
          />
          <Route
            path="/pyqs/doubts"
            element={
              <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
                <Header />
                <div className="flex-grow">
                  <Doubts />
                </div>
                <Footer />
              </div>
            }
          />
          <Route
            path="/pyqs/about"
            element={
              <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
                <Header />
                <div className="flex-grow">
                  <About />
                </div>
                <Footer />
              </div>
            }
          />

          <Route
            path="/pyqs/disclaimer"
            element={
              <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
                <Header />
                <div className="flex-grow">
                  <Disclaimer />
                </div>
                <Footer />
              </div>
            }
          />
          <Route
            path="/pyqs/contact"
            element={
              <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
                <Header />
                <div className="flex-grow">
                  <Contact />
                </div>
                <Footer />
              </div>
            }
          />

          <Route
            path="/admin"
            element={
              <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
                <Header />
                <div className="flex-grow pb-10">
                  <AdminDashboard />
                </div>
              </div>
            }
          />

          {/* Custom 404 page for invalid paths */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
                <Header />
                <div className="flex-grow">
                  <NotFound />
                </div>
                <Footer />
              </div>
            }
          />
          </Routes>
      </Suspense>
    </Router>
    </ThemeProvider>
  )
}

export default App

