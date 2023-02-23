import { SunriseResponse, WeatherResponse } from "@/types";
import { extractDate } from "@/utils/date-utils";

const getWeatherData = async (latitude: string, longitude: string) => {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`;

  const response = await fetch(url);

  const data = await response.json();

  return data as WeatherResponse;
};

const getSunriseData = async (
  date: Date,
  latitude: string,
  longitude: string
) => {
  // format date as YYYY-MM-DD
  const extractedDate = extractDate(date);
  const formattedDate = `${extractedDate.year}-${extractedDate.month}-${extractedDate.day}`;
  const url = `https://api.met.no/weatherapi/sunrise/2.0/.json?lat=${latitude}&lon=${longitude}&date=${formattedDate}&offset=+01:00`;

  const response = await fetch(url);

  const data = await response.json();

  return data as SunriseResponse;
};

export { getSunriseData, getWeatherData };
