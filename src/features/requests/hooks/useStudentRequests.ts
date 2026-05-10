"use client";

import { useMemo, useState } from "react";
import type { MockRequest } from "@/features/student/types";
import type { RequestStatus } from "@/types/global";
import { MOCK_REQUESTS } from "@/server/modules/students/student.mock";

type Filter = RequestStatus | "all";

type UseStudentRequestsReturn = {
  requests: MockRequest[];
  allRequests: MockRequest[];
  filter: Filter;
  setFilter: (f: Filter) => void;
  counts: Record<Filter, number>;
};

/**
 * useStudentRequests — manages the student's request list with local filtering.
 *
 * MVP: reads from in-memory mock data.
 * Production: fetch from a Server Action, hydrate via React Query or SWR.
 */
export function useStudentRequests(): UseStudentRequestsReturn {
  const [filter, setFilter] = useState<Filter>("all");

  const allRequests = MOCK_REQUESTS;

  const requests = useMemo(
    () =>
      filter === "all" ? allRequests : allRequests.filter((r) => r.status === filter),
    [filter, allRequests],
  );

  const counts = useMemo<Record<Filter, number>>(
    () => ({
      all:       allRequests.length,
      pending:   allRequests.filter((r) => r.status === "pending").length,
      accepted:  allRequests.filter((r) => r.status === "accepted").length,
      declined:  allRequests.filter((r) => r.status === "declined").length,
      completed: allRequests.filter((r) => r.status === "completed").length,
    }),
    [allRequests],
  );

  return { requests, allRequests, filter, setFilter, counts };
}
