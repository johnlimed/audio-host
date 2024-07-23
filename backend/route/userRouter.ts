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


userRouter.post<ServerState, ServerContext, ReqRegister>('/create', async (ctx, next) => {
  const res = await handleUserCreate(ctx.log, ctx.db, ctx.body);
  ctx.body = res.body;
  ctx.status = res.status;

  await next();
});

userRouter.put('/update', async (ctx, next) => {
  await next();
});

userRouter.delete('/', async (ctx, next) => {
  await next();
});