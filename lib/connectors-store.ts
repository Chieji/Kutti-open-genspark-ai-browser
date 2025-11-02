import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Connector {
  id: string
  name: string
  description: string
  icon: string
  category: "apps" | "custom_api" | "custom_mcp"
  connected: boolean
  apiKey?: string
  config?: Record<string, any>
}

interface ConnectorsStore {
  connectors: Connector[]
  apiKeys: Record<string, string>
  addConnector: (connector: Connector) => void
  toggleConnector: (id: string) => void
  updateApiKey: (key: string, value: string) => void
  getConnector: (id: string) => Connector | undefined
}

const defaultConnectors: Connector[] = [
  {
    id: "gmail",
    name: "Gmail",
    description: "Draft replies, search your inbox, and summarize email threads instantly",
    icon: "📧",
    category: "apps",
    connected: false,
  },
  {
    id: "outlook-mail",
    name: "Outlook Mail",
    description: "Write, search, and manage your Outlook emails seamlessly",
    icon: "📬",
    category: "apps",
    connected: false,
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Understand your schedule, manage events, and optimize your time efficiently",
    icon: "📅",
    category: "apps",
    connected: false,
  },
  {
    id: "outlook-calendar",
    name: "Outlook Calendar",
    description: "Schedule, view, and manage your Outlook events just with a prompt",
    icon: "📆",
    category: "apps",
    connected: false,
  },
  {
    id: "github",
    name: "GitHub",
    description: "Manage repositories, track code changes, and collaborate on team projects",
    icon: "🐙",
    category: "apps",
    connected: false,
  },
  {
    id: "notion",
    name: "Notion",
    description: "Search workspace content, update notes, and automate workflows",
    icon: "📝",
    category: "apps",
    connected: false,
  },
]

export const useConnectorsStore = create<ConnectorsStore>()(
  persist(
    (set, get) => ({
      connectors: defaultConnectors,
      apiKeys: {},
      addConnector: (connector) =>
        set((state) => ({
          connectors: [...state.connectors.filter((c) => c.id !== connector.id), connector],
        })),
      toggleConnector: (id) =>
        set((state) => ({
          connectors: state.connectors.map((c) => (c.id === id ? { ...c, connected: !c.connected } : c)),
        })),
      updateApiKey: (key, value) =>
        set((state) => ({
          apiKeys: { ...state.apiKeys, [key]: value },
        })),
      getConnector: (id) => get().connectors.find((c) => c.id === id),
    }),
    {
      name: "connectors-store",
    },
  ),
)
