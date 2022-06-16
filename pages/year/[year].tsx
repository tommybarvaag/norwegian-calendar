import { MainLayout } from "@/components/layout";
import { NorwegianCalendarNextPage } from "@/types";
import { getStaticYearRange } from "@/utils/calendarUtils";
import type { GetStaticPaths, GetStaticProps } from "next";
import { CalendarYear } from "../../components";

const Year: NorwegianCalendarNextPage<{ year: number }> = ({ year }) => {
  const date = new Date(year, 0, 1);
  return <CalendarYear date={date} />;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getStaticYearRange().map((year) => ({ params: { year: year.toString() } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  return {
    props: {
      year: +params.year,
    }, // will be passed to the page component as props
  };
};

Year.layoutProps = {
  meta: {
    title: "Year",
  },
  Layout: MainLayout,
};

export default Year;
