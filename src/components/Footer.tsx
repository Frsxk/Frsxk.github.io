import { Separator } from "@/components/m3e/separator"
import { Shape } from "@/components/m3e/shape"
import { profile } from "@/data/portfolio"

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-outline-variant/40 bg-surface-container-low/40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-20 left-1/4 size-64 rounded-full bg-[#ffb8bf]/20 blur-3xl" />
        <Shape name="heart" className="absolute -top-4 right-[12%] size-10 bg-[#ffb8bf]/50" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-title-medium text-on-surface">
              Built with 💖 by frisky&lt;3
            </p>
          </div>
          <p className="text-label-medium text-on-surface-variant">
            © {new Date().getFullYear()} · {profile.domain}
          </p>
        </div>
        <Separator className="my-4" />
        <p className="text-label-small text-on-surface-variant">
          Material 3 Expressive design with springy motion and shape-morphing buttons, powered by{" "}
          <a href="https://shadcn-m3e.crystaworld.dev/" target="_blank" rel="noopener noreferrer" className="rounded-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            shadcn-m3e
          </a>. Press{" "}
          <kbd className="rounded-md bg-surface-container-highest px-1.5 py-0.5">d</kbd>{" "}
          to toggle light / dark.
        </p>
      </div>
    </footer>
  )
}
