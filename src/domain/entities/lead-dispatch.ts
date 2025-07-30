import { randomUUID } from "node:crypto";
import type { Lead } from "./lead";
import type { Partner } from "./partner";
import type { Treatment } from "./treatment";

export type LeadDispatchProps = {
  id: string;
  lead: Lead;
  partner: Partner;
  treatment: Treatment;
  message_sent: string;
  created_at: number;
}

export class LeadDispatch {
  private readonly props: LeadDispatchProps;

  get id(): string {
    return this.props.id;
  }

  get lead(): Lead {
    return this.props.lead;
  }

  get partner(): Partner {
    return this.props.partner;
  }

  get treatment(): Treatment {
    return this.props.treatment;
  }

  get message_sent(): string {
    return this.props.message_sent;
  }

  get created_at(): number {
    return this.props.created_at;
  }

  constructor(props: Omit<LeadDispatchProps, "created_at" | "id"> & {
    id?: string;
    created_at?: number;
  }) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      created_at: props.created_at ?? Date.now(),
    };
  }
}