import { useState } from "react";

import { History, Pen, Trash } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button, Skeleton } from "@repo/ui";
import * as C from "@repo/ui";
import { AppDialog, Icon } from "@repo/ui/app";

import { Permission } from "@/components/ui/permission";
import { cn } from "@repo/ui";

import { ICardProps } from "../../type";

export const Card = <T,>({
  item,
  onShow,
  loading,
  onDestroy,
  handleState,
  onLogs,
  title,
  descriptions,
  page,
  translate,
  icon,
  showLoading,
  logsLoading,
  destroyLoading,
  disabled,
  pathKey,
  hasShow,
  hideActions,
}: ICardProps<T>) => {
  const t = useLang();

  const [exclude, setExclude] = useState(false);

  const descriptionsFiltered = descriptions(item).filter((description) =>
    Boolean(description)
  ) as string[];

  return (
    <>
      <C.Card key={item.id} className="relative p-0">
        {loading && <Skeleton className="absolute inset-0 h-full w-full" />}
        <C.CardContent
          className={cn(
            "flex items-center justify-between gap-4 p-5 transition-opacity duration-300",
            loading && "opacity-0"
          )}
        >
          <C.CardHeader className="p-0">
            <C.CardTitle className="flex flex-1 items-center gap-2 text-sm capitalize">
              {icon && <Icon name={icon} className="mr-1" size={20} />}{" "}
              <span className="flex-1">{title(item)}</span>
            </C.CardTitle>
            {descriptionsFiltered.map((description) => (
              <C.CardDescription key={description} className="text-xs font-semibold">
                {description}
              </C.CardDescription>
            ))}
          </C.CardHeader>
          <C.CardFooter className="flex items-center gap-2">
            {!hideActions?.logs && (
              <Permission permission={[hasShow ? "show" : "index"]} feature={pathKey}>
                <Button
                  loading={logsLoading}
                  disabled={disabled}
                  variant={"outline"}
                  onClick={() => {
                    onLogs(item);
                  }}
                >
                  <History />
                </Button>
              </Permission>
            )}
            {!hideActions?.update && (
              <Permission permission={["update"]} feature={pathKey}>
                <Button
                  loading={showLoading}
                  disabled={disabled}
                  onClick={() => {
                    onShow(item);
                  }}
                >
                  <Pen />
                </Button>
              </Permission>
            )}
            {!hideActions?.destroy && (
              <Permission permission={["destroy"]} feature={pathKey}>
                <Button
                  variant={"destructive"}
                  onClick={() => setExclude(true)}
                  disabled={disabled}
                  loading={destroyLoading}
                >
                  <Trash />
                </Button>
              </Permission>
            )}
          </C.CardFooter>
        </C.CardContent>
      </C.Card>

      <Permission permission={["destroy"]}>
        <AppDialog
          open={exclude}
          onOpenChange={setExclude}
          title={t.page[page](`${translate}.exclude.title`)}
          description={t.page[page](`${translate}.exclude.description`)}
          className="w-[95vw] max-w-md sm:max-w-lg"
          footer={
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="destructive"
                onClick={() => {
                  handleState({ item, loading: true });
                  onDestroy();
                  setExclude(false);
                }}
                className="w-full text-xs sm:w-auto md:text-sm"
              >
                {t.helper("delete")}
              </Button>
            </div>
          }
        />
      </Permission>
    </>
  );
};
