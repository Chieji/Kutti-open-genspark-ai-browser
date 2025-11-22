import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MessageSquare, LayoutGrid, Settings, Sparkles, HardDrive } from "lucide-react"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  className?: string
}

export function Sidebar({ activeTab, onTabChange, className }: SidebarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Sparkles },
    { id: "inbox", label: "AI Inbox", icon: MessageSquare },
    { id: "hub", label: "Hub", icon: LayoutGrid },
    { id: "drive", label: "AI Drive", icon: HardDrive },
  ]

  return (
    <div className={cn("w-16 flex flex-col h-full bg-black border-r border-white/10 items-center py-4 gap-4", className)}>
      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black mb-4 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
        <Sparkles className="w-6 h-6" />
      </div>

      <div className="flex-1 flex flex-col gap-2 w-full px-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="icon"
            className={cn(
              "w-full h-12 rounded-xl transition-all duration-200",
              activeTab === item.id 
                ? "bg-white/10 text-white shadow-inner" 
                : "text-muted-foreground hover:text-white hover:bg-white/5"
            )}
            onClick={() => onTabChange(item.id)}
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
          </Button>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-2 w-full px-2">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "w-full h-12 rounded-xl text-muted-foreground hover:text-white hover:bg-white/5",
            activeTab === "settings" && "bg-white/10 text-white"
          )}
          onClick={() => onTabChange("settings")}
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
