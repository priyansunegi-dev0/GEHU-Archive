import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "next-themes"
import { Header } from "@/components/Header"
import { Home } from "@/pages/Home"
import { Doubts } from "@/pages/Doubts"
import { About } from "@/pages/About"
import { ContributePage } from "@/pages/ContributePage"
import { AdminLogin } from "@/pages/AdminLogin"
import { AdminCallback } from "@/pages/AdminCallback"
import { AdminDashboard } from "@/pages/AdminDashboard"

export function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Router>
        <Routes>
          {/* Public routes with header */}
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white">
                <Header />
                <Home />
              </div>
            }
          />
          <Route
            path="/doubts"
            element={
              <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white">
                <Header />
                <Doubts />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white">
                <Header />
                <About />
              </div>
            }
          />
          <Route
            path="/contribute"
            element={
              <ContributePage />
            }
          />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/callback" element={<AdminCallback />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
