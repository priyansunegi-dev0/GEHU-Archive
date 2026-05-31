import { motion } from "framer-motion"
import { BookOpen, Users, Archive } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-2xl border border-border bg-card p-8 md:p-10 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">About</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                  GEHU Archive
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  GEHU Archive is a student driven repository for Previous Year Question Papers of Graphic Era Hill University
                  helping students prepare efficiently.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm mt-3">
                  Our mission is to make academic resources accessible to every student, enabling better preparation
                  for semester examinations and reducing last-minute exam stress.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    icon: Archive,
                    title: "Centralized Repository",
                    desc: "All PYQs organized by course, semester, and subject",
                  },
                  {
                    icon: Users,
                    title: "Student Driven",
                    desc: "Built and maintained by GEHU students for students",
                  },
                  {
                    icon: BookOpen,
                    title: "Free Access",
                    desc: "Completely free to access, no login required",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 hover:bg-accent transition-colors"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
