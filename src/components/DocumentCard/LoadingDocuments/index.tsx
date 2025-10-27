import { Spinner } from "@/components/ui/spinner";

export function LoadingDocuments() {
  return (
    <div className="flex h-[500px] w-[100%] flex-col items-center justify-center align-middle">
      <Spinner role="document" aria-label="loading" className="size-36" />
    </div>
  );
}
