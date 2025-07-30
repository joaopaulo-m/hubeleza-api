import { Router, type Request, type Response } from "express";

import { authenticationKeyMiddleware } from "./middlewares/auth-key";
import { makeGetDashboardDataController } from "../../factories/dashboard/get-data";
import { makeGetTreatmentDataController } from "../../factories/dashboard/get-treatment-data";

const router = Router()

router.get("/dashboards", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeGetDashboardDataController();
  
  const { statusCode, response } = await controller.handle()
  res.status(statusCode).json(response);
})

router.get("/dashboards/treatments/:treatment_id", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const { treatment_id } = req.params
  const controller = makeGetTreatmentDataController();
  
  const { statusCode, response } = await controller.handle(treatment_id)
  res.status(statusCode).json(response);
})

export default router;