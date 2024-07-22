import loki from "lokijs";
import { LokiFsAdapter } from "lokijs";
import { Logger } from "winston";

const collections = ["users"];

export const initDB = (log: Logger) => {
  const dbReport = () => {
    collections.forEach((collection: string) => {
      const values = db.getCollection(collection);
      log.info(`[dbMiddleware] Collection ${collection} loaded with ${values.count()} entries`);
    });
  }

  // implement the autoloadback referenced in loki constructor
  const databaseInitialize = () => {
    // on the first load of (non-existent database), we will have no collections so we can 
    // detect the absence of our collections and add (and configure) them now.
    collections.forEach((collection: string) => {
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

  return db;
}