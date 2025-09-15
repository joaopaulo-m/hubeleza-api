import { Account, type AccountProps } from "./account";

export type OperatorProps = AccountProps & {
  created_by: string
  sign_up_comission_percentage?: number
  topup_comission_percentage?: number
}

type CreateOperatorProps = Omit<OperatorProps, 'id' | 'created_at'> & {
  id?: string
  created_at?: number
}

export class Operator extends Account {
  private readonly operatorProps: Omit<OperatorProps, keyof AccountProps>

  get created_by() {
    return this.operatorProps.created_by
  }
  
  get sign_up_comission_percentage() {
    return this.operatorProps.sign_up_comission_percentage
  }

  get topup_comission_percentage() {
    return this.operatorProps.topup_comission_percentage
  }

  constructor(props: CreateOperatorProps) {
    super(props)
    this.operatorProps = {
      created_by: props.created_by,
      sign_up_comission_percentage: props.sign_up_comission_percentage,
      topup_comission_percentage: props.topup_comission_percentage
    }
  }

  public updateSignUpComissionPercentage(percentage: number) {
    this.operatorProps.sign_up_comission_percentage = percentage
  }

  public updateTopupComissionPercentage(percentage: number) {
    this.operatorProps.topup_comission_percentage = percentage
  }
}