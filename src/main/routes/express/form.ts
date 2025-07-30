import { Router, type Request, type Response } from "express";

import { authenticationKeyMiddleware } from "./middlewares/auth-key";
import { makeCreateFormController } from "../../factories/form/create";
import { makeDeleteFormController } from "../../factories/form/delete";
import { makeGetAllFormsController } from "../../factories/form/get-all";
import { makeUpdateFormController } from "../../factories/form/update";

const router = Router()

router.post("/forms", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeCreateFormController();
  const { name, treatment_id, external_form_id } = req.body;

  const { statusCode, response } = await controller.handle({
    name,
    treatment_id,
    external_form_id,
  })
  res.status(statusCode).json(response);
})

router.patch("/forms/:form_id", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeUpdateFormController();
  const { form_id } = req.params;
  const { name, external_form_id } = req.body;

  const { statusCode, response } = await controller.handle({
    form_id,
    name,
    external_form_id,
  })
  res.status(statusCode).json(response);
})

router.delete("/forms/:form_id", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeDeleteFormController();
  const { form_id } = req.params;
  
  const { statusCode, response } = await controller.handle(form_id)
  res.status(statusCode).json(response);
})

router.get("/forms", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeGetAllFormsController();
  
  const { statusCode, response } = await controller.handle()
  res.status(statusCode).json(response);
})

export default router;