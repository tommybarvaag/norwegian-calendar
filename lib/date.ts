"server-only";

import { cache } from "react";

export const getRequestDateNow = cache(() => new Date());
