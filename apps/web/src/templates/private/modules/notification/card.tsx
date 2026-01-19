import { BellRing, ChevronRight, Trash } from "lucide-react";

import { notification } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";

import { Img , cn } from "@repo/ui";

export interface ICard {
  notification: notification;
  onRemove: (data: { id: string; read: boolean }) => void;
  onRedirect: () => void;
}

export const Card = ({ notification, onRemove, onRedirect }: ICard) => {
  const t = useLang();
  const isClickable = Boolean(notification?.redirect || notification?.modal);
  const { dates } = useIntlFormat();

  const date = new Date(notification?.createdAt || "1970-01-01");
  const formattedDate = dates.format(date);

  const defaultProps = { name: "Unknown" };

  return (
    <div
      className={cn(
        "bg-muted/60 border-muted-foreground/10 relative flex items-start justify-between gap-2 rounded-lg border px-3 py-2",
        isClickable ? "hover:bg-muted/80 cursor-pointer" : "cursor-default opacity-80",
        notification?.read ? "" : "border-primary/30"
      )}
      onClick={isClickable ? onRedirect : undefined}
      tabIndex={isClickable ? 0 : -1}
      aria-label={t.notification(
        notification?.message_key,
        notification?.message_props || defaultProps
      )}
      aria-disabled={!isClickable}
      role="button"
    >
      <div className="relative mt-0.5 flex h-8 w-8 items-center justify-center self-start rounded-md bg-transparent">
        {notification?.company?.logo ? (
          <Img
            src={notification.company?.logo}
            alt="Logo"
            fill
            path="company/logo"
            publicFile={true}
          />
        ) : (
          <BellRing size={18} className="text-muted-foreground" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex items-center gap-2">
          <h4 className="text-foreground flex-1 text-[15px] leading-tight font-medium break-words">
            {t.notification(notification?.message_key, notification?.message_props || defaultProps)}
          </h4>
        </div>
        <span className="text-muted-foreground mt-0.5 text-xs font-normal break-words">
          {formattedDate}
        </span>
      </div>
      <div className="flex items-center justify-end gap-2">
        {isClickable && (
          <button
            className="focus-visible:ring-primary/30 mt-1 h-10 self-start rounded-md p-1 transition-colors hover:bg-transparent focus:outline-none focus-visible:ring-2"
            onClick={(e) => {
              e.stopPropagation();
              onRemove({ id: notification?.id, read: true });
            }}
          >
            <ChevronRight
              size={16}
              className="text-muted-foreground mt-1 ml-2 shrink-0 self-start"
            />
          </button>
        )}
        <button
          className="focus-visible:ring-primary/30 mt-1 h-10 self-start rounded-md p-1 transition-colors hover:bg-transparent focus:outline-none focus-visible:ring-2"
          onClick={(e) => {
            e.stopPropagation();
            onRemove({ id: notification?.id, read: true });
          }}
        >
          <Trash size={16} className="text-muted-foreground transition-colors hover:text-red-500" />
        </button>
      </div>
    </div>
  );
};
