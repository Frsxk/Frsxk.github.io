import { motion, useReducedMotion, type Variants } from "motion/react"
import type * as React from "react"

const EASE = [0.2, 0, 0, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      mass: 0.9,
      delay: Math.min(i * 0.08, 0.4),
    },
  }),
}

export function Reveal({
  children,
  className,
  index = 0,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode
  className?: string
  index?: number
  delay?: number
  y?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(6px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            type: "spring",
            stiffness: 110,
            damping: 20,
            mass: 0.9,
            delay: delay + Math.min(index * 0.08, 0.4),
            ease: [...EASE],
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  )
}
