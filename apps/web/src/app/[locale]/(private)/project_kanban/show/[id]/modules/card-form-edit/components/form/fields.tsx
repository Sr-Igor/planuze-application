import { UseFormReturn } from "react-hook-form";

import {
  kanbanTemplateTagIndex,
  projectKanbanCycleCardIndex,
  projectKanbanObjectiveTargetIndex,
} from "@repo/api/web";
import {
  CalendarController,
  InputController,
  NumericController,
  SimpleInfinitySelectController,
  SimpleSelectController,
  TagsController,
} from "@repo/form";
import { useLang } from "@repo/language/hooks";
import {
  kanban_template_tag,
  profile,
  project_kanban_cycle,
  project_kanban_cycle_card,
  project_kanban_objective,
  project_kanban_objective_target,
  work_type,
} from "@repo/types";
import { AppAvatarLine, AppCardSelector, cn } from "@repo/ui";

import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";
import { useConstants } from "@/hooks/constants";

import { styles } from "./styles";

interface IFieldsProps {
  hook: UseFormReturn<any>;
  cardId?: string;
  item?: project_kanban_cycle_card;
  value?: string;
  isCardField?: boolean;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  objectiveId?: string | null;
  showArrows?: boolean;
}

const LabelContent = ({ label, children }: { label?: string; children: React.ReactNode }) => {
  if (!label) return children;

  return (
    <span className="flex w-full flex-1 items-center gap-2">
      <span className="hidden xl:block">{label}</span>
      {children}
    </span>
  );
};

export const Title = ({ hook, placeholder, disabled }: IFieldsProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <InputController
      name="title"
      control={hook.control}
      placeholder={disabled ? t("no_value.title") : `${placeholder}...`}
      field="input"
      className="w-full"
      inputClassName={styles.title}
      required={true}
      disabled={disabled}
    />
  );
};

export const Responsible = ({
  hook,
  className,
  item,
  cardId,
  placeholder,
  showArrows,
  inputClassName,
  disabled,
}: IFieldsProps) => {
  const { select } = useKanbanShow();
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <SimpleInfinitySelectController
      name="profile_id"
      control={hook.control}
      index={select.profile}
      search={select.search.profile}
      setSearch={(search) => select.handleSearch("profile", search)}
      className={cn("w-80 p-0", className)}
      placeholder={disabled ? t("no_value.responsible") : placeholder}
      inputClassName={cn(styles.planning, inputClassName)}
      field="infinity_select"
      showArrows={showArrows}
      fallbackValue={item?.profile?.user?.name}
      formatter={(items: profile[]) => {
        return items.map((item) => ({
          label: item.user?.name || "",
          value: item.id,
          item,
        }));
      }}
      customSelect={(item?: profile, fallbackValue?: string) => {
        return (
          <AppAvatarLine
            loading={false}
            name={item?.user?.name || item?.anonymous_name || fallbackValue || ""}
            avatar={""}
            internal={item?.anonymous}
          />
        );
      }}
      formatterOptions={(item: profile) => {
        return (
          <AppAvatarLine
            loading={false}
            name={item?.user?.name || item.anonymous_name || ""}
            avatar={""}
            internal={item.anonymous}
          />
        );
      }}
      data-card-id={cardId}
      disabled={disabled}
    />
  );
};

export const Cycle = ({
  hook,
  cycles = [],
  label,
  disabled,
}: IFieldsProps & { cycles: project_kanban_cycle[] | undefined }) => {
  return (
    <span className="flex items-center gap-2">
      <span className="hidden xl:block">{label}</span>
      <SimpleSelectController
        className="p-0"
        placeholder="select_a_cycle"
        inputClassName={styles.foreground}
        name="project_kanban_cycle_id"
        control={hook.control}
        field="select"
        options={cycles.map((cycle) => ({
          label: cycle.title,
          value: cycle.id,
        }))}
        disabled={disabled}
      />
    </span>
  );
};

export const Column = ({
  hook,
  cycleId,
  cycles = [],
  label,
  item,
  disabled,
}: IFieldsProps & { cycleId?: string; cycles: project_kanban_cycle[] | undefined }) => {
  return (
    <span className="flex items-center gap-2">
      <span className="hidden xl:block">{label}</span>
      <SimpleSelectController
        className="p-0"
        inputClassName={styles.foreground}
        name="project_kanban_cycle_column_id"
        placeholder="select_a_column"
        control={hook.control}
        field="select"
        fallbackValue={item?.project_kanban_cycle_column?.title}
        options={
          cycles
            .find((cycle) => cycle.id === cycleId)
            ?.project_kanban_cycle_columns?.map((column) => ({
              label: column.title,
              value: column.id,
            })) || []
        }
        disabled={disabled}
      />
    </span>
  );
};

export const Parent = ({
  hook,
  item,
  cycleId,
  label,
  placeholder,
  disabled,
}: IFieldsProps & { cycleId?: string }) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <span className="flex items-center gap-2">
      <span className="hidden xl:block">{label}</span>
      <SimpleInfinitySelectController
        name="card_id"
        control={hook.control}
        className="min-w-40 p-0"
        placeholder={disabled ? t("no_value.parent") : placeholder}
        field="infinity_select"
        inputClassName={styles.foreground}
        request={projectKanbanCycleCardIndex}
        queryParams={{
          principal: true,
          project_kanban_cycle_id: cycleId,
        }}
        formatter={(items: project_kanban_cycle_card[]) => {
          return items.map((item) => ({
            label: item.title,
            value: item.id,
            item,
          }));
        }}
        formatterOptions={(item: project_kanban_cycle_card) => {
          return <AppCardSelector item={item} />;
        }}
        fallbackValue={item?.card?.title}
        cacheKey="project_kanban_cycle_card_infinity"
        enabledOnOpen={true}
        disabled={disabled}
      />
    </span>
  );
};

export const WorkType = ({
  hook,
  item,
  label,
  className,
  placeholder,
  cardId,
  showArrows,
  inputClassName,
  disabled,
}: IFieldsProps) => {
  const { select } = useKanbanShow();
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <LabelContent label={label}>
      <SimpleInfinitySelectController
        name="work_type_id"
        control={hook.control}
        className={cn("min-w-40 p-0", className)}
        placeholder={disabled ? t("no_value.work_type") : placeholder}
        field="infinity_select"
        inputClassName={cn(styles.foreground, inputClassName)}
        index={select.workType}
        search={select.search.workType}
        setSearch={(search) => select.handleSearch("workType", search)}
        formatter={(items: work_type[]) => {
          return items.map((item) => ({
            label: item.title,
            value: item.id,
            item,
          }));
        }}
        fallbackValue={item?.work_type?.title}
        showArrows={showArrows}
        data-card-id={cardId}
        disabled={disabled}
      />
    </LabelContent>
  );
};

export const Priority = ({ hook, label, disabled }: IFieldsProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <NumericController
      name="priority"
      label={label}
      control={hook.control}
      placeholder={disabled ? t("no_value.priority") : ""}
      field="numeric"
      className="w-full"
      inputClassName={styles.planning}
      disabled={disabled}
    />
  );
};

export const Severity = ({ hook, label, disabled }: IFieldsProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <NumericController
      name="severity"
      label={label}
      control={hook.control}
      placeholder={disabled ? t("no_value.severity") : ""}
      field="numeric"
      className="w-full"
      inputClassName={styles.planning}
      disabled={disabled}
    />
  );
};

export const EndDateEstimate = ({ hook, label, disabled }: IFieldsProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <CalendarController
      name="end_date_estimate"
      label={label}
      control={hook.control}
      placeholder={disabled ? t("no_value.end_date_estimate") : ""}
      field="calendar"
      className="w-full"
      inputClassName={styles.planning}
      disabled={disabled}
    />
  );
};

export const EndDateExecute = ({ hook, label, disabled }: IFieldsProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <CalendarController
      name="end_date_execute"
      label={label}
      control={hook.control}
      placeholder={disabled ? t("no_value.end_date_execute") : ""}
      field="calendar"
      className="w-full"
      inputClassName={styles.planning}
      disabled={disabled}
    />
  );
};

export const Estimate = ({
  hook,
  label,
  className,
  cardId,
  isCardField,
  placeholder,
  disabled,
}: IFieldsProps) => {
  const uniqueId = isCardField && cardId ? `estimate-${cardId}` : undefined;
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <NumericController
      name="estimate"
      label={label}
      control={hook.control}
      placeholder={disabled ? t("no_value.estimate") : placeholder}
      field="numeric"
      className={cn("w-full", className)}
      inputClassName={styles.planning}
      data-card-id={cardId}
      id={uniqueId}
      disabled={disabled}
    />
  );
};

export const Execute = ({ hook, label, disabled }: IFieldsProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <NumericController
      name="execute"
      label={label}
      control={hook.control}
      placeholder={disabled ? t("no_value.execute") : ""}
      field="numeric"
      className="w-full"
      inputClassName={styles.planning}
      disabled={disabled}
    />
  );
};

export const WorkInProgress = ({ hook, label, disabled }: IFieldsProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <NumericController
      name="work_in_progress"
      label={label}
      control={hook.control}
      placeholder={disabled ? t("no_value.work_in_progress") : ""}
      field="numeric"
      className="w-full"
      inputClassName={styles.planning}
      disabled={disabled}
    />
  );
};

export const Unit = ({
  hook,
  name,
  label,
  className,
  disabled,
}: IFieldsProps & { name: string }) => {
  const { units } = useConstants();

  return (
    <SimpleSelectController
      name={name}
      control={hook.control}
      label={label}
      field="select"
      className={cn("w-full", className)}
      inputClassName={styles.planning}
      options={units}
      clearable={false}
      disabled={disabled}
    />
  );
};

export const CardTags = ({ hook, disabled }: IFieldsProps) => {
  return (
    <TagsController
      name="project_kanban_cycle_card_tags"
      control={hook.control}
      field="tags"
      className="hidden p-0 xl:block"
      request={kanbanTemplateTagIndex!}
      formatter={(items: kanban_template_tag[]) => {
        return items.map((item) => ({
          label: item.title,
          value: item.id,
          item,
        }));
      }}
      cacheKey="kanban_template_tag_infinity"
      disabled={disabled}
    />
  );
};

export const Objective = ({
  hook,
  item,
  label,
  className,
  placeholder,
  disabled,
}: IFieldsProps) => {
  const { select } = useKanbanShow();
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <span className="flex w-full items-center gap-2">
      <p className="text-sm">{label}</p>
      <SimpleInfinitySelectController
        name="project_kanban_objective_id"
        control={hook.control}
        className={cn("max-w-60 min-w-40 p-0", className)}
        placeholder={disabled ? t("no_value.objective") : placeholder}
        field="infinity_select"
        inputClassName={styles.foreground}
        index={select.objective}
        search={select.search.objective}
        setSearch={(search) => select.handleSearch("objective", search)}
        formatter={(items: project_kanban_objective[]) => {
          return items.map((item) => ({
            label: item.title,
            value: item.id,
            item,
          }));
        }}
        formatterOptions={(item: project_kanban_objective) => {
          return (
            <p className="text-sm">
              [{item?.public_id}] {item?.title}
            </p>
          );
        }}
        customSelect={(item?: project_kanban_objective, fallbackValue?: string) => {
          return (
            <p className="line-clamp-1 truncate text-sm">
              {item ? `[${item?.public_id}] ${item?.title}` : fallbackValue}
            </p>
          );
        }}
        fallbackValue={`[${item?.project_kanban_objective?.public_id}] ${item?.project_kanban_objective?.title}`}
        disabled={disabled}
      />
    </span>
  );
};

export const Target = ({
  hook,
  item,
  label,
  placeholder,
  className,
  objectiveId,
  disabled,
}: IFieldsProps & { objectiveId?: string | null }) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <span className="flex w-full items-center gap-2">
      <p className="text-sm">{label}</p>
      <SimpleInfinitySelectController
        name="project_kanban_objective_target_id"
        control={hook.control}
        className={cn("max-w-60 min-w-40 p-0", className)}
        placeholder={disabled ? t("no_value.target") : placeholder}
        field="infinity_select"
        inputClassName={styles.foreground}
        request={projectKanbanObjectiveTargetIndex}
        formatter={(items: project_kanban_objective_target[]) => {
          return items.map((item) => ({
            label: item.title,
            value: item.id,
            item,
          }));
        }}
        queryParams={{
          project_kanban_id: item?.project_kanban_id,
          project_kanban_objective_id: objectiveId,
        }}
        formatterOptions={(item: project_kanban_objective_target) => {
          return (
            <p className="text-sm">
              [{item?.public_id}] {item?.title}
            </p>
          );
        }}
        customSelect={(item?: project_kanban_objective_target, fallbackValue?: string) => {
          return (
            <p className="line-clamp-1 truncate text-sm">
              {item ? `[${item?.public_id}] ${item?.title}` : fallbackValue}
            </p>
          );
        }}
        fallbackValue={`[${item?.project_kanban_objective_target?.public_id}] ${item?.project_kanban_objective_target?.title}`}
        cacheKey="project_kanban_objective_target_infinity"
        enabled={!!objectiveId}
        enabledOnOpen={true}
        disabled={disabled}
      />
    </span>
  );
};
