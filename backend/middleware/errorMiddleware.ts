export const errorMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.log.error("Server error", err);
    ctx.status = err.statusCode || err.status || err.code || 500;
    ctx.body = {
      message: err.message
    };
  }
}