"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface MessageProps {
  message: {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: string
  }
}

export function AgentMessage({ message }: MessageProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`group max-w-sm space-y-2`}>
        {/* Message Bubble */}
        <div
          className={`px-4 py-3 rounded-lg transition-all ${
            isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground border border-border"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        </div>

        {/* Metadata and Actions */}
        <div
          className={`flex items-center gap-3 text-xs text-muted-foreground px-1 ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          <span>{message.timestamp}</span>
          {!isUser && (
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              title="Copy message"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 hover:text-foreground" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
