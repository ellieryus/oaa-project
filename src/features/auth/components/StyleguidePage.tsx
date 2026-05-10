import { SectionLabel } from "@/components/shared/SectionLabel";
import { DisplayHeading } from "@/components/shared/DisplayHeading";
import { SelectableCard } from "@/components/shared/SelectableCard";
import { RankList } from "@/features/student/components/RankList";
import { StatusPill } from "@/components/shared/StatusPill";
import { Avatar } from "@/components/shared/Avatar";
import {
  PrimaryButton,
  SecondaryButton,
  GhostButton,
} from "@/components/shared/buttons";

const swatches = [
  { name: "oaa-clay", value: "#D17455", className: "bg-oaa-clay text-white" },
  { name: "oaa-bg", value: "#F8F7F2", className: "bg-oaa-bg text-oaa-ink border border-oaa-hairline" },
  { name: "oaa-ink", value: "#0E0E0E", className: "bg-oaa-ink text-white" },
  { name: "oaa-muted", value: "#6B6B66", className: "bg-oaa-muted text-white" },
  { name: "oaa-hairline", value: "#E8E6DF", className: "bg-oaa-hairline text-oaa-ink" },
  {
    name: "oaa-clay-tint-bg",
    value: "color-mix 12%",
    className: "bg-oaa-clay-tint-bg text-oaa-ink border border-oaa-clay-tint-border",
  },
];

const typeScale = [
  { label: "Display XL · 72/1.05/-0.02em", className: "text-[72px] leading-[1.05] tracking-[-0.02em] font-medium" },
  { label: "Display L · 56/1.1/-0.02em", className: "text-[56px] leading-[1.1] tracking-[-0.02em] font-medium" },
  { label: "Display M · 40/1.15/-0.01em", className: "text-[40px] leading-[1.15] tracking-[-0.01em] font-medium" },
  { label: "Body L · 18/1.5", className: "text-[18px] leading-[1.5]" },
  { label: "Body M · 15/1.5", className: "text-[15px] leading-[1.5]" },
  { label: "Body S · 13/1.45", className: "text-[13px] leading-[1.45]" },
];

const sampleItems = [
  { id: "a", title: "Career pivots", description: "Switching industries or function" },
  { id: "b", title: "Interview prep", description: "Mock interviews and case practice" },
  { id: "c", title: "Networking strategy", description: "Cold outreach and follow-up" },
];

export function StyleguidePage() {
  return (
    <main className="mx-auto max-w-[1200px] px-8 py-24">
      {/* Page header pattern */}
      <header className="flex flex-col gap-6">
        <SectionLabel number="00" label="Styleguide" />
        <DisplayHeading variant="l">Design system canvas</DisplayHeading>
        <p className="max-w-[720px] text-[18px] leading-[1.5] text-oaa-muted">
          Every token, atom, and pattern on one page. Use this to verify the design system before any product screen ships.
        </p>
      </header>

      <Divider />

      {/* Colors */}
      <Section number="01" title="Color tokens">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {swatches.map((s) => (
            <div key={s.name} className="flex flex-col gap-2">
              <div className={`${s.className} h-24 rounded-md flex items-end p-3 text-[12px] font-mono`}>
                {s.value}
              </div>
              <div className="text-[13px] font-mono text-oaa-muted">--{s.name}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section number="02" title="Typography scale">
        <div className="flex flex-col gap-8">
          {typeScale.map((t) => (
            <div key={t.label} className="flex flex-col gap-2">
              <SectionLabel label={t.label} />
              <div className={t.className}>The quick brown fox jumps</div>
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <SectionLabel label="Mono caps · 11/1.4/0.08em uppercase" />
            <div className="font-mono text-[11px] leading-[1.4] tracking-[0.08em] uppercase text-oaa-muted">
              01 · ASPIRATIONS
            </div>
          </div>
        </div>
      </Section>

      {/* Section labels */}
      <Section number="03" title="Section labels">
        <div className="flex flex-col gap-3">
          <SectionLabel label="Without number" />
          <SectionLabel number="01" label="Aspirations" />
          <SectionLabel number="02" label="Help areas" />
          <SectionLabel number="03" label="Industries" />
        </div>
      </Section>

      {/* Page header pattern (composed) */}
      <Section number="04" title="Page header pattern">
        <div className="rounded-md border border-oaa-hairline bg-white p-12">
          <div className="flex flex-col gap-6">
            <SectionLabel number="01" label="Aspirations" />
            <DisplayHeading variant="l">What pulls you forward.</DisplayHeading>
            <p className="max-w-[720px] text-[18px] leading-[1.5] text-oaa-muted">
              Pick the three career moves you most want to make. Alumni who match get prioritized.
            </p>
          </div>
        </div>
      </Section>

      {/* Selectable cards */}
      <Section number="05" title="Selectable cards">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <SelectableCard
            title="Default unselected"
            description="White surface with hairline border."
          />
          <SelectableCard
            selected
            title="Selected state"
            description="Clay-tint bg and border, no fill anywhere else."
          />
          <SelectableCard
            selected
            rank={1}
            title="Selected with rank"
            description="Numbered clay badge top-right."
          />
        </div>
      </Section>

      {/* Rank list */}
      <Section number="06" title="Drag-to-reorder list">
        <div className="max-w-[720px]">
          <RankList items={sampleItems} />
        </div>
      </Section>

      {/* Status pills */}
      <Section number="07" title="Status pills">
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill variant="pending">Pending</StatusPill>
          <StatusPill variant="accepted">Accepted</StatusPill>
          <StatusPill variant="declined">Redirected</StatusPill>
          <StatusPill variant="completed">Completed</StatusPill>
          <StatusPill variant="live">Live</StatusPill>
        </div>
      </Section>

      {/* Avatars */}
      <Section number="08" title="Avatars">
        <div className="flex items-end gap-6">
          <div className="flex flex-col items-center gap-2">
            <Avatar variant="student" name="Maya Chen" size="lg" />
            <span className="text-[12px] font-mono text-oaa-muted">student · lg</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar variant="student" name="Maya Chen" size="md" />
            <span className="text-[12px] font-mono text-oaa-muted">student · md</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar variant="student" name="Maya Chen" size="sm" />
            <span className="text-[12px] font-mono text-oaa-muted">student · sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar variant="alumnus" name="Adam Park" size="lg" />
            <span className="text-[12px] font-mono text-oaa-muted">alumnus · lg</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar variant="alumnus" name="Annie Reyes" size="md" />
            <span className="text-[12px] font-mono text-oaa-muted">alumnus · md</span>
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <Section number="09" title="Buttons">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <PrimaryButton>Primary action</PrimaryButton>
            <PrimaryButton trailingArrow>Continue</PrimaryButton>
            <PrimaryButton disabled>Disabled</PrimaryButton>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <SecondaryButton>Secondary action</SecondaryButton>
            <SecondaryButton trailingArrow>Save and continue</SecondaryButton>
            <SecondaryButton disabled>Disabled</SecondaryButton>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <GhostButton>Ghost action</GhostButton>
            <GhostButton trailingArrow>Skip for now</GhostButton>
            <GhostButton disabled>Disabled</GhostButton>
          </div>
        </div>
      </Section>

      {/* Empty state */}
      <Section number="10" title="Empty state">
        <div className="rounded-md border border-oaa-hairline bg-white p-12 text-center">
          <DisplayHeading variant="m" as="h3">No requests yet.</DisplayHeading>
          <p className="mt-3 text-[15px] leading-[1.5] text-oaa-muted">
            When students reach out, they will land here.
          </p>
        </div>
      </Section>
    </main>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-8 mt-24">
      <div className="flex flex-col gap-3">
        <SectionLabel number={number} label={title} />
        <DisplayHeading variant="m" as="h2">
          {title}
        </DisplayHeading>
      </div>
      {children}
    </section>
  );
}

function Divider() {
  return <hr className="mt-16 border-t border-oaa-hairline" />;
}

export default StyleguidePage;
