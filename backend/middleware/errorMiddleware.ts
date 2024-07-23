export const errorMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.log.error("Server error", err);
    ctx.status = Number(err.statusCode) || Number(err.status) || Number(err.code) || 500;
    ctx.body = {
      message: err.message
    };
  }
}