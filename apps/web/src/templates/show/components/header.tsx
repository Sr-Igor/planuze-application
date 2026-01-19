import { Trash } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui";
import { AppCard, Icon } from "@repo/ui";

import { Permission } from "@/components/permission";
import { cn } from "@repo/ui";
import { usePrivateContext } from "@/templates/private/context";

import { IHeaderProps } from "../types";

export function Header<T>({
  id,
  isLoading,
  onDelete,
  isDeleting,
  title,
  description,
  children,
  customHeader,
  undeletable,
}: IHeaderProps<T> & { children: React.ReactNode }) {
  const t = useLang();
  const { feature } = usePrivateContext();
  return (
    <AppCard
      contentClassName="py-0 px-0"
      cardClassName="max-sm:border-none"
      loading={isLoading}
      title={
        <div className="flex h-auto min-h-10 flex-col items-start justify-between gap-3 p-4 sm:h-10 sm:flex-row sm:items-center sm:gap-2 sm:p-0">
          <span className="flex flex-2 items-center gap-2 overflow-hidden text-sm sm:text-base">
            <Icon name={feature?.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
            <h1 className="line-clamp-1 flex-1 truncate">{title}</h1>
          </span>
          <div className="flex flex-1 items-center justify-end gap-2">
            {customHeader}
            {!undeletable && (
              <Permission permission={["destroy"]}>
                {id && (
                  <Button
                    variant={"destructive"}
                    onClick={onDelete}
                    loading={isDeleting}
                    size="sm"
                    className="sm:w-auto"
                  >
                    <Trash className="h-4 w-4" />
                    <span className="ml-2 hidden sm:block">{t.helper("delete")}</span>
                  </Button>
                )}
              </Permission>
            )}
            {undeletable && (
              <div className={cn("flex items-start gap-2 text-sm", undeletable?.className)}>
                {undeletable?.icon && (
                  <Icon name={undeletable?.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
                <div className="flex flex-1 flex-col gap-1 text-xs">
                  <p className="font-medium">{undeletable?.title}</p>
                  {undeletable?.description && (
                    <p className="text-xs">{undeletable?.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      }
      description={
        description && (
          <div className="text-muted-foreground px-4 pb-2 text-sm sm:px-0">{description}</div>
        )
      }
      content={children}
    />
  );
}
