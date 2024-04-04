import { v4 as uuidv4 } from "uuid";

export const uuidAdapter = {
  generate: () => {
    return uuidv4();
  },
};
