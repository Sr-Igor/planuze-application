import { UseFormReturn } from "react-hook-form";

import { kanban_template_tag, project_kanban_cycle_card } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { Badge, CardContent } from "@repo/ui-new";

import {
  Estimate,
  Responsible,
  Unit,
  WorkType,
} from "../../../../../card-form-edit/components/form/fields";

export interface IContentProps {
  hook: UseFormReturn<any>;
  cardId: string;
  completedSubtasks?: number;
  progressPercentage?: number;
  tags?: kanban_template_tag[];
  card: project_kanban_cycle_card;
  allSubTasks: project_kanban_cycle_card[];
  isUnlinked?: boolean;
  disabled?: boolean;
}

export const Content = ({
  hook,
  card,
  allSubTasks,
  completedSubtasks,
  progressPercentage,
  tags,
  cardId,
  isUnlinked,
  disabled,
}: IContentProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <CardContent className="h-full flex-1 p-0">
      {!isUnlinked && (
        <div className="mt-2 grid grid-cols-12 gap-2">
          <div className="col-span-12">
            <Responsible
              hook={hook}
              className="w-full"
              item={card}
              cardId={cardId}
              placeholder={t("component.card.placeholder.responsible")}
              showArrows={false}
              disabled={disabled}
            />
          </div>
          <div className="col-span-12 w-full">
            <WorkType
              hook={hook}
              className="w-full min-w-0"
              inputClassName="w-full border-sidebar"
              item={card}
              label={""}
              placeholder={t("component.card.placeholder.work_type")}
              cardId={cardId}
              showArrows={false}
              disabled={disabled}
            />
          </div>

          <div className="col-span-12 flex w-full items-center gap-2">
            <p className="text-muted-foreground pl-5 text-xs">{t("component.card.estimate")}</p>
            <Estimate
              hook={hook}
              className="w-full flex-1 p-0"
              item={card}
              label={""}
              cardId={cardId}
              isCardField={true}
              disabled={disabled}
            />
            <Unit
              hook={hook}
              name="estimate_unit"
              label=""
              className="w-full flex-2 p-0"
              disabled={disabled}
            />
          </div>
        </div>
      )}
      {allSubTasks?.length > 0 && (
        <div className="flex items-center justify-between gap-2 p-2">
          <Badge variant="secondary" className="text-xs">
            {completedSubtasks}/{allSubTasks?.length}
          </Badge>

          <div className="text-muted-foreground text-xs">
            {Math.round(progressPercentage || 0)}%
          </div>
        </div>
      )}
      {!isUnlinked && !!tags?.length && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <Badge variant="secondary" className="text-xs" key={tag.id}>
              {tag.title}
            </Badge>
          ))}
        </div>
      )}
    </CardContent>
  );
};
