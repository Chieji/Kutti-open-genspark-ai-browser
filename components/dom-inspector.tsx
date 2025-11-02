"use client"

import { ChevronDown, ChevronRight, Copy } from "lucide-react"
import { useState } from "react"

interface DOMNode {
  tag: string
  attributes: Record<string, string>
  text?: string
  children?: DOMNode[]
}

const sampleDOM: DOMNode = {
  tag: "html",
  attributes: {},
  children: [
    {
      tag: "head",
      attributes: {},
      children: [{ tag: "title", attributes: {}, text: "Example Page" }],
    },
    {
      tag: "body",
      attributes: { class: "dark" },
      children: [
        {
          tag: "header",
          attributes: { class: "header" },
          text: "Welcome to Example",
        },
        {
          tag: "main",
          attributes: { class: "content" },
          children: [
            { tag: "h1", attributes: {}, text: "Hello World" },
            { tag: "p", attributes: { class: "description" }, text: "This is a sample DOM tree" },
          ],
        },
      ],
    },
  ],
}

interface NodeProps {
  node: DOMNode
  level: number
}

function DOMTreeNode({ node, level }: NodeProps) {
  const [expanded, setExpanded] = useState(level < 2)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="font-mono text-xs">
      <div className="flex items-start gap-1 py-1 px-2 hover:bg-muted rounded cursor-default">
        {hasChildren ? (
          <button onClick={() => setExpanded(!expanded)} className="p-0 hover:bg-border rounded transition-colors">
            {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        ) : (
          <div className="w-3" />
        )}

        <span className="text-primary">&lt;{node.tag}</span>
        {Object.entries(node.attributes).map(([key, val]) => (
          <span key={key} className="text-muted-foreground">
            {" "}
            {key}
            <span className="text-accent">=</span>
            <span className="text-green-500">"{val}"</span>
          </span>
        ))}
        <span className="text-primary">&gt;</span>

        {node.text && !hasChildren && <span className="text-muted-foreground ml-2">{node.text}</span>}
      </div>

      {expanded && hasChildren && (
        <div className="ml-4 border-l border-border">
          {node.children!.map((child, idx) => (
            <DOMTreeNode key={idx} node={child} level={level + 1} />
          ))}
        </div>
      )}

      {expanded && hasChildren && (
        <div className="flex items-center gap-1 py-1 px-2 text-muted-foreground">
          <div className="w-3" />
          <span>&lt;/{node.tag}&gt;</span>
        </div>
      )}
    </div>
  )
}

export function DOMInspector() {
  return (
    <div className="h-full flex flex-col bg-background rounded-lg border border-border overflow-hidden">
      <div className="bg-muted border-b border-border px-4 py-3 flex items-center justify-between">
        <h3 className="font-semibold text-sm">DOM Tree</h3>
        <button className="p-1 hover:bg-background rounded transition-colors" title="Copy DOM">
          <Copy className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-2">
        <DOMTreeNode node={sampleDOM} level={0} />
      </div>
    </div>
  )
}
