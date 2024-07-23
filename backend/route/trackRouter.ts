import Router from "@koa/router";
import { Log } from "../lib/logger";
import { ServerContext } from "../type/ServerContext";
import { ServerState } from "../type/ServerState";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import { handleGetOwnTracks } from "../handler/trackGetOwn";
import { EnumRole } from "../type/EnumRole";
import { ITrack } from "../type/ITrack";
import { COLLECTION_NAME } from "../lib/database";

const trackRouter = new Router();
const userRouter = new Router();
const adminRouter = new Router();

userRouter.use(jwtMiddleware());
/**
 * Get all of own tracks
 */
userRouter.get<ServerState, ServerContext>("/", async (ctx, next) => {
  const res = handleGetOwnTracks(ctx.log, ctx.db, ctx.state.jwt.id);
  ctx.body = res.body;
  await next();
});

/**
 * Admin track routes
 */
adminRouter.use(jwtMiddleware(EnumRole.ADMIN));
adminRouter.get<ServerState, ServerContext>("/", async (ctx, next) => {
  const tracks = ctx.db.get<ITrack>(COLLECTION_NAME.TRACK, {});
  ctx.body = tracks;
  await next();
});

trackRouter.use(async (ctx, next) => {
  ctx.log = Log({ label: "track" });
  await next();
});

trackRouter.use(userRouter.routes());
trackRouter.use("/admin", adminRouter.routes());

export default trackRouter;