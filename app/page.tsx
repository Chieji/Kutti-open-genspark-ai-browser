"use client"

import { useState, useCallback, useEffect } from "react"
import { useAuthStore } from "@/lib/auth-store"
import { AuthPage } from "@/components/auth-page"
import { BrowserViewport } from "@/components/browser-viewport"
import { DOMInspector } from "@/components/dom-inspector"
import { AgentOutput } from "@/components/agent-output"
import { ScrapingOutput } from "@/components/scraping-output"
import { ControlPanel } from "@/components/control-panel"
import { SettingsPage } from "@/components/settings-page"
import { ClaudeChat } from "@/components/claude-chat"
import { Sidebar } from "@/components/sidebar"
import { MCPStore } from "@/components/mcp-store"
import { Autopilot } from "@/components/autopilot"
import { WorkspaceHub } from "@/components/workspace-hub"
import { AIDrive } from "@/components/ai-drive"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [agentRunning, setAgentRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [agentLogs, setAgentLogs] = useState<any[]>([])
  const [scrapingResults, setScrapingResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { isAuthenticated, setUser, logout } = useAuthStore()

  const handleAgentTask = useCallback(async (task: string, url: string) => {
    setAgentRunning(true)
    setAgentLogs([
      {
        id: "1",
        timestamp: new Date().toLocaleTimeString(),
        type: "info",
        message: "Agent initialized",
        details: "Starting task execution",
      },
    ])

    try {
      setAgentLogs((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString(),
          type: "info",
          message: "Navigating to URL",
          details: `Target: ${url}`,
        },
      ])

      const response = await fetch("/api/browser/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          extractText: true,
          extractLinks: true,
          extractImages: true,
        }),
      })

      if (!response.ok) throw new Error("Scraping failed")
      const data = await response.json()

      setAgentLogs((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString(),
          type: "success",
          message: "Page loaded successfully",
          details: `Document title: ${data.title}`,
        },
      ])

      setScrapingResults((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          url,
          timestamp: new Date().toLocaleTimeString(),
          status: "success",
          dataType: "structured",
          preview: `Extracted content from ${data.title}`,
          fullData: JSON.stringify(data, null, 2),
        },
      ])

      setAgentLogs((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString(),
          type: "success",
          message: "Task completed",
          details: "Data extraction finished successfully",
        },
      ])
    } catch (error) {
      setAgentLogs((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString(),
          type: "error",
          message: "Error during execution",
          details: error instanceof Error ? error.message : "Unknown error",
        },
      ])
    } finally {
      setAgentRunning(false)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setUser(data.user)
        })
        .catch(() => logout())
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [setUser, logout])

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-background text-foreground">Loading...</div>
  }

  if (!isAuthenticated) {
    return <AuthPage />
  }

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden font-sans selection:bg-white/20">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-black relative">
        {/* Content Viewport */}
        <main className="flex-1 overflow-hidden relative">
          {activeTab === "home" && <WorkspaceHub onNavigate={setActiveTab} />}
          
          {/* Tool Views */}
          {activeTab !== "home" && (
            <div className="h-full w-full flex flex-col animate-in fade-in zoom-in-95 duration-300">
              {/* Tool Header */}
              <header className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-black/50 backdrop-blur-xl sticky top-0 z-10">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("home")} className="hover:text-white -ml-2">
                    Home
                  </Button>
                  <span>/</span>
                  <span className="capitalize text-white">{activeTab.replace("-", " ")}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-red-400 transition-colors">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </header>

              <div className="flex-1 overflow-hidden p-6">
                <div className="h-full w-full max-w-[1600px] mx-auto flex gap-6">
                  <div className="flex-1 h-full flex flex-col min-w-0 glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#121214]">
                    {activeTab === "chat" && <ClaudeChat onSettingsClick={() => setActiveTab("settings")} />}
                    {activeTab === "browser" && <BrowserViewport isActive={agentRunning} />}
                    {activeTab === "autopilot" && <Autopilot />}
                    {activeTab === "mcp" && <MCPStore />}
                    {activeTab === "dom" && <DOMInspector />}
                    {activeTab === "output" && <AgentOutput logs={agentLogs} />}
                    {activeTab === "settings" && <SettingsPage />}
                    {activeTab === "drive" && <AIDrive />}
                    {/* Placeholders for new tools */}
                    {(activeTab === "slides" || activeTab === "sheets" || activeTab === "docs") && (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        Tool coming soon: {activeTab}
                      </div>
                    )}
                  </div>

                  {/* Right Control Panel */}
                  {(activeTab === "browser" || activeTab === "output" || activeTab === "scraping") && (
                    <div className="w-80 flex-shrink-0">
                      <ControlPanel
                        agentRunning={agentRunning}
                        onToggleAgent={() => setAgentRunning(!agentRunning)}
                        onExecuteTask={handleAgentTask}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
