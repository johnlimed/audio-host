import { Logger } from "winston";

import { IRole } from "../../type/IRole";
import { ResHandler } from "../../type/ResHandler";
import { ReqRoleUpdate } from "../../type/ReqRoleUpdate";

import { InputError } from "../../error/InputError";

import { COLLECTION_NAME, DB } from "../../lib/database";

export const handleRoleUpdate = (log: Logger, db: DB, id: string, body: ReqRoleUpdate): ResHandler<IRole> => {
  if (!id) throw new InputError("Id is malformed, cannot find role to update");
  if (Object.keys(body).length === 0) throw new InputError("Nothing to update check input");
  
  const update = body;
  
  log.info(`[role][update] Updating role: ${id}`, update);
  const updated = db.update<ReqRoleUpdate, IRole>(COLLECTION_NAME.ROLE, id, update);

  return { body: updated };
}