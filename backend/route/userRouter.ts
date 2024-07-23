import Router from "@koa/router";

import { Log } from "../lib/logger";
import { ServerState } from "../type/ServerState";
import { ServerContext } from "../type/ServerContext";
import { ReqRegister } from "../type/ReqRegister";
import { handleUserCreate } from "./handler/userCreate";

const userRouter = new Router();

userRouter.use(async (ctx, next) => {
  ctx.log = Log({ label: "user" });
  await next();
});


userRouter.post<ServerState, ServerContext, ReqRegister>('/', async (ctx, next) => {
  const res = await handleUserCreate(ctx.log, ctx.db, ctx.body);
  ctx.body = res.body;
  ctx.status = res.status;

  await next();
});

interface ReqUserUpdate {
  id: string;

}
userRouter.patch<ServerState, ServerContext, ReqUserUpdate>('/:id', async (ctx, next) => {
  ctx.body = "sucess";
  await next();
});

userRouter.delete<ServerState, ServerContext>('/:id', async (ctx, next) => {
  ctx.body = "sucess";
  await next();
});

export default userRouter;