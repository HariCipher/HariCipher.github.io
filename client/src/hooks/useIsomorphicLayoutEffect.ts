import { useEffect, useLayoutEffect } from "react";

/**
 * `gsap.set` and `gsap.from` write the start state synchronously, so they have
 * to run before the browser paints — otherwise the element shows up in its
 * final position for one frame and only then jumps back to animate in.
 * `useLayoutEffect` guarantees that; it also warns during server rendering,
 * where nothing is painted, so that case falls back to `useEffect`.
 */
export const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
