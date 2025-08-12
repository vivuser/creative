import { create } from "zustand";

type Filters = {
  location: string;
  guests: number;
  priceRange: [number, number];
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  clearFilters: () => void;
};

export const useFilters = create<Filters>((set) => ({
  location: "",
  guests: 1,
  priceRange: [100, 1000],
  setFilter: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),
  clearFilters: () =>
    set(() => ({
      location: "",
      guests: 1,
      priceRange: [100, 1000],
    })),
}));
