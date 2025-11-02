import { getAvailableProviders } from "@/lib/ai-providers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const providers = await getAvailableProviders()
    return NextResponse.json(providers)
  } catch (error) {
    console.error("[Providers List Error]", error)
    return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 })
  }
}
