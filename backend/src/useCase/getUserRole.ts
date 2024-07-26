import { COLLECTION_NAME, DB } from "../lib/database";
import { EnumRole } from "../type/EnumRole";

import { IRole } from "../type/IRole";

export const getUserRole = (db: DB): IRole => {
  const res = db.get<IRole>(COLLECTION_NAME.ROLE, { name: EnumRole.USER.toString() });
  return res[0];
}