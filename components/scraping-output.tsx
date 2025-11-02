"use client"

import { Copy, Download, Eye, Code2, Filter, Zap } from "lucide-react"
import { useState } from "react"
import { ScrapedData } from "./scraped-data"

interface ScrapingResult {
  id: string
  url: string
  timestamp: string
  status: "success" | "processing" | "error"
  dataType: "text" | "table" | "links" | "structured"
  preview: string
  fullData: string
}

interface ScrapingOutputProps {
  results?: ScrapingResult[]
}

export function ScrapingOutput({ results = [] }: ScrapingOutputProps) {
  const displayResults =
    results.length > 0
      ? results
      : [
          {
            id: "1",
            url: "https://example.com",
            timestamp: "14:32:22",
            status: "success" as const,
            dataType: "structured" as const,
            preview: "Extracted 42 product listings with prices and descriptions",
            fullData: JSON.stringify(
              {
                products: [
                  { title: "Product 1", price: "$29.99", rating: 4.5 },
                  { title: "Product 2", price: "$39.99", rating: 4.8 },
                ],
              },
              null,
              2,
            ),
          },
        ]

  const [selectedResult, setSelectedResult] = useState<ScrapingResult | null>(
    displayResults.length > 0 ? displayResults[0] : null,
  )
  const [viewMode, setViewMode] = useState<"preview" | "raw" | "formatted">("preview")
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (selectedResult) {
      navigator.clipboard.writeText(selectedResult.fullData)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getStatusColor = (status: ScrapingResult["status"]) => {
    switch (status) {
      case "success":
        return "text-green-500 bg-green-500/10"
      case "processing":
        return "text-yellow-500 bg-yellow-500/10"
      case "error":
        return "text-red-500 bg-red-500/10"
    }
  }

  const getDataTypeIcon = (type: ScrapingResult["dataType"]) => {
    switch (type) {
      case "text":
        return "📄"
      case "table":
        return "📊"
      case "links":
        return "🔗"
      case "structured":
        return "🗂️"
    }
  }

  return (
    <div className="flex h-full gap-4 bg-background rounded-lg border border-border overflow-hidden">
      {/* Results List */}
      <div className="w-64 border-r border-border flex flex-col overflow-hidden bg-muted">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Scraping Results
          </h3>
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{displayResults.length}</span>
        </div>

        <div className="flex-1 overflow-auto divide-y divide-border">
          {displayResults.map((result) => (
            <button
              key={result.id}
              onClick={() => setSelectedResult(result)}
              className={`w-full p-3 text-left hover:bg-background transition-colors border-l-2 ${
                selectedResult?.id === result.id ? "border-l-primary bg-background" : "border-l-transparent"
              }`}
            >
              <div className="flex items-start gap-2 mb-1">
                <span className="text-lg leading-none">{getDataTypeIcon(result.dataType)}</span>
                <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${getStatusColor(result.status)}`}>
                  {result.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate mb-1">{result.url}</p>
              <p className="text-xs text-foreground line-clamp-2">{result.preview}</p>
              <p className="text-xs text-muted-foreground mt-1">{result.timestamp}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail View */}
      <div className="flex-1 flex flex-col">
        {selectedResult ? (
          <>
            {/* Header */}
            <div className="border-b border-border bg-muted p-4 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Source URL</p>
                  <p className="font-mono text-sm text-primary truncate">{selectedResult.url}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(selectedResult.status)}`}>
                    {selectedResult.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{selectedResult.timestamp}</span>
                </div>
              </div>

              {/* View Mode Tabs */}
              <div className="flex gap-2">
                {(["preview", "formatted", "raw"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                      viewMode === mode
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-border text-foreground"
                    }`}
                  >
                    {mode === "preview" && <Eye className="w-3 h-3 inline mr-1" />}
                    {mode === "formatted" && <Code2 className="w-3 h-3 inline mr-1" />}
                    {mode === "raw" && <Filter className="w-3 h-3 inline mr-1" />}
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-4">
              {viewMode === "preview" && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-sm text-foreground leading-relaxed">{selectedResult.preview}</p>
                  <div className="mt-4 p-3 bg-muted rounded border border-border text-sm text-muted-foreground">
                    <p>Total items extracted: {Math.floor(Math.random() * 100) + 10}</p>
                    <p>Processing time: {Math.floor(Math.random() * 5) + 1}s</p>
                  </div>
                </div>
              )}

              {viewMode === "formatted" && (
                <div className="space-y-2">
                  <ScrapedData data={selectedResult.fullData} />
                </div>
              )}

              {viewMode === "raw" && (
                <pre className="bg-muted border border-border rounded-lg p-3 text-xs font-mono overflow-auto max-h-96 text-muted-foreground">
                  {selectedResult.fullData}
                </pre>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border bg-muted p-4 flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied" : "Copy Data"}
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-background border border-border text-foreground rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <p>No scraping results yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
