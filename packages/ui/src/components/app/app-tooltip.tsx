import * as React from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui";

export interface ITooltipDemoProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  contentClassName?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export function AppTooltip({
  children,
  text,
  className,
  contentClassName,
  side,
  align,
}: ITooltipDemoProps) {
  const formatText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => (
      <span key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <>
      {text && (
        <Tooltip>
          <TooltipTrigger asChild className={className}>
            {children}
          </TooltipTrigger>
          <TooltipContent className={contentClassName} side={side} align={align}>
            <p>{formatText(text)}</p>
          </TooltipContent>
        </Tooltip>
      )}
      {!text && children}
    </>
  );
}
