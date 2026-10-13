import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/m3e/cn"

type Phase = "typing" | "pausing" | "deleting" | "gap"

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function useLoopTypewriter(
  phrases: string[],
  disabled: boolean,
) {
  const [phraseIndex, setPhraseIndex] = React.useState(0)
  const [charCount, setCharCount] = React.useState(
    disabled ? phrases[0]?.length ?? 0 : 0,
  )
  const [phase, setPhase] = React.useState<Phase>(disabled ? "pausing" : "typing")

  React.useEffect(() => {
    if (disabled) {
      setPhraseIndex(0)
      setCharCount(phrases[0]?.length ?? 0)
      setPhase("pausing")
      return
    }
    if (phrases.length === 0) return
    const current = phrases[phraseIndex % phrases.length] ?? ""
    let t: ReturnType<typeof setTimeout>

    if (phase === "typing") {
      if (charCount < current.length) {
        t = setTimeout(() => setCharCount((c) => c + 1), rand(42, 92))
      } else {
        // single hold on the full phrase, then erase
        t = setTimeout(() => setPhase("pausing"), 1600)
      }
    } else if (phase === "pausing") {
      // one frame in pausing for the caret blink, then erase
      t = setTimeout(() => setPhase("deleting"), 350)
    } else if (phase === "deleting") {
      if (charCount > 0) {
        t = setTimeout(() => setCharCount((c) => c - 1), rand(24, 44))
      } else {
        setPhase("gap")
        return
      }
    } else {
      t = setTimeout(() => {
        setPhraseIndex((i) => (i + 1) % phrases.length)
        setPhase("typing")
      }, 380)
    }
    return () => clearTimeout(t)
  }, [phrases, phraseIndex, charCount, phase, disabled])

  const text = (phrases[phraseIndex % phrases.length] ?? "").slice(0, charCount)
  return { text, phraseIndex: phraseIndex % phrases.length, phase }
}

export function TypewriterHeadline({
  phrases,
  className,
}: {
  phrases: string[]
  className?: string
}) {
  const reduce = useReducedMotion()
  const { text, phraseIndex, phase } = useLoopTypewriter(phrases, !!reduce)
  const isTyping = phase === "typing"

  return (
    <div className={cn("space-y-3", className)}>
      <h1
        aria-live="polite"
        aria-label={phrases.join(" ")}
        className="text-glow-pink text-display-large text-balance text-on-surface"
      >
        {/* reserve height so the loop never shifts layout */}
        <span className="block min-h-[2.2em] sm:min-h-[1.3em]">
          {reduce ? (
            <span>{phrases[0]}</span>
          ) : (
            <>
              <span aria-hidden>
                {text.split("").map((ch, i) => (
                  <motion.span
                    // key on phrase + index: stable chars don't re-animate,
                    // only the newest keystroke pops in
                    key={`${phraseIndex}-${i}`}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      type: "spring",
                      stiffness: 520,
                      damping: 34,
                      mass: 0.7,
                    }}
                    className="inline-block"
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </motion.span>
                ))}
              </span>
              <motion.span
                aria-hidden
                layout
                animate={{
                  opacity: phase === "pausing" ? [1, 0.25, 1] : 1,
                  scaleY: isTyping ? [1, 1.18, 1] : 1,
                }}
                transition={
                  phase === "pausing"
                    ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
                    : { type: "spring", stiffness: 500, damping: 30 }
                }
                className="bg-primary shadow-elevation-1 ml-1 inline-block h-[0.92em] w-[7px] translate-y-[0.12em] rounded-full"
              />
            </>
          )}
        </span>
      </h1>

      {/* M3E expressive indicators: active pill stretches, others stay dots */}
      {!reduce && phrases.length > 1 && (
        <div aria-hidden className="flex items-center gap-1.5">
          {phrases.map((p, i) => (
            <motion.span
              key={p}
              animate={{
                width: i === phraseIndex ? 28 : 8,
                opacity: i === phraseIndex ? 1 : 0.45,
              }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className={cn(
                "h-2 rounded-full",
                i === phraseIndex ? "bg-primary" : "bg-on-surface-variant/40",
              )}
            />
          ))}
        </div>
      )}
      <span className="sr-only">{phrases.join(". ")}</span>
    </div>
  )
}
