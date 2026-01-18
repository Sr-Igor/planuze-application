import { PackageOpen } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, cn, Skeleton } from "@repo/ui";

export interface iMainCard {
  title?: string;
  description?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
  className?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export const MainCard = ({
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
}: iMainCard) => {
  const t = useLang();

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
            <p className="text-muted-foreground text-md font-semibold">{t.helper("no_results")}</p>
          </div>
        )}

        {children}
      </CardContent>
    </Card>
  );
};
