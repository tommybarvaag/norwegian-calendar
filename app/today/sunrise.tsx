import { SunriseResponse } from "@/types";
import {
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
} from "date-fns";
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

const extractDate = (input: Date) => {
  const month = getMonth(input) + 1;
  const date = getDate(input);
  const hours = getHours(input);
  const minutes = getMinutes(input);
  const seconds = getSeconds(input);

  return {
    year: getYear(input).toString(),
    month: month < 10 ? `0${month}` : month.toString(),
    day: date < 10 ? `0${date}` : date.toString(),
    hour: hours < 10 ? `0${hours}` : hours.toString(),
    minute: minutes < 10 ? `0${minutes}` : minutes.toString(),
    second: seconds < 10 ? `0${seconds}` : seconds.toString(),
  };
};

const getHourAndMinutes = (date: Date) => {
  const extractedDate = extractDate(date);

  return `${extractedDate.hour}:${extractedDate.minute}`;
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

async function Sunrise({
  date,
  latitude,
  longitude,
}: {
  date: Date;
  latitude: string;
  longitude: string;
}) {
  const sunriseData = await getSunriseData(date, latitude, longitude);

  const currentSunriseData = sunriseData.location.time.find((x) => {
    const sunriseDate = new Date(x.date);

    // return if current date equals sunrise date year, month and day
    return (
      sunriseDate.getFullYear() === date.getFullYear() &&
      sunriseDate.getMonth() === date.getMonth() &&
      sunriseDate.getDate() === date.getDate()
    );
  });

  return (
    <>
      <div className="flex gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v8"></path>
          <path d="m4.93 10.93 1.41 1.41"></path>
          <path d="M2 18h2"></path>
          <path d="M20 18h2"></path>
          <path d="m19.07 10.93-1.41 1.41"></path>
          <path d="M22 22H2"></path>
          <path d="m8 6 4-4 4 4"></path>
          <path d="M16 18a4 4 0 0 0-8 0"></path>
        </svg>
        <span>
          {getHourAndMinutes(
            new Date(currentSunriseData?.sunrise?.time ?? new Date())
          )}
        </span>
      </div>
      <div className="flex gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 10V2"></path>
          <path d="m4.93 10.93 1.41 1.41"></path>
          <path d="M2 18h2"></path>
          <path d="M20 18h2"></path>
          <path d="m19.07 10.93-1.41 1.41"></path>
          <path d="M22 22H2"></path>
          <path d="m16 6-4 4-4-4"></path>
          <path d="M16 18a4 4 0 0 0-8 0"></path>
        </svg>
        <span>
          {getHourAndMinutes(
            new Date(currentSunriseData?.sunset?.time ?? new Date())
          )}
        </span>
      </div>
    </>
  );
}

export { Sunrise };
