import { Request, Response, NextFunction } from 'express';

export function authenticationKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const clientKey = req.header('api-key');
  const serverKey = process.env.AUTHENTICATION_KEY;

  if (!clientKey || clientKey !== serverKey) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
}
