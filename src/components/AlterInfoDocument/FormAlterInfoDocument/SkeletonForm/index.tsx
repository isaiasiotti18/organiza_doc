// components/skeletons/skeleton-form-document.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonFormDocument() {
  return (
    <div className="flex animate-pulse flex-col gap-4">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Button */}
      <div className="flex justify-start">
        <Skeleton className="h-10 w-[33%] rounded-md" />
      </div>
    </div>
  );
}
