import { ServerState } from "./ServerState";

export interface ResHandler<B> {
  body: B,
  state?: ServerState,
  status?: number;
}