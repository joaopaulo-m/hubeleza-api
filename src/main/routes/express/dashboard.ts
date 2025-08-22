import { Router, type Request, type Response } from "express";

import { makeGetTreatmentDataController } from "../../factories/dashboard/get-treatment-data";
import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";
import { makeGetPartnerDashboardDataController } from "../../factories/dashboard/get-partner-data";
import { makeGetAdminDashboardDataController } from "../../factories/dashboard/get-admin-data";

const router = Router()

router.get("/dashboards", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeGetAdminDashboardDataController();
  
  const { statusCode, response } = await controller.handle()
  console.log(response)
  res.status(statusCode).json(response);
})

router.get("/dashboards/treatments/:treatment_id", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const { treatment_id } = req.params
  const controller = makeGetTreatmentDataController();
  
  const { statusCode, response } = await controller.handle(treatment_id)
  res.status(statusCode).json(response);
})

router.get("/dashboards/partners", verifyToken([AccountType.PARTNER]), async (req: Request, res: Response) => {
  const { account_id } = req.account
  const controller = makeGetPartnerDashboardDataController();
  
  const { statusCode, response } = await controller.handle(account_id)
  res.status(statusCode).json(response);
})

export default router;