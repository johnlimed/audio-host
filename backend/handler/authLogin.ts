import { Logger } from "winston";

import { signJWT, verifyJWT } from "../lib/jwt";
import { verifyPassword } from "../lib/password";
import { COLLECTION_NAME, DB } from "../lib/database";

import { IRole } from "../type/IRole";
import { IUser } from "../type/IUser";
import { ReqLogin } from "../type/ReqLogin";
import { ResHandler } from "../type/ResHandler";

import { AuthenticationError } from "../error/AuthenticationError";
import { UnexpectedServerError } from "../error/UnexpectedServerError";

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
  
  const roles = db.get<IRole>(COLLECTION_NAME.ROLE, { id: user[0].roleId });
  if (!roles || roles.length === 0) throw new UnexpectedServerError("User without role");
  
  const token = signJWT({ username, id: user[0].id, roleId: user[0].roleId, roleLevel: roles[0].level });

  return {
    body: { jwt: token },
  }
}