import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import * as React from "react"
import { Badge } from "@/components/m3e/badge"
import { Button } from "@/components/m3e/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/m3e/card"
import { chipVariants } from "@/components/m3e/chip"
import { Icon } from "@/components/m3e/icon"
import { Separator } from "@/components/m3e/separator"
import { cn } from "@/lib/m3e/cn"
import { Reveal } from "@/components/Reveal"
import { projects } from "@/data/portfolio"

function ProjectCard({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const reduce = useReducedMotion()
  return (
    <Reveal index={index} y={36}>
      <motion.div
        whileHover={reduce ? undefined : { y: -6 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        className="h-full"
      >
        <Card variant="elevated" interactive className="group h-full overflow-hidden p-0">
          <div className="relative aspect-video overflow-hidden bg-surface-container-high">
            <img
              src={p.image}
              alt={`${p.title} project preview`}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
            />
            <div className="absolute top-4 right-4">
              <Badge variant="default">{p.status}</Badge>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-6 pt-4">
            <CardHeader className="p-0">
              <h3 data-slot="card-title" className="font-heading text-title-large text-on-surface">{p.title}</h3>
              <CardDescription>{p.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className={cn(
                      chipVariants({ variant: "flat" }),
                      "shrink min-h-7 h-auto w-fit cursor-default px-3 text-label-medium whitespace-normal",
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="p-0">
              {p.href ? (
                <Button
                  variant="filled"
                  size="sm"
                  nativeButton={false}
                  render={<a href={p.href} target="_blank" rel="noopener noreferrer" role="link" />}
                >
                  View on GitHub
                  <Icon name="open_in_new" size={18} />
                </Button>
              ) : (
                <Button variant="filled" size="sm" disabled>
                  Currently Private
                  <Icon name="lock" size={18} />
                </Button>
              )}
            </CardFooter>
          </div>
        </Card>
      </motion.div>
    </Reveal>
  )
}

export function Projects() {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="projects" ref={ref} className="relative scroll-mt-24 overflow-hidden bg-surface-container-low/60">
      {/* parallax pink blobs */}
      <motion.div aria-hidden style={reduce ? undefined : { y: bgY }} className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 left-[8%] size-64 rounded-full bg-[#ffb8bf]/20 blur-3xl" />
        <div className="absolute bottom-10 right-[6%] size-72 rounded-full bg-primary-container/70 blur-3xl" />
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl space-y-2">
              <p className="flex items-center gap-2 text-label-large text-primary">
                <Icon name="folder" size={18} />
                PROJECTS OVERVIEW
              </p>
              <h2 className="text-display-small text-on-surface">Selected work</h2>
              <p className="text-body-large text-on-surface-variant">
                Check out some of my recent works!
              </p>
            </div>
            <Button
              variant="outlined"
              size="sm"
              nativeButton={false}
              render={<a href="https://github.com/Frsxk" target="_blank" rel="noopener noreferrer" role="link" />}
            >
              <Icon name="open_in_new" size={18} />
              GitHub
            </Button>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
