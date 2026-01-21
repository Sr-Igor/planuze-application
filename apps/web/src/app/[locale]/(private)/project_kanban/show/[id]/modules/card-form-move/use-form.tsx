"use client";

import { useEffect, useMemo } from "react";

import { projectKanbanCycleCardIndex } from "@repo/api/web";
import { Field, IValidatorRequest, useFormList } from "@repo/form";
import { project_kanban_cycle, project_kanban_cycle_card } from "@repo/types";

import { AppCardSelector } from "@/components/app-cycle-card-selector";

import { useKanbanShow } from "../../context";

interface FormValues {
  project_kanban_cycle_id?: string | null;
  project_kanban_cycle_column_id?: string | null;
  card_id?: string | null;
}

export interface IUseFormProps {
  disabled: boolean;
  card?: project_kanban_cycle_card;
}

export const useForm = ({ disabled, card }: IUseFormProps) => {
  const { data, page } = useKanbanShow();

  const cycles = data.cycles?.map((cycle) => ({
    label: cycle.title,
    value: cycle.id,
  }));

  const defaultValues: Partial<FormValues> = {
    project_kanban_cycle_id: card?.project_kanban_cycle_id,
    project_kanban_cycle_column_id: card?.project_kanban_cycle_column_id,
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "project_kanban_cycle_id",
        method: "string",
        coerse: "string",
        model: "project_kanban_cycle",
        column: "id",
      },
      {
        key: "project_kanban_cycle_column_id",
        method: "string",
        coerse: "string",
        model: "project_kanban_cycle_column",
        column: "id",
      },
      {
        key: "card_id",
        method: "string",
        coerse: "string",
        model: "project_kanban_cycle_card",
        column: "id",
        optional: true,
        nullable: true,
      },
    ],
  };

  const fields: Field<Partial<FormValues>>[] = [
    {
      field: "select",
      name: "project_kanban_cycle_id",
      label: "project_kanban_cycle_id",
      className: "col-span-2",
      disabled,
      required: true,
      options: cycles,
    },
    {
      field: "select",
      name: "project_kanban_cycle_column_id",
      label: "project_kanban_cycle_column_id",
      required: true,
      disabled,
      className: "col-span-2",
    },
    {
      field: "select-simple-infinity",
      name: "card_id",
      label: "card_id",
      disabled,
      className: "col-span-2",
      cacheKey: "project_kanban_cycle_card_anchored_infinity",
      request: projectKanbanCycleCardIndex,
      queryParams: {
        project_kanban_cycle_id: page.cycle?.id,
        principal: true,
      },
      formatter: (items: project_kanban_cycle_card[]) =>
        items?.map((item) => ({
          label: item.title,
          value: item.id,
          item,
        })) || [],
      formatterOptions: (item: project_kanban_cycle_card) => {
        return <AppCardSelector item={item} showPath={false} />;
      },
      enabledOnOpen: true,
    },
  ];

  const form = useFormList<Partial<FormValues>>({
    fields,
    schema,
    defaultValues: defaultValues,
  });

  const cycleId = form.hook.watch("project_kanban_cycle_id");

  const columns = useMemo(() => {
    return (
      data.cycles
        .find((cycle) => cycle.id === cycleId)
        ?.project_kanban_cycle_columns?.sort((a, b) => a.order - b.order)
        ?.map((column) => ({
          label: column.title,
          value: column.id,
        })) || []
    );
  }, [data.cycles, cycleId]);

  useEffect(() => {
    if (!form.isDirty) return;

    form.hook.setValue("card_id", null);
    form.hook.setValue("project_kanban_cycle_column_id", null);
  }, [cycleId]);

  return {
    ...form,
    formProps: {
      ...form.formProps,
      fields: fields.map((field) => {
        switch (field.name) {
          case "project_kanban_cycle_column_id":
            return {
              ...field,
              options: columns,
            };
          case "card_id":
            return {
              ...field,
              queryParams: { project_kanban_cycle_id: cycleId, principal: true },
              hide:
                card?.project_kanban_cycle_card_type?.principal ||
                cycleId === card?.project_kanban_cycle_id,
            };
          case "project_kanban_cycle_id":
            return {
              ...field,
              immediatelyCallback: (item: project_kanban_cycle) => {
                form.hook.setValue(
                  "project_kanban_cycle_column_id",
                  item?.project_kanban_cycle_columns?.[0]?.id,
                  {
                    shouldDirty: false,
                  }
                );
              },
            };
          default:
            return field;
        }
      }),
    },
    config: {
      schema,
      fields,
      defaultValues,
      cycleId,
    },
  };
};
