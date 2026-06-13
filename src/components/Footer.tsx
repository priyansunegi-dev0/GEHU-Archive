import { motion } from "framer-motion"

import { MessageSquare, Archive, AlertTriangle, Mail } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"

// Our mission is to provide easy access to past exam papers to help students prepare effectively. It also offers a Doubts forum for students to post and discuss academic queries.








function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.444 5.704 1.449h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface SocialLink {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  { icon: WhatsAppIcon, label: "WhatsApp", href: "https://chat.whatsapp.com/CLCyjRtMnXWKwRpzh3TqFV" },
];

const quickLinks = [
  { label: "About", href: "/pyqs/about", icon: Archive, isExternal: false },
  { label: "Doubts", href: "/pyqs/doubts", icon: MessageSquare, isExternal: false },
  { label: "Disclaimer", href: "/pyqs/disclaimer", icon: AlertTriangle, isExternal: false },
  { label: "Contact Us", href: "/pyqs/contact", icon: Mail, isExternal: false },
]

export function Footer() {
  const lastUpdated = new Date(document.lastModified).toLocaleString("en-IN", {
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
      className="bg-zinc-100 dark:bg-[#111111] text-zinc-900 dark:text-zinc-100 border-t border-zinc-200 dark:border-zinc-800 mt-8"
    >
      <div className="mx-auto max-w-6xl px-8 sm:px-12 py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          
          {/* Left Column: Maintainer Info (takes 2 cols on desktop) */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">Maintained by</h3>
              <p className="text-xl text-zinc-600 dark:text-gray-400">a group of students</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-200/50 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/15 text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-all"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
              GEHU Archive is a student‑driven collection of previous‑year question papers of Graphic Era Hill University, Dehradun Campus. It also hosts a Doubts section where students can ask and answer queries.
            </p>
          </div>

          {/* Right Column: Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-colors group"
                    >
                      <link.icon className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors" />
                      <span className="group-hover:underline underline-offset-2">{link.label}</span>
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="flex items-center gap-2 text-sm text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-colors group"
                    >
                      <link.icon className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors" />
                      <span className="group-hover:underline underline-offset-2">{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-zinc-200 dark:bg-zinc-800 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-800">
              <Archive className="h-3 w-3 text-zinc-900 dark:text-white" />
            </div>
            <p className="text-xs text-zinc-500 dark:text-gray-400">
              
            </p>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-600">
            Last updated on: {lastUpdated} (IST)
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
