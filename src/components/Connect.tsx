import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/m3e/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/m3e/card"
import { Icon } from "@/components/m3e/icon"
import { Shape } from "@/components/m3e/shape"
import { Reveal } from "@/components/Reveal"
import { socials } from "@/data/portfolio"

export function Connect() {
  const reduce = useReducedMotion()
  return (
    <section id="connect" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6">
      <Reveal y={40}>
        <Card variant="filled" size="lg" className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(55%_70%_at_80%_20%,color-mix(in_srgb,#ffb8bf_35%,transparent),transparent_70%)]" />
            <div className="absolute -top-20 -right-20 size-64 rounded-full bg-[#ffb8bf]/30 blur-2xl" />
            <div className="absolute -bottom-24 -left-16 size-64 rounded-full bg-tertiary/15 blur-2xl" />
            <Shape name="heart" className="absolute top-6 right-10 size-16 bg-[#ffb8bf]/70" />
            <Shape name="flower" className="absolute bottom-8 left-[44%] hidden size-12 bg-primary-container md:block" />
          </div>

          <div className="relative grid grid-cols-1 gap-8 p-2 lg:grid-cols-[1fr_1fr] lg:items-center">
            <CardHeader className="min-w-0 px-4 sm:px-6">
              <p className="flex items-center gap-2 text-label-large text-primary">
                <Icon name="send" size={18} />
                CONNECT
              </p>
              <h2 className="font-heading text-display-small text-on-surface">Let's build something expressive</h2>
              <CardDescription className="text-body-large">
                Join my community and stay updated with my latest projects.
              </CardDescription>
              <div className="flex flex-wrap gap-3 pt-4">
                <motion.span whileHover={reduce ? undefined : { scale: 1.04 }} whileTap={reduce ? undefined : { scale: 0.97 }}>
                  <Button variant="filled" size="md" nativeButton={false} render={<a href="#top" role="link" />}>
                    <Icon name="arrow_upward" size={20} />
                    Back to top
                  </Button>
                </motion.span>
              </div>
            </CardHeader>

            <CardContent className="min-w-0 px-4 sm:px-6">
              <ul className="grid grid-cols-1 gap-3">
                {socials.map((s, i) => (
                  <motion.li
                    key={s.label}
                    initial={reduce ? false : { opacity: 0, x: 32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 140, damping: 20 }}
                  >
                    <motion.a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={reduce ? undefined : { x: 6, scale: 1.01 }}
                      whileTap={reduce ? undefined : { scale: 0.99 }}
                      className="state-layer group flex items-center gap-4 rounded-3xl bg-surface px-4 py-3 shadow-elevation-1 transition-shape hover:shadow-elevation-2 focus-ring outline-none"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary-container text-on-secondary-container">
                        <Icon name={s.icon} size={22} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-title-medium text-on-surface">{s.label}</span>
                        <span className="block truncate text-body-medium text-on-surface-variant">
                          {s.handle}
                        </span>
                      </span>
                      <Icon
                        name="open_in_new"
                        size={20}
                        className="text-on-surface-variant transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </div>
        </Card>
      </Reveal>
    </section>
  )
}
