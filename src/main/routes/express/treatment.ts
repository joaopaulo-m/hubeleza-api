import { Router, type Request, type Response } from "express";

import { authenticationKeyMiddleware } from "./middlewares/auth-key";
import { makeCreateTreatmentController } from "../../factories/treatment/create";
import { makeUpdateTreatmentController } from "../../factories/treatment/update";
import { makeDeleteTreatmentController } from "../../factories/treatment/delete";
import { makeGetAllTreatmentsController } from "../../factories/treatment/get-all";

const router = Router()

router.post("/treatments", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeCreateTreatmentController();
  const {  
    name,
  } = req.body;

  const { statusCode, response } = await controller.handle({
    name
  })
  res.status(statusCode).json(response);
})

router.patch("/treatments/:treatment_id", authenticationKeyMiddleware, async (req: Request, res: Response) => {
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

router.delete("/treatments/:treatment_id", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeDeleteTreatmentController();
  const { treatment_id } = req.params;

  const { statusCode, response } = await controller.handle(treatment_id)
  res.status(statusCode).json(response);
})

router.get("/treatments", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeGetAllTreatmentsController();

  const { statusCode, response } = await controller.handle()
  res.status(statusCode).json(response);
})

export default router;