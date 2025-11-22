"use client"

import * as React from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  MessageSquare,
  Globe,
  Settings,
  Sparkles,
  HardDrive,
  LayoutGrid,
  Box,
  FileText,
  Database,
  Code,
  Image as ImageIcon,
} from "lucide-react"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNavigate: (tab: string) => void
}

export function CommandPalette({ open, onOpenChange, onNavigate }: CommandPaletteProps) {
  const handleSelect = (id: string) => {
    onNavigate(id)
    onOpenChange(false)
  }

  const tools = [
    { id: "home", label: "Home", icon: Sparkles, shortcut: "⌘H" },
    { id: "chat", label: "AI Chat", icon: MessageSquare, shortcut: "⌘C" },
    { id: "browser", label: "Browser", icon: Globe, shortcut: "⌘B" },
    { id: "autopilot", label: "Custom Super Agent", icon: Sparkles, shortcut: "⌘A" },
    { id: "mcp", label: "All Agents", icon: Box, shortcut: "⌘M" },
    { id: "drive", label: "AI Drive", icon: HardDrive, shortcut: "⌘D" },
    { id: "slides", label: "AI Slides", icon: LayoutGrid },
    { id: "sheets", label: "AI Sheets", icon: Database },
    { id: "docs", label: "AI Docs", icon: FileText },
    { id: "dev", label: "AI Developer", icon: Code },
    { id: "design", label: "AI Designer", icon: ImageIcon },
  ]

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search tools and commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Tools">
          {tools.map((tool) => (
            <CommandItem
              key={tool.id}
              onSelect={() => handleSelect(tool.id)}
              className="gap-2"
            >
              <tool.icon className="h-4 w-4" />
              <span>{tool.label}</span>
              {tool.shortcut && (
                <span className="ml-auto text-xs text-muted-foreground">
                  {tool.shortcut}
                </span>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => handleSelect("settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
