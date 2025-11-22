import { NextRequest, NextResponse } from "next/server"

// Hugging Face Inference API - FREE tier, no API key needed for public models
const HF_API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      )
    }

    // Format messages for Llama 2 chat format
    const prompt = formatMessagesForLlama(messages)

    // Call Hugging Face Inference API (FREE - no key needed!)
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 512,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false,
        },
      }),
    })

    if (!response.ok) {
      // If model is loading, return a friendly message
      if (response.status === 503) {
        return new NextResponse(
          "Model is warming up... Please try again in a few seconds! 🚀",
          {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
            },
          }
        )
      }
      throw new Error(`HF API error: ${response.statusText}`)
    }

    const data = await response.json()
    const generatedText = data[0]?.generated_text || "Sorry, I couldn't generate a response."

    // Stream the response back
    return new NextResponse(generatedText, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    })
  } catch (error) {
    console.error("Free chat error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

// Format messages for Llama 2 chat format
function formatMessagesForLlama(messages: Message[]): string {
  let prompt = "<s>[INST] "
  
  messages.forEach((msg, idx) => {
    if (msg.role === "user") {
      prompt += msg.content
      if (idx < messages.length - 1) {
        prompt += " [/INST] "
      }
    } else if (msg.role === "assistant") {
      prompt += msg.content + " </s><s>[INST] "
    }
  })
  
  prompt += " [/INST]"
  return prompt
}
