/**
 * MainCard Component Module
 *
 * A card component with loading and empty states.
 *
 * @module presentation/composites/main-card
 */

import { PackageOpen } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "../../../shared/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../primitives/card";
import { Skeleton } from "../../primitives/skeleton";

export type MainCardProps = {
  /**
   * Card title.
   */
  title?: string;
  /**
   * Card description.
   */
  description?: string;
  /**
   * Whether the card is in loading state.
   */
  isLoading?: boolean;
  /**
   * Whether the card content is empty.
   */
  isEmpty?: boolean;
  /**
   * Empty state message.
   * @default "No results"
   */
  emptyMessage?: string;
  /**
   * Additional class name for the card.
   */
  className?: string;
  /**
   * Additional class name for the header.
   */
  headerClassName?: string;
  /**
   * Additional class name for the title.
   */
  titleClassName?: string;
  /**
   * Additional class name for the description.
   */
  descriptionClassName?: string;
  /**
   * Additional class name for the content.
   */
  contentClassName?: string;
  /**
   * Card content.
   */
  children: ReactNode;
};

/**
 * MainCard component.
 *
 * A card with built-in loading and empty states.
 *
 * @example
 * ```tsx
 * <MainCard
 *   title="Users"
 *   description="List of all users"
 *   isLoading={isLoading}
 *   isEmpty={users.length === 0}
 * >
 *   <UserList users={users} />
 * </MainCard>
 * ```
 */
function MainCard({
  title,
  description,
  isLoading,
  className,
  headerClassName,
  titleClassName,
  descriptionClassName,
  contentClassName,
  children,
  isEmpty,
  emptyMessage = "No results",
}: MainCardProps) {
  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader className={headerClassName}>
          {title && <CardTitle className={titleClassName}>{title}</CardTitle>}
          {description && (
            <CardDescription className={descriptionClassName}>{description}</CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className={cn("relative", contentClassName)}>
        {isLoading && (
          <Skeleton className="absolute inset-0 mx-4 h-full w-[calc(100%-2rem)] rounded-lg" />
        )}

        {!isLoading && isEmpty && (
          <div className="inset-0 flex min-h-[200px] flex-col items-center justify-center gap-2">
            <PackageOpen className="text-muted-foreground h-10 w-10" />
            <p className="text-muted-foreground text-md font-semibold">{emptyMessage}</p>
          </div>
        )}

        {children}
      </CardContent>
    </Card>
  );
}

export { MainCard };
