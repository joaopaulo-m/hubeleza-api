import { Router, type Request, type Response } from "express";

import { authenticationKeyMiddleware } from "./middlewares/auth-key";
import { makeCreatePartnerController } from "../../factories/partner/create";
import { makeUpdatePartnerController } from "../../factories/partner/update";
import { makeDeletePartnerController } from "../../factories/partner/delete";
import { makeGetAllPartnersController } from "../../factories/partner/get-all";
import { makeGetPartnerByIdController } from "../../factories/partner/get-by-id";

const router = Router()

router.post("/partners", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeCreatePartnerController();
  const {  
    name,
    phone_number,
    cep,
    treatment_ids
  } = req.body;

  const { statusCode, response } = await controller.handle({
    name,
    phone_number,
    cep,
    treatment_ids
  })
  res.status(statusCode).json(response);
})

router.patch("/partners/:partner_id", authenticationKeyMiddleware, async (req: Request, res: Response) => {
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

router.delete("/partners/:partner_id", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeDeletePartnerController();
  const { partner_id } = req.params;

  const { statusCode, response } = await controller.handle(partner_id)
  res.status(statusCode).json(response);
})

router.get("/partners", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeGetAllPartnersController();

  const { statusCode, response } = await controller.handle()
  res.status(statusCode).json(response);
})

router.get("/partners/:partner_id", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeGetPartnerByIdController();
  const { partner_id } = req.params;

  const { statusCode, response } = await controller.handle(partner_id)
  res.status(statusCode).json(response);
})

export default router;