import Router from "@koa/router";
import argon2 from "argon2";

import { IUser } from "../type/IUser";
import { COLLECTION_NAME, } from "../database";
import { ServerState } from "../type/ServerState";
import { ServerContext } from "../type/ServerContext";

const authRouter = new Router();

interface RegReq {
  username: string;
  password: string;
}

authRouter.post<ServerState, ServerContext, RegReq>('/register', async (ctx, next) => {
  const { username, password } = ctx.body;
  ctx.log.info("Registering new user", username, password);
  const hashedPassword = await argon2.hash(password);
  ctx.db.insert<IUser>(COLLECTION_NAME.USER, { username, password: hashedPassword });
  await next();
});

// authRouter.get('/login', (ctx) => {
//   ctx.body = "login";
// });

// authRouter.get('/logout', (ctx) => {
//   ctx.body = "logout";
// });

export default authRouter;