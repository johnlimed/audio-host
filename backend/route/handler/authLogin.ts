import { Logger } from "winston";

import { signJWT, verifyJWT } from "../../lib/jwt";
import { verifyPassword } from "../../lib/password";
import { COLLECTION_NAME, DB } from "../../lib/database";

import { IUser } from "../../type/IUser";
import { ReqLogin } from "../../type/ReqLogin";
import { ResHandler } from "../../type/ResHandler";

import { AuthenticationError } from "../../error/AuthenticationError";

export const handleUserLogin = async (log: Logger, db: DB, req: ReqLogin, authstring?: string): Promise<ResHandler<{ jwt: string}>> => {
  const { username, password } = req; 
  
  const user = db.get<IUser>(COLLECTION_NAME.USER, { username });

  if (!user || user.length === 0) {
    log.error("[auth][login] Unknown username", { username });
    throw new AuthenticationError();
  }

  /**
   * Check for jwt token and verify it.
   */
  if (authstring) {
    log.info("[auth][login] JWT Found, verifying token.");
    const payload = verifyJWT(log, authstring);

    if (payload && Object.keys(payload).length > 0) {
      log.info(`[auth][login] JWT verified, bypassing check for ${payload.username}`);
      return {
        body: { jwt: authstring.split(" ")[1] }
      }
    }
  }
  
  /**
   * If jwt token is not provided 
   */
  await verifyPassword(log, user[0].password, password, username);
  const token = signJWT({ username, id: user[0].id });

  return {
    body: { jwt: token },
  }
}