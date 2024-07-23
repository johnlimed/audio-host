import { Logger } from "winston";
import argon2 from "argon2";

import { COLLECTION_NAME, DB } from "../../lib/database";
import { IUser } from "../../type/IUser";
import { UserExistError } from "../../error/UserExistError";
import { generateUUID } from "../useCase/generateUUID";
import { ResHandler } from "../../type/ResHandler";
import { ReqRegister } from "../../type/ReqRegister";
import { InputError } from "../../error/InputError";
import { hashPassword } from "../../lib/password";

export const handleUserCreate = async (log: Logger, db: DB, req: ReqRegister): Promise<ResHandler> => {
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
  db.insert<IUser>(COLLECTION_NAME.USER, { id, username, password: hashedPassword, name });
  
  return {
    body: "successfully registered user.",
    status: 200,
  }
}