import { MainLayout } from "@/components/layout";
import type { NorwegianCalendarNextPage } from "@/types";
import { CalendarYear } from "../components";

const Home: NorwegianCalendarNextPage = () => {
  const date = new Date();

  return <CalendarYear date={date} />;
};

Home.layoutProps = {
  Layout: MainLayout,
  meta: {
    title: "Home",
  },
};

export default Home;
