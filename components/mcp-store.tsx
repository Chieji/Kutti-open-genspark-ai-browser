import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Download, Star } from "lucide-react"
import { Input } from "@/components/ui/input"

export function MCPStore() {
  const tools = [
    { name: "Google Search", description: "Search the web with Google", downloads: "10k+", rating: 4.8 },
    { name: "GitHub", description: "Interact with repositories and issues", downloads: "8k+", rating: 4.9 },
    { name: "Slack", description: "Send messages and manage channels", downloads: "5k+", rating: 4.6 },
    { name: "Notion", description: "Access and update Notion pages", downloads: "4k+", rating: 4.7 },
    { name: "Gmail", description: "Read and send emails", downloads: "3k+", rating: 4.5 },
    { name: "Linear", description: "Manage issues and projects", downloads: "2k+", rating: 4.8 },
  ]

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">MCP Store</h2>
          <p className="text-muted-foreground">Discover and install tools for your AI agent.</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tools..." className="pl-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Card key={tool.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{tool.name}</CardTitle>
                <Badge variant="secondary" className="flex gap-1">
                  <Star className="w-3 h-3 fill-current" /> {tool.rating}
                </Badge>
              </div>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">{tool.downloads} downloads</span>
                <Button size="sm" variant="outline" className="gap-2">
                  <Download className="w-4 h-4" /> Install
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
