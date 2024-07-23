import Koa from "koa";
import http from 'http';
import bodyParser from "koa-bodyparser";

import { Log } from "./lib/logger";
import { initDB } from "./lib/database";

import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { roleMiddleware } from "./middleware/roleMiddleware";
import { dbMiddleware } from "./middleware/dbMiddleware";
import { shutdown } from "./middleware/shutdown";

import router from "./route/router"; 

import { ServerState } from "./type/ServerState";
import { ServerContext } from "./type/ServerContext";

import { mkdirIfNotExist } from "./useCase/mkdirIfNotExist";
import { EnumPath } from "./type/EnumPath";

const startServer = () => {
  const app = new Koa();
  const port = 3000;
  const logger = Log();
  const db = initDB(logger, async (adminId: string, userId: string) => {
    await mkdirIfNotExist(logger, EnumPath.STORE);
    await mkdirIfNotExist(logger, EnumPath.STORE + `/${adminId}`);
    await mkdirIfNotExist(logger, EnumPath.STORE + `/${userId}`);
    app.use(roleMiddleware(db, adminId, userId));
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
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
  
  server.listen(port, () => {
    logger.info(`🚀 Server is running on port http://localhost:${port}/`);
  });
}

startServer();