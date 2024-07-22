import Router from "@koa/router";
import argon2 from "argon2";

import { Log } from "../lib/logger";
import { COLLECTION_NAME, } from "../lib/database";

import { IUser } from "../type/IUser";
import { ServerState } from "../type/ServerState";
import { ServerContext } from "../type/ServerContext";

import { AuthenticationError } from "../error/AuthenticationError";
import { signJWT } from "../lib/jwt";
import { handleUserRegister } from "./handler/handleUserRegister";

const authRouter = new Router();

authRouter.use(async (ctx, next) => {
  ctx.log = Log({ label: "auth" })
  await next();
});

interface ReqRegister {
  username: string;
  password: string;
}

authRouter.post<ServerState, ServerContext, ReqRegister>('/register', async (ctx, next) => {
  const res = await handleUserRegister(ctx.log, ctx.db, ctx.body);
  ctx.body = res.body;
  ctx.status = res.status;

  await next();
});

interface ReqLogin {
  username: string;
  password: string;
}

authRouter.post<ServerState, ServerContext, ReqLogin>('/login', async (ctx, next) => {
  const { username, password } = ctx.body;

  const user = ctx.db.get<IUser>(COLLECTION_NAME.USER, { username });
  if (!user || user.length === 0) {
    ctx.log.error("[auth][login] Unknown username", { username });
    throw new AuthenticationError();
  }
  
  const match = await argon2.verify(user[0].password, password).catch((err) => {
    ctx.log.error(err);
    throw new AuthenticationError();
  });

  if (!match) {
    ctx.log.error("[auth][login] Wrong password", username);
    throw new AuthenticationError();
  }
  
  const token = signJWT({ username, id: user[0].id });

  ctx.state.token = token;
  ctx.state.username = username;
  ctx.state.id = user[0].id;
  ctx.body = token;

  await next();
});

// authRouter.get('/logout', (ctx) => {
//   ctx.body = "logout";
// });

export default authRouter;