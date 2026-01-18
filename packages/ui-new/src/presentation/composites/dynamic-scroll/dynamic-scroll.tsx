"use client";

/**
 * DynamicScrollArea Component Module
 *
 * A scroll area that dynamically adjusts its height based on viewport.
 *
 * @module presentation/composites/dynamic-scroll
 */

import { ComponentPropsWithoutRef, forwardRef, useEffect, useRef, useState } from "react";

import { cn } from "../../../shared/utils";
import { ScrollArea } from "../../primitives/scroll-area";

export type DynamicScrollAreaProps = ComponentPropsWithoutRef<typeof ScrollArea> & {
  /**
   * Fixed height in pixels.
   */
  height?: number;
  /**
   * Additional class name for the container.
   */
  containerClassName?: string;
  /**
   * Offset from viewport height for max-height calculation.
   * @default 300
   */
  viewportOffset?: number;
};

/**
 * DynamicScrollArea component.
 *
 * A scroll area that respects a fixed height while also limiting
 * to viewport height minus an offset.
 *
 * @example
 * ```tsx
 * <DynamicScrollArea height={400}>
 *   <LongContent />
 * </DynamicScrollArea>
 * ```
 */
const DynamicScrollArea = forwardRef<HTMLDivElement, DynamicScrollAreaProps>(
  ({ children, className, containerClassName, height, viewportOffset = 300, ...props }, ref) => {
    const [viewportHeight, setViewportHeight] = useState(
      typeof window === "undefined" ? 0 : window.innerHeight
    );

    useEffect(() => {
      const onResize = () => setViewportHeight(window.innerHeight);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);

    return (
      <div
        ref={containerRef}
        className={cn("relative", containerClassName)}
        style={{
          height: height ? `${height}px` : undefined,
          maxHeight: `${viewportHeight - viewportOffset}px`,
        }}
      >
        <ScrollArea ref={ref} className={cn("h-full", className)} {...props}>
          {children}
        </ScrollArea>
      </div>
    );
  }
);

DynamicScrollArea.displayName = "DynamicScrollArea";

export { DynamicScrollArea };
