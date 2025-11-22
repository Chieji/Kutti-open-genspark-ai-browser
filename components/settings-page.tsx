"use client"

import { useState } from "react"
import { SettingsConnectors } from "./settings-connectors"
import { SettingsApiKeys } from "./settings-api-keys"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Key, Zap } from "lucide-react"

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("connectors")

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Settings Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage connectors, API keys, and preferences</p>
          </div>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col h-full">
          <div className="px-6 pt-6 flex-none">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6 bg-zinc-900 border border-zinc-800 p-1">
              <TabsTrigger value="connectors" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Connectors</span>
              </TabsTrigger>
              <TabsTrigger value="api-keys" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white flex items-center gap-2">
                <Key className="w-4 h-4" />
                <span>API Keys</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0">
            <TabsContent value="connectors" className="mt-0 h-full">
              <SettingsConnectors />
            </TabsContent>

            <TabsContent value="api-keys" className="mt-0 h-full">
              <SettingsApiKeys />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
