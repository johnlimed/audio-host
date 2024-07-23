import { Logger } from "winston";
import { COLLECTION_NAME, DB } from "../lib/database";
import { ResHandler } from "../type/ResHandler";
import { ITrack } from "../type/ITrack";

export const handleGetOwnTracks = (log: Logger, db: DB, id: string): ResHandler<ITrack[]> => {
  log.info(`Retrieving ${id}'s tracks`);
  const tracks = db.get<ITrack>(COLLECTION_NAME.TRACK, { ownerId: id });
  return {
    body: tracks
  };
}