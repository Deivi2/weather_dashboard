import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CitiesWeatherState = {
  favoriteCities: Array<string>;
  setFavoriteCity: (city: string) => void;
  deleteFavoriteCity: (city: string) => void;
};

export const useCitiesWeatherState = create<CitiesWeatherState>()(
  persist(
    (set) => ({
      favoriteCities: [],
      setFavoriteCity: (city: string) =>
        set((state) => {
          return { favoriteCities: [...state.favoriteCities, city] };
        }),
      deleteFavoriteCity: (city: string) =>
        set((state) => {
          return {
            favoriteCities: state.favoriteCities.filter((c) => c !== city),
          };
        }),
    }),
    { name: "favorite-cities" }
  )
);
