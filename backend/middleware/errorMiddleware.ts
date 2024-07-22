export const errorMiddleware = (err, ctx) => {
  ctx.log("error", "Server error", err);
}