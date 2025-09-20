import { Router, type Request, type Response } from "express";

import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";

import { makeCreateOperatorController } from "../../factories/operator/create";
import { makeUpdateOperatorController } from "../../factories/operator/update";
import { makeDeleteOperatorController } from "../../factories/operator/delete";
import { makeGetAllOperatorsController } from "../../factories/operator/get-all";
import { makeGetOperatorByIdController } from "../../factories/operator/get-by-id";
import { makeGetOperatorTransactionsController } from "../../factories/operator-transaction/get-all";

const router = Router()

router.post("/operators", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeCreateOperatorController();
  const { account_id } = req.account
  const { name, email, sign_up_comission_percentage, topup_comission_percentage, document } = req.body

  const { statusCode, response } = await controller.handle({ 
    admin_id: account_id,
    name,
    email,
    sign_up_comission_percentage,
    topup_comission_percentage,
    document
  })
  res.status(statusCode).json(response);
})

router.patch("/operators/:operator_id", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeUpdateOperatorController();
  const { operator_id } = req.params
  const { name, email, sign_up_comission_percentage, topup_comission_percentage } = req.body

  const { statusCode, response } = await controller.handle({ 
    operator_id,
    name,
    email,
    sign_up_comission_percentage,
    topup_comission_percentage
  })
  res.status(statusCode).json(response);
})

router.delete("/operators/:operator_id", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeDeleteOperatorController();
  const { operator_id } = req.params

  const { statusCode, response } = await controller.handle(operator_id)
  res.status(statusCode).json(response);
})

router.get("/operators", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeGetAllOperatorsController();

  const { statusCode, response } = await controller.handle()
  res.status(statusCode).json(response);
})

router.get("/operators/me", verifyToken([AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeGetOperatorByIdController();
  const { account_id } = req.account

  const { statusCode, response } = await controller.handle(account_id)
  res.status(statusCode).json(response);
})

router.get("/operators/transactions", verifyToken([AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeGetOperatorTransactionsController();
  const { partner_name, type, start_date, end_date } = req.query
  const { account_id } = req.account

  const { statusCode, response } = await controller.handle({
    operator_id: account_id,
    partner_name: partner_name ? partner_name.toString() : undefined,
    type: type ? type.toString() : undefined,
    start_date: start_date ? Number(start_date) : undefined,
    end_date: end_date ? Number(end_date) : undefined,
  })
  res.status(statusCode).json(response);
})

router.get("/operators/:operator_id/id", async (req: Request, res: Response) => {
  const controller = makeGetOperatorByIdController();
  const { operator_id } = req.params

  const { statusCode, response } = await controller.handle(operator_id)
  res.status(statusCode).json(response);
})

export default router;