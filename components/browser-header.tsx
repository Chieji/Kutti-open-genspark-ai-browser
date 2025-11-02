import { Zap } from "lucide-react"

export function BrowserHeader() {
  return (
    <header className="border-b border-border bg-background/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-background" />
          </div>
          <h1 className="text-xl font-bold">Open Genspark</h1>
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">Linux Edition</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Status: Ready</span>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </header>
  )
}
