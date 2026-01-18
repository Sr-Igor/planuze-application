"use client";

import { useMemo } from "react";

import { ArrowRight, CheckCircle, Eye, EyeOff } from "lucide-react";

import { project_kanban_cycle_card } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import * as C from "@repo/ui";

import { AppAvatarLine } from "@repo/ui/app";
import { useAuth } from "@repo/redux/hook";

import { ScrollColumn } from "../../scroll-column";

export interface IViewsProps {
  item?: project_kanban_cycle_card;
}

interface ViewData {
  id: string;
  profile: {
    id: string;
    name: string;
    avatar?: string;
    anonymous: boolean;
  };
  action: string;
  createdAt: string;
}

interface ProfileViews {
  profile: {
    id: string;
    name: string;
    avatar?: string;
    anonymous: boolean;
  };
  views: ViewData[];
}

export const Views = ({ item }: IViewsProps) => {
  const lang = useLang();
  const t = lang.page.kanban;
  const { dates } = useIntlFormat();
  const { profile } = useAuth();

  const profileViews = useMemo(() => {
    if (!item?.project_kanban_cycle_card_reads) return [];

    const views = item.project_kanban_cycle_card_reads
      .filter((view) => view.profile)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    const groupedByProfile: Record<string, ProfileViews> = {};

    views.forEach((view) => {
      const profileId = view.profile!.id;
      const profileName = view.profile!.user?.name || view.profile!.anonymous_name || "Unknown";
      const profileAvatar =
        view.profile!.user?.avatar || view.profile!.anonymous_avatar || undefined;

      if (!groupedByProfile[profileId]) {
        groupedByProfile[profileId] = {
          profile: {
            id: profileId,
            name: profileName,
            avatar: profileAvatar,
            anonymous: view.profile!.anonymous,
          },
          views: [],
        };
      }

      groupedByProfile[profileId].views.push({
        id: view.id,
        profile: {
          id: profileId,
          name: profileName,
          avatar: profileAvatar || undefined,
          anonymous: view.profile!.anonymous,
        },
        action: view.action,
        createdAt: view.createdAt,
      });
    });

    const profileViewsArray = Object.values(groupedByProfile);

    return profileViewsArray.sort((a, b) => {
      if (a.profile.id === profile?.id) return -1;
      if (b.profile.id === profile?.id) return 1;
      return 0;
    });
  }, [item?.project_kanban_cycle_card_reads, profile?.id]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case "opened":
        return <Eye className="h-4 w-4 text-blue-500" />;
      case "read":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "unread":
        return <EyeOff className="h-4 w-4 text-red-500" />;
      default:
        return <Eye className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case "opened":
        return t("card-form-edit.view.actions.opened");
      case "read":
        return t("card-form-edit.view.actions.read");
      case "unread":
        return t("card-form-edit.view.actions.unread");
      default:
        return action;
    }
  };

  if (!profileViews.length) {
    return (
      <div className="relative h-[calc(100vh-380px)] pr-4 pb-2">
        <div className="ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1">
          <div className="text-muted-foreground flex items-center justify-center p-8">
            <p>{t("card-form-edit.view.empty")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ScrollColumn>
      <div className="w-[90vw] space-y-4 p-4">
        {profileViews.map((profileView) => (
          <C.Card key={profileView.profile.id} className="bg-secondary p-0">
            <C.Collapsible open={true}>
              <C.CollapsibleTrigger asChild>
                <div className="border-muted-foreground/50 flex h-14 w-full flex-shrink-0 items-center justify-between gap-3 border-b px-4">
                  <AppAvatarLine
                    loading={false}
                    name={profileView.profile.name}
                    avatar={profileView.profile.avatar}
                    internal={profileView.profile.anonymous}
                  />
                </div>
              </C.CollapsibleTrigger>

              <C.CollapsibleContent>
                <div className="rounded-lg px-2 pt-2">
                  <div
                    className="overflow-x-auto"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "var(--color-gray-500) transparent",
                      WebkitOverflowScrolling: "touch",
                    }}
                  >
                    <div
                      className="flex items-center gap-2 pb-2"
                      style={{
                        minWidth: "max-content",
                        width: "max-content",
                      }}
                    >
                      {profileView.views.map((view, index) => (
                        <div key={view.id} className="flex flex-shrink-0 items-center gap-2">
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center gap-2 rounded-lg border p-2 shadow-sm">
                              {getActionIcon(view.action)}
                              <span className="text-xs font-medium whitespace-nowrap">
                                {getActionLabel(view.action)}
                              </span>
                            </div>
                            <div className="text-muted-foreground text-center text-xs">
                              {dates.format(view.createdAt)}
                            </div>
                          </div>
                          {index < profileView.views.length - 1 && (
                            <ArrowRight
                              className="text-muted-foreground h-4 w-4 flex-shrink-0"
                              strokeWidth={4}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </C.CollapsibleContent>
            </C.Collapsible>
          </C.Card>
        ))}
      </div>
    </ScrollColumn>
  );
};
