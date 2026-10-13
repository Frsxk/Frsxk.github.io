import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { MotionConfig } from "motion/react"
import "./index.css"
import App from "./App.tsx"
import { M3eProvider } from "@/components/m3e/m3e-provider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <M3eProvider
        colorMode={{ defaultMode: "dark", storageKey: "theme", disableTransitionOnChange: false }}
        theme={{
          persist: false,
          defaultTheme: {
            source: { primary: "#ffb8bf" },
            contrast: "standard",
            variant: "vibrant",
          },
        }}
      >
        <App />
      </M3eProvider>
    </MotionConfig>
  </StrictMode>,
)
