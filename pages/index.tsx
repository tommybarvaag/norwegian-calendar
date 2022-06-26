import { MainLayout } from "@/components/layout";
import { useDateStore } from "@/hooks/useDate";
import type { NorwegianCalendarNextPage } from "@/types";
import { CalendarYear } from "../components";

const Home: NorwegianCalendarNextPage = () => {
  const { now } = useDateStore();

  return <CalendarYear date={now} />;
};

Home.layoutProps = {
  Layout: MainLayout,
  meta: {
    title: "Home",
  },
};

export default Home;
