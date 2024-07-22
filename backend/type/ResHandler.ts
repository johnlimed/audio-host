import { ServerState } from "./ServerState";

export interface ResHandler {
  body: any,
  state?: ServerState,
  status?: number;
}