import jwt from 'jsonwebtoken'

import type { IJwtService, SignJwtTokenProps } from "../../application/contracts/services/jwt";

export class JsonWebTokenService implements IJwtService {
  public sign(props: SignJwtTokenProps) {
    try {
      const secret = process.env.SECRET_KEY
      if (!secret) throw new Error('SECRET_KEY not set')

      return jwt.sign(
        {
          account_id: props.account_id,
          account_type: props.account_type
        },
        secret,
        { expiresIn: '20d' }
      )
    } catch(error) {
      return error as Error
    }
  }
}