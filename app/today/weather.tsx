import { getWeatherData } from "@/lib/weather";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

async function Weather({
  date,
  latitude,
  longitude,
}: {
  date: Date;
  latitude: string;
  longitude: string;
}) {
  const weatherData = await getWeatherData(latitude, longitude);

  const weatherNow = weatherData.properties.timeseries.find(
    (x) =>
      // find the first timeseries that is withing the current hour
      new Date(x.time).getHours() === date.getHours()
  );

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
          <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
        </svg>
        <span>{weatherNow?.data.instant.details.air_temperature}&#8451;</span>
      </div>
      <p>{weatherNow?.data?.instant?.details.air_pressure_at_sea_level} hPa</p>
      <p>{weatherNow?.data?.instant?.details.relative_humidity}</p>
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
          <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
          <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
          <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
        </svg>
        <span>{weatherNow?.data?.instant?.details.wind_speed} m/s</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`h-6 w-6 rotate-0`}
          style={{
            "--tw-rotate": `${
              weatherNow?.data?.instant?.details?.wind_from_direction ?? 0
            }deg`,
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
          />
        </svg>
      </div>
    </>
  );
}

export { Weather };
