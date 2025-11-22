"use client"

import * as React from "react"
import { Plus, Sparkles, MessageSquare, Globe, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuickActionsProps {
  onNavigate: (tab: string) => void
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const quickActions = [
    { id: "chat", label: "New Chat", icon: MessageSquare, color: "from-blue-500 to-purple-500" },
    { id: "browser", label: "Browse", icon: Globe, color: "from-green-500 to-emerald-500" },
    { id: "autopilot", label: "Autopilot", icon: Sparkles, color: "from-purple-500 to-pink-500" },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick Action Buttons */}
      <div className={cn(
        "flex flex-col gap-3 mb-4 transition-all duration-300",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        {quickActions.map((action, index) => (
          <button
            key={action.id}
            onClick={() => {
              onNavigate(action.id)
              setIsOpen(false)
            }}
            className={cn(
              "group flex items-center gap-3 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105",
              "bg-gradient-to-r", action.color,
              "animate-in slide-in-from-bottom-4"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <action.icon className="h-5 w-5 text-white" />
            <span className="text-white font-medium text-sm">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-full shadow-2xl transition-all duration-300",
          "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500",
          "hover:scale-110 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]",
          "flex items-center justify-center",
          isOpen && "rotate-45"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Plus className="h-6 w-6 text-white" />
        )}
      </button>
    </div>
  )
}
