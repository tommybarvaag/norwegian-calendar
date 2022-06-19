import { MainLayout } from "@/components/layout";
import useDate from "@/hooks/useDate";
import type { NorwegianCalendarNextPage } from "@/types";
import { CalendarYear } from "../components";

const Home: NorwegianCalendarNextPage = () => {
  const { date } = useDate();

  return <CalendarYear date={date} />;
};

Home.layoutProps = {
  Layout: MainLayout,
  meta: {
    title: "Home",
  },
};

export default Home;
