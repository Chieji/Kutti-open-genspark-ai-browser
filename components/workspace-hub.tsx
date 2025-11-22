"use client"

import { useState } from "react"
import { Omnibar } from "@/components/omnibar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  LayoutGrid, FileText, Image as ImageIcon, Video, Music, 
  Code, Database, MessageSquare, Sparkles, Box, HardDrive, Search, Zap, Star 
} from "lucide-react"
import { cn } from "@/lib/utils"

interface WorkspaceHubProps {
  onNavigate: (tab: string) => void
}

export function WorkspaceHub({ onNavigate }: WorkspaceHubProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const tools = [
    { id: "autopilot", label: "Custom Super Agent", icon: Sparkles, gradient: "from-purple-500 to-pink-500", badge: "New" },
    { id: "slides", label: "AI Slides", icon: LayoutGrid, gradient: "from-orange-500 to-red-500" },
    { id: "sheets", label: "AI Sheets", icon: Database, gradient: "from-green-500 to-emerald-500" },
    { id: "docs", label: "AI Docs", icon: FileText, gradient: "from-blue-500 to-cyan-500" },
    { id: "dev", label: "AI Developer", icon: Code, gradient: "from-cyan-500 to-blue-500" },
    { id: "design", label: "AI Designer", icon: ImageIcon, gradient: "from-pink-500 to-rose-500" },
    { id: "chat", label: "AI Chat", icon: MessageSquare, gradient: "from-indigo-500 to-purple-500" },
    { id: "drive", label: "AI Drive", icon: HardDrive, gradient: "from-yellow-500 to-orange-500", badge: "Box" },
    { id: "video", label: "AI Video", icon: Video, gradient: "from-red-500 to-pink-500" },
    { id: "mcp", label: "All Agents", icon: Box, gradient: "from-violet-500 to-purple-500" },
  ]

  const filteredTools = tools.filter(tool => 
    tool.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex-1 h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Multiple Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-5xl space-y-12 relative z-10">
        {/* Premium Header */}
        <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-6xl font-bold tracking-tight">
            <span className="gradient-text glow-text">Genspark AI Workspace</span>
            <span className="inline-block ml-3 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
          </h1>
          <p className="text-muted-foreground text-xl font-light animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            Your AGI-powered workspace for <span className="text-white font-medium">everything</span>
          </p>
        </div>

        {/* Premium Omnibar with glow */}
        <div className="animate-in fade-in zoom-in-95 duration-1000 delay-200">
          <Omnibar onSearch={(q) => console.log(q)} />
        </div>

        {/* Enhanced Search */}
        <div className="relative max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative glass rounded-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search your tools..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-transparent border-0 h-14 text-base focus-visible:ring-2 focus-visible:ring-purple-500/50"
            />
          </div>
        </div>

        {/* Premium Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
          {filteredTools.map((tool, index) => (
            <button
              key={tool.id}
              onClick={() => onNavigate(tool.id)}
              className="group relative flex flex-col items-center gap-4 p-6 rounded-3xl glass hover-lift hover-glow spotlight transition-all duration-300 animate-in zoom-in-95"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Gradient background on hover */}
              <div className={cn(
                "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                tool.gradient,
                "blur-xl"
              )} />
              
              {/* Icon container with gradient border */}
              <div className="relative">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300 bg-gradient-to-br",
                  tool.gradient
                )}>
                  <tool.icon className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
                {tool.badge && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full shadow-lg pulse-glow">
                    {tool.badge}
                  </span>
                )}
              </div>
              
              {/* Label */}
              <span className="relative text-sm font-medium text-muted-foreground group-hover:text-white transition-colors z-10">
                {tool.label}
              </span>
            </button>
          ))}
        </div>

        {/* Premium "For You" Section */}
        <div className="pt-16 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium gradient-text">Recommended For You</span>
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              { title: "Quick Chat", icon: MessageSquare, gradient: "from-blue-500 to-purple-500" },
              { title: "Research Agent", icon: Sparkles, gradient: "from-purple-500 to-pink-500" },
              { title: "Code Generator", icon: Zap, gradient: "from-green-500 to-cyan-500" }
            ].map((item, i) => (
              <button
                key={i}
                className="group relative h-40 rounded-2xl glass hover-lift spotlight overflow-hidden transition-all duration-300"
              >
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br",
                  item.gradient
                )} />
                <div className="relative h-full p-6 flex flex-col justify-between">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shimmer",
                    item.gradient
                  )}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">Start a new session</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
