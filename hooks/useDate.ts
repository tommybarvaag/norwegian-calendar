import { proxy, useSnapshot } from "valtio";

const state = proxy({ date: new Date() });

setInterval(() => {
  state.date = new Date();
}, 1000);

export default function useDate() {
  const { date } = useSnapshot(state);

  return { date, month: date.getMonth(), day: date.getDate(), year: date.getFullYear() };
}
