import type { InboxRequest } from "@/lib/mock-inbox";
import {
  INBOX_REQUESTS,
  PENDING_REQUESTS,
  UPCOMING_CALLS,
  getInboxRequest,
} from "./request.mock";

export const RequestRepository = {
  async findAll(): Promise<InboxRequest[]> {
    return INBOX_REQUESTS;
  },

  async findById(id: string): Promise<InboxRequest | null> {
    return getInboxRequest(id) ?? null;
  },

  async findPending(): Promise<InboxRequest[]> {
    return PENDING_REQUESTS;
  },

  async findUpcoming(): Promise<InboxRequest[]> {
    return UPCOMING_CALLS;
  },
};
