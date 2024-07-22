import { Logger } from "winston";
import loki, { LokiFsAdapter } from "lokijs";

export enum COLLECTION_NAME {
  USER = "users",
}

export const COLLECTIONS = Object.values(COLLECTION_NAME);

export interface DB {
  db: () => Loki,
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
    Promise.all(COLLECTIONS.map((collection: string) => {
      const values = db.getCollection(collection);

      if (values === null) {
        if (collection === COLLECTION_NAME.USER) {
          const newCollection = db.addCollection(collection);
          newCollection.insert({ username: "admin", password: "$argon2id$v=19$m=65536,t=3,p=4$svTr0wptoFUtsi5uOwrF4g$VWqZTW7UjsJnb7I9MfTCoBvKPN7Mqs/dmzw8BJW/fEA", id: "99ae8e89-a04b-48fa-a3b0-e38013b167d1" });
        } else {
          db.addCollection(collection);
        }
      }
    }));

    dbReport();
  }

  const db = new loki('./lib/database/audiohost.db', {
    adapter: new LokiFsAdapter(),
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 4000 // save every four seconds for our example
  });

  return {
    db: () => db,
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