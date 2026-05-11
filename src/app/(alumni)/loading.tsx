export default function AlumnusLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] animate-pulse px-8 py-12">
        <div className="mb-8 h-12 w-48 rounded-md bg-neutral-200" />
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 w-full rounded-md bg-neutral-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
