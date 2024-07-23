import {v4} from "uuid";

export const generateUUID = (): string => {
  const uuid = v4();
  return uuid;
}