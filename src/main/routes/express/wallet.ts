import { Router, type Request, type Response } from "express";

import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";

// Controllers
import { makeCreateWalletPaymentController } from "../../factories/wallet/create-payment";
import { makeGetWalletByPartnerIdController } from "../../factories/wallet/get-by-partner";

const router = Router()

router.post("/wallets/:wallet_id/payments", verifyToken([AccountType.PARTNER]), async (req: Request, res: Response) => {
  const controller = makeCreateWalletPaymentController();
  const { amount } = req.body;
  const { wallet_id } = req.params

  const { statusCode, response } = await controller.handle({
    wallet_id,
    amount
  })
  res.status(statusCode).json(response);
})

router.get("/wallets/me", verifyToken([AccountType.PARTNER]), async (req: Request, res: Response) => {
  const controller = makeGetWalletByPartnerIdController()
  const { account_id } = req.account

  const { statusCode, response } = await controller.handle(account_id)
  res.status(statusCode).json(response)
})

export default router;