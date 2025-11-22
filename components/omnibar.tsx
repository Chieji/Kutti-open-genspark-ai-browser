"use client"

import { useState } from "react"
import { Search, Mic, Paperclip, ArrowRight, Sparkles, Globe, FileText, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface OmnibarProps {
  onSearch: (query: string) => void
}

export function Omnibar({ onSearch }: OmnibarProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto relative z-20">
      <div 
        className={cn(
          "relative group transition-all duration-300 ease-out",
          isFocused ? "scale-[1.02]" : "scale-100"
        )}
      >
        {/* Glow Effect */}
        <div className={cn(
          "absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur-xl transition-opacity duration-500",
          isFocused ? "opacity-40" : "opacity-0 group-hover:opacity-20"
        )} />

        <div className="relative bg-[#18181b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Input Area */}
          <div className="flex items-center px-4 py-3 gap-3">
            <div className="p-2 bg-white/5 rounded-xl text-muted-foreground">
              <Search className="w-5 h-5" />
            </div>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Ask anything, create anything..."
              className="flex-1 bg-transparent border-0 text-lg placeholder:text-muted-foreground/50 focus-visible:ring-0 h-auto py-2"
            />
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl">
                <Mic className="w-5 h-5" />
              </Button>
              <Button 
                onClick={handleSearch}
                size="icon" 
                className={cn(
                  "ml-2 rounded-xl transition-all duration-300",
                  query.trim() ? "bg-white text-black hover:bg-white/90" : "bg-white/10 text-muted-foreground hover:bg-white/20"
                )}
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Actions / Context Bar */}
          <div className="px-4 py-2 bg-black/20 border-t border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white rounded-lg border border-white/5">
              <Sparkles className="w-3 h-3 text-blue-400" />
              Research Me
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white rounded-lg border border-white/5">
              <Globe className="w-3 h-3 text-green-400" />
              Search Web
            </Button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium px-1">Context</span>
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5 hover:bg-white/5 text-muted-foreground hover:text-white rounded-lg">
              <FileText className="w-3 h-3" />
              Check my latest gmail
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5 hover:bg-white/5 text-muted-foreground hover:text-white rounded-lg">
              <ImageIcon className="w-3 h-3" />
              Search notion
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
