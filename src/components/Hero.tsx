import { motion, useReducedMotion } from "motion/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/m3e/avatar"
import { Badge } from "@/components/m3e/badge"
import { Button } from "@/components/m3e/button"
import { InputChip } from "@/components/m3e/chip"
import { Icon } from "@/components/m3e/icon"
import { Shape } from "@/components/m3e/shape"
import { Reveal } from "@/components/Reveal"
import { ShapeField } from "@/components/ShapeField"
import { TypewriterHeadline } from "@/components/TypewriterHeadline"
import { profile } from "@/data/portfolio"
import { useStatus } from "@/hooks/use-status"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 120, damping: 20, mass: 0.9 },
  },
}

export function Hero() {
  const reduce = useReducedMotion()
  const status = useStatus()

  return (
    <section id="top" className="relative overflow-hidden">
      <ShapeField />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 pt-14 pb-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:pt-20">
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="flex min-w-0 flex-col items-start gap-6"
        >
          <motion.div variants={item} className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">
              <Icon name="location_on" size={16} />
              {profile.location}
            </Badge>
            <Badge variant="tertiary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-tertiary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-tertiary" />
              </span>
              {profile.availability}
            </Badge>
            <Badge variant="default">
              <Icon name="translate" size={16} />
              EN / ID
            </Badge>
          </motion.div>

          <div className="space-y-4">
            <motion.p variants={item} className="text-title-medium text-primary">
              Hello, I'm
            </motion.p>
            <motion.div variants={item}>
              <TypewriterHeadline phrases={profile.heroLines} />
            </motion.div>
            <motion.p variants={item} className="max-w-xl text-body-large text-on-surface-variant">
              {profile.tagline}
            </motion.p>
          </div>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <motion.span whileHover={reduce ? undefined : { scale: 1.04 }} whileTap={reduce ? undefined : { scale: 0.97 }}>
              <Button variant="filled" size="md" nativeButton={false} render={<a href="#projects" role="link" />}>
                <Icon name="arrow_downward" size={20} />
                View projects
              </Button>
            </motion.span>
          </motion.div>

          <motion.div variants={item} className="w-full max-w-xl">
            <div className="relative overflow-hidden rounded-full border border-outline-variant/50 bg-surface-container-low/70 py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="animate-porto-marquee flex w-max gap-2 pr-2">
                {[...profile.tech, ...profile.tech].map((t, i) => (
                  <InputChip
                    key={`${t}-${i}`}
                    variant="elevated"
                    icon="check"
                    aria-hidden={i >= profile.tech.length}
                    className="shrink-0"
                  >
                    {t}
                  </InputChip>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <Reveal delay={0.15} y={36} className="min-w-0">
          <div className="flex flex-col gap-4">
            <motion.div
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-full max-w-sm rounded-4xl bg-surface-container-high p-6 shadow-elevation-2"
            >
              {/* floating mini shapes */}
              <Shape
                name="heart"
                aria-hidden
                className="absolute -top-6 -right-4 size-14 bg-[#ffb8bf] opacity-90 shadow-elevation-1"
              />
              <Shape
                name="sunny"
                aria-hidden
                className="absolute -bottom-5 -left-4 size-12 bg-tertiary-container opacity-90"
              />

              <div className="flex items-center gap-4">
                <motion.div
                  animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Avatar size="lg">
                    <AvatarImage
                      src="/assets/images/profile.png"
                      alt="frxskie"
                    />
                    <AvatarFallback>{profile.avatarFallback}</AvatarFallback>
                  </Avatar>
                </motion.div>
                <div>
                  <p className="text-title-large text-on-surface">{profile.name}</p>
                  <p className="text-body-medium text-on-surface-variant">{profile.role}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {profile.stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 160, damping: 18 }}
                    className="min-w-0 rounded-2xl bg-surface-container px-1 py-4 text-center sm:px-2"
                  >
                    <p className="break-words text-body-medium text-primary sm:text-title-medium">{s.value}</p>
                    <p className="mt-1 text-label-small text-on-surface-variant">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              <div
                role="status"
                aria-live="polite"
                className="mt-4 flex items-center justify-between gap-2 rounded-2xl bg-primary-container px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-2 text-on-primary-container">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 -scale-x-100 text-[#ffc04e]" fill="currentColor">
                    <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.1 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05z" />
                  </svg>
                  <span className="min-w-0 whitespace-normal break-words text-label-large">
                    {status.loading
                      ? "Loading status…"
                      : status.unavailable
                        ? "Status unavailable"
                        : status.message}
                  </span>
                </div>
                <Badge variant="default">idle</Badge>
              </div>
            </motion.div>

          </div>
        </Reveal>
      </div>
    </section>
  )
}
