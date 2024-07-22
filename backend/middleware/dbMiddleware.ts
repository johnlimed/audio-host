import { DefaultContext } from "koa";

export const dbMiddleware = (db: Loki) => {
  return async (ctx: DefaultContext, next) => {
    ctx.db = db;
    await next(); 
  }
}