import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import type { AccountType } from '../../../../shared/enums/account-type'

export const verifyToken =
  (allowedTypes: AccountType[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ err: 'Not allowed' })
    }

    jwt.verify(token, process.env.SECRET_KEY || 'undefined', (err, payload) => {
      if (err) {
        return res.status(403).json({ err: 'Not allowed' })
      }

      const data = payload as JwtPayload & { account_type: AccountType }

      if (!allowedTypes.includes(data.account_type)) {
        return res.status(403).json({ err: 'Permission denied' })
      }

      req.account = data
      next()
    })
  }
