import jwt from "jsonwebtoken";

import { JwtPayload } from "../../type/JwtPayload";

const SECRET = "secret";

export const signJWT = (payload: JwtPayload): string => {
  return jwt.sign(payload, SECRET);
}

export const verifyJWT = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    return decoded;
  } catch (err) {
    // err
  }
}