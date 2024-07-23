import { Logger } from "winston";

import { generateUUID } from "../useCase/generateUUID";
import { getAdminRole } from "../useCase/getAdminRole";

import { hashPassword } from "../lib/password";
import { COLLECTION_NAME, DB } from "../lib/database";

import { InputError } from "../error/InputError";
import { UserExistError } from "../error/UserExistError";

import { IUser } from "../type/IUser";
import { IRole } from "../type/IRole";
import { ResHandler } from "../type/ResHandler";
import { getUserRole } from "../useCase/getUserRole";
import { ReqUserCreate } from "../type/ReqUserCreate";
import { mkdirIfNotExist } from "../useCase/mkdirIfNotExist";
import { EnumPath } from "../type/EnumPath";

export const handleUserCreate = async (log: Logger, db: DB, req: ReqUserCreate): Promise<ResHandler<string>> => {
  const { username, password, name, admin } = req;

  if (!username || !password || !name) throw new InputError("One of the input is missing. Check input.");

  const existingUser = db.get<IUser>(COLLECTION_NAME.USER, { username });

  if (existingUser && existingUser.length > 0) {
    log.info("[user][create] Existing user found", { username, password, name });
    throw new UserExistError();
  }
  
  log.info("[user][create] Registering new user", { username, password, name });
  const hashedPassword = await hashPassword(password);
  const id = generateUUID();
  
  let role: IRole;
  if (admin) role = getAdminRole(db);
  else role = getUserRole(db);
  
  db.insert<IUser>(COLLECTION_NAME.USER, { id, username, password: hashedPassword, name, roleId: role.id, archive: false });

  await mkdirIfNotExist(log, EnumPath.STORE + `/${id}`);
  
  return {
    body: "successfully registered user.",
    status: 200,
  }
}