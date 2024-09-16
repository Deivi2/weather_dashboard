import { useCitiesWeatherState } from "@/state/cities-weather-state";
import { SquareArrowUp } from "lucide-react";
import { FavoritesProps } from "./Favorites.types";

const Favorites: React.FC<FavoritesProps> = ({ onClick }) => {
  const { favoriteCities } = useCitiesWeatherState();

  return (
    <div>
      {favoriteCities.map((city, index) => (
        <div
          key={index}
          className="flex-1 rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 m-5 p-5 text-white cursor-pointer hover:bg-white/30 "
          onClick={() => onClick(city)}
        >
          <p className="flex gap-3 justify-between">
            {city} <SquareArrowUp />
          </p>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
