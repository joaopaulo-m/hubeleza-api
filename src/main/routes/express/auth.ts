import { Router, type Request, type Response } from "express";

import { makeAuthenticateKeyController } from "../../factories/auth/authenticate-key";

const router = Router()

router.post("/auth/:api_key", async (req: Request, res: Response) => {
  const controller = makeAuthenticateKeyController();
  const { api_key } = req.params

  const { statusCode, response } = await controller.handle(api_key)
  res.status(statusCode).json(response);
})

export default router;