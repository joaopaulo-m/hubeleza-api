import { Router, type Request, type Response } from "express";

import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";
import { makeCreateInviteTokenController } from "../../factories/invite-token/create";
import { makeGetAllInviteTokensController } from "../../factories/invite-token/get-all";
import { makeDeleteInviteTokenController } from "../../factories/invite-token/delete";
import { makeGetInviteTokenByTokenController } from "../../factories/invite-token/get-by-token";

const router = Router()

router.post("/invite-tokens", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeCreateInviteTokenController();
  const { name, phone_number } = req.body;
  const { account_type, account_id } = req.account

  const { statusCode, response } = await controller.handle({
    name, 
    phone_number, 
    operator_id: account_type === AccountType.OPERATOR ? account_id : undefined 
  })
  res.status(statusCode).json(response);
})

router.get("/invite-tokens", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeGetAllInviteTokensController();
  const { name, start_date, end_date } = req.query
  const { account_type, account_id } = req.account

  const { statusCode, response } = await controller.handle({
    operator_id: account_type === AccountType.OPERATOR ? account_id : undefined,
    name: name ? name.toString() : undefined,
    start_date: start_date ? Number(start_date) : undefined,
    end_date: end_date ? Number(end_date) : undefined,
  })
  res.status(statusCode).json(response);
})

router.get("/invite-tokens/tokens/:token", async (req: Request, res: Response) => {
  const controller = makeGetInviteTokenByTokenController();
  const { token } = req.params

  const { statusCode, response } = await controller.handle(token)
  res.status(statusCode).json(response);
})

router.delete("/invite-tokens/:invite_token_id", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeDeleteInviteTokenController();
  const { invite_token_id } = req.params

  const { statusCode, response } = await controller.handle(invite_token_id)
  res.status(statusCode).json(response);
})

export default router;