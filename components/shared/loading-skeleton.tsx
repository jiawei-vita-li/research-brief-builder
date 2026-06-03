import { Skeleton } from "@/components/shared/skeleton-block";

export function LoadingSkeleton({ lines = 6 }: { lines?: number }) {
  return (
    <div className="space-y-4 rounded-lg border bg-card p-6">
      <Skeleton className="h-5 w-1/3" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-4 ${i % 3 === 0 ? "w-full" : "w-5/6"}`} />
      ))}
      <Skeleton className="h-24 w-full" />
    </div>
  );
}
