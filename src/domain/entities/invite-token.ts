import { randomUUID } from "node:crypto";

export type InviteTokenProps = {
  id: string
  name: string
  phone_number: string
  token: string
  created_at: number
}

export class InviteToken {
  private readonly props: InviteTokenProps;

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get phone_number() {
    return this.props.phone_number
  }

  get token() {
    return this.props.token
  }

  get created_at() {
    return this.props.created_at
  }

  constructor(
    props: Omit<InviteTokenProps, 'id' | 'token' | 'expires_at' | 'created_at'> & { 
      id?: string,
      token?: string,
      expires_at?: number,
      created_at?: number
  }) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
      token: props.token || this.generateToken(),
      created_at: props.created_at || Date.now()
    }
  }

  private generateToken(): string {
    const min = 10_000_000;
    const max = 99_999_999;
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
  }
}