"use client"

import { useState } from "react"
import { useConnectorsStore } from "@/lib/connectors-store"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Plus } from "lucide-react"

export function SettingsConnectors() {
  const { connectors, toggleConnector } = useConnectorsStore()
  const [activeTab, setActiveTab] = useState("apps")

  const categories = {
    apps: connectors.filter((c) => c.category === "apps"),
    custom_api: connectors.filter((c) => c.category === "custom_api"),
    custom_mcp: connectors.filter((c) => c.category === "custom_mcp"),
  }

  const renderConnectorCard = (connector: any) => (
    <Card
      key={connector.id}
      className="p-4 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 flex items-center justify-between group"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center text-2xl border border-zinc-700">
          {connector.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-zinc-100 text-sm">{connector.name}</h3>
          <p className="text-xs text-zinc-400 line-clamp-2">{connector.description}</p>
        </div>
      </div>

      <div className="ml-4 flex items-center">
        {connector.connected ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              <span className="text-xs text-zinc-300">Connected</span>
            </div>
            <button
              onClick={() => toggleConnector(connector.id)}
              className="w-11 h-6 bg-zinc-100 rounded-full relative transition-colors hover:bg-white"
            >
              <div className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => toggleConnector(connector.id)}
            className="w-11 h-6 bg-zinc-800 rounded-full relative transition-colors hover:bg-zinc-700 border border-zinc-700"
          >
            <div className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 bg-zinc-500 rounded-full" />
          </button>
        )}
      </div>
    </Card>
  )

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Connectors</h2>
        <p className="text-sm text-muted-foreground">
          Connect external services and APIs to enhance your AI capabilities
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Plus className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Add Connectors</h3>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/40 border border-border/50">
            <TabsTrigger value="apps" className="data-[state=active]:bg-background">
              Apps
            </TabsTrigger>
            <TabsTrigger value="custom_api" className="data-[state=active]:bg-background">
              Custom API
            </TabsTrigger>
            <TabsTrigger value="custom_mcp" className="data-[state=active]:bg-background">
              Custom MCP
            </TabsTrigger>
          </TabsList>

          <TabsContent value="apps" className="space-y-3 mt-0">
            {categories.apps.map((connector) => renderConnectorCard(connector))}
          </TabsContent>

          <TabsContent value="custom_api" className="space-y-3 mt-0">
            <Card className="p-8 border-dashed flex flex-col items-center justify-center min-h-[240px] bg-muted/20 border-border/50">
              <div className="text-center">
                <Plus className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">No custom APIs yet</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Add custom API integrations for your workflows</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="custom_mcp" className="space-y-3 mt-0">
            <Card className="p-8 border-dashed flex flex-col items-center justify-center min-h-[240px] bg-muted/20 border-border/50">
              <div className="text-center">
                <Plus className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">No custom MCPs yet</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Add custom MCP servers for advanced features</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="pt-4 border-t border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          Connected Services
        </h3>
        {connectors.filter((c) => c.connected).length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {connectors
              .filter((c) => c.connected)
              .map((connector) => (
                <div
                  key={connector.id}
                  className="p-4 bg-muted/30 border border-green-500/20 rounded-lg flex items-center justify-between hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
                      {connector.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{connector.name}</h4>
                      <p className="text-xs text-green-500/70 flex items-center gap-1 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Active
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleConnector(connector.id)}
                    className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Manage
                  </button>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8 bg-muted/20 rounded-lg border border-border/30">
            No connectors connected yet. Enable connectors above to get started.
          </p>
        )}
      </div>
    </div>
  )
}
