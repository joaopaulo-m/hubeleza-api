import { Account, type AccountProps } from "./account";

export type AdminProps = AccountProps & {
  superadmin: boolean
}

type CreateAdminProps = Omit<AdminProps, "id" | "created_at"> & {
  id?: string
  created_at?: number
}

export class Admin extends Account {
  private readonly adminProps: Omit<AdminProps, keyof AccountProps>

  get superadmin() {
    return this.adminProps.superadmin
  }

  constructor(props: CreateAdminProps) {
    super(props)
    this.adminProps = {
      superadmin: props.superadmin
    }
  }
}
