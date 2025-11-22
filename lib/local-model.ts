// Stub for local model - replaced with Hugging Face free tier
// This prevents build errors while maintaining the interface

export interface LocalModelConfig {
  onProgress?: (progress: string) => void
}

export async function initLocalModel(config?: LocalModelConfig): Promise<void> {
  // Stub - actual free model runs via /api/chat/free endpoint
  console.log("Local model stub initialized - using HuggingFace free tier instead")
  if (config?.onProgress) {
    config.onProgress("Connecting to free model...")
  }
}

export async function generateLocalResponse(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  onUpdate?: (text: string) => void
): Promise<string> {
  // This function is replaced by the /api/chat/free endpoint
  // Keeping stub to prevent build errors
  const response = "Please use the Cloud/Free toggle to access the free model."
  if (onUpdate) {
    onUpdate(response)
  }
  return response
}
