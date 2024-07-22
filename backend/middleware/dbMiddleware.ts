import { DefaultContext } from "koa";
import { DB } from "../database";

export const dbMiddleware = (db: DB) => {
  return async (ctx: DefaultContext, next) => {
    ctx.db = db;
    await next(); 
  }
}