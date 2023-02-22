import { nanoid } from "nanoid/non-secure";

const generateId = (size: number = 10) => nanoid(size);

export { generateId };
