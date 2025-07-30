import { Router, type Request, type Response } from "express";

import { authenticationKeyMiddleware } from "./middlewares/auth-key";
import { makeDistributeLeadController } from "../../factories/lead/distribute";
import { makeUpdateLeadController } from "../../factories/lead/update";
import { makeDeleteLeadController } from "../../factories/lead/delete";
import { makeGetAllLeadsController } from "../../factories/lead/get-all";

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

export default router;