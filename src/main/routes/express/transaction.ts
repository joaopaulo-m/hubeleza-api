import { Router, type Request, type Response } from "express";

import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";

// Controllers
import { makeConfirmWalletPaymentController } from "../../factories/wallet/confirm-payment";
import { makeGetTransactionByIdController } from "../../factories/transaction/get-by-id";
import { makeGetPartnerTransactionsController } from "../../factories/transaction/get-by-partner";

const router = Router()

router.post("/transactions/confirm-webhook", async (req: Request, res: Response) => {
  const controller = makeConfirmWalletPaymentController();
  const { payment } = req.body;

  const { statusCode, response } = await controller.handle({
    external_transaction_id: payment.id
  })
  res.status(statusCode).json(response);
})

router.get("/transactions/:transaction_id", async (req: Request, res: Response) => {
  const controller = makeGetTransactionByIdController();
  const { transaction_id } = req.params;

  const { statusCode, response } = await controller.handle(transaction_id)
  res.status(statusCode).json(response);
})

router.get("/transactions/partners/me", verifyToken([AccountType.PARTNER]), async (req: Request, res: Response) => {
  const controller = makeGetPartnerTransactionsController();
  const { account_id } = req.account;

  const { statusCode, response } = await controller.handle(account_id)
  res.status(statusCode).json(response);
})

router.get("/transactions/partners/:partner_id/list", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeGetPartnerTransactionsController();
  const { partner_id } = req.params;

  const { statusCode, response } = await controller.handle(partner_id)
  res.status(statusCode).json(response);
})

export default router;