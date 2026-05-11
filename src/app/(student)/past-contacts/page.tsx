import { StudentNav } from "@/components/oaa/StudentNav";
import { EmptyState } from "@/components/oaa/EmptyState";

export default function PastContactsPage() {
  return (
    <>
      <StudentNav active="none" />
      <main className="mx-auto max-w-[1200px] px-8 pb-32 pt-12">
        <h1 className="mb-8 text-4xl font-semibold leading-[1.05] text-foreground">
          Past contacts
        </h1>
        <EmptyState
          eyebrow="Coming soon"
          heading="Relationship memory is coming in v1.1."
          subtitle="Your past reflections are saved. This view will let you revisit them once the feature ships."
        />
      </main>
    </>
  );
}
