// The overview's shape while its data streams in: the same sections, so nothing jumps when it arrives.
export function OverviewSkeleton() {
  return (
    <div aria-hidden className="grid animate-pulse gap-10 motion-reduce:animate-none">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="h-36 rounded-ui bg-sunken" />
        <div className="h-36 rounded-ui bg-sunken" />
      </div>
      <div className="h-56 rounded-ui bg-sunken" />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="h-48 rounded-ui bg-sunken" />
        <div className="h-48 rounded-ui bg-sunken" />
      </div>
    </div>
  );
}
