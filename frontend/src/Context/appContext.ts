import { createContext } from "react";

interface ISnackContext {
  message: string;
  setMessage: Function;
  setOpenSnackbar: Function;
}

export const SnackContext = createContext({} as ISnackContext);