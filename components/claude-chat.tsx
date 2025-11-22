import { useState, useRef, useEffect } from "react"
import { Send, MessageSquare, Settings, Sparkles, ArrowUp, Paperclip, Globe, Cpu, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/lib/auth-store"
import { cn } from "@/lib/utils"
import { initLocalModel, generateLocalResponse } from "@/lib/local-model"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ClaudeChatProps {
  onSettingsClick?: () => void
}

export function ClaudeChat({ onSettingsClick }: ClaudeChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [useLocalModel, setUseLocalModel] = useState(false)
  const [modelLoading, setModelLoading] = useState(false)
  const [modelProgress, setModelProgress] = useState("")
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuthStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, modelProgress])

  useEffect(() => {
    if (user && !useLocalModel) {
      loadChatHistory()
    }
  }, [user, useLocalModel])

  const loadChatHistory = async () => {
    try {
      const response = await fetch("/api/chat/history", {
        headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
      })
      if (response.ok) {
        const history = await response.json()
        setMessages(history)
        if (history.length > 0) setHasStarted(true)
      }
    } catch (error) {
      console.error("Error loading chat history:", error)
    }
  }

  const handleLocalModelInit = async () => {
    if (useLocalModel) return // Already active
    
    setUseLocalModel(true)
    setModelLoading(true)
    try {
      await initLocalModel({
        onProgress: (text) => setModelProgress(text)
      })
    } catch (error) {
      console.error("Failed to load local model", error)
      setUseLocalModel(false) // Revert on failure
    } finally {
      setModelLoading(false)
      setModelProgress("")
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return
    if (!user && !useLocalModel) return // Require auth for cloud, or switch to local

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setHasStarted(true)

    try {
      const assistantMessage: Message = {
        id: `msg-${Date.now()}-ai`,
        role: "assistant",
        content: "",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])

      if (useLocalModel) {
        // Local Inference
        await generateLocalResponse(
          messages.concat(userMessage).map(m => ({ 
            role: m.role === "user" ? "user" : "assistant", 
            content: m.content 
          })),
          (text) => {
            setMessages((prev) => {
              const updated = [...prev]
              const lastMsg = updated[updated.length - 1]
              if (lastMsg.role === "assistant") {
                lastMsg.content = text
              }
              return updated
            })
          }
        )
      } else {
        // Cloud Inference (Original Logic)
        const response = await fetch("/api/chat/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            userId: user?.id,
            temperature: 0.7,
            maxTokens: 2048,
          }),
        })

        if (!response.ok) throw new Error("Failed to get response")

        const reader = response.body?.getReader()
        if (!reader) throw new Error("No response stream")

        const decoder = new TextDecoder()
        let fullContent = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          fullContent += chunk
          setMessages((prev) => {
            const updated = [...prev]
            const lastMsg = updated[updated.length - 1]
            if (lastMsg.role === "assistant") {
              lastMsg.content = fullContent
            }
            return updated
          })
        }
        
        // Save history only for cloud chats for now
        if (user) {
           await fetch("/api/chat/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
            body: JSON.stringify({
              messages: [...messages, userMessage, assistantMessage],
            }),
          })
        }
      }
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-error`,
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Chat Header - Minimal */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-background to-transparent">
        <div className="flex items-center gap-2">
           {/* Model Toggle */}
           <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10">
             <button
               onClick={() => setUseLocalModel(false)}
               className={cn(
                 "px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5",
                 !useLocalModel ? "bg-white text-black shadow-sm" : "text-muted-foreground hover:text-white"
               )}
             >
               <Cloud className="w-3 h-3" />
               Cloud
             </button>
             <button
               onClick={handleLocalModelInit}
               className={cn(
                 "px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5",
                 useLocalModel ? "bg-green-500 text-white shadow-sm" : "text-muted-foreground hover:text-white"
               )}
             >
               <Cpu className="w-3 h-3" />
               Free
             </button>
           </div>
        </div>
        <div className="flex items-center gap-2">
           {/* Optional header content */}
        </div>
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-8 pb-32">
          {modelLoading && (
            <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-in fade-in">
              <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-green-500 animate-spin" />
              <p className="text-sm text-muted-foreground font-medium">Connecting to Free AI Model...</p>
              <p className="text-xs text-muted-foreground/50 font-mono">{modelProgress}</p>
            </div>
          )}
          
          {!hasStarted && !modelLoading ? (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-4 shadow-inner ring-1 ring-border/50">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              
              <div className="space-y-2 max-w-lg">
                <h3 className="text-3xl font-bold tracking-tight text-foreground">
                  {useLocalModel ? "Free AI Ready" : "How can I help you today?"}
                </h3>
                <p className="text-muted-foreground text-lg">
                  {useLocalModel 
                    ? "Powered by Llama 2 via HuggingFace. Completely free!" 
                    : "I can browse the web, analyze data, and help you find answers."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl pt-8">
                {[
                  { icon: Globe, title: "Search & Summarize", desc: "Find and digest web content" },
                  { icon: MessageSquare, title: "Chat & Analyze", desc: "Discuss complex topics" },
                  { icon: Sparkles, title: "Creative Writing", desc: "Draft stories or emails" },
                  { icon: Settings, title: "Automate Tasks", desc: "Run browser agents" },
                ].map((action) => (
                  <button
                    key={action.title}
                    onClick={() => setInput(action.title)}
                    className="flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-card hover:bg-accent/50 hover:border-primary/20 transition-all duration-200 text-left group shadow-sm hover:shadow-md"
                  >
                    <div className="p-2 rounded-lg bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{action.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{action.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                      <Sparkles className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}

                  <div className={cn("flex flex-col max-w-[80%]", message.role === "user" ? "items-end" : "items-start")}>
                    <div
                      className={cn(
                        "rounded-2xl px-6 py-4 shadow-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-card border border-border/50 text-card-foreground rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-2 px-1 opacity-50">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-1 border border-border">
                      <span className="text-xs font-bold text-secondary-foreground">You</span>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Sparkles className="w-4 h-4 text-primary-foreground animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2 bg-card rounded-2xl px-6 py-4 border border-border/50 shadow-sm">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input Area - Floating */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent pt-20">
        <div className="max-w-3xl mx-auto relative">
          <div className="relative flex items-end gap-2 p-2 bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/5 transition-all focus-within:ring-primary/20 focus-within:border-primary/20">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 mb-0.5">
              <Paperclip className="w-5 h-5" />
            </Button>
            
            <div className="flex-1 py-2.5">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder={user ? "Ask anything..." : "Sign in to chat..."}
                disabled={isLoading || !user}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-2 h-auto text-base placeholder:text-muted-foreground/50"
              />
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim() || !user}
              size="icon"
              className={cn(
                "h-10 w-10 rounded-xl transition-all duration-200 mb-0.5",
                input.trim() 
                  ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90" 
                  : "bg-accent text-muted-foreground hover:bg-accent/80"
              )}
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
          <div className="text-center mt-3">
             <p className="text-[10px] text-muted-foreground/60">
               AI can make mistakes. Check important info.
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}
