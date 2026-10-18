"use client";

import Image from "next/image";
import { useImageLifecycle } from "@/components/ui/use-image-lifecycle";
import {
  SLOW_LOAD_MS,
  keepImageMounted,
  showPlaceholder,
  showSkeleton,
} from "@/lib/image-status";

/**
 * Fixed-ratio photo frame driven by the image's real load/error events.
 *  A  loading  → space reserved, soft skeleton
 *  B  loaded   → photo fades in (and settles from a tiny scale); skeleton removed only now
 *  D  error    → branded placeholder (never a broken icon, never another student's photo)
 *  slow load   → after SLOW_LOAD_MS the skeleton stops and the placeholder shows; a late load still reveals the photo
 * Under reduced motion the fade/scale/pulse are off — content still appears correctly.
 */
export function ResultPhoto({
  src,
  alt,
  sizes,
  slowAfterMs = SLOW_LOAD_MS,
  priority = false,
}: {
  src: string | null;
  alt: string;
  sizes: string;
  slowAfterMs?: number;
  priority?: boolean;
}) {
  const { state, attach, onLoad, onError } = useImageLifecycle(src, slowAfterMs);

  const loaded = state.status === "loaded";

  return (
    <div
      data-photo-status={state.status}
      data-photo-slow={state.timedOut ? "true" : undefined}
      className="relative aspect-[6/7] overflow-hidden bg-surface"
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
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          unoptimized
          onLoad={onLoad}
          onError={onError}
          className={`object-cover object-top transition-[opacity,transform] duration-700 ease-out motion-reduce:scale-100 motion-reduce:transition-none ${
            loaded
              ? "opacity-100 scale-100 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
              : "opacity-0 scale-[1.04]"
          }`}
        />
      )}

      {showPlaceholder(state) && (
        <div
          role="img"
          data-photo-placeholder
          aria-label={`${alt.split(",")[0]} — photo coming soon`}
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
