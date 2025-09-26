import { Router, type Request, type Response } from "express";

import { makeCreatePartnerController } from "../../factories/partner/create";
import { makeUpdatePartnerController } from "../../factories/partner/update";
import { makeDeletePartnerController } from "../../factories/partner/delete";
import { makeGetAllPartnersController } from "../../factories/partner/get-all";
import { makeGetPartnerByIdController } from "../../factories/partner/get-by-id";
import { makeSignPartnerUpController } from "../../factories/partner/sign-up";
import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";
import { makeUpdatePartnerStatusController } from "../../factories/partner/update-status";
import { makeExportPartnersController } from "../../factories/partner/export";

const router = Router()

router.post("/partners", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeCreatePartnerController();
  const {  
    name,
    company_name,
    cpf,
    cnpj,
    email,
    phone_number,
    cep,
    city,
    state,
    treatment_ids
  } = req.body;

  const { statusCode, response } = await controller.handle({
    name,
    company_name,
    cpf,
    cnpj,
    email,
    phone_number,
    cep,
    city,
    state,
    treatment_ids
  })
  res.status(statusCode).json(response);
})

router.post("/partners/sign-up", async (req: Request, res: Response) => {
  const controller = makeSignPartnerUpController();
  const {  
    name,
    company_name,
    cpf,
    cnpj,
    email,
    password,
    phone_number,
    cep,
    city,
    state,
    treatment_ids
  } = req.body;
  const { token, code } = req.query 

  const { statusCode, response } = await controller.handle({
    invite_token: token ? token.toString() : undefined,
    referral_code: code ? code.toString() : undefined,
    name,
    company_name,
    cpf,
    cnpj,
    email,
    password,
    phone_number,
    cep,
    city,
    state,
    treatment_ids
  })
  res.status(statusCode).json(response);
})

router.patch("/partners/:partner_id", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeUpdatePartnerController();
  const { partner_id } = req.params;
  const {  
    name,
    company_name,
    cpf,
    cnpj,
    phone_number,
    cep,
    city,
    state,
    treatment_ids
  } = req.body;

  const { statusCode, response } = await controller.handle({
    partner_id,
    name,
    company_name,
    cpf,
    cnpj,
    phone_number,
    cep,
    city,
    state,
    treatment_ids
  })
  res.status(statusCode).json(response);
})

router.patch("/partners/:partner_id/status", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeUpdatePartnerStatusController();
  const { partner_id } = req.params;
  const { status } = req.body

  const { statusCode, response } = await controller.handle({
    partner_id,
    status
  })
  res.status(statusCode).json(response);
})

router.delete("/partners/:partner_id", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeDeletePartnerController();
  const { partner_id } = req.params;

  const { statusCode, response } = await controller.handle(partner_id)
  res.status(statusCode).json(response);
})

router.get("/partners", verifyToken([AccountType.ADMIN, AccountType.OPERATOR, AccountType.AFFILIATE]), async (req: Request, res: Response) => {
  const controller = makeGetAllPartnersController();
  const { account_type, account_id } = req.account
  const {
    name,
    city,
    state,
    status,
    start_date,
    end_date,
    treatment_ids
  } = req.query


  const { statusCode, response } = await controller.handle({
    affiliate_id: account_type === AccountType.AFFILIATE ? account_id : undefined,
    name: name ? name.toString() : undefined,
    city: city ? city.toString() : undefined,
    state: state ? state.toString() : undefined,
    status: status ? status.toString() : undefined,
    start_date: start_date ? Number(start_date) : undefined,
    end_date: end_date ? Number(end_date) : undefined,
    treatment_ids: treatment_ids ? (treatment_ids as string).split(",") : undefined
  })
  res.status(statusCode).json(response);
})

router.get("/partners/export/csv", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeExportPartnersController();
  const {
    name,
    city,
    state,
    status,
    start_date,
    end_date,
    treatment_ids
  } = req.query

  const { response } = await controller.handle({
    name: name ? name.toString() : undefined,
    city: city ? city.toString() : undefined,
    state: state ? state.toString() : undefined,
    status: status ? status.toString() : undefined,
    start_date: start_date ? Number(start_date) : undefined,
    end_date: end_date ? Number(end_date) : undefined,
    treatment_ids: treatment_ids ? (treatment_ids as string).split(",") : undefined
  })
  
  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename="partners.csv"')
  res.send(response)
})

router.get("/partners/:partner_id", verifyToken([AccountType.ADMIN, AccountType.OPERATOR, AccountType.AFFILIATE]), async (req: Request, res: Response) => {
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