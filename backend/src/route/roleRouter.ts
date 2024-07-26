import Router from "@koa/router";

import { IRole } from "../type/IRole";
import { ServerState } from "../type/ServerState";
import { ServerContext } from "../type/ServerContext";
import { ReqUserCreate } from "../type/ReqUserCreate";
import { ReqRoleUpdate } from "../type/ReqRoleUpdate";

import { Log } from "../lib/logger";
import { COLLECTION_NAME } from "../lib/database";

import { handleRoleCreate } from "../handler/roleCreate";
import { handleRoleUpdate } from "../handler/roleUpdate";
import { InputError } from "../error/InputError";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import { EnumRole } from "../type/EnumRole";

const roleRouter = new Router();

roleRouter.use(async (ctx, next) => {
  ctx.log = Log({ label: "role" });
  await next();
});

/**
 * Admin routes
 */
roleRouter.use(jwtMiddleware(EnumRole.ADMIN));

roleRouter.post<ServerState, ServerContext, ReqUserCreate>('/', async (ctx) => {
  const res = await handleRoleCreate(ctx.log, ctx.db, ctx.body);
  ctx.body = res.body;
  ctx.status = res.status;
});

roleRouter.get<ServerState, ServerContext>('/', (ctx) => {
  const res = ctx.db.get<IRole>(COLLECTION_NAME.ROLE, {});
  ctx.body = res;
});

roleRouter.get<ServerState, ServerContext>('/:id', (ctx) => {
  const res = ctx.db.get<IRole>(COLLECTION_NAME.ROLE, { id: ctx.params.id });
  ctx.body = res[0];
});

roleRouter.patch<ServerState, ServerContext, ReqRoleUpdate>('/:id', (ctx) => {
  const { id } = ctx.params;
  const res = handleRoleUpdate(ctx.log, ctx.db, id, ctx.body, ctx.state.adminRoleId, ctx.state.userRoleId);
  ctx.body = res.body;
});

roleRouter.delete<ServerState, ServerContext>('/:id', (ctx) => {
  const { id } = ctx.params;
  if (id === ctx.state.userRoleId || id === ctx.state.adminRoleId) {
    throw new InputError("Protected role");
  }
  const res = ctx.db.delete(COLLECTION_NAME.ROLE, id);
  ctx.body = res;
});

export default roleRouter;