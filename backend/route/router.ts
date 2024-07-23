import Router from "@koa/router";

import authRouter from "./authRouter";
import userRouter from "./userRouter";
import roleRouter from "./roleRouter";
import trackRouter from "./trackRouter";

const router = new Router();

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());
router.use("/user", userRouter.routes(), userRouter.allowedMethods());
router.use("/role", roleRouter.routes(), roleRouter.allowedMethods());
router.use("/track", trackRouter.routes(), trackRouter.allowedMethods());

router.get('/', async (ctx, next) => {
  ctx.body = "hello world";
  await next();
});

export default router;