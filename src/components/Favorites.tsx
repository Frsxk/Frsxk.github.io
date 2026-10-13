import { motion, useReducedMotion } from "motion/react"
import { Badge } from "@/components/m3e/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/m3e/card"
import { Icon } from "@/components/m3e/icon"
import { Reveal } from "@/components/Reveal"
import { favorites } from "@/data/portfolio"

export function Favorites() {
  const reduce = useReducedMotion()
  return (
    <section id="favorites" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6">
      <Reveal>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl space-y-2">
            <p className="flex items-center gap-2 text-label-large text-primary">
              <Icon name="favorite" size={18} />
              FAVORITES
            </p>
            <h2 className="text-display-small text-on-surface">My favorite things</h2>
            <p className="text-body-large text-on-surface-variant">
              A few of the foods, games, and activities I love most.
            </p>
          </div>
          <Badge variant="outline">3 categories</Badge>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((f, i) => (
          <Reveal key={f.title} index={i} y={32}>
            <motion.div
              whileHover={reduce ? undefined : { y: -8, scale: 1.015 }}
              whileTap={reduce ? undefined : { scale: 0.985 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="h-full"
            >
              <Card variant={f.variant} interactive className="h-full transition-shape">
                <CardHeader>
                  <motion.span
                    whileHover={reduce ? undefined : { rotate: [0, -10, 10, 0], scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                    className="mb-2 grid size-12 place-items-center rounded-2xl bg-primary text-on-primary"
                  >
                    <Icon name={f.icon} size={24} />
                  </motion.span>
                  <h3 data-slot="card-title" className="font-heading text-title-large text-on-surface">{f.title}</h3>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {f.items.map((item) => (
                      <figure key={item.label} className="group/tile min-w-0 overflow-hidden rounded-3xl bg-surface-container-low shadow-elevation-1">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={item.image}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            width={400}
                            height={400}
                            className="size-full object-cover transition-transform duration-500 motion-safe:group-hover/tile:scale-105"
                          />
                        </div>
                        <figcaption className="px-3 py-3 text-label-large text-on-surface">
                          {item.label}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
