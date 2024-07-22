import Router from "@koa/router";
import argon2 from "argon2";

import { UserExistError } from "../error/UserExistError";
import { IUser } from "../type/IUser";
import { COLLECTION_NAME, } from "../database";
import { ServerState } from "../type/ServerState";
import { ServerContext } from "../type/ServerContext";
import { Log } from "../logger";

const authRouter = new Router();

interface RegReq {
  username: string;
  password: string;
}

authRouter.use(async (ctx, next) => {
  ctx.log = Log({ label: "auth" })
  await next();
});

authRouter.post<ServerState, ServerContext, RegReq>('/register', async (ctx, next) => {
  const { username, password } = ctx.body;

  const existingUser = ctx.db.get<IUser>(COLLECTION_NAME.USER, { username });
  console.log(existingUser)
  if (existingUser && existingUser.length > 0) {
    ctx.log.info("Existing user found", { username, password });
    throw new UserExistError();
  } else {
    ctx.log.info("Registering new user", { username, password });
    const hashedPassword = await argon2.hash(password);
    ctx.db.insert<IUser>(COLLECTION_NAME.USER, { username, password: hashedPassword });
  }

  await next();
});

// authRouter.get('/login', (ctx) => {
//   ctx.body = "login";
// });

// authRouter.get('/logout', (ctx) => {
//   ctx.body = "logout";
// });

export default authRouter;