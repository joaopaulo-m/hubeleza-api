import { Router, type Request, type Response } from "express";

import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";

// Controllers
import { makeConfirmWalletPaymentController } from "../../factories/wallet/confirm-payment";
import { makeGetTransactionByIdController } from "../../factories/transaction/get-by-id";
import { makeGetPartnerTransactionsController } from "../../factories/transaction/get-by-partner";
import { makeGetTransactionsController } from "../../factories/transaction/get-all";
import { makeExportTransactionsController } from "../../factories/transaction/export";

const router = Router()

router.post("/transactions/confirm-webhook", async (req: Request, res: Response) => {
  const controller = makeConfirmWalletPaymentController();
  const { payment } = req.body;

  const { statusCode, response } = await controller.handle({
    external_transaction_id: payment.id
  })
  res.status(statusCode).json(response);
})

router.get("/transactions", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeGetTransactionsController();
  const { 
    page,
    limit,
    partner_name,
    lead_name,
    type,
    status,
    min_amount,
    max_amount,
    start_date,
    end_date
  } = req.query;

  const { statusCode, response } = await controller.handle({
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
    partner_name: partner_name ? partner_name.toString() : undefined,
    lead_name: lead_name ? lead_name.toString() : undefined,
    type: type ? type.toString() : undefined,
    status: status ? status.toString() : undefined,
    min_amount: min_amount ? Number(min_amount) : undefined,
    max_amount: max_amount ? Number(max_amount) : undefined,
    start_date: start_date ? Number(start_date) : undefined,
    end_date: end_date ? Number(end_date) : undefined,
  })
  res.status(statusCode).json(response);
})

router.get("/transactions/export/csv", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeExportTransactionsController();
  const {
    page,
    limit,
    partner_name,
    lead_name,
    type,
    status,
    min_amount,
    max_amount,
    start_date,
    end_date
  } = req.query

  const { response } = await controller.handle({
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
    partner_name: partner_name ? partner_name.toString() : undefined,
    lead_name: lead_name ? lead_name.toString() : undefined,
    type: type ? type.toString() : undefined,
    status: status ? status.toString() : undefined,
    min_amount: min_amount ? Number(min_amount) : undefined,
    max_amount: max_amount ? Number(max_amount) : undefined,
    start_date: start_date ? Number(start_date) : undefined,
    end_date: end_date ? Number(end_date) : undefined,
  })
  
  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename="transactions.csv"')
  res.send(response)
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