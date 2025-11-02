export interface HubModel {
  id: string
  name: string
  description: string
  source: "huggingface" | "ollama" | "github" | "litellm"
  size: string
  downloads: number
  rating: number
  tags: string[]
  url: string
  installCommand?: string
}

export const HUB_MODELS: HubModel[] = [
  // HuggingFace Models
  {
    id: "llama2-7b",
    name: "Llama 2 (7B)",
    description: "Meta's Llama 2 model - open source and fine-tuned",
    source: "huggingface",
    size: "13GB",
    downloads: 250000,
    rating: 4.8,
    tags: ["llm", "generative", "text"],
    url: "https://huggingface.co/meta-llama/Llama-2-7b",
    installCommand: "ollama pull llama2:7b",
  },
  {
    id: "mistral-7b",
    name: "Mistral 7B",
    description: "Fast and efficient open-source language model",
    source: "huggingface",
    size: "13GB",
    downloads: 180000,
    rating: 4.7,
    tags: ["llm", "fast", "efficient"],
    url: "https://huggingface.co/mistralai/Mistral-7B",
    installCommand: "ollama pull mistral:7b",
  },
  {
    id: "neural-chat-7b",
    name: "Neural Chat 7B",
    description: "Intel optimized chat model",
    source: "huggingface",
    size: "13GB",
    downloads: 95000,
    rating: 4.6,
    tags: ["chat", "conversational"],
    url: "https://huggingface.co/Intel/neural-chat-7b",
    installCommand: "ollama pull neural-chat:7b",
  },
  {
    id: "dolphin-mixtral",
    name: "Dolphin Mixtral 8x7B",
    description: "Fine-tuned Mixtral for conversation",
    source: "huggingface",
    size: "52GB",
    downloads: 120000,
    rating: 4.9,
    tags: ["moe", "chat", "advanced"],
    url: "https://huggingface.co/elyza/Mixtral-8x7b-Dolphin",
    installCommand: "ollama pull dolphin-mixtral",
  },
  // GitHub Models
  {
    id: "orca-2-13b",
    name: "Orca 2 (13B)",
    description: "Microsoft's instruction-following model",
    source: "github",
    size: "24GB",
    downloads: 110000,
    rating: 4.7,
    tags: ["instruction", "reasoning"],
    url: "https://github.com/microsoft/Orca",
    installCommand: "ollama pull orca:13b",
  },
  {
    id: "phi-2",
    name: "Phi-2",
    description: "Microsoft's efficient small language model",
    source: "github",
    size: "5GB",
    downloads: 200000,
    rating: 4.5,
    tags: ["small", "efficient", "lightweight"],
    url: "https://github.com/microsoft/phi-2",
    installCommand: "ollama pull phi:2",
  },
]

export const OLLAMA_REGISTRY_URL = "https://ollama.ai/library"
export const HUGGINGFACE_API = "https://huggingface.co/api"
export const GITHUB_RAW_URL = "https://raw.githubusercontent.com"
