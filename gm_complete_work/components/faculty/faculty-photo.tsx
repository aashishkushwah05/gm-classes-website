"use client";

import Image from "next/image";
import { useImageLifecycle } from "@/components/ui/use-image-lifecycle";
import { SLOW_LOAD_MS, keepImageMounted, showPlaceholder, showSkeleton } from "@/lib/image-status";

/**
 * Shows the COMPLETE faculty photo. The frame takes the photo's own aspect ratio (from the data), so nothing
 * is trimmed, and the image is `object-contain` so even a mismatch would letterbox instead of crop.
 * No hover zoom, no transform on the image. Lifecycle: skeleton → fade-in on real load → branded fallback on error.
 */
export function FacultyPhoto({
  src,
  alt,
  width,
  height,
  sizes,
  slowAfterMs = SLOW_LOAD_MS,
  className = "",
  fit = "contain",
  objectPosition = "center",
}: {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  slowAfterMs?: number;
  className?: string;
  fit?: "contain" | "cover";
  objectPosition?: string;
}) {
  const { state, attach, onLoad, onError } = useImageLifecycle(src, slowAfterMs);
  const loaded = state.status === "loaded";

  return (
    <div
      data-photo-status={state.status}
      data-photo-slow={state.timedOut ? "true" : undefined}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={`relative w-full overflow-hidden bg-surface ${className}`}
    >
      {showSkeleton(state) && (
        <div aria-hidden="true" data-photo-skeleton className="absolute inset-0 animate-pulse bg-gradient-to-b from-surface to-border/60 motion-reduce:animate-none" />
      )}

      {src && keepImageMounted(state) && (
        <Image
          ref={attach}
          src={src}
          alt={alt}
          fill
          loading="eager"
          sizes={sizes}
          onLoad={onLoad}
          onError={onError}
          style={{ objectPosition }}
          className={`${fit === "cover" ? "object-cover" : "object-contain"} transition-opacity duration-300 ease-out motion-reduce:transition-none ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {showPlaceholder(state) && (
        <div
          role="img"
          data-photo-placeholder
          aria-label={`${alt.split(" — ")[0]} — photo coming soon`}
          className="absolute inset-0 grid place-items-center bg-surface"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <Image src="/gm-logo.png" alt="" width={72} height={72} className="size-[72px] rounded-full opacity-90" />
            <p className="text-xs font-medium text-muted">Photo coming soon</p>
          </div>
        </div>
      )}
    </div>
  );
}
