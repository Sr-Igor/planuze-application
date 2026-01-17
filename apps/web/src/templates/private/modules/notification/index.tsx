import { useState } from "react";
import * as React from "react";

import { useRouter } from "next/navigation";

import { Bell, X } from "lucide-react";

import { useLang } from "@repo/language/hook";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Skeleton,
} from "@repo/ui";

import { useNotification } from "@repo/api/web/callers/notification";
import { Calendar } from "@/components/form/calendar";
import { useModal } from "@/hooks/modal";

import { Card } from "./card";

const LIMIT = 20;

export const Notifications = () => {
  const [drawer, setDrawer] = useState(false);
  const [removed, setRemoved] = useState<string[]>([]);
  const [date, setDate] = useState<Date | null | undefined>();
  const router = useRouter();

  const { index, update, clean } = useNotification({
    enabledIndex: true,
    filters: {
      search: "unread",
      limit: LIMIT,
      startDate: date?.toISOString() || undefined,
      endDate: date?.toISOString() || undefined,
    },
  });

  const t = useLang();

  const notifications = index?.data?.pages?.flatMap((page) => page?.data) ?? [];
  const isLoading = index.isLoading || clean.isPending;
  const allRead = notifications.length === 0;

  const { setModal } = useModal();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      index.hasNextPage &&
      !index.isFetchingNextPage &&
      index.hasNextPage
    ) {
      index.fetchNextPage();
    }
  };

  return (
    <>
      <button
        className="hover:bg-muted focus-visible:ring-primary/40 bg-background text-foreground relative rounded-lg p-2 outline-none focus-visible:ring-2"
        aria-label={t.helper("notification_tooltip")}
        onClick={() => setDrawer(true)}
      >
        {notifications?.length > 0 && (
          <div className="absolute -top-[3px] -right-[3px] flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md dark:bg-red-700">
            {notifications?.length > 9 ? "9+" : notifications?.length}
          </div>
        )}
        <Bell className="h-4 w-4" />
      </button>

      <Drawer open={drawer} onOpenChange={setDrawer} direction="right">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t.helper("notifications")}</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="absolute top-4 right-4">
                <X />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="flex justify-end px-4 pb-2">
            <Calendar date={date} setDate={setDate} disabledFuture />
          </div>
          <div
            className="bg-background h-[calc(100vh-160px)] overflow-y-auto px-4"
            onScroll={handleScroll}
          >
            <div className="flex flex-col gap-2">
              {isLoading && (
                <div className="flex flex-col gap-2">
                  {[...Array(LIMIT)].map((_, i) => (
                    <Skeleton key={i} className="bg-muted h-14 w-full rounded-xl" />
                  ))}
                  <span className="text-muted-foreground px-2 text-xs">
                    {t.helper("loading_notifications")}
                  </span>
                </div>
              )}
              {!isLoading && notifications.length > 0
                ? notifications.map((notification, idx) => {
                    if (removed.includes(notification?.id)) return null;
                    return (
                      <Card
                        key={`${notification?.id}.${idx}`}
                        notification={notification}
                        onRemove={(data) => {
                          setRemoved((prev) => [...prev, data.id]);
                          update.mutate({ id: data.id, read: true });
                        }}
                        onRedirect={() => {
                          setDrawer(false);
                          update.mutate({ id: notification?.id, read: true });
                          if (notification?.redirect) router.push(notification?.redirect);
                          else if (notification?.modal) setModal({ [notification?.modal]: true });
                        }}
                      />
                    );
                  })
                : !isLoading && (
                    <div className="flex h-[180px] items-center justify-center">
                      <p className="text-muted-foreground text-sm">{t.notification("no_unread")}</p>
                    </div>
                  )}
              {index.isFetchingNextPage && (
                <div className="flex flex-col gap-2">
                  <Skeleton className="bg-muted h-14 w-full rounded-xl" />
                </div>
              )}
            </div>
          </div>
          <DrawerFooter>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-md px-2 py-1 text-xs text-blue-600 transition-colors hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/40"
              onClick={() => {
                clean.mutate();
              }}
              disabled={allRead}
              aria-label={t.helper("mark_all_as_read")}
            >
              {t.helper("mark_all_as_read")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
