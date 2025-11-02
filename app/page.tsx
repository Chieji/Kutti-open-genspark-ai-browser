"use client"

import { useState, useCallback } from "react"
import { BrowserHeader } from "@/components/browser-header"
import { BrowserViewport } from "@/components/browser-viewport"
import { DOMInspector } from "@/components/dom-inspector"
import { AgentOutput } from "@/components/agent-output"
import { ScrapingOutput } from "@/components/scraping-output"
import { ControlPanel } from "@/components/control-panel"
import { SettingsPage } from "@/components/settings-page"
import { ClaudeChat } from "@/components/claude-chat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, SettingsIcon } from "lucide-react"

export default function Home() {
  const [agentRunning, setAgentRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [agentLogs, setAgentLogs] = useState<any[]>([])
  const [scrapingResults, setScrapingResults] = useState<any[]>([])

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
      // Add log
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

      // Call scraping API
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

      // Add success log
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

      // Add result
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

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <BrowserHeader />

      <div className="flex flex-1 overflow-hidden gap-4 p-4">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger value="browser">Browser</TabsTrigger>
              <TabsTrigger value="dom">DOM Inspector</TabsTrigger>
              <TabsTrigger value="output">Agent Output</TabsTrigger>
              <TabsTrigger value="scraping">Scraping Results</TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <SettingsIcon className="w-4 h-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 overflow-hidden">
              <ClaudeChat onSettingsClick={() => setActiveTab("settings")} />
            </TabsContent>

            <TabsContent value="browser" className="flex-1 overflow-hidden">
              <BrowserViewport isActive={agentRunning} />
            </TabsContent>

            <TabsContent value="dom" className="flex-1 overflow-hidden">
              <DOMInspector />
            </TabsContent>

            <TabsContent value="output" className="flex-1 overflow-hidden">
              <AgentOutput logs={agentLogs} />
            </TabsContent>

            <TabsContent value="scraping" className="flex-1 overflow-hidden">
              <ScrapingOutput results={scrapingResults} />
            </TabsContent>

            <TabsContent value="settings" className="flex-1 overflow-hidden">
              <SettingsPage />
            </TabsContent>
          </Tabs>
        </div>

        {/* Control Panel - Only show for browser/agent tabs */}
        {(activeTab === "browser" || activeTab === "output" || activeTab === "scraping") && (
          <div className="w-80">
            <ControlPanel
              agentRunning={agentRunning}
              onToggleAgent={() => setAgentRunning(!agentRunning)}
              onExecuteTask={handleAgentTask}
            />
          </div>
        )}
      </div>
    </div>
  )
}
