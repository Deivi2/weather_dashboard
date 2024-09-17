import { getCityData, getWeatherData } from "@/utils/services";
import { useEffect, useState } from "react";
import Autocomplete from "@/components/Autocomplete/Autocomplete";
import { DEFAULT_CITY } from "./WeatherDisplay.constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import Favorites from "../Favorites/Favorites";
import { TWeatherData } from "@/types";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

const WeatherDisplay = () => {
  const [weatherResponse, setWeatherResponse] = useState({} as TWeatherData);
  const [city, setCity] = useState(DEFAULT_CITY);
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const temperature = `${Math.round(weatherResponse?.list?.[0].main.temp)}°C`;
  const humidity = `${weatherResponse?.list?.[0].main.humidity}%`;
  const wind = `${weatherResponse?.list?.[0].wind.speed} m/s`;
  const weatherCondition = weatherResponse?.list?.[0].weather[0].main;
  const description = weatherResponse?.list?.[0].weather[0].description;
  const isDataLoaded = Object.keys(weatherResponse).length > 0;

  const handleWeatherSearch = async (city: string, index: number = 0) => {
    try {
      const cityData = await getCityData(city);
      const weatherData = await getWeatherData(
        cityData[index].lat,
        cityData[index].lon
      );

      setCity(cityData[index].name);
      setCountry(cityData[index].country);
      setWeatherResponse(weatherData);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    handleWeatherSearch(DEFAULT_CITY);
  }, []);

  return (
    <main className="flex items-center flex-col bg-blue-400 h-screen">
      {error && <ErrorMessage />}

      {isDataLoaded && (
        <>
          <Autocomplete
            onChange={(option, index) =>
              handleWeatherSearch(option.name, index)
            }
          />

          <WeatherCard
            city={city}
            wind={wind}
            country={country}
            humidity={humidity}
            temperature={temperature}
            description={description}
            weatherCondition={weatherCondition}
          />

          <Favorites
            onClick={(city) => {
              const parsedCity = city.split("-").join(",").replace(/ /g, "");
              handleWeatherSearch(parsedCity);
            }}
          />
        </>
      )}
    </main>
  );
};

export default WeatherDisplay;
