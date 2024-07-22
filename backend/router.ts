import Router from "@koa/router";

const router = new Router();

router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.body = "hello world";
});

export default router;