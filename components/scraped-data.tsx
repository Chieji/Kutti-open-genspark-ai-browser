"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface ScrapedDataProps {
  data: string
}

export function ScrapedData({ data }: ScrapedDataProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  let parsed: any
  try {
    parsed = JSON.parse(data)
  } catch {
    return (
      <div className="text-sm text-muted-foreground">
        <p>Unable to parse as JSON</p>
      </div>
    )
  }

  const renderValue = (value: any, key: string, level = 0): React.ReactNode => {
    const isObject = typeof value === "object" && value !== null
    const isArray = Array.isArray(value)
    const id = `${level}-${key}`
    const isOpen = expanded[id]

    if (!isObject) {
      return (
        <div className="flex items-center gap-2 py-1 px-2 hover:bg-muted rounded">
          <span className="text-primary">{key}:</span>
          <span
            className={`${
              typeof value === "string"
                ? "text-green-500"
                : typeof value === "number"
                  ? "text-yellow-500"
                  : "text-blue-500"
            }`}
          >
            {JSON.stringify(value)}
          </span>
        </div>
      )
    }

    return (
      <div key={id} className="ml-4">
        <button
          onClick={() => setExpanded((prev) => ({ ...prev, [id]: !isOpen }))}
          className="flex items-center gap-1 py-1 px-2 hover:bg-muted rounded w-full text-left text-foreground"
        >
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <span className="text-primary">{key}</span>
          <span className="text-muted-foreground text-xs">
            ({isArray ? value.length + " items" : Object.keys(value).length + " keys"})
          </span>
        </button>

        {isOpen && (
          <div className="border-l border-border">
            {isArray
              ? value.map((item: any, idx: number) => renderValue(item, `[${idx}]`, level + 1))
              : Object.entries(value).map(([k, v]: [string, any]) => renderValue(v, k, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-muted border border-border rounded-lg p-3 font-mono text-sm space-y-1">
      {Object.entries(parsed).map(([key, value]) => renderValue(value, key, 0))}
    </div>
  )
}
