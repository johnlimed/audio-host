import winston, { Logger, format } from "winston";

export const Log = (meta?: { [key: string]: string }): Logger => {
  return winston.createLogger({
    format: format.combine(
      format.label({ label: 'Server', ...meta }),
      format.timestamp(),
      format.simple()
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  })
};