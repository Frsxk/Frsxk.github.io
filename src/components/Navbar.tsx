import { motion } from "motion/react"
import { Button } from "@/components/m3e/button"
import { Icon } from "@/components/m3e/icon"
import { useColorMode } from "@/components/m3e/color-mode-provider"
import { navLinks, profile } from "@/data/portfolio"

export function Navbar() {
  const { resolvedMode, toggleMode } = useColorMode()

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
      className="sticky top-0 z-40 border-b border-outline-variant/40 bg-surface/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-3">
          <span className="text-title-medium text-on-surface">{profile.name}</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Button key={l.href} variant="text" size="sm" nativeButton={false} render={<a href={l.href} role="link" />}>
              {l.label}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outlined"
            size="icon-sm"
            shape="round"
            onClick={toggleMode}
            aria-label={`Switch to ${resolvedMode === "dark" ? "light" : "dark"} mode (press d)`}
            title="Toggle light / dark (d)"
          >
            <motion.span
              key={resolvedMode}
              initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="grid place-items-center"
            >
              <Icon name={resolvedMode === "dark" ? "light_mode" : "dark_mode"} size={20} />
            </motion.span>
          </Button>
        </div>
      </div>
      <nav aria-label="Sections mobile" className="flex items-center gap-2 overflow-x-auto px-4 pb-3 md:hidden">
        {navLinks.map((l) => (
          <Button key={l.href} variant="tonal" size="xs" nativeButton={false} render={<a href={l.href} role="link" />}>
            {l.label}
          </Button>
        ))}
      </nav>
    </motion.header>
  )
}
