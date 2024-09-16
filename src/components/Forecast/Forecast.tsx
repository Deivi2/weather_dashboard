import { getCityData, getWeatherData } from "@/utils/services";
import { useEffect, useState } from "react";
import { ICONS } from "./Forecast.contants";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ForecastProps } from "./Forecast.types";
import { TWeatherData } from "@/types";
import { Routes } from "@/utils/routes";
import ErrorMessage from "@/components/ErrorMessage";

const Forecast: React.FC<ForecastProps> = ({ slug }) => {
  const [weatherResponse, setWeatherResponse] = useState<TWeatherData>(
    {} as TWeatherData
  );
  const [error, setError] = useState("");

  const list = weatherResponse?.list;
  const isDataLoaded = Object.keys(weatherResponse).length > 0;

  const handleWeatherSearch = async (city?: string) => {
    try {
      const cityData = await getCityData(city);
      const weatherData = await getWeatherData(
        cityData[0].lat,
        cityData[0].lon
      );

      setWeatherResponse(weatherData);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    handleWeatherSearch(slug);
  }, [slug]);

  return (
    <section className="flex flex-col items-center bg-blue-400 text-white min-h-screen">
      {error && <ErrorMessage />}

      {isDataLoaded && (
        <>
          <Link to={Routes.home} className="flex gap-3 mt-4 cursor-pointer">
            <ArrowLeft /> <h4 className="">Back</h4>
          </Link>

          <div className="rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 m-5 p-5">
            {list?.map((item, index) => (
              <div
                key={index}
                className="flex justify-center items-center gap-3 p-1"
              >
                <p className="w-24">{format(new Date(item.dt_txt), "EEEE")}</p>
                <p className="w-14">{ICONS[item.weather[0].main]}</p>
                <p className="w-16">{Math.round(item.main.temp)}°C</p>
                <p>{format(new Date(item.dt_txt), "HH:mm")}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Forecast;
