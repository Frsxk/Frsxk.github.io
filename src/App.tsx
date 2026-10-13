import { Connect } from "@/components/Connect"
import { Favorites } from "@/components/Favorites"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { Navbar } from "@/components/Navbar"
import { Projects } from "@/components/Projects"
import { Separator } from "@/components/m3e/separator"

function App() {
  return (
    <div className="min-h-svh bg-background text-on-background antialiased">
      <a href="#content" className="fixed top-3 left-3 z-50 -translate-y-24 rounded-full bg-primary px-4 py-2 text-on-primary focus:translate-y-0">Skip to content</a>
      <Navbar />
      <main id="content" tabIndex={-1}>
        <Hero />
        <Separator />
        <Favorites />
        <Projects />
        <Connect />
      </main>
      <Footer />
    </div>
  )
}

export default App
