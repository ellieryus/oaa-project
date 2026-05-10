"use client";

import { useMemo, useState } from "react";
import type { InboxRequest } from "@/features/requests/types";
import type { RequestStatus } from "@/types/global";
import {
  INBOX_REQUESTS,
  PENDING_REQUESTS,
  UPCOMING_CALLS,
} from "@/server/modules/requests/request.mock";

type InboxFilter = RequestStatus | "all";

type UseAlumnusInboxReturn = {
  all: InboxRequest[];
  pending: InboxRequest[];
  upcoming: InboxRequest[];
  filtered: InboxRequest[];
  filter: InboxFilter;
  setFilter: (f: InboxFilter) => void;
};

/**
 * useAlumnusInbox — provides the full inbox state for the alumnus home screen.
 *
 * MVP: reads from in-memory mock data.
 * Production: replace with a fetch call to RequestService or SWR hook.
 */
export function useAlumnusInbox(): UseAlumnusInboxReturn {
  const [filter, setFilter] = useState<InboxFilter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? INBOX_REQUESTS
        : INBOX_REQUESTS.filter((r) => r.status === filter),
    [filter],
  );

  return {
    all: INBOX_REQUESTS,
    pending: PENDING_REQUESTS,
    upcoming: UPCOMING_CALLS,
    filtered,
    filter,
    setFilter,
  };
}
