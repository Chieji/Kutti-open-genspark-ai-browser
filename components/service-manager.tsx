"use client"

import { useState } from "react"
import { Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react"
import { useServicesStore } from "@/lib/services-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function ServiceManager() {
  const { services, activeService, addService, deleteService, setActiveService } = useServicesStore()
  const [showAdd, setShowAdd] = useState(false)
  const [newService, setNewService] = useState({
    provider: "openai",
    apiKey: "",
    baseUrl: "",
  })

  const handleAddService = () => {
    if (newService.apiKey.trim()) {
      addService({
        provider: newService.provider,
        apiKey: newService.apiKey,
        baseUrl: newService.baseUrl || undefined,
        isActive: services.length === 0,
      })
      setNewService({ provider: "openai", apiKey: "", baseUrl: "" })
      setShowAdd(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Services</h2>
        <Button size="sm" onClick={() => setShowAdd(!showAdd)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Service
        </Button>
      </div>

      {showAdd && (
        <Card className="p-4 space-y-3 border-primary/50 bg-primary/5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Provider</label>
            <select
              value={newService.provider}
              onChange={(e) => setNewService({ ...newService, provider: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg bg-background border-input text-foreground"
            >
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic Claude</option>
              <option value="google">Google Gemini</option>
              <option value="cohere">Cohere</option>
              <option value="mistral">Mistral</option>
              <option value="ollama">Ollama (Local)</option>
              <option value="litellm">LiteLLM Proxy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">API Key</label>
            <Input
              type="password"
              placeholder="Enter API key"
              value={newService.apiKey}
              onChange={(e) => setNewService({ ...newService, apiKey: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Base URL (optional)</label>
            <Input
              placeholder="http://localhost:4000"
              value={newService.baseUrl}
              onChange={(e) => setNewService({ ...newService, baseUrl: e.target.value })}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAddService} className="flex-1 bg-primary text-primary-foreground">
              Save
            </Button>
            <Button variant="outline" onClick={() => setShowAdd(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-2">
        {services.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No services configured. Add one to get started.
          </p>
        ) : (
          services.map((service) => (
            <Card
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`p-3 cursor-pointer transition-colors ${
                activeService?.id === service.id ? "border-primary bg-primary/10" : "hover:bg-accent/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {activeService?.id === service.id ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground truncate">{service.provider.toUpperCase()}</p>
                    <p className="text-xs text-muted-foreground truncate">{service.apiKey.substring(0, 8)}...</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteService(service.id)
                  }}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
