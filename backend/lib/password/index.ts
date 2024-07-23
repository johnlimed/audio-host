import argon2 from "argon2";
import { Logger } from "winston";
import { AuthenticationError } from "../../error/AuthenticationError";

export const verifyPassword = async (log: Logger, hash: string, password: string, username: string) => {
  const match = await argon2.verify(hash, password).catch((err) => {
    log.error("Failed to verify password", err);
    throw new AuthenticationError();
  });

  if (!match) {
    log.error("[auth][login] Wrong password", username);
    throw new AuthenticationError();
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
}