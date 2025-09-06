import { Router, type Request, type Response } from "express";

import { makeAuthenticateKeyController } from "../../factories/auth/authenticate-key";
import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";
import { makeDefinePasswordController } from "../../factories/auth/define-password";
import { makeLoginController } from "../../factories/auth/login";

const router = Router()

// router.post("/auth/:api_key", async (req: Request, res: Response) => {
//   const controller = makeAuthenticateKeyController();
//   const { api_key } = req.params

//   const { statusCode, response } = await controller.handle(api_key)
//   res.status(statusCode).json(response);
// })

router.post("/auth/define-password", verifyToken([AccountType.OPERATOR, AccountType.PARTNER, AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeDefinePasswordController();
  const { password } = req.body
  const { account_id } = req.account

  const { statusCode, response } = await controller.handle({
    account_id,
    password
  })
  res.status(statusCode).json(response);
})

router.post("/auth", async (req: Request, res: Response) => {
  const controller = makeLoginController();
  const { email, password } = req.body

  const { statusCode, response } = await controller.handle({
    email,
    password
  })
  res.status(statusCode).json(response);
})

export default router;