export const isString = (value: any) =>
  Object.prototype.toString.call(value) === "[object String]";

export const memoize = (func) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    return key in cache ? cache[key] : (cache[key] = func(...args));
  };
};

export const range = (min: number, max: number) =>
  Array.from({ length: max - min + 1 }, (_, i) => min + i);

export const omit = (obj: {}, keys: string[]) =>
  Object.keys(obj)
    .filter((k) => !keys.includes(k))
    .reduce((res, k) => Object.assign(res, { [k]: obj[k] }), {});

export const capitalize = (str: string): string =>
  str.length === 0 ? str : `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export function getAbsoluteUrl(path?: string) {
  // const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

  // if (vercelUrl) {
  //   return path ? `https://${vercelUrl}${path}` : `https://${vercelUrl}`;
  // }

  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://dato.im";

  if (path) {
    return `${base}${path}`;
  }

  return base;
}
