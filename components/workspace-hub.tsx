"use client"

import { useState } from "react"
import { Omnibar } from "@/components/omnibar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  LayoutGrid, FileText, Image as ImageIcon, Video, Music, 
  Code, Database, MessageSquare, Sparkles, Box, HardDrive, Search 
} from "lucide-react"
import { cn } from "@/lib/utils"

interface WorkspaceHubProps {
  onNavigate: (tab: string) => void
}

export function WorkspaceHub({ onNavigate }: WorkspaceHubProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const tools = [
    { id: "autopilot", label: "Custom Super Agent", icon: Sparkles, color: "text-purple-400", badge: "New" },
    { id: "slides", label: "AI Slides", icon: LayoutGrid, color: "text-orange-400" },
    { id: "sheets", label: "AI Sheets", icon: Database, color: "text-green-400" },
    { id: "docs", label: "AI Docs", icon: FileText, color: "text-blue-400" },
    { id: "dev", label: "AI Developer", icon: Code, color: "text-cyan-400" },
    { id: "design", label: "AI Designer", icon: ImageIcon, color: "text-pink-400" },
    { id: "chat", label: "AI Chat", icon: MessageSquare, color: "text-white" },
    { id: "drive", label: "AI Drive", icon: HardDrive, color: "text-yellow-400", badge: "Box" },
    { id: "video", label: "AI Video", icon: Video, color: "text-red-400" },
    { id: "mcp", label: "All Agents", icon: Box, color: "text-white" },
  ]

  const filteredTools = tools.filter(tool => 
    tool.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex-1 h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-white animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Genspark AI Workspace
            <span className="inline-block ml-2 w-2 h-2 bg-white rounded-full animate-pulse" />
          </h1>
          <p className="text-muted-foreground text-lg animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            Your all-in-one AGI workspace
          </p>
        </div>

        {/* Omnibar */}
        <Omnibar onSearch={(q) => console.log(q)} />

        {/* Search Tools */}
        <div className="relative max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tools..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 h-12"
          />
        </div>

        {/* Tools Grid */}
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          {filteredTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onNavigate(tool.id)}
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-white/5 transition-all duration-200 w-28"
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl bg-[#18181b] border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-white/20 transition-all duration-300 relative",
                tool.color
              )}>
                <tool.icon className="w-7 h-7" />
                {tool.badge && (
                  <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full shadow-sm">
                    {tool.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-white transition-colors">
                {tool.label}
              </span>
            </button>
          ))}
        </div>

        {/* Footer / For You */}
        <div className="pt-12 flex flex-col items-center gap-4">
          <div className="px-4 py-1 bg-white/5 rounded-full border border-white/5 text-xs font-medium text-muted-foreground">
            For You
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full opacity-50 hover:opacity-100 transition-opacity duration-500">
             {/* Placeholders for "For You" cards */}
             {[1, 2, 3].map((i) => (
               <div key={i} className="h-32 rounded-xl bg-[#18181b] border border-white/5 p-4 flex items-end">
                 <div className="w-full space-y-2">
                   <div className="w-8 h-8 rounded-lg bg-white/5" />
                   <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  )
}
