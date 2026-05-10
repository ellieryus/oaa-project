"use client";

import { useEffect, useState } from "react";
import { alumnusNotesStore } from "@/features/alumni/services/alumnus-notes.store";
import { isDismissed, dismiss } from "@/lib/utils/modal-dismissed";
import { INBOX_REQUESTS } from "@/server/modules/requests/request.mock";
import type { InboxRequest } from "@/features/requests/types";

type UseAlumnusReflectionNudgeReturn = {
  showModal: boolean;
  unreflectedRequest: InboxRequest | null;
  handleDismiss: () => void;
  handleReflect: () => string | null;
};

/**
 * Detects accepted inbox requests that haven't had post-call notes saved,
 * and drives the post-call nudge modal on the alumnus inbox screen.
 */
export function useAlumnusReflectionNudge(): UseAlumnusReflectionNudgeReturn {
  const [showModal, setShowModal] = useState(false);
  const [unreflectedRequest, setUnreflectedRequest] = useState<InboxRequest | null>(null);

  useEffect(() => {
    const unreflected = INBOX_REQUESTS.find(
      (r) =>
        r.status === "accepted" &&
        !alumnusNotesStore.getAll().some((e) => e.studentId === r.id),
    );

    if (!unreflected) return;
    const key = `reflect-alumnus-${unreflected.id}`;
    if (isDismissed(key)) return;

    setUnreflectedRequest(unreflected);
    const timer = setTimeout(() => setShowModal(true), 500);
    return () => clearTimeout(timer);
  }, []);

  function handleDismiss() {
    if (unreflectedRequest) {
      dismiss(`reflect-alumnus-${unreflectedRequest.id}`);
    }
    setShowModal(false);
  }

  function handleReflect(): string | null {
    setShowModal(false);
    return unreflectedRequest ? `/post-call-notes/${unreflectedRequest.id}` : null;
  }

  return { showModal, unreflectedRequest, handleDismiss, handleReflect };
}
