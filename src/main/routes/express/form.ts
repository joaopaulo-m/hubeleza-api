import { Router, type Request, type Response } from "express";

import { makeCreateFormController } from "../../factories/form/create";
import { makeDeleteFormController } from "../../factories/form/delete";
import { makeGetAllFormsController } from "../../factories/form/get-all";
import { makeUpdateFormController } from "../../factories/form/update";
import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";

const router = Router()

router.post("/forms", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeCreateFormController();
  const { name, treatment_ids, external_form_id } = req.body;

  const { statusCode, response } = await controller.handle({
    name,
    treatment_ids,
    external_form_id,
  })
  res.status(statusCode).json(response);
})

router.patch("/forms/:form_id", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeUpdateFormController();
  const { form_id } = req.params;
  const { name, external_form_id, treatment_ids } = req.body;

  const { statusCode, response } = await controller.handle({
    form_id,
    name,
    external_form_id,
    treatment_ids
  })
  res.status(statusCode).json(response);
})

router.delete("/forms/:form_id", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeDeleteFormController();
  const { form_id } = req.params;
  
  const { statusCode, response } = await controller.handle(form_id)
  res.status(statusCode).json(response);
})

router.get("/forms", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeGetAllFormsController();
  const { name, treatment_ids } = req.query
  
  const { statusCode, response } = await controller.handle({
    name: name ? name.toString() : undefined,
    treatment_ids: treatment_ids ? (treatment_ids as string).split(",") : undefined
  })
  res.status(statusCode).json(response);
})

export default router;