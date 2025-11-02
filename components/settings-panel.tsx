"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { ServiceManager } from "./service-manager"
import { Card } from "@/components/ui/card"

export function SettingsPanel() {
  const [expandedSections, setExpandedSections] = useState({
    services: true,
    models: false,
    advanced: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="space-y-2">
      {/* Services Section */}
      <Card className="overflow-hidden">
        <button
          onClick={() => toggleSection("services")}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-accent/50 transition-colors"
        >
          <h3 className="font-semibold text-foreground">AI Services</h3>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.services ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.services && (
          <div className="px-4 py-3 border-t border-border bg-background/50">
            <ServiceManager />
          </div>
        )}
      </Card>

      {/* Model Settings */}
      <Card className="overflow-hidden">
        <button
          onClick={() => toggleSection("models")}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-accent/50 transition-colors"
        >
          <h3 className="font-semibold text-foreground">Model Settings</h3>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.models ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.models && (
          <div className="px-4 py-3 border-t border-border space-y-3 bg-background/50">
            <div>
              <label className="text-sm font-medium text-foreground">
                Temperature: <span className="text-primary">0.7</span>
              </label>
              <input type="range" min="0" max="2" step="0.1" defaultValue="0.7" className="w-full" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Max Tokens: <span className="text-primary">2048</span>
              </label>
              <input type="range" min="256" max="4096" step="256" defaultValue="2048" className="w-full" />
            </div>
          </div>
        )}
      </Card>

      {/* Advanced Settings */}
      <Card className="overflow-hidden">
        <button
          onClick={() => toggleSection("advanced")}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-accent/50 transition-colors"
        >
          <h3 className="font-semibold text-foreground">Advanced</h3>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.advanced ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.advanced && (
          <div className="px-4 py-3 border-t border-border space-y-3 bg-background/50">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-foreground">Enable streaming</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-foreground">Cache responses</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-foreground">Enable web scraping</span>
            </label>
          </div>
        )}
      </Card>
    </div>
  )
}
