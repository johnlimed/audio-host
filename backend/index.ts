import Koa from "koa";
import http from 'http';
import bodyParser from "koa-bodyparser";

import { initDB } from "./lib/database";
import { Log } from "./lib/logger";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { dbMiddleware } from "./middleware/dbMiddleware";
import { shutdown } from "./middleware/shutdown";

import router from "./route/router"; 
import authRouter from "./route/authRouter";
import { ServerState } from "./type/ServerState";
import { ServerContext } from "./type/ServerContext";

const startServer = () => {
  const app = new Koa();
  const port = 3000;
  const logger = Log();
  const db = initDB(logger);
  const server = http.createServer(app.callback());
  
  app.use(loggerMiddleware(logger));
  app.use(errorMiddleware);
  app.use(dbMiddleware(db));
  app.use(shutdown(logger, db, server));

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