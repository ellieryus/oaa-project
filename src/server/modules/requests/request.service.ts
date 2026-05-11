import type { InboxRequest } from "@/lib/mock-inbox";
import { RequestRepository } from "./request.repository";

export const RequestService = {
  async getAlumnusInbox(): Promise<{
    pending: InboxRequest[];
    upcoming: InboxRequest[];
    all: InboxRequest[];
  }> {
    const [pending, upcoming, all] = await Promise.all([
      RequestRepository.findPending(),
      RequestRepository.findUpcoming(),
      RequestRepository.findAll(),
    ]);
    return { pending, upcoming, all };
  },

  async getRequestById(id: string): Promise<InboxRequest | null> {
    return RequestRepository.findById(id);
  },
};
