import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Menu, X, Archive } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Contribute", href: "#contribute" },
  ]

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`rounded-2xl border border-border/50 px-5 py-3 transition-all duration-300 ${
            scrolled
              ? "bg-background/70 backdrop-blur-xl shadow-lg shadow-foreground/5"
              : "bg-background/50 backdrop-blur-md"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
                <Archive className="h-4 w-4" />
              </div>
              <span className="text-base font-semibold tracking-tight text-foreground">
                GEHU Archive
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-foreground scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </a>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="ml-2 flex h-8 w-14 items-center rounded-full border border-border bg-secondary px-1 transition-colors hover:bg-accent relative overflow-hidden"
                aria-label="Toggle theme"
              >
                <motion.div
                  animate={{ x: theme === "dark" ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="h-6 w-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <AnimatePresence mode="wait">
                    {theme === "dark" ? (
                      <motion.div
                        key="moon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Moon className="h-3 w-3 text-primary-foreground" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="sun"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Sun className="h-3 w-3 text-primary-foreground" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </button>
            </nav>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div key="moon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Moon className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div key="sun" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Sun className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-col gap-1 pt-3 pb-1 border-t border-border mt-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  )
}
