import { Skeleton } from "./ui/skeleton";

export function CharacterCardSkeleton() {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border shadow-sm">
      <div className="p-5 pb-3 flex flex-col items-center gap-3">
        <Skeleton className="w-24 h-24 rounded-2xl" />
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      </div>
      <div className="px-4 pb-4 space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function GallerySkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      data-ocid="gallery.loading_state"
    >
      {Array.from({ length: count }, (_, i) => i).map((i) => (
        <CharacterCardSkeleton key={i} />
      ))}
    </div>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Something went wrong",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 gap-4"
      data-ocid="gallery.error_state"
    >
      <div className="text-5xl">😵</div>
      <p className="text-muted-foreground text-sm">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn-primary text-sm"
          data-ocid="gallery.retry_button"
        >
          Try again
        </button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  onCreateClick?: () => void;
  title?: string;
  description?: string;
  icon?: string;
}

export function EmptyState({
  onCreateClick,
  title = "No characters yet",
  description = "Be the first to bring an AI character to life.",
  icon = "🌌",
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 gap-4 text-center"
      data-ocid="gallery.empty_state"
    >
      <div className="text-6xl">{icon}</div>
      <div>
        <h3 className="font-display font-bold text-xl text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mt-1">{description}</p>
      </div>
      {onCreateClick && (
        <button
          type="button"
          onClick={onCreateClick}
          className="btn-primary"
          data-ocid="gallery.create_button"
        >
          Create Character
        </button>
      )}
    </div>
  );
}
