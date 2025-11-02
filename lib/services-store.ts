import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface ServiceConfig {
  id: string
  provider: string
  apiKey: string
  baseUrl?: string
  isActive: boolean
  createdAt: Date
}

export interface ServiceState {
  services: ServiceConfig[]
  activeService: ServiceConfig | null
  addService: (service: Omit<ServiceConfig, "id" | "createdAt">) => void
  updateService: (id: string, updates: Partial<ServiceConfig>) => void
  deleteService: (id: string) => void
  setActiveService: (id: string) => void
}

export const useServicesStore = create<ServiceState>()(
  persist(
    (set, get) => ({
      services: [],
      activeService: null,
      addService: (service) =>
        set((state) => {
          const newService: ServiceConfig = {
            ...service,
            id: `service-${Date.now()}`,
            createdAt: new Date(),
          }
          return {
            services: [...state.services, newService],
            activeService: state.activeService || newService,
          }
        }),
      updateService: (id, updates) =>
        set((state) => ({
          services: state.services.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        })),
      deleteService: (id) =>
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
          activeService: state.activeService?.id === id ? null : state.activeService,
        })),
      setActiveService: (id) =>
        set((state) => ({
          activeService: state.services.find((s) => s.id === id) || null,
        })),
    }),
    {
      name: "genspark-services",
      storage: typeof window !== "undefined" ? localStorage : undefined,
    },
  ),
)
