import Koa from "koa";
import router from "./router";
import { initDB } from "./database";
import { logger } from "./logger";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { dbMiddleware } from "./middleware/dbMiddleware";

const startServer = () => {
  const app = new Koa();
  const port = 3000;
  const db = initDB(logger);

  app.use(loggerMiddleware(logger));
  app.use(dbMiddleware(db));
  app.on("error", errorMiddleware);
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(port, () => {
    logger.info(`🚀 Server is running on port http://localhost:${port}/`);
  });

  process.on('SIGINT', function () {
    logger.info("[dbMiddleware] flushing database");
    db.close();
  });
}

startServer();