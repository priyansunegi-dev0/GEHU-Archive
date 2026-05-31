import { motion } from "framer-motion"
import { GitBranch, FileText, Send, Globe, Star, MessageSquare, Archive, ExternalLink, User } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const socialLinks = [
  { icon: GitBranch, label: "GitHub", href: "https://github.com" },
  { icon: User, label: "Instagram", href: "https://instagram.com" },
  { icon: ExternalLink, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: FileText, label: "Document", href: "#" },
  { icon: Send, label: "Telegram", href: "https://t.me" },
  { icon: Globe, label: "Website", href: "#" },
]

const quickLinks = [
  { label: "Star on GitHub", href: "https://github.com", icon: Star },
  { label: "Join Discord", href: "#", icon: MessageSquare },
  { label: "Contribute", href: "#contribute", icon: FileText },
  { label: "About", href: "#about", icon: Archive },
]

export function Footer() {
  const lastUpdated = new Date("2026-05-23T13:18:02+05:30").toLocaleString("en-IN", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  })

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#111111] dark:bg-[#0A0A0A] text-white border-t border-white/10 mt-8"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Section 1: GitHub */}
          <div>
            <h3 className="text-base font-semibold text-white mb-2">Like our work?</h3>
            <p className="text-sm text-gray-400 mb-4">
              Give this repo a ⭐ on GitHub!
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
            >
              <GitBranch className="h-4 w-4" />
              <span className="group-hover:underline underline-offset-2">github.com/GEHU-Archive</span>
            </a>
          </div>

          {/* Section 2: Discord */}
          <div>
            <h3 className="text-base font-semibold text-white mb-2">Discord</h3>
            <p className="text-sm text-gray-400 mb-4">Join our community</p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="group-hover:underline underline-offset-2">Join our Discord</span>
            </a>
          </div>

          {/* Section 3: Maintainer */}
          <div>
            <h3 className="text-base font-semibold text-white mb-2">Maintained by</h3>
            <p className="text-sm text-gray-300 font-medium">Lakshyajeet Jalal</p>
            <p className="text-xs text-gray-500 mb-4">B.Tech CSE 2026</p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Section 4: Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-white mb-2">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                  >
                    <link.icon className="h-3.5 w-3.5 text-gray-600 group-hover:text-gray-300 transition-colors" />
                    <span className="group-hover:underline underline-offset-2">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Description */}
        <div className="mb-10 max-w-2xl">
          <p className="text-sm text-gray-500 leading-relaxed">
            A collection of student contributed previous year question papers for Graphic Era Hill University
            semester examinations.
          </p>
        </div>

        <Separator className="bg-white/10 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10">
              <Archive className="h-3 w-3 text-white" />
            </div>
            <p className="text-xs text-gray-500">
              Built with <span className="text-gray-400">Astro</span>
            </p>
          </div>
          <p className="text-xs text-gray-600">
            Last updated on: {lastUpdated} (IST)
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
