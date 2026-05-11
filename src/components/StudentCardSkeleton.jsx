export default function StudentCardSkeleton() {
  return (
    <div className="card animate-pulse" aria-hidden="true">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-edge dark:bg-edge-dark flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-edge dark:bg-edge-dark rounded w-3/4" />
          <div className="h-3 bg-edge dark:bg-edge-dark rounded w-1/2" />
          <div className="h-5 bg-edge dark:bg-edge-dark rounded-full w-16 mt-3" />
        </div>
      </div>
      <div className="flex items-center justify-end gap-1 mt-4 pt-4 border-t border-edge dark:border-edge-dark">
        <div className="w-9 h-9 rounded-lg bg-edge dark:bg-edge-dark" />
        <div className="w-9 h-9 rounded-lg bg-edge dark:bg-edge-dark" />
        <div className="w-9 h-9 rounded-lg bg-edge dark:bg-edge-dark" />
      </div>
    </div>
  )
}
