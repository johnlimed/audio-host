import argon2 from "argon2";
import { Logger } from "winston";

import { signJWT } from "../../lib/jwt";
import { COLLECTION_NAME, DB } from "../../lib/database";

import { IUser } from "../../type/IUser";
import { ReqLogin } from "../../type/ReqLogin";
import { ResHandler } from "../../type/ResHandler";

import { AuthenticationError } from "../../error/AuthenticationError";

export const handleUserLogin = async (log: Logger, db: DB, req: ReqLogin): Promise<ResHandler> => {
  const { username, password } = req;

  const user = db.get<IUser>(COLLECTION_NAME.USER, { username });
  if (!user || user.length === 0) {
    log.error("[auth][login] Unknown username", { username });
    throw new AuthenticationError();
  }

  const match = await argon2.verify(user[0].password, password).catch((err) => {
    log.error(err);
    throw new AuthenticationError();
  });

  if (!match) {
    log.error("[auth][login] Wrong password", username);
    throw new AuthenticationError();
  }

  const token = signJWT({ username, id: user[0].id });

  return {
    body: token,
    state: {
      token,
      username,
      id: user[0].id,
    }
  }
}