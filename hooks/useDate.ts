import createStore from "zustand";
import create from "zustand/vanilla";

// Once every half minute, update in ms
const UPDATE_INTERVAL = 30 * 1000;

const dateStore = create<{ now: Date }>((set) => ({
  now: new Date(),
}));

setInterval(() => {
  const meh = new Date();
  meh.setUTCMonth(1);
  dateStore.setState(() => ({
    now: meh,
  }));
}, UPDATE_INTERVAL);

const useDateStore = createStore(dateStore);

export { useDateStore };
