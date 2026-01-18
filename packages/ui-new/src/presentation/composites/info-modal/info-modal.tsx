/**
 * InfoModalLayout Component Module
 *
 * A centered layout for informational modals.
 *
 * @module presentation/composites/info-modal
 */

import { ReactNode } from "react";

import { cn } from "../../../shared/utils";

export type InfoModalLayoutProps = {
  /**
   * Icon to display.
   */
  icon: ReactNode;
  /**
   * Title content.
   */
  title: ReactNode;
  /**
   * Description content.
   */
  description: ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
};

/**
 * InfoModalLayout component.
 *
 * A centered layout for displaying informational content in modals.
 *
 * @example
 * ```tsx
 * <InfoModalLayout
 *   icon={<CheckCircle className="text-green-500" size={48} />}
 *   title="Success!"
 *   description="Your changes have been saved."
 * />
 * ```
 */
function InfoModalLayout({ icon, title, description, className }: Readonly<InfoModalLayoutProps>) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-5 text-center",
        className
      )}
    >
      <div className="scale-125">{icon}</div>
      <h2 className="text-muted-foreground text-2xl font-semibold">{title}</h2>
      <p className="text-muted-foreground text-sm font-semibold">{description}</p>
    </div>
  );
}

export { InfoModalLayout };
