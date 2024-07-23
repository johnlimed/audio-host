import Router from "@koa/router";

import { Log } from "../lib/logger";
import { ServerState } from "../type/ServerState";
import { ServerContext } from "../type/ServerContext";
import { ReqRegister } from "../type/ReqRegister";
import { handleUserCreate } from "./handler/userCreate";
import { ReqUserUpdate } from "../type/ReqUserUpdate";
import { handleUserUpdate } from "./handler/userUpdate";
import { COLLECTION_NAME } from "../lib/database";
import { IUser } from "../type/IUser";

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

userRouter.get<ServerState, ServerContext>('/', async (ctx, next) => {
  const res = ctx.db.get<IUser>(COLLECTION_NAME.USER, {});
  ctx.body = res;
  await next();
});

userRouter.get<ServerState, ServerContext>('/:id', async (ctx, next) => {
  const res = ctx.db.get<IUser>(COLLECTION_NAME.USER, { id: ctx.params.id });
  ctx.body = res[0];
  await next();
});

userRouter.patch<ServerState, ServerContext, ReqUserUpdate>('/:id', async (ctx, next) => {
  const res = await handleUserUpdate(ctx.log, ctx.db, ctx.params.id, ctx.body);
  ctx.body = res.body;
  await next();
});

userRouter.delete<ServerState, ServerContext>('/:id', async (ctx, next) => {
  ctx.body = "sucess";
  await next();
});

export default userRouter;