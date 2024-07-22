import Router from "@koa/router";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import { Log } from "../lib/logger";
import { COLLECTION_NAME, } from "../lib/database";

import { IUser } from "../type/IUser";
import { ServerState } from "../type/ServerState";
import { ServerContext } from "../type/ServerContext";

import { UserExistError } from "../error/UserExistError";
import { AuthenticationError } from "../error/AuthenticationError";
import { generateUUID } from "./useCase/generateUUID";

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
  const { username, password } = ctx.body;

  const existingUser = ctx.db.get<IUser>(COLLECTION_NAME.USER, { username });

  if (existingUser && existingUser.length > 0) {
    ctx.log.info("[auth][register] Existing user found", { username, password });
    throw new UserExistError();
  } else {
    ctx.log.info("[auth][register] Registering new user", { username, password });
    const hashedPassword = await argon2.hash(password);
    const id = generateUUID();
    ctx.db.insert<IUser>(COLLECTION_NAME.USER, { id, username, password: hashedPassword });
    ctx.body = "User registered.";
    ctx.status = 200;
  }

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
  console.log(user)
  // TODO: JWT
  jwt.sign({ username });

  ctx.body = "success";

  await next();
});

// authRouter.get('/logout', (ctx) => {
//   ctx.body = "logout";
// });

export default authRouter;