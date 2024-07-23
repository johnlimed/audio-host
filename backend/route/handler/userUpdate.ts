import { Logger } from "winston";
import { COLLECTION_NAME, DB } from "../../lib/database";
import { ReqUserUpdate } from "../../type/ReqUserUpdate";
import { ResHandler } from "../../type/ResHandler";
import { InputError } from "../../error/InputError";

export const handleUserUpdate = (log: Logger, db: DB, id: string, body: ReqUserUpdate): ResHandler => {
  if (Object.keys(body).length === 0) throw new InputError("Nothing to update check input");
  log.info(`[user][update] Updating user: ${id}`, body);
  const res = db.update(COLLECTION_NAME.USER, id, body);

  return {
    body: res
  }
}