import { AuthenticationError } from "../error/AuthenticationError";
import { AuthorizationError } from "../error/AuthorizationError";
import { verifyJWT } from "../lib/jwt";
import { EnumRole } from "../type/EnumRole";
import { IJWTPayload } from "../type/IJWTPayload";

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
      if (roleRestriction === EnumRole.ADMIN) {
        const requiredRoleId = ctx.state.role[roleRestriction];
        if (payload.roleId !== requiredRoleId) {
          throw new AuthorizationError();
        }
      }
    }

    await next();
  }
}