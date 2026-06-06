import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "next-themes"
import { lazy, Suspense } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Toaster } from "@/components/ui/sonner"

const Home = lazy(() => import("@/pages/Home").then(m => ({ default: m.Home })))
const Doubts = lazy(() => import("@/pages/Doubts").then(m => ({ default: m.Doubts })))
const About = lazy(() => import("@/pages/About").then(m => ({ default: m.About })))
const ContributePage = lazy(() => import("@/pages/ContributePage").then(m => ({ default: m.ContributePage })))
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard").then(m => ({ default: m.AdminDashboard })))

export function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Toaster />
      <Router>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <Routes>
          {/* Redirect root based on domain (e.g. doubts.in-gehu.in redirects to /pyqs/doubts) */}
          <Route
            path="/"
            element={
              typeof window !== 'undefined' && window.location.hostname === 'doubts.in-gehu.in' ? (
                <Navigate to="/pyqs/doubts" replace />
              ) : (
                <Navigate to="/pyqs" replace />
              )
            }
          />

          {/* Redirect legacy paths to new nested paths */}
          <Route path="/doubts" element={<Navigate to="/pyqs/doubts" replace />} />
          <Route path="/contribute" element={<Navigate to="/pyqs/contribute" replace />} />
          <Route path="/about" element={<Navigate to="/pyqs/about" replace />} />

          {/* Public routes with header and footer */}
          <Route
            path="/pyqs"
            element={
              typeof window !== 'undefined' && window.location.hostname === 'doubts.in-gehu.in' ? (
                <Navigate to="/pyqs/doubts" replace />
              ) : (
                <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
                  <Header />
                  <div className="flex-grow">
                    <Home />
                  </div>
                  <Footer />
                </div>
              )
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
            path="/pyqs/contribute"
            element={
              <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
                <Header />
                <div className="flex-grow">
                  <ContributePage />
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
                <div className="flex-grow">
                  <AdminDashboard />
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

