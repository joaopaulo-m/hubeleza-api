import { Router, type Request, type Response } from "express";

import { authenticationKeyMiddleware } from "./middlewares/auth-key";
import { makeCreateFirstAdminController } from "../../factories/admin/create-first";
import { makeCreateAdminController } from "../../factories/admin/create";
import { verifyToken } from "./middlewares/jwt";
import { AccountType } from "../../../shared/enums/account-type";
import { makeDeleteAdminController } from "../../factories/admin/delete";
import { makeUpdateAdminController } from "../../factories/admin/update";
import { makeFindAdminByIdController } from "../../factories/admin/find-by-id";
import { makeGetAllAdminsController } from "../../factories/admin/get-all";

const router = Router()

router.post("/admins/first", authenticationKeyMiddleware, async (req: Request, res: Response) => {
  const controller = makeCreateFirstAdminController();
  const {  
    name,
    email,
    password
  } = req.body;

  const { statusCode, response } = await controller.handle({
    name,
    email,
    password
  })
  res.status(statusCode).json(response);
})

router.post("/admins", verifyToken([AccountType.ADMIN]), async (req: Request, res: Response) => {
  const controller = makeCreateAdminController();
  const {
    superadmin,
    name,
    email,
    password
  } = req.body;
  const { account_id } = req.account

  const { statusCode, response } = await controller.handle({
    account_id,
    superadmin,
    name,
    email
  })
  res.status(statusCode).json(response);
})

router.patch(
  "/admins", 
  verifyToken([AccountType.ADMIN]), 
  async (req: Request, res: Response) => {
    const controller = makeUpdateAdminController();
    const {
      name,
      password
    } = req.body;
    const { account_id } = req.account

    const { statusCode, response } = await controller.handle({
      account_id,
      name,
      password,
    })
    res.status(statusCode).json(response);
  }
)

router.delete(
  "/admins/:admin_id", 
  verifyToken([AccountType.ADMIN]), 
  async (req: Request, res: Response) => {
    const controller = makeDeleteAdminController();
    const { admin_id } = req.params;
    const { account_id } = req.account

    const { statusCode, response } = await controller.handle({
      account_id,
      admin_id
    })
    res.status(statusCode).json(response);
  }
)

router.get(
  "/admins/me", 
  verifyToken([AccountType.ADMIN]), 
  async (req: Request, res: Response) => {
    const controller = makeFindAdminByIdController();
    const { account_id } = req.account

    const { statusCode, response } = await controller.handle(account_id)
    res.status(statusCode).json(response);
  }
)

router.get(
  "/admins/:admin_id", 
  verifyToken([AccountType.ADMIN]), 
  async (req: Request, res: Response) => {
    const controller = makeFindAdminByIdController();
    const { admin_id } = req.params

    const { statusCode, response } = await controller.handle(admin_id)
    res.status(statusCode).json(response);
  }
)

router.get(
  "/admins", 
  verifyToken([AccountType.ADMIN]), 
  async (req: Request, res: Response) => {
    const controller = makeGetAllAdminsController();

    const { statusCode, response } = await controller.handle()
    res.status(statusCode).json(response);
  }
)

export default router;