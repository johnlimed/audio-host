import Router from "@koa/router";

import { Log } from "../lib/logger";

import { ReqLogin } from "../type/ReqLogin";
import { ReqRegister } from "../type/ReqRegister";
import { ServerState } from "../type/ServerState";
import { ServerContext } from "../type/ServerContext";


import { handleUserLogin } from "./handler/handleUserLogin";
import { handleUserRegister } from "./handler/handleUserRegister";

const authRouter = new Router();

authRouter.use(async (ctx, next) => {
  ctx.log = Log({ label: "auth" })
  await next();
});

authRouter.post<ServerState, ServerContext, ReqRegister>('/register', async (ctx, next) => {
  const res = await handleUserRegister(ctx.log, ctx.db, ctx.body);
  ctx.body = res.body;
  ctx.status = res.status;

  await next();
});


authRouter.post<ServerState, ServerContext, ReqLogin>('/login', async (ctx, next) => {
  const res = await handleUserLogin(ctx.log, ctx.db, ctx.body, ctx.request.header.authorization);
  ctx.body = res.body;

  await next();
});

authRouter.post('/logout', async (ctx, next) => {
  ctx.body = "logout success";
  await next();
});

export default authRouter;