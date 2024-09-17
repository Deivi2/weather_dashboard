import { SquareMinus, SquarePlus } from "lucide-react";
import { ICONS } from "./WeatherCard.constants";
import { Link } from "react-router-dom";
import { useCitiesWeatherState } from "@/state/cities-weather-state";
import { WeatherCardProps } from "./WeatherCard.types";
import { Routes } from "@/utils/routes";

const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherCondition,
  city,
  temperature,
  description,
  humidity,
  wind,
  country,
}) => {
  const { setFavoriteCity, deleteFavoriteCity, favoriteCities } =
    useCitiesWeatherState();

  const cityName = `${city} - ${country}`;

  const isInFavorites = favoriteCities.includes(cityName);

  return (
    <div className="flex rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 m-5 p-5 text-white relative">
      {!isInFavorites && (
        <div
          className="flex gap-1 cursor-pointer absolute"
          onClick={() => setFavoriteCity(cityName)}
        >
          <SquarePlus /> <p>add</p>
        </div>
      )}

      {isInFavorites && (
        <div
          className="flex gap-1 cursor-pointer absolute"
          onClick={() => deleteFavoriteCity(cityName)}
        >
          <SquareMinus /> <p>remove</p>
        </div>
      )}

      <div className="flex flex-col justify-center items-center mr-3 ">
        {ICONS[weatherCondition]}
      </div>

      <div className="text-center ">
        <p className="text-3xl">{cityName}</p>
        <p className="text-5xl pt-1">{temperature}</p>
        <p className="text-l pt-1">{description}</p>
        <p className="text-l pt-1">
          Humidity: {humidity} Wind: {wind}
        </p>

        <Link
          className="text-xs text-blue-900"
          to={Routes.fiveDaysForecast.replace(
            ":slug",
            cityName.replace(/ - /g, ",")
          )}
        >
          Show 5-day forecast
        </Link>
      </div>
    </div>
  );
};

export default WeatherCard;
