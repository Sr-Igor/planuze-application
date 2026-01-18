/**
 * AppTooltip Component Module
 *
 * A simplified tooltip component that wraps the primitive Tooltip.
 *
 * @module presentation/composites/app-tooltip
 */

import { ReactNode } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "../../primitives/tooltip";

export type AppTooltipProps = {
  /**
   * The content to wrap with the tooltip.
   */
  children?: ReactNode;
  /**
   * The tooltip text. Supports newlines with \n.
   */
  text?: string;
  /**
   * Additional class name for the trigger.
   */
  className?: string;
  /**
   * Additional class name for the tooltip content.
   */
  contentClassName?: string;
  /**
   * The side of the trigger to render the tooltip.
   * @default "top"
   */
  side?: "top" | "right" | "bottom" | "left";
  /**
   * The alignment of the tooltip relative to the trigger.
   * @default "center"
   */
  align?: "start" | "center" | "end";
};

/**
 * Formats text with newline support.
 */
function formatText(text: string): ReactNode[] {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <span key={`line-${line}-${index}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ));
}

/**
 * AppTooltip component.
 *
 * A simplified tooltip that only renders when text is provided.
 *
 * @example
 * ```tsx
 * <AppTooltip text="This is a tooltip">
 *   <Button>Hover me</Button>
 * </AppTooltip>
 * ```
 */
function AppTooltip({
  children,
  text,
  className,
  contentClassName,
  side,
  align,
}: Readonly<AppTooltipProps>) {
  if (!text) {
    return <>{children}</>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild className={className}>
        {children}
      </TooltipTrigger>
      <TooltipContent className={contentClassName} side={side} align={align}>
        <p>{formatText(text)}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export { AppTooltip };
