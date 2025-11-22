"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { MessageSquare, LayoutGrid, Settings, Sparkles, HardDrive, Home } from "lucide-react"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  className?: string
}

export function Sidebar({ activeTab, onTabChange, className }: SidebarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home, gradient: "from-purple-500 to-pink-500" },
    { id: "chat", label: "AI Chat", icon: MessageSquare, gradient: "from-blue-500 to-cyan-500" },
    { id: "browser", label: "Browser", icon: LayoutGrid, gradient: "from-green-500 to-emerald-500" },
    { id: "drive", label: "AI Drive", icon: HardDrive, gradient: "from-yellow-500 to-orange-500" },
  ]

  return (
    <div className={cn("w-16 flex flex-col h-full bg-black border-r border-white/10 items-center py-4 gap-4", className)}>
      {/* Logo with animated gradient */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-md opacity-75 pulse-glow" />
        <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-2xl cursor-pointer hover:scale-110 transition-transform duration-300">
          <Sparkles className="w-6 h-6" />
        </div>
      </div>

      <TooltipProvider>
        {/* Main Navigation */}
        <div className="flex-1 flex flex-col gap-3 w-full px-2">
          {navItems.map((item) => (
            <Tooltip key={item.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "relative w-full h-12 rounded-xl transition-all duration-300 group",
                    activeTab === item.id 
                      ? "text-white" 
                      : "text-muted-foreground hover:text-white"
                  )}
                  onClick={() => onTabChange(item.id)}
                >
                  {/* Gradient background for active */}
                  {activeTab === item.id && (
                    <>
                      <div className={cn(
                        "absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br",
                        item.gradient
                      )} />
                      <div className={cn(
                        "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300 bg-gradient-to-br",
                        item.gradient
                      )} />
                    </>
                  )}
                  
                  {/* Icon */}
                  <item.icon className={cn(
                    "relative w-5 h-5 transition-transform duration-300",
                    activeTab === item.id && "scale-110"
                  )} />
                  
                  {/* Active indicator */}
                  {activeTab === item.id && (
                    <div className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b",
                      item.gradient
                    )} />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-black/90 border-white/10">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Settings at bottom */}
        <div className="w-full px-2">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-full h-12 rounded-xl transition-all duration-300",
                  activeTab === "settings" 
                    ? "bg-white/10 text-white" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
                onClick={() => onTabChange("settings")}
              >
                <Settings className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-black/90 border-white/10">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  )
}
