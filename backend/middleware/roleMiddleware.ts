import { COLLECTION_NAME, DB } from "../lib/database";
import { EnumRole } from "../type/EnumRole";
import { IRole } from "../type/IRole";

export const roleMiddleware = (db: DB, adminId: string, userId: string) => {
  const roles = db.get<IRole>(COLLECTION_NAME.ROLE, {});

  let adminRoleId: string;
  let userRoleId: string;

  const roleMap = roles.reduce((prev, cur) => {
    if (cur.name === EnumRole.ADMIN) adminRoleId = cur.id;
    if (cur.name === EnumRole.USER) userRoleId = cur.id;
    prev[cur.name] = cur;
    return prev;
  }, {});

  return async (ctx, next) => {
    ctx.state = {
      role: roleMap,
      adminRoleId,
      userRoleId,
      adminId,
      userId,
    }
    await next();
  }
}