"use client"

import { Sparkles } from "lucide-react"

export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
          <div className="relative h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.5)] animate-bounce">
            <Sparkles className="h-8 w-8 text-black" />
          </div>
        </div>
        <div className="text-white/60 text-sm animate-pulse">Loading Genspark AI...</div>
      </div>
    </div>
  )
}
