import loki from "lokijs";
import { LokiFsAdapter } from "lokijs";
import { Logger } from "winston";

export enum COLLECTION_NAME {
  USER = "users",
}

export const COLLECTIONS = Object.values(COLLECTION_NAME);

export interface DB {
  db: Loki,
  close: () => void,
  insert: <I>(collectionName: COLLECTION_NAME, values: I) => I,
  get: <I>(collectionName: COLLECTION_NAME, value: any) => I[],
}

export const initDB = (log: Logger): DB => {
  const dbReport = () => {
    COLLECTIONS.forEach((collection: string) => {
      const values = db.getCollection(collection);
      log.info(`[dbMiddleware] Collection ${collection} loaded with ${values.count()} entries`);
    });
  }

  // implement the autoloadback referenced in loki constructor
  const databaseInitialize = () => {
    // on the first load of (non-existent database), we will have no collections so we can 
    // detect the absence of our collections and add (and configure) them now.
    COLLECTIONS.forEach((collection: string) => {
      const values = db.getCollection(collection);

      if (values === null) {
        if (collection === "users") {
          const newCollection = db.addCollection(collection);
          newCollection.insert({ name: "admin", password: "", salt: "" });
        } else {
          db.addCollection(collection);
        }
      }
    });

    dbReport();
  }

  const db = new loki('./database/audiohost.db', {
    adapter: new LokiFsAdapter(),
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 4000 // save every four seconds for our example
  });

  return {
    db,
    insert: <I>(collectionName: COLLECTION_NAME, values: I): I => {
      return db.getCollection(collectionName).insert(values);
    },
    get: <I>(collectionName: COLLECTION_NAME, value: any): I[] => {
      const col = db.getCollection(collectionName);
      return col.find(value);
    },
    close: () => { db.close() },
  };
}