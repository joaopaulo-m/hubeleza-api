import { Router, type Request, type Response } from "express";

import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";

// Controllers
import { makeGetAffiliateTransactionsController } from "../../factories/affiliate-transaction/get-all";

const router = Router()

router.get("/affiliate-transactions", verifyToken([AccountType.AFFILIATE]), async (req: Request, res: Response) => {
  const controller = makeGetAffiliateTransactionsController();
  const { account_id } = req.account
  const { partner_name, type, start_date, end_date } = req.query

  const { statusCode, response } = await controller.handle({
    affiliate_id: account_id,
    partner_name: partner_name ? partner_name.toString() : undefined,
    type: type ? type.toString() : undefined,
    start_date: start_date ? Number(start_date.toString()) : undefined,
    end_date: end_date ? Number(end_date.toString()) : undefined,
  })
  res.status(statusCode).json(response);
})
 

export default router;