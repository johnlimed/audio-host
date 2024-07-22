import { DefaultContext } from "koa";
import winston from "winston";

export const loggerMiddleware = async (ctx: DefaultContext, next) => {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      // new winston.transports.File({ filename: 'combined.log' }) // for writing to file
    ]
  });
  ctx.log = logger;
  await next();
}