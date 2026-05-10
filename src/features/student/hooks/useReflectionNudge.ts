"use client";

import { useEffect, useState } from "react";
import { reflectionStore } from "@/features/student/services/reflection.store";
import { isDismissed, dismiss } from "@/lib/utils/modal-dismissed";
import { MOCK_REQUESTS } from "@/server/modules/students/student.mock";
import type { MockRequest } from "@/features/student/types";

type UseReflectionNudgeReturn = {
  showModal: boolean;
  unreflectedRequest: MockRequest | null;
  handleDismiss: () => void;
  handleReflect: () => string | null; // returns route to push to
};

/**
 * Detects accepted requests that haven't been reflected on,
 * and drives the reflection nudge modal shown on the student home and inbox screens.
 */
export function useReflectionNudge(): UseReflectionNudgeReturn {
  const [showModal, setShowModal] = useState(false);
  const [unreflectedRequest, setUnreflectedRequest] = useState<MockRequest | null>(null);

  useEffect(() => {
    const unreflected = MOCK_REQUESTS.find(
      (r) =>
        r.status === "accepted" &&
        !reflectionStore.getAll().some((e) => e.alumniId === r.alumniId),
    );

    if (!unreflected) return;
    if (isDismissed(`reflect-student-${unreflected.id}`)) return;

    setUnreflectedRequest(unreflected);
    const timer = setTimeout(() => setShowModal(true), 500);
    return () => clearTimeout(timer);
  }, []);

  function handleDismiss() {
    if (unreflectedRequest) {
      dismiss(`reflect-student-${unreflectedRequest.id}`);
    }
    setShowModal(false);
  }

  function handleReflect(): string | null {
    setShowModal(false);
    return unreflectedRequest ? `/reflect/${unreflectedRequest.id}` : null;
  }

  return { showModal, unreflectedRequest, handleDismiss, handleReflect };
}
