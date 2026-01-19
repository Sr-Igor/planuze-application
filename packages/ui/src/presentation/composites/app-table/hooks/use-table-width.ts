"use client";

/**
 * useWindowWidth Hook
 *
 * @module presentation/composites/app-table/hooks
 */

import { useEffect, useState } from "react";

export function useWindowWidth() {
  const [width, setWidth] = useState(globalThis.window === undefined ? 0 : globalThis.window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}
