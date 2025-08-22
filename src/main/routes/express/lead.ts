import { Router, type Request, type Response } from "express";

import { authenticationKeyMiddleware } from "./middlewares/auth-key";
import { makeDistributeLeadController } from "../../factories/lead/distribute";
import { makeUpdateLeadController } from "../../factories/lead/update";
import { makeDeleteLeadController } from "../../factories/lead/delete";
import { makeGetAllLeadsController } from "../../factories/lead/get-all";
import { makeGetPartnerLeadsController } from "../../factories/lead/get-by-partner";
import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";

const router = Router()

router.post("/flow-webhook", async (req: Request, res: Response) => {
  const controller = makeDistributeLeadController();
  const {  
    post_id,
    nome,
    Whatsapp,
    cep
  } = req.body;

  const { statusCode, response } = await controller.handle({
    form_id: post_id,
    name: nome,
    phone_number: Whatsapp,
    cep: cep.replace(/\D/g, '')
  })
  res.status(statusCode).json(response);
})

router.patch("/leads/:lead_id", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeUpdateLeadController();
  const { lead_id } = req.params;
  const {  
    name,
    phone_number,
    cep
  } = req.body;

  const { statusCode, response } = await controller.handle({
    lead_id,
    name,
    phone_number,
    cep
  })
  res.status(statusCode).json(response);
})

router.delete("/leads/:lead_id", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeDeleteLeadController();
  const { lead_id } = req.params;

  const { statusCode, response } = await controller.handle(lead_id)
  res.status(statusCode).json(response);
})

router.get("/leads", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeGetAllLeadsController();

  const { statusCode, response } = await controller.handle()
  res.status(statusCode).json(response);
})

router.get("/leads/partner", verifyToken([AccountType.PARTNER]), async (req: Request, res: Response) => {
  const controller = makeGetPartnerLeadsController();
  const { account_id } = req.account
  const { name, treatment_ids, start_date, end_date, page } = req.query

  const { statusCode, response } = await controller.handle({ 
    partner_id: account_id,
    page: page ? Number(page) : 1,
    name: name ? name.toString() : undefined,
    treatment_ids: treatment_ids ? (treatment_ids as string).split(",") : undefined,
    start_date: start_date ? Number(start_date) : undefined,
    end_date: end_date ? Number(end_date) : undefined
  })
  res.status(statusCode).json(response);
})

export default router;