import { COLLECTION_NAME, DB } from "../../lib/database";

import { IRole } from "../../type/IRole";

export const getUserRole = (db: DB): IRole => {
  const res = db.get<IRole>(COLLECTION_NAME.ROLE, { name: "User" });
  return res[0];
}