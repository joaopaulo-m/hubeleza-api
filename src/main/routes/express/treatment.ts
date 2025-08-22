import { Router, type Request, type Response } from "express";

import { makeCreateTreatmentController } from "../../factories/treatment/create";
import { makeUpdateTreatmentController } from "../../factories/treatment/update";
import { makeDeleteTreatmentController } from "../../factories/treatment/delete";
import { makeGetAllTreatmentsController } from "../../factories/treatment/get-all";
import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";

const router = Router()

router.post("/treatments", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeCreateTreatmentController();
  const {  
    name,
    price
  } = req.body;

  const { statusCode, response } = await controller.handle({
    name,
    price
  })
  res.status(statusCode).json(response);
})

router.patch("/treatments/:treatment_id", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeUpdateTreatmentController();
  const { treatment_id } = req.params;
  const {  
    name,
  } = req.body;

  const { statusCode, response } = await controller.handle({
    id: treatment_id,
    name
  })
  res.status(statusCode).json(response);
})

router.delete("/treatments/:treatment_id", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeDeleteTreatmentController();
  const { treatment_id } = req.params;

  const { statusCode, response } = await controller.handle(treatment_id)
  res.status(statusCode).json(response);
})

router.get("/treatments", verifyToken([AccountType.ADMIN, AccountType.PARTNER]), async (req: Request, res: Response) => {
  const controller = makeGetAllTreatmentsController();

  const { statusCode, response } = await controller.handle()
  res.status(statusCode).json(response);
})

export default router;