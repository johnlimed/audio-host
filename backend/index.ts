import Koa from "koa";
import http from 'http';
import bodyParser from "koa-bodyparser";

import { initDB } from "./database";
import { logger } from "./logger";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { dbMiddleware } from "./middleware/dbMiddleware";
import { shutdown } from "./middleware/shutdown";

import router from "./router"; 
import authRouter from "./auth";
import { ServerState } from "./type/ServerState";
import { ServerContext } from "./type/ServerContext";

const startServer = () => {
  const app = new Koa();
  const port = 3000;
  const db = initDB(logger);
  const server = http.createServer(app.callback());
  
  app.use(loggerMiddleware(logger));
  app.use(dbMiddleware(db));
  app.use(shutdown(logger, db, server));
  app.on("error", errorMiddleware);
  app.use(bodyParser());
  app.use<ServerState, ServerContext>(async (ctx, next) => {
    ctx.body = ctx.request.body;
    await next();
  });
  
  router.use("/auth", authRouter.routes(), authRouter.allowedMethods());
  app.use(router.routes());
  app.use(router.allowedMethods());

  server.listen(port, () => {
    logger.info(`🚀 Server is running on port http://localhost:${port}/`);
  });
}

startServer();