import { motion } from "framer-motion"
import { Upload, GitBranch, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Contribute() {
  return (
    <section id="contribute" className="py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            {/* Subtle grid pattern background */}
            <div
              className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
              style={{
                backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative p-8 md:p-12">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-5">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Contribute
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
                  Help expand the archive
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  Students can contribute PYQs and help expand the archive. Your contribution
                  helps hundreds of fellow students prepare better for their examinations.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: Upload, text: "Upload your question papers" },
                    { icon: GitBranch, text: "Submit via GitHub pull request" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted">
                        <item.icon className="h-3.5 w-3.5" />
                      </div>
                      {item.text}
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/85 transition-all rounded-xl font-semibold tracking-tight"
                  asChild
                >
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    Contribute Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
