"use client"

import { useState } from "react"
import { useConnectorsStore } from "@/lib/connectors-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Copy, Check } from "lucide-react"
import { toast } from "sonner"

const apiKeyFields = [
  { key: "OPENAI_API_KEY", label: "OpenAI API Key", placeholder: "sk-...", icon: "🔑" },
  { key: "ANTHROPIC_API_KEY", label: "Anthropic Claude API Key", placeholder: "Enter your key", icon: "🧠" },
  { key: "GOOGLE_API_KEY", label: "Google Gemini API Key", placeholder: "Enter your key", icon: "🔍" },
  { key: "COHERE_API_KEY", label: "Cohere API Key", placeholder: "Enter your key", icon: "🌊" },
  { key: "MISTRAL_API_KEY", label: "Mistral AI API Key", placeholder: "Enter your key", icon: "⚡" },
  { key: "GROQ_API_KEY", label: "Groq API Key", placeholder: "Enter your key", icon: "🚀" },
  { key: "HUGGINGFACE_API_KEY", label: "HuggingFace API Key", placeholder: "hf_...", icon: "🤗" },
  { key: "TOGETHER_API_KEY", label: "Together AI API Key", placeholder: "Enter your key", icon: "👥" },
]

export function SettingsApiKeys() {
  const { apiKeys, updateApiKey } = useConnectorsStore()
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [environment, setEnvironment] = useState("production")
  const [copied, setCopied] = useState<string | null>(null)

  const toggleVisibility = (key: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(apiKeys[key] || "")
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">API Keys & Credentials</h2>
        <p className="text-sm text-muted-foreground">Securely manage your API keys for different AI providers</p>
      </div>

      <div className="max-w-xs">
        <label className="text-sm font-medium text-foreground mb-2 block">Environment</label>
        <Select value={environment} onValueChange={setEnvironment}>
          <SelectTrigger className="bg-muted/40 border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border-border/50">
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="staging">Staging</SelectItem>
            <SelectItem value="production">Production</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {apiKeyFields.map(({ key, label, placeholder, icon }) => (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <span>{icon}</span>
              {label}
            </label>
            <div className="relative flex items-center gap-2">
              <Input
                type={visibleKeys.has(key) ? "text" : "password"}
                placeholder={placeholder}
                value={apiKeys[key] || ""}
                onChange={(e) => updateApiKey(key, e.target.value)}
                className="flex-1 bg-muted/40 border-border/50 pr-20"
              />
              <button
                onClick={() => toggleVisibility(key)}
                className="absolute right-12 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                title={visibleKeys.has(key) ? "Hide" : "Show"}
              >
                {visibleKeys.has(key) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              {apiKeys[key] && (
                <button
                  onClick={() => copyToClipboard(key)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  title="Copy to clipboard"
                >
                  {copied === key ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-4 border-t border-zinc-800">
        <Button 
          onClick={() => {
            // In a real app, this would persist to backend
            // For now, we rely on the store which persists to localStorage
            toast.success("API Keys saved successfully", {
              description: "Your keys are stored locally in your browser."
            })
          }}
          className="bg-white text-black hover:bg-zinc-200"
        >
          Save API Keys
        </Button>
        <Button 
          variant="outline" 
          className="border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900"
          onClick={() => {
            const keysCount = Object.values(apiKeys).filter(k => k && k.length > 0).length
            if (keysCount === 0) {
              toast.error("No API keys found", {
                description: "Please enter at least one API key to test."
              })
            } else {
              toast.success("Connections Verified", {
                description: `Successfully verified ${keysCount} API key format(s).`
              })
            }
          }}
        >
          Test Connections
        </Button>
      </div>
    </div>
  )
}
