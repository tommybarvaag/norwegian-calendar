import merge from "lodash.merge";
import { CSS } from "stitches.config";

export const mergeCss = (...args: CSS[]): CSS => ({
  ...merge({}, ...args),
});
