import Koa from "koa";
import http from 'http';
import router from "./router";
import { initDB } from "./database";
import { logger } from "./logger";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { dbMiddleware } from "./middleware/dbMiddleware";
import { shutdown } from "./middleware/shutdown";

const startServer = () => {
  const app = new Koa();
  const port = 3000;
  const db = initDB(logger);
  const server = http.createServer(app.callback());
  
  app.use(loggerMiddleware(logger));
  app.use(dbMiddleware(db));
  app.use(shutdown(logger, db, server));
  app.on("error", errorMiddleware);
  app.use(router.routes());
  app.use(router.allowedMethods());

  server.listen(port, () => {
    logger.info(`🚀 Server is running on port http://localhost:${port}/`);
  });
}

startServer();