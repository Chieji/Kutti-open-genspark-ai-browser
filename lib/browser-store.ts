import { create } from "zustand"

export interface BrowserTab {
  id: string
  url: string
  title: string
  favicon?: string
  isLoading: boolean
  error?: string
}

export interface ScrapedData {
  id: string
  url: string
  timestamp: Date
  type: "text" | "links" | "images" | "structured"
  data: Record<string, any>
}

export interface BrowserState {
  tabs: BrowserTab[]
  activeTabId: string | null
  scrapedData: ScrapedData[]
  addTab: (url: string) => void
  closeTab: (id: string) => void
  switchTab: (id: string) => void
  updateTab: (id: string, updates: Partial<BrowserTab>) => void
  addScrapedData: (data: ScrapedData) => void
}

export const useBrowserStore = create<BrowserState>((set) => ({
  tabs: [],
  activeTabId: null,
  scrapedData: [],
  addTab: (url) =>
    set((state) => {
      const tab: BrowserTab = {
        id: `tab-${Date.now()}`,
        url,
        title: new URL(url).hostname,
        isLoading: true,
      }
      return {
        tabs: [...state.tabs, tab],
        activeTabId: tab.id,
      }
    }),
  closeTab: (id) =>
    set((state) => ({
      tabs: state.tabs.filter((t) => t.id !== id),
      activeTabId: state.activeTabId === id ? state.tabs[0]?.id || null : state.activeTabId,
    })),
  switchTab: (id) =>
    set((state) => ({
      activeTabId: state.tabs.find((t) => t.id === id) ? id : state.activeTabId,
    })),
  updateTab: (id, updates) =>
    set((state) => ({
      tabs: state.tabs.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  addScrapedData: (data) =>
    set((state) => ({
      scrapedData: [data, ...state.scrapedData],
    })),
}))
