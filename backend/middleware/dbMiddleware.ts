import { DefaultContext } from "koa";
import { DB } from "../lib/database";

export const dbMiddleware = (db: DB) => {
  return async (ctx: DefaultContext, next) => {
    ctx.db = db;
    await next(); 
  }
}