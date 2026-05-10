"use client";

import { useState, useEffect } from "react";
import type { AlumnusCard } from "@/features/alumni/types";
import { TOP_3 } from "@/server/modules/alumni/alumni.mock";

type MatchesState = {
  matches: AlumnusCard[];
  isLoading: boolean;
  error: string | null;
};

/**
 * useMatches — returns the current week's matched alumni for the logged-in student.
 *
 * MVP: reads from in-memory mock data.
 * Production: fetch from /api/alumni/matches or call a Server Action.
 */
export function useMatches(): MatchesState {
  const [state, setState] = useState<MatchesState>({
    matches: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Simulate async fetch
    const timer = setTimeout(() => {
      setState({ matches: TOP_3, isLoading: false, error: null });
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return state;
}
