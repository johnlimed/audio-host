import { COLLECTION_NAME, DB } from "../lib/database";
import { EnumRole } from "../type/EnumRole";

import { IRole } from "../type/IRole";

export const getAdminRole = (db: DB): IRole => {
  const res = db.get<IRole>(COLLECTION_NAME.ROLE, { name: EnumRole.ADMIN.toString() });
  return res[0];
}