"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { BackHeader } from "@/components/layout/BackHeader";
import { Avatar } from "@/components/shared/Avatar";
import { EmptyState } from "@/components/feedback/EmptyState";
import { STUDENT, MOCK_REQUESTS } from "@/server/modules/students/student.mock";
import { reflectionStore } from "@/features/student/services/reflection.store";
import type { MockRequest } from "@/features/student/types";

export function StudentInboxPage() {
  const [unreflected, setUnreflected] = useState<MockRequest[]>(() =>
    MOCK_REQUESTS.filter(
      (r) =>
        r.status === "accepted" &&
        !reflectionStore.getAll().some((e) => e.alumniId === r.alumniId),
    ),
  );

  useEffect(() => {
    return reflectionStore.subscribe(() => {
      setUnreflected(
        MOCK_REQUESTS.filter(
          (r) =>
            r.status === "accepted" &&
            !reflectionStore.getAll().some((e) => e.alumniId === r.alumniId),
        ),
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-oaa-bg">
      <BackHeader
        backHref="/home"
        backLabel="Back to home"
        rightContent={<Avatar variant="student" name={STUDENT.name} size="sm" />}
      />

      <main className="mx-auto max-w-[720px] px-8 py-12">
        <div className="mb-8">
          <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
            Student inbox
          </p>
          <h1 className="text-[40px] font-semibold leading-[1.15] tracking-[-0.01em] text-oaa-ink">
            Inbox
          </h1>
        </div>

        {unreflected.length > 0 ? (
          <div>
            <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
              Pending reflection
            </p>
            <div className="overflow-hidden rounded-md border border-oaa-hairline bg-white">
              {unreflected.map((req, i) => (
                <div
                  key={req.id}
                  className={`flex items-center justify-between px-5 py-4 transition-colors hover:bg-oaa-bg ${
                    i > 0 ? "border-t border-oaa-hairline" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar variant="alumnus" name={req.alumniName} size="sm" />
                    <div>
                      <p className="text-[14px] font-semibold text-oaa-ink">
                        {req.alumniName}
                      </p>
                      <p className="text-[12px] text-oaa-muted">
                        {req.alumniRole} · {req.alumniCompany}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="rounded-xs border border-oaa-hairline bg-white px-2 py-0.5 text-[11px] text-oaa-muted">
                      {req.topic}
                    </span>
                    <Link
                      href={`/reflect/${req.id}`}
                      className="text-[13px] text-oaa-clay hover:underline"
                    >
                      Reflect on this call →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            eyebrow="Starting out"
            heading="Nothing in your inbox yet."
            subtitle="When alumni respond to your asks or send updates, you'll see them here."
          />
        )}
      </main>
    </div>
  );
}

export default StudentInboxPage;
