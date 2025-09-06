import { randomUUID } from "node:crypto";

export type AccountProps = {
  id: string
  name: string
  email: string
  password: string
  created_at: number
}

export abstract class Account {
  protected readonly props: AccountProps;

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get created_at() {
    return this.props.created_at
  }

  protected constructor(props: Omit<AccountProps, "id" | "created_at"> & { id?: string, created_at?: number }) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
      created_at: props.created_at || Date.now()
    }
  }

  public updateName(name: string) {
    this.props.name = name
  }

  public updateEmail(email: string) {
    this.props.email = email
  }

  public updatePassword(password: string) {
    this.props.password = password
  }
}