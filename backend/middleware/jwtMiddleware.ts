import { AuthenticationError } from "../error/AuthenticationError";
import { verifyJWT } from "../lib/jwt";

export const jwtMiddleware = async (ctx, next) => {
  const { jwt } = ctx;
  if (jwt) {
    const payload = verifyJWT(jwt);
    if (ctx.state.username !== payload.username || ctx.state.id !== payload.id) {
      throw new AuthenticationError();
    }
  } else {
    throw new AuthenticationError();
  }
  await next();
}