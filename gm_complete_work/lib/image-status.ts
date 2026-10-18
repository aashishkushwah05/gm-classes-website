// Pure image-loading state logic (no React or DOM side effects).
export type ImageStatus = "loading" | "loaded" | "error";
export type ImageState = { status: ImageStatus; timedOut: boolean };
export type ImageEvent =
  | { type: "load" }
  | { type: "error" }
  | { type: "timeout" }
  | { type: "reset"; hasSrc: boolean };

export const SLOW_LOAD_MS = 12000;

export const initialImageState = (hasSrc: boolean): ImageState => ({
  status: hasSrc ? "loading" : "error",
  timedOut: false,
});

export function imageStateReducer(state: ImageState, event: ImageEvent): ImageState {
  switch (event.type) {
    case "reset": {
      const next = initialImageState(event.hasSrc);
      return state.status === next.status && state.timedOut === next.timedOut ? state : next;
    }
    case "load":
      if (state.status === "error" || (state.status === "loaded" && !state.timedOut)) return state;
      return { status: "loaded", timedOut: false };
    case "error":
      if (state.status === "error" && !state.timedOut) return state;
      return { status: "error", timedOut: false };
    case "timeout":
      return state.status === "loading" && !state.timedOut ? { ...state, timedOut: true } : state;
  }
}

export const showSkeleton = (s: ImageState) => s.status === "loading" && !s.timedOut;
export const showPlaceholder = (s: ImageState) => s.status === "error" || (s.status === "loading" && s.timedOut);
export const keepImageMounted = (s: ImageState) => s.status !== "error";

/** Reads an image that may have finished before its load/error handlers attached. */
export function statusFromElement(img: { complete: boolean; naturalWidth: number }): "loaded" | "error" | null {
  if (!img.complete) return null;
  return img.naturalWidth > 0 ? "loaded" : "error";
}
