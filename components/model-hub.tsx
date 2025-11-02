"use client"

import { useState } from "react"
import { Download, Star, Search, Github, Settings2, Copy, CheckCircle2 } from "lucide-react"
import { HUB_MODELS } from "@/lib/model-hub"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function ModelHub() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [installedModels, setInstalledModels] = useState<string[]>([])
  const [installing, setInstalling] = useState<string | null>(null)

  const filteredModels = HUB_MODELS.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.tags.some((tag) => tag.includes(searchTerm.toLowerCase()))
    const matchesSource = !selectedSource || model.source === selectedSource
    return matchesSearch && matchesSource
  })

  const handleInstall = async (modelId: string, command: string) => {
    setInstalling(modelId)
    try {
      // Simulate installation
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setInstalledModels((prev) => [...prev, modelId])
    } catch (error) {
      console.error("Installation failed:", error)
    } finally {
      setInstalling(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          <Button
            size="sm"
            variant={selectedSource === null ? "default" : "outline"}
            onClick={() => setSelectedSource(null)}
          >
            All
          </Button>
          {["huggingface", "ollama", "github", "litellm"].map((source) => (
            <Button
              key={source}
              size="sm"
              variant={selectedSource === source ? "default" : "outline"}
              onClick={() => setSelectedSource(source)}
              className="capitalize"
            >
              {source}
            </Button>
          ))}
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filteredModels.map((model) => {
          const isInstalled = installedModels.includes(model.id)
          const isInstalling = installing === model.id

          return (
            <Card key={model.id} className="p-4 space-y-3 hover:border-primary/50">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{model.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{model.description}</p>
                </div>
                {isInstalled && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
              </div>

              <div className="flex gap-2 text-xs text-muted-foreground">
                <span>{model.size}</span>
                <span>•</span>
                <span>{model.downloads.toLocaleString()} DLs</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {model.rating}
                </span>
              </div>

              <div className="flex gap-1 flex-wrap">
                {model.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-2 border-t border-border">
                {model.installCommand && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="flex-1 text-xs gap-1"
                    onClick={() => handleInstall(model.id, model.installCommand || "")}
                    disabled={isInstalling}
                  >
                    {isInstalling ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Installing
                      </>
                    ) : isInstalled ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        Installed
                      </>
                    ) : (
                      <>
                        <Download className="w-3 h-3" />
                        Install
                      </>
                    )}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 text-xs gap-1"
                  onClick={() => {
                    navigator.clipboard.writeText(model.installCommand || model.url)
                  }}
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 text-xs gap-1"
                  onClick={() => window.open(model.url, "_blank")}
                >
                  {model.source === "github" ? <Github className="w-3 h-3" /> : <Settings2 className="w-3 h-3" />}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredModels.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No models found. Try a different search term.</p>
        </Card>
      )}
    </div>
  )
}
