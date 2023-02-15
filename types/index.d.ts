import type { NextPage } from "next";

type AllowCSSVariables = { [key in `--${string}`]: string };

declare module "react" {
  export interface CSSProperties extends AllowCSSVariables {}
}

export type NorwegianCalendarNextPage<P = {}> = NextPage<P> & {
  layoutProps: PageLayoutProps;
};

export type PageLayoutProps = {
  Layout: React.ComponentType<any>;
  meta: {
    title: string;
  };
};

export type CalendarHolidayInformation = {
  name: string;
  shortDate: string;
};

export type CalendarYear = {
  year: number;
  isLeapYear: boolean;
  months: CalendarMonth[];
};

export type CalendarMonth = {
  month: string;
  monthNumber: number;
  year: number;
  days: CalendarDay[];
  payDay?: CalendarDay;
};

export type CalendarDay = {
  date: Date;
  day: number;
  name: string;
  weekNumber: number;
  formattedDate: string;
  formattedShortDate: string;
  formattedLongDate: string;
  holidayInformation?: CalendarHolidayInformation;
  isHoliday: boolean;
  isWorkDay?: boolean;
  isSunday?: boolean;
};

export type Holiday = {
  name: string;
  date: Date;
  formattedShortDate: string;
  formattedLongDate: string;
};

type CalendarEntries = {
  type: "header" | "week" | "spacing" | "day";
  value: string | number | null;
  week?: number;
  isToday?: boolean;
  isOdd?: boolean;
  isHoliday?: boolean;
  isSunday?: boolean;
  isStartOfWeek?: boolean;
};

export interface WeatherResponse {
  type: string;
  geometry: WeatherResponseGeometry;
  properties: WeatherResponseProperties;
}

export interface WeatherResponseGeometry {
  type: string;
  coordinates: number[];
}

export interface WeatherResponseProperties {
  meta: WeatherResponseMeta;
  timeseries: WeatherResponseSeries[];
}

export interface WeatherResponseMeta {
  updated_at: string;
  units: WeatherResponseUnits;
}

export interface WeatherResponseUnits {
  air_pressure_at_sea_level: string;
  air_temperature: string;
  cloud_area_fraction: string;
  precipitation_amount: string;
  relative_humidity: string;
  wind_from_direction: string;
  wind_speed: string;
}

export interface WeatherResponseSeries {
  time: string;
  data: WeatherResponseData;
}

export interface WeatherResponseData {
  instant: WeatherResponseInstant;
  next_12_hours?: WeatherResponseNext12Hours;
  next_1_hours?: WeatherResponseNext1Hours;
  next_6_hours?: WeatherResponseNext6Hours;
}

export interface WeatherResponseDetails {
  air_pressure_at_sea_level: number;
  air_temperature: number;
  cloud_area_fraction: number;
  relative_humidity: number;
  wind_from_direction: number;
  wind_speed: number;
}

export interface WeatherResponseInstant {
  details: WeatherResponseDetails;
}

export interface WeatherResponseSummary {
  symbol_code: string;
}

export interface WeatherResponseNext12Hours {
  summary: WeatherResponseSummary;
}

export interface WeatherResponseDetailsPrecipitationAmount {
  precipitation_amount: number;
}

export interface WeatherResponseNext1Hours {
  summary: WeatherResponseSummary;
  details: WeatherResponseDetailsPrecipitationAmount;
}

export interface WeatherResponseNext6Hours {
  summary: WeatherResponseSummary;
  details: WeatherResponseDetailsPrecipitationAmount;
}

export interface SunriseResponse {
  location: SunriseResponseLocation;
  meta: SunriseResponseMeta;
}

export interface SunriseResponseLocation {
  height: string;
  latitude: string;
  longitude: string;
  time: SunriseResponseTime[];
}

export interface SunriseResponseTime {
  date: string;
  high_moon?: SunriseResponseHighMoon;
  low_moon?: SunriseResponseLowMoon;
  moonphase?: SunriseResponseMoonphase;
  moonposition: SunriseResponseMoonposition;
  moonrise?: SunriseResponseMoonrise;
  moonset?: SunriseResponseMoonset;
  moonshadow?: SunriseResponseMoonshadow;
  solarmidnight?: SunriseResponseSolarmidnight;
  solarnoon?: SunriseResponseSolarnoon;
  sunrise?: SunriseResponseSunrise;
  sunset?: SunriseResponseSunset;
}

export interface SunriseResponseHighMoon {
  desc: string;
  elevation: string;
  time: string;
}

export interface SunriseResponseLowMoon {
  desc: string;
  elevation: string;
  time: string;
}

export interface SunriseResponseMoonphase {
  desc: string;
  time: string;
  value: string;
}

export interface SunriseResponseMoonposition {
  azimuth: string;
  desc: string;
  elevation: string;
  phase: string;
  range: string;
  time: string;
}

export interface SunriseResponseMoonrise {
  desc: string;
  time: string;
}

export interface SunriseResponseMoonset {
  desc: string;
  time: string;
}

export interface SunriseResponseMoonshadow {
  azimuth: string;
  desc: string;
  elevation: string;
  time: string;
}

export interface SunriseResponseSolarmidnight {
  desc: string;
  elevation: string;
  time: string;
}

export interface SunriseResponseSolarnoon {
  desc: string;
  elevation: string;
  time: string;
}

export interface SunriseResponseSunrise {
  desc: string;
  time: string;
}

export interface SunriseResponseSunset {
  desc: string;
  time: string;
}

export interface SunriseResponseMeta {
  licenseurl: string;
}
