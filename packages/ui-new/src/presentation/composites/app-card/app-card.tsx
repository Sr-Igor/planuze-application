/**
 * AppCard Component Module
 *
 * A card component with loading state support.
 *
 * @module presentation/composites/app-card
 */

import { ReactNode } from "react";

import { cn } from "../../../shared/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../primitives/card";
import { Skeleton } from "../../primitives/skeleton";

export type AppCardProps = {
  /**
   * Card title.
   */
  title: ReactNode;
  /**
   * Card description.
   */
  description: ReactNode;
  /**
   * Card content.
   */
  content: ReactNode;
  /**
   * Additional class name for the content.
   */
  contentClassName?: string;
  /**
   * Additional class name for the card.
   */
  cardClassName?: string;
  /**
   * Card footer content.
   */
  footer?: ReactNode;
  /**
   * Whether the card is in loading state.
   */
  loading?: boolean;
};

/**
 * AppCard component.
 *
 * A card with built-in loading state that shows a skeleton overlay.
 *
 * @example
 * ```tsx
 * <AppCard
 *   title="Settings"
 *   description="Manage your account settings"
 *   content={<SettingsForm />}
 *   footer={<Button>Save</Button>}
 *   loading={isLoading}
 * />
 * ```
 */
function AppCard({
  title,
  description,
  content,
  footer,
  loading = false,
  contentClassName,
  cardClassName,
}: Readonly<AppCardProps>) {
  return (
    <Card className={cn("relative py-0", cardClassName)}>
      <Skeleton
        className={cn(
          "absolute h-full w-full",
          loading
            ? "pointer-events-none z-10 opacity-100"
            : "pointer-events-auto z-[-1] opacity-0"
        )}
      />

      <span
        className={cn(
          "flex flex-col gap-5 py-4",
          "transition-all duration-300 ease-in-out",
          loading ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
        )}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className={contentClassName}>{content}</CardContent>
        {footer && <CardFooter className="flex-col gap-2">{footer}</CardFooter>}
      </span>
    </Card>
  );
}

export { AppCard };
