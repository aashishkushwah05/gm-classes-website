"use client";

import Image from "next/image";
import { useImageLifecycle } from "@/components/ui/use-image-lifecycle";
import { SLOW_LOAD_MS, keepImageMounted, showPlaceholder, showSkeleton } from "@/lib/image-status";

/**
 * Image with a real load lifecycle (driven by the <img> load/error events, not by scrolling):
 *  loading → neutral skeleton, space reserved from width/height (no layout shift)
 *  loaded  → photo fades in, skeleton removed
 *  error / slow → branded GM-logo placeholder (never a broken icon, never an endless skeleton)
 */
export function LifecycleImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  fit = "cover",
  position = "center",
  slowAfterMs = SLOW_LOAD_MS,
  className = "",
}: {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  position?: string;
  slowAfterMs?: number;
  className?: string;
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
          sizes={sizes}
          priority={priority}
          onLoad={onLoad}
          onError={onError}
          style={{ objectPosition: position }}
          className={`${fit === "contain" ? "object-contain" : "object-cover"} transition-opacity duration-700 ease-out motion-reduce:transition-none ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {showPlaceholder(state) && (
        <div role="img" data-photo-placeholder aria-label={alt} className="absolute inset-0 grid place-items-center bg-surface">
          <Image src="/gm-logo.png" alt="" width={72} height={72} className="size-[72px] rounded-full opacity-90" />
        </div>
      )}
    </div>
  );
}
