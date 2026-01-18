"use client";

/**
 * Loading fallback for DnD components
 */
export const DndLoadingFallback = () => {
  const skeletonCards = Array.from({ length: 8 }, (_, index) => (
    <div
      key={index}
      className="flex w-full items-center gap-2"
      style={{
        animationDelay: `${index * 0.15}s`,
        animationDuration: "2s",
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
      }}
    >
      <div className="flex-1">
        <div className="bg-card relative flex min-h-12 w-full items-center gap-4 rounded-lg border p-4 shadow-sm">
          <div className="bg-muted h-4 w-4 animate-pulse rounded" />

          <div className="flex flex-1 items-center gap-3">
            <div className="flex items-center gap-2">
              <div>
                <div className="bg-muted h-5 w-5 animate-pulse rounded-full" />
              </div>
              <div className="bg-muted h-4 w-32 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return <div className="relative flex h-full flex-col gap-3">{skeletonCards}</div>;
};
