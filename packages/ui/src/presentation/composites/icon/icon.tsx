/**
 * Icon Component Module
 *
 * Dynamic icon component that renders Lucide icons by name.
 *
 * @module presentation/composites/icon
 */
import { forwardRef } from "react";

import * as icons from "lucide-react";

export type IconName = keyof typeof icons;

export type IconProps = Omit<icons.LucideProps, "ref" | "name"> & {
  /**
   * The name of the Lucide icon to render.
   * Falls back to CircleHelp if undefined, null, or not found.
   * Use IconName type for autocomplete suggestions.
   */
  name?: string | null;
};

/**
 * Dynamic icon component.
 *
 * Renders a Lucide icon by name. Falls back to CircleHelp if the icon is not found.
 *
 * @example
 * ```tsx
 * <Icon name="Home" size={24} />
 * <Icon name="Settings" className="text-primary" />
 * ```
 */
const Icon = forwardRef<SVGSVGElement, IconProps>(({ name, ...props }, ref) => {
  const iconName = name as IconName;
  const LucideIcon = (iconName && (icons[iconName] as icons.LucideIcon)) ?? icons.CircleHelp;
  return <LucideIcon ref={ref} {...props} />;
});

Icon.displayName = "Icon";

export { Icon };
