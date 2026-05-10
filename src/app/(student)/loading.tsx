export default function StudentLoading() {
  return (
    <div className="min-h-screen bg-oaa-bg">
      <div className="mx-auto max-w-[1200px] animate-pulse px-8 py-12">
        <div className="mb-10 h-14 w-64 rounded-md bg-oaa-hairline" />
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-48 rounded-md bg-oaa-hairline" />
          ))}
        </div>
      </div>
    </div>
  );
}
