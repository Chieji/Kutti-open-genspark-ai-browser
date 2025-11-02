import { NextResponse } from "next/server"

interface SystemStatus {
  memory: NodeJS.MemoryUsage
  uptime: number
  platform: string
  nodeVersion: string
}

export async function GET() {
  try {
    const memUsage = process.memoryUsage()

    const status: SystemStatus = {
      memory: {
        rss: Math.round(memUsage.rss / 1024 / 1024),
        heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
        heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
        external: Math.round(memUsage.external / 1024 / 1024),
        arrayBuffers: Math.round((memUsage.arrayBuffers || 0) / 1024 / 1024),
      } as any,
      uptime: process.uptime(),
      platform: process.platform,
      nodeVersion: process.version,
    }

    return NextResponse.json({
      status: "running",
      timestamp: new Date().toISOString(),
      system: status,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to get status" }, { status: 500 })
  }
}
