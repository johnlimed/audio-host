export const roleMiddleware = (adminRoleId: string, userRoleId: string) => {
  return async (ctx, next) => {
    ctx.state = {
      role: {
        Admin: adminRoleId,
        User: userRoleId,
      } 
    }
    await next();
  }
}