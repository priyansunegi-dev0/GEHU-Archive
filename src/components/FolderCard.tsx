import { motion } from "framer-motion"
import { FolderOpen } from "lucide-react"

interface FolderCardProps {
  name: string
  index: number
  onClick: () => void
}

export function FolderCard({ name, index, onClick }: FolderCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group w-full text-left rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md hover:border-foreground/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-center gap-3.5">
        {/* Folder icon */}
        <div className="relative flex-shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-accent">
            <FolderOpen className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
          </div>
          {/* subtle gold accent dot */}
          <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-foreground/20 transition-colors group-hover:bg-foreground/40 dark:bg-foreground/15 dark:group-hover:bg-foreground/30" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">{name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Previous Year Papers</p>
        </div>

        {/* Arrow indicator */}
        <svg
          className="h-4 w-4 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.button>
  )
}
