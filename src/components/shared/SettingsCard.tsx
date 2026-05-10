type Props = {
  id?: string;
  heading: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export function SettingsCard({ id, heading, subtitle, children }: Props) {
  return (
    <section
      id={id}
      className="rounded-md border border-oaa-hairline bg-white px-8 py-7"
      style={{ scrollMarginTop: "24px" }}
    >
      <div className="mb-6 border-b border-oaa-hairline pb-5">
        <h2 className="text-[18px] font-semibold text-oaa-ink">{heading}</h2>
        {subtitle && (
          <p className="mt-1 text-[13px] text-oaa-muted">{subtitle}</p>
        )}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}
