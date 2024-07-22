import winston from "winston";
import { DefaultContext } from "koa";

export const loggerMiddleware = (logger: winston.Logger) => {
  return async (ctx: DefaultContext, next) => {
    ctx.log = logger;
    await next();
  }
}