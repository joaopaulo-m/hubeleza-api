import { Account, type AccountProps } from "./account";

export type OperatorProps = AccountProps & {
  created_by: string
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

  constructor(props: CreateOperatorProps) {
    super(props)
    this.operatorProps = {
      created_by: props.created_by
    }
  }
}