import { getSunriseData } from "@/lib/weather";
import { getHourAndMinutes } from "@/utils/dateUtils";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

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
