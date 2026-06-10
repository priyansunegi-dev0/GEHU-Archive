import { useTheme } from "next-themes"
import { Link, useLocation } from "react-router-dom"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

export function Header() {
  const { pathname } = useLocation()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const isDoubtsDomain = typeof window !== 'undefined' && window.location.hostname === 'doubts.in-gehu.in'

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-zinc-800 relative">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {isDoubtsDomain ? (
            <a href="https://in-gehu.in/" className="flex items-center gap-0 font-bold text-lg sm:text-2xl lg:text-3xl text-black dark:text-white tracking-tight">
              <img src="/logo.webp" alt="GEHU Archive Logo" className="h-12 w-12 sm:h-16 sm:w-16 object-contain -mr-3 sm:-mr-2" />
              <span>PYQs Archive</span>
            </a>
          ) : (
            <Link to="/pyqs" className="flex items-center gap-0 font-bold text-lg sm:text-2xl lg:text-3xl text-black dark:text-white tracking-tight">
              <img src="/logo.webp" alt="GEHU Archive Logo" className="h-12 w-12 sm:h-16 sm:w-16 object-contain -mr-3 sm:-mr-2" />
              <span>PYQs Archive</span>
            </Link>
          )}

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {(pathname !== "/pyqs" && pathname !== "/") && (
              isDoubtsDomain ? (
                <a
                  href="https://in-gehu.in/pyqs"
                  className="text-lg font-bold tracking-tight text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  PYQs
                </a>
              ) : (
                <Link
                  to="/pyqs"
                  className="text-lg font-bold tracking-tight text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  PYQs
                </Link>
              )
            )}
            {pathname !== "/pyqs/doubts" && (
              <Link
                to="/pyqs/doubts"
                className="text-lg font-bold tracking-tight text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                Doubts
              </Link>
            )}
            {pathname !== "/pyqs/about" && (
              isDoubtsDomain ? (
                <a
                  href="https://in-gehu.in/pyqs/about"
                  className="text-lg font-bold tracking-tight text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  About
                </a>
              ) : (
                <Link
                  to="/pyqs/about"
                  className="text-lg font-bold tracking-tight text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  About
                </Link>
              )
            )}


            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle (Icon Only) */}
              {mounted && (
                <button
                   onClick={toggleTheme}
                   className="p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                   aria-label="Toggle dark mode"
                >
                  {theme === "light" ? (
                    <Moon className="h-6 w-6" />
                  ) : (
                    <Sun className="h-6 w-6" />
                  )}
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center gap-2">
            {/* Dark Mode Toggle is always visible outside the menu */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                aria-label="Toggle dark mode"
              >
                {theme === "light" ? (
                  <Moon className="h-6 w-6" />
                ) : (
                  <Sun className="h-6 w-6" />
                )}
              </button>
            )}

            {/* Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Absolute overlay box) */}
      {menuOpen && (
        <div className="absolute right-2 top-[60px] z-50 w-48 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 shadow-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {(pathname !== "/pyqs" && pathname !== "/") && (
              isDoubtsDomain ? (
                <a
                  href="https://in-gehu.in/pyqs"
                  onClick={() => setMenuOpen(false)}
                  className="block text-base font-bold tracking-tight text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2 px-3 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg"
                >
                  PYQs
                </a>
              ) : (
                <Link
                  to="/pyqs"
                  onClick={() => setMenuOpen(false)}
                  className="block text-base font-bold tracking-tight text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2 px-3 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg"
                >
                  PYQs
                </Link>
              )
            )}
            {pathname !== "/pyqs/doubts" && (
              <Link
                to="/pyqs/doubts"
                onClick={() => setMenuOpen(false)}
                className="block text-base font-bold tracking-tight text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2 px-3 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg"
              >
                Doubts
              </Link>
            )}
            {pathname !== "/pyqs/about" && (
              isDoubtsDomain ? (
                <a
                  href="https://in-gehu.in/pyqs/about"
                  onClick={() => setMenuOpen(false)}
                  className="block text-base font-bold tracking-tight text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2 px-3 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg"
                >
                  About
                </a>
              ) : (
                <Link
                  to="/pyqs/about"
                  onClick={() => setMenuOpen(false)}
                  className="block text-base font-bold tracking-tight text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2 px-3 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg"
                >
                  About
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
