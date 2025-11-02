import { streamText } from "ai"
import { type NextRequest, NextResponse } from "next/server"
import { PROVIDERS } from "@/lib/ai-providers"

interface ChatRequest {
  messages: Array<{ role: string; content: string }>
  model: string
  provider: string
  temperature?: number
  maxTokens?: number
}

// Dynamic model selection based on provider
async function getModelForProvider(provider: string, modelId: string) {
  if (provider === "anthropic") {
    const Anthropic = (await import("@anthropic-ai/sdk")).default
    return new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    }).messages
  } else if (provider === "google") {
    // Google uses different SDK
    const { GoogleGenerativeAI } = await import("@google/generative-ai")
    const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
    return client.getGenerativeModel({ model: modelId })
  }
  // Additional providers handled here
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    const { messages, model, provider, temperature = 0.7, maxTokens = 2048 } = body

    // Validate provider is configured
    const selectedProvider = PROVIDERS[provider]
    if (!selectedProvider?.isConfigured) {
      return NextResponse.json({ error: `Provider ${provider} not configured` }, { status: 400 })
    }

    // Use AI SDK to stream response
    const result = await streamText({
      model: `${provider}/${model}`,
      messages: messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      temperature,
      maxTokens,
      system:
        "You are an intelligent AI assistant powering a web browser. Help users navigate, analyze, and understand web content. Provide clear, concise responses.",
    })

    // Return streaming response
    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[AI Stream Error]", error)
    return NextResponse.json({ error: "Failed to stream response" }, { status: 500 })
  }
}
