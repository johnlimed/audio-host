import Router from "@koa/router";
import { promises as fsPromises } from "fs";

import { Log } from "../lib/logger";
import { COLLECTION_NAME } from "../lib/database";

import { IUser } from "../type/IUser";
import { EnumPath } from "../type/EnumPath";
import { EnumRole } from "../type/EnumRole";
import { ServerState } from "../type/ServerState";
import { ServerContext } from "../type/ServerContext";
import { ReqUserCreate } from "../type/ReqUserCreate";
import { ReqUserUpdate } from "../type/ReqUserUpdate";

import { handleUserCreate } from "../handler/userCreate";
import { handleUserUpdate } from "../handler/userUpdate";

import { jwtMiddleware } from "../middleware/jwtMiddleware";

import { InputError } from "../error/InputError";
import { AuthorizationError } from "../error/AuthorizationError";
import { removeFields } from "../useCase/removeFields";

const userRouter = new Router();
const needLogin = new Router();
const adminRouter = new Router();

needLogin.use(jwtMiddleware());

needLogin.get<ServerState, ServerContext>('/:id', (ctx) => {
  if (ctx.state.userRoleId === ctx.state.jwt.roleId) {
    if (ctx.state.jwt.id !== ctx.params.id) throw new AuthorizationError();
  }
  
  const res = ctx.db.get<IUser>(COLLECTION_NAME.USER, { id: ctx.params.id });
  ctx.body = removeFields(res[0], ["password"]);
});

needLogin.patch<ServerState, ServerContext, ReqUserUpdate>('/:id', async (ctx) => {
  if (ctx.state.userRoleId === ctx.state.jwt.roleId) {
    if (ctx.state.jwt.id !== ctx.params.id) throw new AuthorizationError();
  }
  
  const res = await handleUserUpdate(ctx.log, ctx.db, ctx.params.id, ctx.body);
  ctx.body = removeFields(res.body, ["password"]);
});


/**
 * Admin routes
 */
adminRouter.use(jwtMiddleware(EnumRole.ADMIN));

adminRouter.get<ServerState, ServerContext>('/', (ctx) => {
  const res = ctx.db.get<IUser>(COLLECTION_NAME.USER, {});
  ctx.body = removeFields(res, ["password"]);
});

adminRouter.delete<ServerState, ServerContext>('/:id', async (ctx) => {
  const { id } = ctx.params;
  if (ctx.state.adminId === id || ctx.state.userId === id) throw new InputError("Protected users");
  ctx.db.delete(COLLECTION_NAME.USER, id);
  await fsPromises.rm(`${EnumPath.STORE}/${id}`, { recursive: true, force: true });
  ctx.body = "success";
});

userRouter.use(async (ctx, next) => {
  ctx.log = Log({ label: "user" });
  await next();
});

userRouter.post<ServerState, ServerContext, ReqUserCreate>('/', async (ctx) => {
  const res = await handleUserCreate(ctx.log, ctx.db, ctx.body);
  ctx.body = removeFields(res.body, ["password"]);
  ctx.status = res.status;
});

userRouter.use(needLogin.routes());
userRouter.use(adminRouter.routes());

export default userRouter;