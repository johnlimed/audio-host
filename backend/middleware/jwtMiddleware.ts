import { AuthenticationError } from "../error/AuthenticationError";
import { verifyJWT } from "../lib/jwt";

export const jwtMiddleware = async (ctx, next) => {
  const { authorization } = ctx.request.header;

  if (authorization) {
    const payload = verifyJWT(ctx.log, authorization);
    if (!payload || (payload && Object.keys(payload).length === 0)) {
      throw new AuthenticationError();
    }
  } else {
    throw new AuthenticationError();
  }
  await next();
}