import Koa from "koa";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";

const startServer = () => {
  const app = new Koa();
  const port = 3000;
  
  app.use(loggerMiddleware);
  app.on("error", errorMiddleware);
  app.listen(port, () => {
    console.log(`🚀 Server is running on port http://localhost:${port}/`);
  });
}

startServer();