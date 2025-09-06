import { Router, type Request, type Response } from "express";

import { makeCreateTreatmentController } from "../../factories/treatment/create";
import { makeUpdateTreatmentController } from "../../factories/treatment/update";
import { makeDeleteTreatmentController } from "../../factories/treatment/delete";
import { makeGetAllTreatmentsController } from "../../factories/treatment/get-all";
import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";
import { makeCreateTreatmentStatePriceController } from "../../factories/treatment-state-price/create";
import { makeUpdateTreatmentStatePriceController } from "../../factories/treatment-state-price/update";
import { makeDeleteTreatmentStatePriceController } from "../../factories/treatment-state-price/delete";

const router = Router()

router.post("/treatments", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeCreateTreatmentController();
  const {  
    name,
    category,
    price,
    state_prices
  } = req.body;

  const { statusCode, response } = await controller.handle({
    name,
    category,
    price,
    state_prices
  })
  res.status(statusCode).json(response);
})

router.patch("/treatments/:treatment_id", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeUpdateTreatmentController();
  const { treatment_id } = req.params;
  const {  
    name,
    category,
    price
  } = req.body;

  const { statusCode, response } = await controller.handle({
    id: treatment_id,
    name,
    category,
    price
  })
  res.status(statusCode).json(response);
})

router.delete("/treatments/:treatment_id", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeDeleteTreatmentController();
  const { treatment_id } = req.params;

  const { statusCode, response } = await controller.handle(treatment_id)
  res.status(statusCode).json(response);
})

router.get("/treatments", async (req: Request, res: Response) => {
  const controller = makeGetAllTreatmentsController();
  const { name, category } = req.query

  const { statusCode, response } = await controller.handle({
    name: name ? name.toString() : undefined,
    category: category ? category.toString() : undefined,
  })
  res.status(statusCode).json(response);
})


// STATE PRICES
router.post("/treatments/:treatment_id/state-prices", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeCreateTreatmentStatePriceController();
  const { treatment_id } = req.params
  const {  
    state,
    price
  } = req.body;

  const { statusCode, response } = await controller.handle({
    treatment_id,
    state,
    price
  })
  res.status(statusCode).json(response);
})

router.patch("/treatments/state-prices/:treatment_state_price_id", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeUpdateTreatmentStatePriceController();
  const { treatment_state_price_id } = req.params
  const {  
    state,
    price
  } = req.body;

  const { statusCode, response } = await controller.handle({
    treatment_state_price_id,
    state,
    price
  })
  res.status(statusCode).json(response);
})

router.delete("/treatments/state-prices/:treatment_state_price_id", verifyToken([AccountType.ADMIN, AccountType.OPERATOR]), async (req: Request, res: Response) => {
  const controller = makeDeleteTreatmentStatePriceController();
  const { treatment_state_price_id } = req.params

  const { statusCode, response } = await controller.handle(treatment_state_price_id)
  res.status(statusCode).json(response);
})

export default router;