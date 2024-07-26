import jwt from "jsonwebtoken";
import { Logger } from "winston";

import { IJWTPayload } from "../../type/IJWTPayload";

import { AuthenticationMethodError } from "../../error/AuthenticationMethodError";
import { AuthenticationError } from "../../error/AuthenticationError";
import { AuthenticationMalformError } from "../../error/AuthenticationMalformError";
import { AuthenticationExpiredError } from "../../error/AuthenticationExpiredError";

const SECRET = "secret";

export const signJWT = (payload: IJWTPayload, options?: jwt.SignOptions): string => {
  return jwt.sign(payload, SECRET, options || { expiresIn: "1 days"});
}

export const verifyJWT = (log: Logger, authString: string): IJWTPayload => {
  try {
    const authSplit = authString.split(" ");
    const method = authSplit[0];
    if (method.toLowerCase() !== "bearer") throw new AuthenticationMethodError();
    const token = authSplit[1];
    const decoded = jwt.verify(token, SECRET) as IJWTPayload;
    return decoded;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new AuthenticationExpiredError();
    }

    log.error(err);
    if (err.name === "JsonWebTokenError") {
      throw new AuthenticationMalformError();
    }
    
    throw new AuthenticationError();
  }
}