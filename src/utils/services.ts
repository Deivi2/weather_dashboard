const weatherMapBaseUrl = "https://api.openweathermap.org";

export async function getWeatherData(lat: string, lon: string) {
  const url = `${weatherMapBaseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=40&appid=${
    import.meta.env.VITE_WEATHER_API_KEY
  }`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getCityData(city?: string) {
  const url = `${weatherMapBaseUrl}/geo/1.0/direct?q=${city}&limit=5&appid=${
    import.meta.env.VITE_WEATHER_API_KEY
  }`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
