import http from 'http';
import { Logger } from "winston";
import { DB } from '../database';

export const shutdown = (logger: Logger, db: DB, server: http.Server) => {
  let shutdown = false;

  const exit = () => {
    if (shutdown) {
      return;
    }
    shutdown = true;
    logger.info("[shutdown] Server shutting down...");
    logger.info("[shutdown] flushing database");
    db.close();

    server.close(() => {
      logger.info('[shutdown] Closed out remaining connections');
      process.exit(0);
    });
  }

  process.on('SIGINT', () => exit());
  process.on("SIGTERM", () => exit());

  return (ctx, next) => {
    if (shutdown) {
      ctx.status = 503;
      ctx.set('Connection', 'close');
      ctx.body = 'Server is in the process of shutting down';
    } else {
      return next();
    }
  };
}