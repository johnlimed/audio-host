import { Logger } from "winston";
import argon2 from "argon2";

import { COLLECTION_NAME, DB } from "../../lib/database";
import { IUser } from "../../type/IUser";
import { UserExistError } from "../../error/UserExistError";
import { generateUUID } from "../useCase/generateUUID";
import { ResHandler } from "../../type/ResHandler";
import { ReqRegister } from "../../type/ReqRegister";

export const handleUserRegister = async (log: Logger, db: DB, req: ReqRegister): Promise<ResHandler> => {
  const { username, password } = req;

  const existingUser = db.get<IUser>(COLLECTION_NAME.USER, { username });

  if (existingUser && existingUser.length > 0) {
    log.info("[auth][register] Existing user found", { username, password });
    throw new UserExistError();
  }
  
  log.info("[auth][register] Registering new user", { username, password });
  const hashedPassword = await argon2.hash(password);
  const id = generateUUID();
  db.insert<IUser>(COLLECTION_NAME.USER, { id, username, password: hashedPassword });
  
  return {
    body: "successfully registered user.",
    status: 200,
  }
}