import { CreateMLCEngine, MLCEngine } from "@mlc-ai/web-llm";

// Use a small, fast model for local inference
const SELECTED_MODEL = "Llama-3-8B-Instruct-q4f32_1-MLC";

let engine: MLCEngine | null = null;

export interface LocalModelConfig {
  onProgress?: (progress: string) => void;
}

export async function initLocalModel(config?: LocalModelConfig) {
  if (engine) return engine;

  try {
    engine = await CreateMLCEngine(SELECTED_MODEL, {
      initProgressCallback: (report) => {
        if (config?.onProgress) {
          config.onProgress(report.text);
        }
        console.log("[Local Model]", report.text);
      },
    });
    return engine;
  } catch (error) {
    console.error("Failed to initialize local model:", error);
    throw error;
  }
}

export async function generateLocalResponse(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  onUpdate?: (text: string) => void
) {
  if (!engine) {
    throw new Error("Model not initialized. Call initLocalModel first.");
  }

  const chunks = await engine.chat.completions.create({
    messages,
    stream: true,
  });

  let fullResponse = "";
  for await (const chunk of chunks) {
    const content = chunk.choices[0]?.delta?.content || "";
    fullResponse += content;
    if (onUpdate) {
      onUpdate(fullResponse);
    }
  }

  return fullResponse;
}
