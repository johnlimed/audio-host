import Router from "@koa/router";

const authRouter = new Router();

authRouter.get('/login', (ctx) => {
  ctx.body = "login";
});

authRouter.get('/logout', (ctx) => {
  ctx.body = "logout";
});

export default authRouter;