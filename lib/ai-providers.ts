export interface AIProvider {
  name: string
  id: string
  type: "api" | "local" | "self-hosted"
  config: {
    apiKey?: string
    baseUrl?: string
    models: string[]
  }
  isConfigured: boolean
}

export interface AIModel {
  id: string
  name: string
  provider: string
  contextWindow: number
  costPer1kTokens: { input: number; output: number }
  capabilities: string[]
}

// Supported providers with their models
export const PROVIDERS: Record<string, AIProvider> = {
  anthropic: {
    name: "Anthropic Claude",
    id: "anthropic",
    type: "api",
    config: {
      apiKey: process.env.ANTHROPIC_API_KEY,
      models: ["claude-3-5-sonnet-20241022", "claude-3-opus-20240229", "claude-3-haiku-20240307"],
    },
    isConfigured: !!process.env.ANTHROPIC_API_KEY,
  },
  google: {
    name: "Google Gemini",
    id: "google",
    type: "api",
    config: {
      apiKey: process.env.GOOGLE_API_KEY,
      models: ["gemini-2.0-flash", "gemini-1.5-pro", "gemini-1.5-flash"],
    },
    isConfigured: !!process.env.GOOGLE_API_KEY,
  },
  cohere: {
    name: "Cohere",
    id: "cohere",
    type: "api",
    config: {
      apiKey: process.env.COHERE_API_KEY,
      models: ["command-r-plus", "command-r", "command-light"],
    },
    isConfigured: !!process.env.COHERE_API_KEY,
  },
  mistral: {
    name: "Mistral AI",
    id: "mistral",
    type: "api",
    config: {
      apiKey: process.env.MISTRAL_API_KEY,
      models: ["mistral-large-latest", "mistral-medium-latest", "ministral-3b-latest"],
    },
    isConfigured: !!process.env.MISTRAL_API_KEY,
  },
  ollama: {
    name: "Ollama (Local)",
    id: "ollama",
    type: "local",
    config: {
      baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
      models: ["llama2", "mistral", "neural-chat"],
    },
    isConfigured: true,
  },
  litellm: {
    name: "LiteLLM Proxy",
    id: "litellm",
    type: "self-hosted",
    config: {
      baseUrl: process.env.LITELLM_BASE_URL || "http://localhost:4000",
      apiKey: process.env.LITELLM_API_KEY,
      models: [],
    },
    isConfigured: !!process.env.LITELLM_BASE_URL,
  },
}

export const MODELS: AIModel[] = [
  // Anthropic
  {
    id: "claude-3-5-sonnet-20241022",
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
    contextWindow: 200000,
    costPer1kTokens: { input: 0.003, output: 0.015 },
    capabilities: ["text", "vision", "analysis", "coding"],
  },
  // Google Gemini
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    provider: "google",
    contextWindow: 1000000,
    costPer1kTokens: { input: 0.0375, output: 0.15 },
    capabilities: ["text", "vision", "audio", "reasoning"],
  },
  // Mistral
  {
    id: "mistral-large-latest",
    name: "Mistral Large",
    provider: "mistral",
    contextWindow: 32000,
    costPer1kTokens: { input: 0.007, output: 0.021 },
    capabilities: ["text", "function-calling", "analysis"],
  },
  // Add more models...
]

export async function getAvailableProviders(): Promise<AIProvider[]> {
  return Object.values(PROVIDERS).filter((p) => p.isConfigured)
}

export async function listModelsForProvider(providerId: string): Promise<AIModel[]> {
  return MODELS.filter((m) => m.provider === providerId)
}
