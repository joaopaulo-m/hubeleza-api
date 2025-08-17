import type { AccountType } from "../../../shared/enums/account-type"

export interface SignJwtTokenProps {
  account_id: string
  account_type: AccountType
}

export interface IJwtService {
  sign: (props: SignJwtTokenProps) => Error | string
}