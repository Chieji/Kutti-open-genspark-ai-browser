import { create } from "zustand"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  model: string
  provider: string
}

export interface ChatState {
  sessions: ChatSession[]
  currentSession: ChatSession | null
  createSession: (provider: string, model: string) => void
  addMessage: (message: Message) => void
  updateMessage: (id: string, content: string) => void
  switchSession: (id: string) => void
  deleteSession: (id: string) => void
}

export const useChatStore = create<ChatState>((set) => ({
  sessions: [],
  currentSession: null,
  createSession: (provider, model) =>
    set((state) => {
      const session: ChatSession = {
        id: `session-${Date.now()}`,
        title: `Chat with ${model}`,
        messages: [],
        createdAt: new Date(),
        model,
        provider,
      }
      return {
        sessions: [...state.sessions, session],
        currentSession: session,
      }
    }),
  addMessage: (message) =>
    set((state) => {
      if (!state.currentSession) return state
      return {
        currentSession: {
          ...state.currentSession,
          messages: [...state.currentSession.messages, message],
        },
        sessions: state.sessions.map((s) =>
          s.id === state.currentSession?.id ? { ...s, messages: [...s.messages, message] } : s,
        ),
      }
    }),
  updateMessage: (id, content) =>
    set((state) => {
      if (!state.currentSession) return state
      return {
        currentSession: {
          ...state.currentSession,
          messages: state.currentSession.messages.map((m) => (m.id === id ? { ...m, content } : m)),
        },
      }
    }),
  switchSession: (id) =>
    set((state) => ({
      currentSession: state.sessions.find((s) => s.id === id) || state.currentSession,
    })),
  deleteSession: (id) =>
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== id),
      currentSession: state.currentSession?.id === id ? null : state.currentSession,
    })),
}))
