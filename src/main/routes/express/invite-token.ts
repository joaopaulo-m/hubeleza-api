import { Router, type Request, type Response } from "express";

import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";
import { makeCreateInviteTokenController } from "../../factories/invite-token/create";
import { makeGetAllInviteTokensController } from "../../factories/invite-token/get-all";
import { makeDeleteInviteTokenController } from "../../factories/invite-token/delete";

const router = Router()

router.post("/invite-tokens", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeCreateInviteTokenController();
  const { name } = req.body;

  const { statusCode, response } = await controller.handle({name})
  res.status(statusCode).json(response);
})

router.get("/invite-tokens", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeGetAllInviteTokensController();

  const { statusCode, response } = await controller.handle()
  res.status(statusCode).json(response);
})

router.delete("/invite-tokens/:invite_token_id", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeDeleteInviteTokenController();
  const { invite_token_id } = req.params

  const { statusCode, response } = await controller.handle(invite_token_id)
  res.status(statusCode).json(response);
})

export default router;