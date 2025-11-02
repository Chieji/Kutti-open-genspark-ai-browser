"use client"

import { useState, useRef, useEffect } from "react"
import { Send, AlertCircle, Loader } from "lucide-react"
import { useChatStore } from "@/lib/chat-store"
import { useServicesStore } from "@/lib/services-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function ChatInterface() {
  const { currentSession, addMessage, updateMessage } = useChatStore()
  const { activeService } = useServicesStore()
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentSession?.messages])

  const handleSendMessage = async () => {
    if (!input.trim() || !currentSession || !activeService || isLoading) return

    setError(null)
    const userMessage = {
      id: `msg-${Date.now()}`,
      role: "user" as const,
      content: input,
      timestamp: new Date(),
    }

    addMessage(userMessage)
    setInput("")
    setIsLoading(true)

    try {
      // Create assistant message placeholder
      const assistantMessage = {
        id: `msg-${Date.now()}-ai`,
        role: "assistant" as const,
        content: "",
        timestamp: new Date(),
        isStreaming: true,
      }
      addMessage(assistantMessage)

      // Stream response from AI
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...currentSession.messages, userMessage],
          model: currentSession.model,
          provider: currentSession.provider,
          temperature: 0.7,
          maxTokens: 2048,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error("No response body")

      let fullContent = ""
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        fullContent += chunk
        updateMessage(assistantMessage.id, fullContent)
      }

      // Mark as complete
      updateMessage(assistantMessage.id, fullContent)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      console.error("Chat error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!currentSession) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <p className="text-muted-foreground mb-4">Create a new chat session to get started</p>
          <p className="text-sm text-muted-foreground">Select a provider and model from the sidebar to begin</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentSession.messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <Card className="p-6 text-center max-w-md">
              <h3 className="font-semibold text-foreground mb-2">Start a conversation</h3>
              <p className="text-sm text-muted-foreground">
                Ask me anything about web browsing, AI, or any other topic
              </p>
            </Card>
          </div>
        ) : (
          <>
            {currentSession.messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <Card
                  className={`max-w-lg md:max-w-2xl p-4 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words">{message.content}</p>
                  <div
                    className={`text-xs mt-2 ${
                      message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </Card>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}

        {isLoading && (
          <div className="flex justify-start">
            <Card className="bg-accent text-foreground p-4 flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              <span className="text-sm">AI is thinking...</span>
            </Card>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <Card className="bg-destructive/10 text-destructive p-3 flex items-center gap-2 max-w-lg">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </Card>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-background">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder="Ask something..."
            disabled={isLoading || !activeService}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !input.trim() || !activeService} className="gap-2">
            {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        {!activeService && (
          <p className="text-xs text-muted-foreground mt-2">Configure an AI service to start chatting</p>
        )}
      </div>
    </div>
  )
}
