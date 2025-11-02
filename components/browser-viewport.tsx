"use client"

import { ChevronLeft, ChevronRight, RotateCcw, Maximize2 } from "lucide-react"
import { useState } from "react"

interface BrowserViewportProps {
  isActive: boolean
}

export function BrowserViewport({ isActive }: BrowserViewportProps) {
  const [url, setUrl] = useState("https://example.com")
  const [history, setHistory] = useState<string[]>([])

  const handleNavigate = () => {
    if (url.trim()) {
      setHistory([...history, url])
    }
  }

  const handleBack = () => {
    if (history.length > 0) {
      const newHistory = history.slice(0, -1)
      setHistory(newHistory)
      if (newHistory.length > 0) {
        setUrl(newHistory[newHistory.length - 1])
      }
    }
  }

  return (
    <div className="flex flex-col h-full bg-background rounded-lg border border-border overflow-hidden">
      {/* Browser Controls */}
      <div className="bg-muted border-b border-border p-3 space-y-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            disabled={history.length === 0}
            className="p-2 hover:bg-background rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="p-2 hover:bg-background rounded-md transition-colors opacity-50 cursor-not-allowed"
            title="Forward (disabled)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setUrl("https://example.com")}
            className="p-2 hover:bg-background rounded-md transition-colors"
            title="Refresh"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-background rounded-md transition-colors ml-auto" title="Fullscreen">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* URL Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleNavigate()}
            placeholder="Enter URL..."
            className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleNavigate}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Go
          </button>
        </div>
      </div>

      {/* Viewport Content */}
      <div className="flex-1 bg-background overflow-auto flex flex-col">
        {isActive ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="text-6xl mb-4">🌐</div>
              <p className="text-lg font-semibold mb-2">Browser Viewport</p>
              <p className="text-sm text-muted-foreground mb-4">
                Navigating to: <span className="text-primary font-mono text-xs">{url}</span>
              </p>
              <div className="text-sm text-muted-foreground">Agent is actively exploring this page</div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-sm">No page loaded</p>
              <p className="text-xs mt-1">Navigate to a URL to begin</p>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="border-t border-border bg-muted px-3 py-2 text-xs text-muted-foreground flex items-center justify-between">
        <span>{isActive ? "Agent Active" : "Ready"}</span>
        <span>{url}</span>
      </div>
    </div>
  )
}
