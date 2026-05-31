import { useTheme } from "next-themes"
import { Link } from "react-router-dom"
import { Moon, Sun, User } from "lucide-react"
import { useEffect, useState } from "react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-0 font-bold text-xl text-black dark:text-white">
            <img src="/logo.webp" alt="GEHU Archive Logo" className="h-16 w-16 object-contain -mr-2" />
            <span>GEHU Archive</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <Link
              to="/doubts"
              className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Doubts
            </Link>
            <Link
              to="/contribute"
              className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Contribute
            </Link>

            <div className="flex items-center gap-3">
              {/* Admin Login Button (Icon Only) */}
              <Link
                to="/admin"
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Admin Dashboard"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Dark Mode Toggle (Icon Only) */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {theme === "light" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
