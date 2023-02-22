import { Generated, Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

interface Diddle {
  id: Generated<string>;
  name: string;
  created: Generated<string>;
  updated: Generated<string>;
  dates?: DiddleDate[];
}

interface DiddleDate {
  id: Generated<string>;
  date: string;
  created: Generated<string>;
  updated: Generated<string>;
  diddle: Diddle;
  diddleId: string;
  times: DiddleTime[];
}

interface DiddleTime {
  id: Generated<string>;
  from: string;
  to: string;
  created: Generated<string>;
  updated: Generated<string>;
  diddleDate: DiddleDate;
  diddleDateId: string;
}

interface Database {
  diddle: Diddle;
  diddleDate: DiddleDate;
  diddleTime: DiddleTime;
}

const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});

export { db };
