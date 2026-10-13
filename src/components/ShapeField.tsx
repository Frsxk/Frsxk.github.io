import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { Shape, type ShapeName } from "@/components/m3e/shape"
import { cn } from "@/lib/m3e/cn"

type FieldShape = {
  name: ShapeName
  alt: ShapeName
  className: string
  size: string
  color: string
  opacity?: string
  floatY?: number[]
  floatX?: number[]
  duration?: number
  delay?: number
  rotate?: number
}

// Pink-forward palette that follows the dynamic M3E roles,
// plus the requested #ffb8bf seed as a direct accent.
const SHAPES: FieldShape[] = [
  {
    name: "heart",
    alt: "flower",
    size: "size-40 sm:size-56",
    className: "top-[-3rem] left-[-2rem] sm:left-[4%]",
    color: "bg-[#ffb8bf]",
    opacity: "opacity-70",
    floatY: [0, -22, 0],
    floatX: [0, 12, 0],
    duration: 9,
    rotate: 8,
  },
  {
    name: "sunny",
    alt: "burst",
    size: "size-28 sm:size-40",
    className: "top-[6rem] right-[-1.5rem] sm:right-[6%]",
    color: "bg-primary-container",
    opacity: "opacity-80",
    floatY: [0, 18, 0],
    floatX: [0, -14, 0],
    duration: 11,
    delay: 0.6,
    rotate: -10,
  },
  {
    name: "flower",
    alt: "4-leaf-clover",
    size: "size-24 sm:size-32",
    className: "top-[24rem] left-[6%] hidden md:block",
    color: "bg-tertiary-container",
    opacity: "opacity-70",
    floatY: [0, -16, 0],
    duration: 10,
    delay: 1.2,
    rotate: 12,
  },
  {
    name: "bun",
    alt: "puffy",
    size: "size-20 sm:size-28",
    className: "top-[30rem] right-[10%] hidden md:block",
    color: "bg-secondary-container",
    opacity: "opacity-70",
    floatY: [0, 14, 0],
    duration: 12,
    delay: 0.3,
    rotate: -6,
  },
  {
    name: "gem",
    alt: "diamond",
    size: "size-16 sm:size-20",
    className: "top-[16rem] left-[46%] hidden lg:block",
    color: "bg-primary",
    opacity: "opacity-25",
    floatY: [0, -12, 0],
    duration: 8,
    delay: 0.9,
  },
]

function MorphShape({ s, index }: { s: FieldShape; index: number }) {
  const reduce = useReducedMotion()
  const [name, setName] = React.useState<ShapeName>(s.name)

  React.useEffect(() => {
    if (reduce) return
    const id = window.setInterval(
      () => {
        setName((prev) => (prev === s.name ? s.alt : s.name))
      },
      4200 + index * 900,
    )
    return () => window.clearInterval(id)
  }, [reduce, s.name, s.alt, index])

  if (reduce) {
    return (
      <Shape
        name={s.name}
        aria-hidden
        className={cn("absolute blur-[1px]", s.size, s.className, s.color, s.opacity)}
      />
    )
  }

  return (
    <motion.div
      aria-hidden
      className={cn("absolute", s.className)}
      animate={{ y: s.floatY ?? [0, -14, 0], x: s.floatX ?? [0, 0, 0] }}
      transition={{
        duration: s.duration ?? 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: s.delay ?? 0,
      }}
    >
      <motion.div
        animate={{ rotate: [0, s.rotate ?? 10, 0], scale: [1, 1.06, 1] }}
        transition={{
          duration: (s.duration ?? 10) * 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: s.delay ?? 0,
        }}
      >
        <Shape
          name={name}
          className={cn(s.size, s.color, s.opacity, "shadow-elevation-2 blur-[0.5px]")}
        />
      </motion.div>
    </motion.div>
  )
}

export function ShapeField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* pink wash */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_srgb,#ffb8bf_28%,transparent),transparent_70%)]" />
      <div className="absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-[#ffb8bf]/25 blur-3xl" />
      <div className="absolute top-40 -left-24 size-80 rounded-full bg-primary-container/60 blur-3xl" />
      <div className="absolute top-24 -right-24 size-80 rounded-full bg-tertiary-container/60 blur-3xl" />

      {SHAPES.map((s, i) => (
        <MorphShape key={s.name + i} s={s} index={i} />
      ))}
    </div>
  )
}
