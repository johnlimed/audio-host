import { Logger } from "winston";
import loki, { LokiFsAdapter } from "lokijs";

export enum COLLECTION_NAME {
  USER = "users",
  ROLE = "roles",
}

export const COLLECTIONS = Object.values(COLLECTION_NAME);

export interface DB {
  db: () => Loki,
  close: () => void,
  update: <U, I>(collectionName: COLLECTION_NAME, id: string, update: U) => I;
  insert: <I>(collectionName: COLLECTION_NAME, values: I) => I,
  get: <I>(collectionName: COLLECTION_NAME, value: any) => I[],
  delete: (collectionName: COLLECTION_NAME, id: string) => boolean,
  archive: (collectionName: COLLECTION_NAME, id: string) => boolean,
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
    COLLECTIONS.map((collection: string) => {
      const values = db.getCollection(collection);

      if (values === null) {
        if (collection === COLLECTION_NAME.USER) {
          const newCollection = db.addCollection(collection);
          newCollection.insert({ id: "99ae8e89-a04b-48fa-a3b0-e38013b167d1", username: "admin", password: "$argon2id$v=19$m=65536,t=3,p=4$svTr0wptoFUtsi5uOwrF4g$VWqZTW7UjsJnb7I9MfTCoBvKPN7Mqs/dmzw8BJW/fEA", name: "john doe", archive: false });
          newCollection.insert({ id: "06b16695-7828-4046-9762-b7e7e241f305", username: "normal user", password: "$argon2id$v=19$m=65536,t=3,p=4$8fhrNV56s2Rc75S6tFxYLw$VCGAHT9RecGxMpWtzJYcEkjd7BxX7TUI7P0bs+HVMLo", name: "jon doe", archive: false });
        } else {
          db.addCollection(collection);
        }
      }
    });

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
    update: <U, I>(collectionName: COLLECTION_NAME, id: string, update: U): I => {
      const col = db.getCollection(collectionName);
      const users = col.find({ id });
      
      const res = {
        ...users[0],
        ...update,
      }
      col.update(res);
      
      return res;
    },
    delete: (collectionName: COLLECTION_NAME, id: string): boolean => {
      const col = db.getCollection(collectionName);
      col.findAndRemove({ id });
      return true;
    },
    archive: (collectionName: COLLECTION_NAME, id: string): boolean => {
      const col = db.getCollection(collectionName);
      const res = col.find({ id });
      const update = {
        ...res,
        archive: true,
      }
      col.update(update);
      return true;
    },
    close: () => { db.close() },
  };
}