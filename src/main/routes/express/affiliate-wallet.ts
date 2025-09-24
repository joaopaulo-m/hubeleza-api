import { Router, type Request, type Response } from "express";

import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";

// Controllers
import { makeWithdrawAffiliateWalletController } from "../../factories/affiliate-wallet/withdraw";
import { makeGetAffiliateWalletByAffiliateIdController } from "../../factories/affiliate-wallet/get-by-affiliate";

const router = Router()

router.post("/affiliate-wallets/withdraw", verifyToken([AccountType.AFFILIATE]), async (req: Request, res: Response) => {
  const controller = makeWithdrawAffiliateWalletController();
  const { account_id } = req.account
  const {
    pix_address_key,
    pix_address_key_type,
    amount
  } = req.body

  const { statusCode, response } = await controller.handle({
    affiliate_id: account_id,
    pix_address_key,
    pix_address_key_type,
    amount
  })
  res.status(statusCode).json(response);
})

router.get("/affiliate-wallets/me", verifyToken([AccountType.AFFILIATE]), async (req: Request, res: Response) => {
  const controller = makeGetAffiliateWalletByAffiliateIdController();
  const { account_id } = req.account

  const { statusCode, response } = await controller.handle(account_id)
  res.status(statusCode).json(response);
})
 

export default router;