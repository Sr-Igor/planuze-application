import { useRouter } from "next/navigation";

import { Columns3Cog, Plus, Target } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { AppDropdownMenu, AppTooltip, Button, cn, Icon, Skeleton } from "@repo/ui";

import { AppInputSearch } from "@/components/app-input-search";
import { Permission } from "@/components/permission";
import { useAccess } from "@/hooks/access";

import { useKanbanShow } from "../context";

export const Header = () => {
  const lang = useLang();
  const t = lang.page.kanban;

  const router = useRouter();
  const { permissions } = useAccess();

  const { params, setParams, page, data, loadings, general, state } = useKanbanShow();

  return (
    <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="flex h-14 flex-row items-center justify-between px-6">
        <div className="relative h-8 min-w-40 rounded-sm xl:min-w-72">
          {loadings.kanban.show && <Skeleton className="absolute h-full w-full" />}

          <h1
            className={cn(
              "mr-2 text-lg font-semibold",
              "transition-opacity duration-300 ease-in-out",
              "line-clamp-1 flex-1 truncate",
              loadings.cycle.index && "opacity-0"
            )}
          >
            {page.kanban?.project?.name}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Permission
            permission={["index", "show"]}
            method="all"
            feature="project_kanban_cycle_card"
          >
            <AppInputSearch
              className="hidden xl:block"
              data={data.cards}
              isLoading={false}
              search={page.search}
              setSearch={page.setSearch}
              disabled={loadings.cycle.index}
              width="400px"
              placeholder={t("search_for_a_card")}
              optionChildren={(item) => (
                <button
                  className="flex w-full items-center gap-2 p-2 text-sm"
                  onClick={() =>
                    state.card.update({ columnId: item.project_kanban_cycle_column_id, card: item })
                  }
                >
                  <AppTooltip
                    text={`${item.title} / ${item.project_kanban_cycle?.title} / ${item.project_kanban_cycle_column?.title}`}
                  >
                    <Icon
                      name={item.project_kanban_cycle_card_type?.icon}
                      size={16}
                      color={item.project_kanban_cycle_card_type?.color || "inherit"}
                    />
                  </AppTooltip>
                  <span className="mr-2 flex flex-1 flex-col items-start gap-1">
                    <p className="line-clamp-1 flex-1">{item.title}</p>
                    <span className="text-muted-foreground line-clamp-1 text-[10px]">
                      {item.project_kanban_cycle?.title} / {item.project_kanban_cycle_column?.title}
                    </span>
                  </span>
                </button>
              )}
            />
          </Permission>

          <Permission permission={["index"]} feature="project_kanban_objective">
            <Button
              variant="secondary"
              onClick={() =>
                router.push(
                  `/project_kanban_objective/index/${page.kanban?.id}-${page.kanban?.project_id}-${page.kanban?.project?.name}`
                )
              }
              disabled={loadings.kanban.show}
            >
              <Target className="mr-1 h-4 w-4" />
              <span className="hidden lg:block">
                {t("component.header.objectives_and_targets")}
              </span>
            </Button>
          </Permission>

          <div className="bg-sidebar-accent border-border flex items-center gap-2 overflow-hidden rounded-sm border">
            {general.viewers.map((v) => {
              if (!v.isVisible) return null;
              return (
                <AppTooltip key={v.value} text={v.tooltip}>
                  <button
                    key={v.value}
                    className={cn("p-2", v.value === params.view && "bg-foreground/20")}
                    onClick={() => setParams({ ...params, view: v.value })}
                  >
                    <v.icon size={16} />
                  </button>
                </AppTooltip>
              );
            })}
          </div>

          <Permission permission={["store"]} feature="project_kanban_cycle">
            <Button
              onClick={() => state.cycle.form()}
              disabled={loadings.kanban.show}
              className="hidden xl:flex"
            >
              <Plus className="mr-1 h-4 w-4" />
              {t("component.header.new_cycle")}
            </Button>
          </Permission>
          <AppDropdownMenu
            className="hidden sm:block"
            trigger={
              <Button size="sm" variant="secondary" disabled={loadings.kanban.show}>
                <Columns3Cog />
              </Button>
            }
            groups={[
              {
                title: t("component.header.project_manager"),
                items: [
                  {
                    label: t("component.header.cycle"),
                    icon: "RefreshCcwDot",
                    onClick: state.cycle.open,
                    isVisible: permissions("project_kanban_cycle").index,
                  },
                  {
                    label: t("component.header.card_types"),
                    icon: "SquareChartGantt",
                    onClick: state.cardType.open,
                    isVisible: permissions("project_kanban").index,
                  },
                  {
                    label: t("component.header.project_members"),
                    icon: "IdCard",
                    onClick: state.member.open,
                    isVisible: permissions("project_member").index,
                  },

                  {
                    label: t("component.header.globalAllocation"),
                    icon: "Clock10",
                    onClick: state.globalAllocation.open,
                    isVisible: permissions("project_allocation").index,
                  },
                  {
                    label: t("component.header.project_tool"),
                    icon: "Ruler",
                    onClick: state.tool.open,
                    isVisible: permissions("project_tool").index,
                  },
                  {
                    label: t("component.header.project_config"),
                    icon: "Cog",
                    onClick: state.config.open,
                    isVisible: permissions("project_config").index,
                  },
                  {
                    label: t("component.header.card_trash"),
                    icon: "Trash",
                    onClick: state.card.trash,
                    isVisible: permissions("project_kanban_cycle_card").trash,
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
