import { Logger } from "winston";

import { generateUUID } from "../useCase/generateUUID";

import { COLLECTION_NAME, DB } from "../../lib/database";
import { hashPassword } from "../../lib/password";

import { InputError } from "../../error/InputError";
import { UserExistError } from "../../error/UserExistError";

import { IUser } from "../../type/IUser";
import { ResHandler } from "../../type/ResHandler";
import { ReqUserCreate } from "../../type/ReqUserCreate";

export const handleUserCreate = async (log: Logger, db: DB, req: ReqUserCreate): Promise<ResHandler<string>> => {
  const { username, password, name } = req;

  if (!username || !password || !name) throw new InputError("One of the input is missing. Check input.");

  const existingUser = db.get<IUser>(COLLECTION_NAME.USER, { username });

  if (existingUser && existingUser.length > 0) {
    log.info("[user][create] Existing user found", { username, password, name });
    throw new UserExistError();
  }
  
  log.info("[user][create] Registering new user", { username, password, name });
  const hashedPassword = await hashPassword(password);
  const id = generateUUID();
  db.insert<IUser>(COLLECTION_NAME.USER, { id, username, password: hashedPassword, name, archive: false });
  
  return {
    body: "successfully registered user.",
    status: 200,
  }
}