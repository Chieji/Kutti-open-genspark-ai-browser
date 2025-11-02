"use client"

import { Settings, Play, Square, Globe, Cpu, Database, Zap, ChevronDown } from "lucide-react"
import { useState } from "react"

interface ControlPanelProps {
  agentRunning: boolean
  onToggleAgent: (running: boolean) => void
  onExecuteTask?: (task: string, url: string) => void
}

export function ControlPanel({ agentRunning, onToggleAgent, onExecuteTask }: ControlPanelProps) {
  const [llmModel, setLlmModel] = useState("llama-3-8b")
  const [expandedSection, setExpandedSection] = useState<string>("agent")
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2048)
  const [selectedBrowser, setSelectedBrowser] = useState("chromium")
  const [targetUrl, setTargetUrl] = useState("https://example.com")

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? "" : section)
  }

  const handleStartAgent = async () => {
    if (!agentRunning && onExecuteTask) {
      onToggleAgent(true)
      await onExecuteTask("scrape", targetUrl)
    } else {
      onToggleAgent(!agentRunning)
    }
  }

  return (
    <div className="bg-muted rounded-lg border border-border p-4 h-full flex flex-col gap-4 overflow-auto">
      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Control Panel
        </h3>
      </div>

      {/* Agent Control Section */}
      <div className="space-y-3 border-b border-border pb-4">
        <button
          onClick={() => toggleSection("agent")}
          className="w-full flex items-center justify-between text-sm font-semibold text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors"
        >
          <span className="flex items-center gap-2">
            <Zap className="w-3 h-3" />
            Agent Control
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === "agent" ? "rotate-180" : ""}`} />
        </button>

        {expandedSection === "agent" && (
          <div className="space-y-3 mt-3">
            <button
              onClick={handleStartAgent}
              className={`w-full py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                agentRunning
                  ? "bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20"
                  : "bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20"
              }`}
              disabled={agentRunning}
            >
              {agentRunning ? (
                <>
                  <Square className="w-4 h-4" />
                  Agent Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Agent
                </>
              )}
            </button>

            {/* Target URL Input */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                Target URL
              </label>
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                disabled={agentRunning}
              />
            </div>

            {/* Browser Selection */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                Browser Engine
              </label>
              <select
                value={selectedBrowser}
                onChange={(e) => setSelectedBrowser(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                disabled={agentRunning}
              >
                <option value="chromium">Chromium</option>
                <option value="firefox">Firefox</option>
                <option value="webkit">WebKit</option>
              </select>
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Status:{" "}
                <span className={`font-semibold ${agentRunning ? "text-yellow-500" : "text-green-500"}`}>
                  {agentRunning ? "Active" : "Ready"}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* LLM Configuration */}
      <div className="space-y-3 border-b border-border pb-4">
        <button
          onClick={() => toggleSection("llm")}
          className="w-full flex items-center justify-between text-sm font-semibold text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors"
        >
          <span className="flex items-center gap-2">
            <Cpu className="w-3 h-3" />
            LLM Configuration
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === "llm" ? "rotate-180" : ""}`} />
        </button>

        {expandedSection === "llm" && (
          <div className="space-y-3 mt-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                Model
              </label>
              <select
                value={llmModel}
                onChange={(e) => setLlmModel(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                disabled={agentRunning}
              >
                <option value="llama-3-8b">Llama 3 (8B GGUF)</option>
                <option value="llama-2-7b">Llama 2 (7B)</option>
                <option value="mistral-7b">Mistral (7B)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                Temperature: {temperature.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(Number.parseFloat(e.target.value))}
                className="w-full"
                disabled={agentRunning}
              />
              <p className="text-xs text-muted-foreground mt-1">Controls response randomness</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                Max Tokens: {maxTokens}
              </label>
              <input
                type="range"
                min="256"
                max="8192"
                step="256"
                value={maxTokens}
                onChange={(e) => setMaxTokens(Number.parseInt(e.target.value))}
                className="w-full"
                disabled={agentRunning}
              />
              <p className="text-xs text-muted-foreground mt-1">Maximum response length</p>
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="space-y-3 border-b border-border pb-4">
        <button
          onClick={() => toggleSection("features")}
          className="w-full flex items-center justify-between text-sm font-semibold text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors"
        >
          <span className="flex items-center gap-2">
            <Globe className="w-3 h-3" />
            Features
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedSection === "features" ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSection === "features" && (
          <div className="space-y-2 mt-3">
            {[
              { icon: Globe, label: "Web Scraping", enabled: true },
              { icon: Cpu, label: "Local Processing", enabled: true },
              { icon: Database, label: "Data Extraction", enabled: true },
            ].map(({ icon: Icon, label, enabled }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-2 bg-background rounded border border-border hover:border-primary transition-colors"
              >
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm flex-1">{label}</span>
                <div className={`w-2 h-2 rounded-full ${enabled ? "bg-green-500" : "bg-muted-foreground"}`}></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="mt-auto pt-4 border-t border-border space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">System Status</h4>
        <div className="space-y-2 text-xs bg-background rounded-lg p-3 border border-border">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Runtime</span>
            <span className={`font-semibold ${agentRunning ? "text-yellow-500" : "text-green-500"}`}>
              {agentRunning ? "Active" : "Ready"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Platform</span>
            <span>Linux</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Model</span>
            <span>Llama 3 8B</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Memory</span>
            <span>~6.5 GB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Version</span>
            <span>1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}
