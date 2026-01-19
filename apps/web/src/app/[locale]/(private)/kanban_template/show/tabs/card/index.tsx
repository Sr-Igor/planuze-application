import { kanban_template, kanban_template_card } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { Icon } from "@repo/ui";

import { useKanbanTemplateCard } from "@repo/api/web/callers/kanban_template_card";
import { useLogs } from "@/hooks/logs";
import { useTrash } from "@/hooks/trash";
import { CardCrud } from "@/templates/card-crud";
import { useShow } from "@/templates/show/context";

import { useForm } from "./use-form";

export const Card = () => {
  const t = useLang();
  const logs = useLogs();
  const trash = useTrash();
  const { data } = useShow<kanban_template>();

  const cardTypes = data?.kanban_template_cards;

  return (
    <CardCrud<kanban_template_card>
      card={{
        title: (item) => {
          return (
            <div className="flex items-center gap-2">
              <Icon
                name={item.kanban_template_card_type?.icon}
                size={16}
                color={item.kanban_template_card_type?.color || "inherit"}
              />
              {item.kanban_template_card_type?.title}
            </div>
          );
        },
        descriptions: (item) => [
          `${t.page.kanban_template("show.card.principal")}: ${t.helper(item.kanban_template_card_type?.principal?.toString() || "")}`,
          `${t.page.kanban_template("show.card.problem")}: ${t.helper(item.kanban_template_card_type?.problem?.toString() || "")}`,
        ],
      }}
      externalData={cardTypes}
      hookReq={useKanbanTemplateCard}
      page={"kanban_template"}
      translate="show.card"
      pathKey="kanban_template_card"
      getFilters={(data) => ({
        kanban_template_id: data?.id,
      })}
      getBodyKeys={(data) => ({
        kanban_template_id: data?.id,
      })}
      useForm={useForm}
      logs={logs.kanban_template_card()}
      trash={trash.kanban_template_card()}
      hideActions={{
        update: true,
        destroy: false,
        logs: true,
      }}
    />
  );
};
