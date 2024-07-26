import Router from "@koa/router";
import multer from '@koa/multer';
import fs, { promises as fsPromises } from "fs";

import { Log } from "../lib/logger";
import { COLLECTION_NAME } from "../lib/database";

import { jwtMiddleware } from "../middleware/jwtMiddleware";

import { handleGetOwnTracks } from "../handler/trackGetOwn";

import { ServerContext } from "../type/ServerContext";
import { ServerState } from "../type/ServerState";
import { EnumRole } from "../type/EnumRole";
import { ITrack } from "../type/ITrack";
import { EnumPath } from "../type/EnumPath";
import { generateUUID } from "../useCase/generateUUID";
import { AuthorizationError } from "../error/AuthorizationError";
import { InputError } from "../error/InputError";
import { removeFields } from "../useCase/removeFields";

const trackRouter = new Router();
const userRouter = new Router();
const adminRouter = new Router();


userRouter.use(jwtMiddleware());
/**
 * Get all of own tracks
 */
userRouter.get<ServerState, ServerContext>("/", async (ctx) => {
  const data = handleGetOwnTracks(ctx.log, ctx.db, ctx.state.jwt.id);
  const res = removeFields(data.body, ["filepath"]);
  
  ctx.body = res;
});

const upload = multer();

userRouter.post<ServerState, ServerContext>("/", upload.single("file"), async (ctx) => {
  const id = generateUUID();
  const filepath = `${EnumPath.STORE}/${ctx.state.jwt.id}/${id}_${encodeURI(ctx.file.originalname)}`;
  await fsPromises.writeFile(filepath, ctx.file.buffer);
  const track = ctx.db.insert<ITrack>(COLLECTION_NAME.TRACK, { id, filename: ctx.file.originalname, filepath, ownerId: ctx.state.jwt.id, archive: false });
  ctx.log.info(`${ctx.state.jwt.id} Uploaded track ${id}`);
  const res = removeFields(track, ["filepath"]);
  ctx.body = res;
});

userRouter.get<ServerState, ServerContext>("/:id", (ctx) => {
  const { id } = ctx.params;
  if (!id) throw new InputError("Id not provided");
  ctx.log.info(`Playing ${ctx.state.jwt.id}'s track ${id}`);
  const tracks = ctx.db.get<ITrack>(COLLECTION_NAME.TRACK, { id });

  if (!tracks || tracks.length === 0) throw new InputError("Track not found");
  if (tracks[0].ownerId !== ctx.state.jwt.id) throw new AuthorizationError();

  ctx.response.set('content-type', 'application/json');
  ctx.body = fs.createReadStream(tracks[0].filepath);
});

userRouter.delete<ServerState, ServerContext>("/:id", async (ctx) => {
  const { id } = ctx.params;
  if (!id) throw new InputError("Id not provided");
  const tracks = ctx.db.get<ITrack>(COLLECTION_NAME.TRACK, { id });
  
  if (!tracks || tracks.length === 0) throw new InputError("Track not found");
  if (tracks[0].ownerId !== ctx.state.jwt.id) throw new AuthorizationError();

  ctx.db.delete(COLLECTION_NAME.TRACK, id);
  await fsPromises.rm(tracks[0].filepath);
});

/**
 * Admin track routes
 */
adminRouter.use(jwtMiddleware(EnumRole.ADMIN));
adminRouter.get<ServerState, ServerContext>("/", async (ctx) => {
  const data = ctx.db.get<ITrack>(COLLECTION_NAME.TRACK, {});
  const tracks = removeFields(data, ["filepath"]);

  ctx.body = tracks;
});

trackRouter.use(async (ctx, next) => {
  ctx.log = Log({ label: "track" });
  await next();
});

trackRouter.use("/admin", adminRouter.routes());
trackRouter.use(userRouter.routes());

export default trackRouter;