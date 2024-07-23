import { Logger } from "winston";

import { generateUUID } from "../useCase/generateUUID";

import { COLLECTION_NAME, DB } from "../../lib/database";

import { InputError } from "../../error/InputError";
import { AlreadyExistError } from "../../error/AlreadyExistError";

import { IRole } from "../../type/IRole";
import { ResHandler } from "../../type/ResHandler";
import { ReqRoleCreate } from "../../type/ReqRoleCreate";


export const handleRoleCreate = async (log: Logger, db: DB, req: ReqRoleCreate): Promise<ResHandler<IRole>> => {
  const { name, level } = req;

  if (!name || !level) throw new InputError("Input missing. Check input.");

  const existingRole = db.get<IRole>(COLLECTION_NAME.ROLE, { name });
  if (existingRole && existingRole.length > 0) {
    log.info("[role][create] Existing role found", { name });
    throw new AlreadyExistError(name);
  }

  const sameLevel = db.get<IRole>(COLLECTION_NAME.ROLE, { level });
  if (sameLevel && sameLevel.length > 0) {
    log.info("[role][create] Role of same level is found", { roleName: name, conflictingRole: sameLevel[0].name });
    throw new InputError("Role of same level found. Cannot create role of same level");
  }
  
  log.info("[role][create] Registering new role", { name });
  const id = generateUUID();
  const res = db.insert<IRole>(COLLECTION_NAME.ROLE, { id, name, level, archive: false });
  
  return {
    body: res,
    status: 200,
  }
}