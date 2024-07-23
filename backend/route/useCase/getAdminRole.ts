import { COLLECTION_NAME, DB } from "../../lib/database";

import { IRole } from "../../type/IRole";

export const getAdminRole = (db: DB): IRole => {
  const res = db.get<IRole>(COLLECTION_NAME.ROLE, { name: "Admin" });
  return res[0];
}