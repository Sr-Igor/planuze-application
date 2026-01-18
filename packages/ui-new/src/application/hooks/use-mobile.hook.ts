"use client";

/**
 * Mobile Detection Hook Module
 *
 * Hook for detecting mobile viewport.
 *
 * @module application/hooks/use-mobile
 */

import { useEffect, useState } from "react";

/**
 * Default mobile breakpoint in pixels.
 */
const MOBILE_BREAKPOINT = 1024;

/**
 * Hook to detect if the current viewport is mobile-sized.
 *
 * @param breakpoint - Custom breakpoint in pixels (default: 1024)
 * @returns Whether the viewport is mobile-sized
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isMobile = useIsMobile();
 *
 *   return (
 *     <div>
 *       {isMobile ? <MobileView /> : <DesktopView />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT): boolean {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < breakpoint);

    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return !!isMobile;
}
