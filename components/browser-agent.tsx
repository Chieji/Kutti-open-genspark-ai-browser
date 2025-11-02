"use client"

interface BrowserAgentProps {
  agentRunning: boolean
}

export function BrowserAgent({ agentRunning }: BrowserAgentProps) {
  return (
    <div className="bg-muted rounded-lg border border-border p-4 h-64">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">Browser Canvas</h3>
          {agentRunning && <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">Active</span>}
        </div>

        <div className="bg-background rounded border border-border aspect-video flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🌐</div>
            <p className="text-sm text-muted-foreground">{agentRunning ? "Agent browsing..." : "Agent ready"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
