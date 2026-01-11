import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Camper, CamperFilters} from "@/types/camper";

/* ---------- STATE ---------- */
type State = {
  filters: CamperFilters;
  activeFilters: CamperFilters;

  camperList: Camper[];
  total: number;

  favorites: Camper[];
};

/* ---------- ACTIONS ---------- */
type Action = {
  setFilters: (params: Partial<CamperFilters>) => void;
  setActiveFilters: (params: CamperFilters) => void;

  resetCampersList: () => void;
  addMoreCampers: (items: Camper[], total?: number) => void;

  addFavorite: (camper: Camper) => void;
  removeFavorite: (camperId: string) => void;
  isFavorite: (camperId: string) => boolean;
  clearFavorites: () => void;
};

/* ---------- DEFAULT FILTERS ---------- */
export const DEFAULT_FILTERS: CamperFilters = {
  location: "",
  form: "",
  AC: false,
  transmission: '',
  kitchen: false,
  TV: false,
  bathroom: false,
  page: 1,
  limit: 4,
};

/* ---------- STORE ---------- */
export const useCampersStore = create<State & Action>()(
  persist(
    (set, get) => ({
      /* --- state --- */
      filters: DEFAULT_FILTERS,
      activeFilters: DEFAULT_FILTERS,

      camperList: [],
      total: 0,

      favorites: [],

      /* --- actions --- */
      setFilters: (params) =>
        set((state) => ({
          filters: { ...state.filters, ...params },
        })),

      setActiveFilters: (params) =>
        set(() => ({
          activeFilters: { ...params },
        })),
      
      resetCampersList: () =>
        set(() => ({
          camperList: [],
          total: 0,
        })),
      
      addMoreCampers: (items = [], total) =>
  set((state) => ({
    camperList: [
      ...state.camperList,
      ...items.filter((item) => !state.camperList.some((c) => c.id === item.id)),
    ],
    total: typeof total === "number" ? total : state.total,
  })),


      addFavorite: (camper) =>
        set((state) => ({
          favorites: state.favorites.some((c) => c.id === camper.id)
            ? state.favorites
            : [...state.favorites, camper],
        })),

      removeFavorite: (camperId) =>
        set((state) => ({
          favorites: state.favorites.filter((c) => c.id !== camperId),
        })),

      isFavorite: (camperId) =>
        get().favorites.some((c) => c.id === camperId),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "campers-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
