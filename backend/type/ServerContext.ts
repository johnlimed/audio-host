import { Logger } from "winston"
import { BaseContext } from "koa";
import { DB } from "../lib/database";

export interface ServerContext extends BaseContext {
  db: DB;
  log: Logger;
  body: any;
}