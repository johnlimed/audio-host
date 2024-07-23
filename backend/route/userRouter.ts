import Router from "@koa/router";

import { Log } from "../lib/logger";
import { COLLECTION_NAME } from "../lib/database";

import { ServerState } from "../type/ServerState";
import { ServerContext } from "../type/ServerContext";
import { ReqUserCreate } from "../type/ReqUserCreate";
import { ReqUserUpdate } from "../type/ReqUserUpdate";
import { IUser } from "../type/IUser";
import { EnumRole } from "../type/EnumRole";

import { handleUserCreate } from "../handler/userCreate";
import { handleUserUpdate } from "../handler/userUpdate";

import { jwtMiddleware } from "../middleware/jwtMiddleware";

import { AuthorizationError } from "../error/AuthorizationError";

const userRouter = new Router();
const needLogin = new Router();
const adminRouter = new Router();

needLogin.use(jwtMiddleware());

needLogin.get<ServerState, ServerContext>('/:id', async (ctx, next) => {
  if (ctx.state.userRoleId === ctx.state.jwt.roleId) {
    if (ctx.state.jwt.id !== ctx.params.id) throw new AuthorizationError();
  }
  
  const res = ctx.db.get<IUser>(COLLECTION_NAME.USER, { id: ctx.params.id });
  ctx.body = res[0];
  await next();
});

needLogin.patch<ServerState, ServerContext, ReqUserUpdate>('/:id', async (ctx, next) => {
  if (ctx.state.userRoleId === ctx.state.jwt.roleId) {
    if (ctx.state.jwt.id !== ctx.params.id) throw new AuthorizationError();
  }
  
  const res = await handleUserUpdate(ctx.log, ctx.db, ctx.params.id, ctx.body);
  ctx.body = res.body;
  await next();
});


/**
 * Admin routes
 */
adminRouter.use(jwtMiddleware(EnumRole.ADMIN));

needLogin.post<ServerState, ServerContext, ReqUserCreate>('/', async (ctx, next) => {
  const res = await handleUserCreate(ctx.log, ctx.db, ctx.body);
  ctx.body = res.body;
  ctx.status = res.status;

  await next();
});

adminRouter.get<ServerState, ServerContext>('/', async (ctx, next) => {
  const res = ctx.db.get<IUser>(COLLECTION_NAME.USER, {});
  ctx.body = res;
  await next();
});

adminRouter.delete<ServerState, ServerContext>('/:id', async (ctx, next) => {
  ctx.body = "sucess";
  await next();
});

userRouter.use(async (ctx, next) => {
  ctx.log = Log({ label: "user" });
  await next();
});

userRouter.use(needLogin.routes());
userRouter.use(adminRouter.routes());

export default userRouter;