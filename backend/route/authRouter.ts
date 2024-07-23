import Router from "@koa/router";

import { Log } from "../lib/logger";

import { ReqLogin } from "../type/ReqLogin";
import { ServerState } from "../type/ServerState";
import { ServerContext } from "../type/ServerContext";


import { handleUserLogin } from "../handler/authLogin";
import { jwtMiddleware } from "../middleware/jwtMiddleware";

const authRouter = new Router();

authRouter.use(async (ctx, next) => {
  ctx.log = Log({ label: "auth" });
  await next();
});

authRouter.post<ServerState, ServerContext, ReqLogin>('/login', async (ctx, next) => {
  const res = await handleUserLogin(ctx.log, ctx.db, ctx.body, ctx.request.header.authorization);
  ctx.body = res.body;

  await next();
});

authRouter.use(jwtMiddleware());

authRouter.post('/logout', async (ctx, next) => {
  ctx.body = "logout success";
  await next();
});

export default authRouter;