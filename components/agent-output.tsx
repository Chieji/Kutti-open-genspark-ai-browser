"use client"

import { AlertCircle, CheckCircle, Info } from "lucide-react"

interface Log {
  id: string
  timestamp: string
  type: "info" | "success" | "error" | "warning"
  message: string
  details?: string
}

interface AgentOutputProps {
  logs?: Log[]
}

export function AgentOutput({ logs = [] }: AgentOutputProps) {
  const displayLogs =
    logs.length > 0
      ? logs
      : [
          {
            id: "1",
            timestamp: "14:32:15",
            type: "info" as const,
            message: "Agent initialized",
            details: "Local Llama 3 8B model loaded",
          },
          {
            id: "2",
            timestamp: "14:32:18",
            type: "info" as const,
            message: "Starting task execution",
            details: "Navigating to target website",
          },
          {
            id: "3",
            timestamp: "14:32:22",
            type: "success" as const,
            message: "Page loaded successfully",
            details: "Document ready state: complete",
          },
        ]

  const getIcon = (type: Log["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default:
        return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const getBgColor = (type: Log["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-500/10"
      case "error":
        return "bg-red-500/10"
      case "warning":
        return "bg-yellow-500/10"
      default:
        return "bg-blue-500/10"
    }
  }

  return (
    <div className="h-full flex flex-col bg-background rounded-lg border border-border overflow-hidden">
      <div className="bg-muted border-b border-border px-4 py-3">
        <h3 className="font-semibold text-sm">Agent Output</h3>
      </div>

      <div className="flex-1 overflow-auto divide-y divide-border">
        {displayLogs.map((log) => (
          <div
            key={log.id}
            className={`p-3 ${getBgColor(log.type)} hover:opacity-80 transition-opacity cursor-default`}
          >
            <div className="flex items-start gap-3">
              {getIcon(log.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                  <span className="text-sm font-medium">{log.message}</span>
                </div>
                {log.details && <p className="text-xs text-muted-foreground mt-1">{log.details}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-muted px-4 py-2">
        <button className="text-xs text-primary hover:underline">Clear Logs</button>
      </div>
    </div>
  )
}
