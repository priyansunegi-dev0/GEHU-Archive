import { Search } from "lucide-react"
import { motion } from "framer-motion"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="relative w-full max-w-xl mx-auto"
    >
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search courses..."
          className="h-11 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 focus:border-foreground/30 focus:ring-2 focus:ring-foreground/10 hover:border-foreground/20"
        />
      </div>
    </motion.div>
  )
}
