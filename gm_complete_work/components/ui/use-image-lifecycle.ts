"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import {
  SLOW_LOAD_MS,
  imageStateReducer,
  initialImageState,
  statusFromElement,
} from "@/lib/image-status";

/**
 * Tracks one image through loading → loaded | error using its real browser events.
 * The callback ref only records the DOM node; it never dispatches lifecycle
 * actions during React's commit/ref phase. That separation prevents ref-driven
 * update loops when Next/Image or React reattaches a ref.
 */
export function useImageLifecycle(src: string | null, slowAfterMs: number = SLOW_LOAD_MS) {
  const [state, dispatch] = useReducer(imageStateReducer, Boolean(src), initialImageState);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const previousSrc = useRef(src);

  // Stable callback ref: setting the same element is a no-op.
  const attach = useCallback((img: HTMLImageElement | null) => {
    setImageElement((current) => (current === img ? current : img));
  }, []);

  // Reset the lifecycle when the image source changes, without changing the ref identity.
  useEffect(() => {
    if (previousSrc.current === src) return;
    previousSrc.current = src;
    dispatch({ type: "reset", hasSrc: Boolean(src) });
  }, [src]);

  // Register listeners first, then inspect the actual element in case it was cached
  // and completed before React attached the handlers.
  useEffect(() => {
    if (!imageElement || !src) return;

    let handled: "loaded" | "error" | null = null;
    const handleLoad = () => {
      if (handled === "loaded") return;
      handled = "loaded";
      dispatch({ type: "load" });
    };
    const handleError = () => {
      if (handled === "error") return;
      handled = "error";
      dispatch({ type: "error" });
    };

    imageElement.addEventListener("load", handleLoad);
    imageElement.addEventListener("error", handleError);

    const currentStatus = statusFromElement(imageElement);
    if (currentStatus === "loaded") handleLoad();
    else if (currentStatus === "error") handleError();

    return () => {
      imageElement.removeEventListener("load", handleLoad);
      imageElement.removeEventListener("error", handleError);
    };
  }, [imageElement, src]);

  useEffect(() => {
    if (state.status !== "loading" || state.timedOut) return;
    const t = setTimeout(() => dispatch({ type: "timeout" }), slowAfterMs);
    return () => clearTimeout(t);
  }, [state.status, state.timedOut, slowAfterMs]);

  const onLoad = useCallback(() => dispatch({ type: "load" }), []);
  const onError = useCallback(() => dispatch({ type: "error" }), []);

  return { state, attach, onLoad, onError };
}

