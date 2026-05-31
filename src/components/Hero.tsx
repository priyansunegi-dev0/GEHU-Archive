import { motion } from "framer-motion"
import { Archive, ArrowDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative pt-32 pb-12 px-4 overflow-hidden">
      {/* Subtle radial background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-foreground/[0.03] blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-5 flex justify-center"
        >
          <Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border-border text-muted-foreground">
            <Archive className="h-3 w-3" />
            Student Archive Repository
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4 text-balance"
        >
          GEHU Archive
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8"
        >
          Previous Year Question Papers for Graphic Era Hill University.
          Organized by course, semester, and subject.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center"
        >
          <a
            href="#courses"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Browse papers</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
