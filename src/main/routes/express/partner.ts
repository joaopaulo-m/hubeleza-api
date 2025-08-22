import { Router, type Request, type Response } from "express";

import { makeCreatePartnerController } from "../../factories/partner/create";
import { makeUpdatePartnerController } from "../../factories/partner/update";
import { makeDeletePartnerController } from "../../factories/partner/delete";
import { makeGetAllPartnersController } from "../../factories/partner/get-all";
import { makeGetPartnerByIdController } from "../../factories/partner/get-by-id";
import { makeSignPartnerUpController } from "../../factories/partner/sign-up";
import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";

const router = Router()

router.post("/partners", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeCreatePartnerController();
  const {  
    name,
    email,
    phone_number,
    cep,
    document,
    treatment_ids
  } = req.body;

  const { statusCode, response } = await controller.handle({
    name,
    email,
    phone_number,
    cep,
    document,
    treatment_ids
  })
  res.status(statusCode).json(response);
})

router.post("/partners/invite-tokens/:invite_token", async (req: Request, res: Response) => {
  const controller = makeSignPartnerUpController();
  const {  
    name,
    email,
    password,
    phone_number,
    cep,
    document,
    treatment_ids
  } = req.body;
  const { invite_token } = req.params 

  const { statusCode, response } = await controller.handle({
    invite_token,
    name,
    email,
    password,
    phone_number,
    cep,
    document,
    treatment_ids
  })
  res.status(statusCode).json(response);
})

router.patch("/partners/:partner_id", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeUpdatePartnerController();
  const { partner_id } = req.params;
  const {  
    name,
    phone_number,
    cep,
    treatment_ids
  } = req.body;

  const { statusCode, response } = await controller.handle({
    partner_id,
    name,
    phone_number,
    cep,
    treatment_ids
  })
  res.status(statusCode).json(response);
})

router.delete("/partners/:partner_id", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeDeletePartnerController();
  const { partner_id } = req.params;

  const { statusCode, response } = await controller.handle(partner_id)
  res.status(statusCode).json(response);
})

router.get("/partners", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeGetAllPartnersController();

  const { statusCode, response } = await controller.handle()
  res.status(statusCode).json(response);
})

router.get("/partners/:partner_id", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeGetPartnerByIdController();
  const { partner_id } = req.params;

  const { statusCode, response } = await controller.handle(partner_id)
  res.status(statusCode).json(response);
})

router.get("/partners/refresh/me", verifyToken([AccountType.PARTNER]), async (req: Request, res: Response) => {
  const controller = makeGetPartnerByIdController();
  const { account_id } = req.account;

  const { statusCode, response } = await controller.handle(account_id)
  res.status(statusCode).json(response);
})

export default router;