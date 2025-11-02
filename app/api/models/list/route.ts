import { listModelsForProvider } from "@/lib/ai-providers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const provider = request.nextUrl.searchParams.get("provider")

    if (!provider) {
      return NextResponse.json({ error: "Provider parameter required" }, { status: 400 })
    }

    const models = await listModelsForProvider(provider)
    return NextResponse.json(models)
  } catch (error) {
    console.error("[Models List Error]", error)
    return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 })
  }
}
