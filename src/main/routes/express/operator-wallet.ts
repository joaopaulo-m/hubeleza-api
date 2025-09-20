import { Router, type Request, type Response } from "express";
import { makeGetOperatorWalletByOperatorIdController } from "../../factories/operator-wallet/get-by-operator";
import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";

const router = Router()

router.get("/operator-wallets", verifyToken([AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeGetOperatorWalletByOperatorIdController();
  const { account_id } = req.account

  const { statusCode, response } = await controller.handle(account_id)
  res.status(statusCode).json(response);
})

export default router;