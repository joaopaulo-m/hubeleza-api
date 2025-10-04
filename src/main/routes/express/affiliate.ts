import { Router, type Request, type Response } from "express";

import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";

// Controllers
import { makeCreateAffiliateController } from "../../factories/affiliate/create";
import { makeUpdateAffiliateController } from "../../factories/affiliate/update";
import { makeDeleteAffiliateController } from "../../factories/affiliate/delete";
import { makeGetAffiliateByIdController } from "../../factories/affiliate/get-by-id";
import { makeGetAffiliatesController } from "../../factories/affiliate/get-all";
import { makeSignAffiliateUpController } from "../../factories/affiliate/sign-up";

const router = Router()

router.post("/affiliates", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeCreateAffiliateController();
  const {
    name,
    email,
    document,
    referral_code,
    phone_number,
    ig_username,
    comission_percentage,
    lead_comission_amount
  } = req.body;

  const { statusCode, response } = await controller.handle({
    name,
    email,
    document,
    referral_code,
    phone_number,
    ig_username,
    comission_percentage,
    lead_comission_amount
  })
  res.status(statusCode).json(response);
})

router.post("/affiliates/sign-up", async (req: Request, res: Response) => {
  const controller = makeSignAffiliateUpController();
  const {
    name,
    email,
    password,
    document,
    referral_code,
    phone_number,
    ig_username
  } = req.body;

  const { statusCode, response } = await controller.handle({
    name,
    email,
    document,
    referral_code,
    phone_number,
    ig_username,
    password
  })
  res.status(statusCode).json(response);
})

router.patch("/affiliates/:affiliate_id", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeUpdateAffiliateController();
  const { affiliate_id } = req.params
  const {
    name,
    referral_code,
    status,
    phone_number,
    ig_username,
    comission_percentage,
    lead_comission_amount
  } = req.body;

  const { statusCode, response } = await controller.handle({
    affiliate_id,
    name,
    referral_code,
    status,
    phone_number,
    ig_username,
    comission_percentage,
    lead_comission_amount
  })
  res.status(statusCode).json(response);
})

router.delete("/affiliates/:affiliate_id", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeDeleteAffiliateController();
  const { affiliate_id } = req.params

  const { statusCode, response } = await controller.handle(affiliate_id)
  res.status(statusCode).json(response);
})

router.get("/affiliates", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeGetAffiliatesController();
  const { name, referral_code } = req.query

  const { statusCode, response } = await controller.handle({
    name: name ? name.toString() : undefined,
    referral_code: referral_code ? referral_code.toString() : undefined
  })
  res.status(statusCode).json(response);
})
router.get("/affiliates/:affiliate_id/id", async (req: Request, res: Response) => {
  const controller = makeGetAffiliateByIdController();
  const { affiliate_id } = req.params

  const { statusCode, response } = await controller.handle(affiliate_id)
  res.status(statusCode).json(response);
})

router.get("/affiliates/me", verifyToken([AccountType.AFFILIATE]), async (req: Request, res: Response) => {
  const controller = makeGetAffiliateByIdController();
  const { account_id } = req.account

  const { statusCode, response } = await controller.handle(account_id)
  res.status(statusCode).json(response);
})
 

export default router;