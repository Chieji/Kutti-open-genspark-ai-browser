import { NextRequest, NextResponse } from "next/server"

// Hugging Face Inference API - Using Microsoft Phi-3 (very fast, high quality, reliable free tier)
const HF_API_URL = "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct"

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

    // Format messages for Phi-3 chat format
    const prompt = formatMessagesForPhi3(messages)

    console.log("Calling HF API with prompt length:", prompt.length)

    // Call Hugging Face Inference API
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // We use a public token if available, or rely on the free tier rate limits
        ...(process.env.HUGGINGFACE_API_KEY ? { "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}` } : {})
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
      const errorText = await response.text()
      console.error("HF API Error:", response.status, errorText)
      
      if (response.status === 503) {
        return new NextResponse(
          "Model is warming up... Please try again in 10 seconds! 🚀",
          { status: 503 }
        )
      }
      throw new Error(`HF API error: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    console.log("HF API Response:", data)
    
    let generatedText = ""
    if (Array.isArray(data) && data.length > 0) {
      generatedText = data[0]?.generated_text || ""
    } else if (typeof data === 'object' && data.generated_text) {
      generatedText = data.generated_text
    }

    if (!generatedText) {
      generatedText = "I'm sorry, I couldn't generate a response at this moment. Please try again."
    }

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

// Format messages for Phi-3 chat format
// <|user|>\nQuestion <|end|>\n<|assistant|>
function formatMessagesForPhi3(messages: Message[]): string {
  let prompt = ""
  
  messages.forEach((msg) => {
    if (msg.role === "system") {
      prompt += `<|system|>\n${msg.content}<|end|>\n`
    } else if (msg.role === "user") {
      prompt += `<|user|>\n${msg.content}<|end|>\n`
    } else if (msg.role === "assistant") {
      prompt += `<|assistant|>\n${msg.content}<|end|>\n`
    }
  })
  
  prompt += "<|assistant|>\n"
  return prompt
}
