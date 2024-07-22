// import { AuthenticationError } from "../error/AuthenticationError";
// import { verifyJWT } from "../lib/jwt";

export const jwtMiddleware = async (ctx, next) => {
  console.log(ctx.header);
  // const { jwt } = ctx.header;
  // if (jwt) {
  //   const payload = verifyJWT(jwt);
  //   // if (username !== payload.username || id !== payload.id) {
  //   //   throw new AuthenticationError();
  //   // }
  // } else {
  //   throw new AuthenticationError();
  // }
  await next();
}