import type { NextPage } from "next";
import { CalendarYear, Main } from "../components";

const Home: NextPage = () => {
  const date = new Date();

  return (
    <Main>
      <CalendarYear date={date} />
    </Main>
  );
};

export default Home;
