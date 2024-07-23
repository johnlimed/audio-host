import { Logger } from "winston";
import { COLLECTION_NAME, DB } from "../../lib/database";
import { ReqUserUpdate } from "../../type/ReqUserUpdate";
import { ResHandler } from "../../type/ResHandler";
import { InputError } from "../../error/InputError";
import { hashPassword } from "../../lib/password";
import { IUser } from "../../type/IUser";

export const handleUserUpdate = async (log: Logger, db: DB, id: string, body: ReqUserUpdate): Promise<ResHandler<IUser>> => {
  if (!id) throw new InputError("Id is malformed, cannot find user to update");
  if (Object.keys(body).length === 0) throw new InputError("Nothing to update check input");
  
  const update = body;
  const { password } = body;
  if (password) {
    update.password = await hashPassword(password);
  }
  log.info(`[user][update] Updating user: ${id}`, update);
  const updated = await db.update<ReqUserUpdate, IUser>(COLLECTION_NAME.USER, id, update);

  const res = { body: updated };
  return res;
}