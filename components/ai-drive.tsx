import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HardDrive, Upload, Folder, File, Plus } from "lucide-react"

export function AIDrive() {
  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Drive</h2>
          <p className="text-muted-foreground">Secure cloud storage powered by Box.com</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" /> Upload
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> New Folder
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {["Documents", "Images", "Projects", "AI Outputs"].map((folder) => (
          <Card key={folder} className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
              <Folder className="w-8 h-8 text-blue-400" />
              <div className="space-y-1">
                <CardTitle className="text-base">{folder}</CardTitle>
                <CardDescription>12 items</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Files</h3>
        <div className="border rounded-lg divide-y">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Project_Proposal_v{i}.pdf</p>
                  <p className="text-xs text-muted-foreground">Modified 2 hours ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">View</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
