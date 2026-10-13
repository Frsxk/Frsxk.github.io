import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Fetches the Gist status text every `refreshMs` and keeps the last successful
 * message when a refresh fails. Uses an AbortController on every request so
 * pending fetches are cancelled on unmount or re-trigger.
 */
export type StatusState = {
  /** the current status text, or `null` if nothing has loaded yet */
  message: string | null
  /** true only during the very first fetch (no message yet) */
  loading: boolean
  /** true while a refresh fetch is in-flight after the first success */
  refreshing: boolean
  /** true when the last fetch failed and no message is available */
  unavailable: boolean
}

const STATUS_URL =
  "https://gist.githubusercontent.com/Frsxk/7d053c0c47b8374d73c114f71797b3ff/raw/a91b9ed4fdb3c07bd7ebb1612dce8477649ca7c6/status.txt"
const FALLBACK = "you're cute \u{1F495}"
const REFRESH_MS = 60_000

export function useStatus(): StatusState {
  const [state, setState] = useState<StatusState>({
    message: null,
    loading: true,
    refreshing: false,
    unavailable: false,
  })
  /** remember the last good message so a failed refresh doesn't wipe it */
  const lastGood = useRef<string | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  const fetchStatus = useCallback(async () => {
    // cancel any in-flight request before starting a new one
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setState((prev) => ({
      message: prev.message,
      loading: prev.message === null,
      refreshing: prev.message !== null,
      unavailable: false,
    }))

    try {
      const response = await fetch(`${STATUS_URL}?t=${Date.now()}`, {
        signal: controller.signal,
      })
      if (!response.ok) throw new Error(`status fetch failed: ${response.status}`)
      const text = (await response.text()).trim() || FALLBACK
      lastGood.current = text
      setState({ message: text, loading: false, refreshing: false, unavailable: false })
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return
      // keep last successful text if we have one; otherwise truthful unavailable
      const good = lastGood.current
      if (good !== null) {
        setState({ message: good, loading: false, refreshing: false, unavailable: false })
      } else {
        setState({ message: null, loading: false, refreshing: false, unavailable: true })
      }
    }
  }, [])

  useEffect(() => {
    fetchStatus()
    const id = setInterval(fetchStatus, REFRESH_MS)
    return () => {
      clearInterval(id)
      controllerRef.current?.abort()
    }
  }, [fetchStatus])

  return state
}
