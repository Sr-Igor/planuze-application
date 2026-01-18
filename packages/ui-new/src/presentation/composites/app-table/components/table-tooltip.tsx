/**
 * TableTooltip Component
 *
 * @module presentation/composites/app-table/components
 */

"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "../../../primitives/tooltip";

export interface TableTooltipProps {
  children?: ReactNode;
  text: string;
  className?: string;
  showOnlyWhenTruncated?: boolean;
}

export function TableTooltip({
  children,
  text,
  className,
  showOnlyWhenTruncated = true,
}: Readonly<TableTooltipProps>) {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const element = textRef.current;
        const truncated = element.scrollWidth > element.clientWidth;
        setIsTruncated(truncated);
      }
    };

    const timeoutId = setTimeout(checkTruncation, 100);
    window.addEventListener("resize", checkTruncation);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkTruncation);
    };
  }, [text]);

  const formatText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => (
      <span key={`line-${line}-${index}`}>
        {line}
        {index < lines.length - 1 && <br />}
      </span>
    ));
  };

  const shouldShowTooltip = text && text.trim() !== "" && (!showOnlyWhenTruncated || isTruncated);

  if (!shouldShowTooltip) {
    return (
      <span ref={textRef} className="block truncate">
        {children}
      </span>
    );
  }

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild className={className}>
        <span ref={textRef} className="block truncate">
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{formatText(text)}</p>
      </TooltipContent>
    </Tooltip>
  );
}
