/**
 * FullScreenMessage Component Module
 *
 * A full-screen message layout for empty states, errors, etc.
 *
 * @module presentation/composites/full-screen-message
 */

import { ReactNode } from "react";

import { cn } from "../../../shared/utils";

export type FullScreenMessageProps = {
  /**
   * Icon to display.
   */
  icon: ReactNode;
  /**
   * Title text.
   */
  title: string;
  /**
   * Description text.
   */
  description: string;
  /**
   * Action buttons or links.
   */
  actions?: ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
};

/**
 * FullScreenMessage component.
 *
 * Displays a centered full-screen message with icon, title, description, and actions.
 *
 * @example
 * ```tsx
 * <FullScreenMessage
 *   icon={<AlertCircle size={60} />}
 *   title="Page Not Found"
 *   description="The page you're looking for doesn't exist."
 *   actions={<Button>Go Home</Button>}
 * />
 * ```
 */
function FullScreenMessage({
  icon,
  title,
  description,
  actions,
  className,
}: FullScreenMessageProps) {
  return (
    <div
      className={cn(
        "flex h-screen w-full flex-col items-center justify-center gap-5",
        "text-center text-lg font-semibold text-gray-500",
        className
      )}
    >
      {icon}
      <div className="flex flex-col">
        <h1 className="mb-4 text-3xl font-semibold">{title}</h1>
        <p>{description}</p>
      </div>
      {actions && <div className="flex flex-col items-center gap-2">{actions}</div>}
    </div>
  );
}

export { FullScreenMessage };
