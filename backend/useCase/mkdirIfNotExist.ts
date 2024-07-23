import { promises as fsPromises } from 'fs';
import { Logger } from 'winston';

export const mkdirIfNotExist = async (log: Logger, filepath: string) => {
  await fsPromises.stat(filepath).catch(async (err) => {
    if (err.message.indexOf("no such file or directory") > -1) {
      log.warn(err);
      await fsPromises.mkdir(filepath);
    } else {
      log.error(err);
    }
  });
}