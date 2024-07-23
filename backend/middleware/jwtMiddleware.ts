import { AuthenticationError } from "../error/AuthenticationError";
import { AuthorizationError } from "../error/AuthorizationError";
import { UnexpectedServerError } from "../error/UnexpectedServerError";
import { verifyJWT } from "../lib/jwt";
import { EnumRole } from "../type/EnumRole";
import { IJWTPayload } from "../type/IJWTPayload";
import { IRole } from "../type/IRole";

/**
 * Attach middleware if authorization is required.
 * Specify role if specifc restriction is required.
 * @param roleRestriction 
 * @returns 
 */
export const jwtMiddleware = (roleRestriction?: EnumRole) => {
  return async (ctx, next) => {
    const { authorization } = ctx.request.header;
    
    // Check for jwt first
    let payload: IJWTPayload;
    if (authorization) {
      payload = verifyJWT(ctx.log, authorization);
      if (!payload || (payload && Object.keys(payload).length === 0)) {
        throw new AuthenticationError();
      }
    } else {
      throw new AuthenticationError();
    }

    // If role restriction is required, check for role.
    if (roleRestriction) {
      const restrictedFor: IRole = ctx.state.roles[roleRestriction];
      if (!restrictedFor) throw new UnexpectedServerError(`Unknown security clearance for role: ${roleRestriction}`);

      if (payload.roleLevel > restrictedFor.level) {
        throw new AuthorizationError();
      }
    }

    await next();
  }
}