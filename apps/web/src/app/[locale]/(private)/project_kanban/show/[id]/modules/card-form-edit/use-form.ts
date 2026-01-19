"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";

import { IValidatorRequest } from "@repo/form";
import { hookValidate, ISelectedTag, useValidator } from "@repo/form";
import { project_kanban_cycle_card } from "@repo/types";

type FormType = {
  title?: string;
  project_kanban_cycle_id?: string;
  project_kanban_cycle_column_id?: string;
  project_id?: string;
  description?: string | null;
  project_kanban_cycle_card_type_id?: string;
  card_id?: string | null;
  profile_id?: string | null;
  work_type_id?: string | null;
  estimate?: number | null;
  estimate_unit?: string;
  execute?: number | null;
  execute_unit?: string;
  work_in_progress?: number | null;
  work_in_progress_unit?: string;
  priority?: number | null;
  severity?: number | null;
  end_date_estimate?: string | null;
  end_date_execute?: string | null;
  project_kanban_cycle_card_tags?: ISelectedTag[];
  project_kanban_objective_id?: string | null;
  project_kanban_objective_target_id?: string | null;
};

export interface IUseFormProps {
  item?: project_kanban_cycle_card;
  onSubmit: (form: FormType, close?: boolean) => void;
}

export const useCardForm = ({ item, onSubmit }: IUseFormProps) => {
  const schema: IValidatorRequest = {
    body: [
      {
        key: "title",
        method: "string",
        coerse: "string",
      },
      {
        key: "description",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },
      {
        key: "accept_description",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },
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
        key: "project_kanban_cycle_card_type_id",
        method: "string",
        coerse: "string",
        model: "project_kanban_cycle_card_type",
        column: "id",
      },
      {
        key: "card_id",
        method: "string",
        coerse: "string",
        optional: true,
        model: "project_kanban_cycle_card",
        column: "id",
        nullable: true,
      },
      {
        key: "profile_id",
        method: "string",
        coerse: "string",
        model: "profile",
        column: "id",
        optional: true,
        nullable: true,
      },
      {
        key: "work_type_id",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
        model: "work_type",
        column: "id",
      },
      {
        key: "estimate",
        method: "numeric",
        coerse: "number",
        optional: true,
        nullable: true,
      },
      {
        key: "estimate_unit",
        method: "enumeric",
        coerse: "string",
        optional: true,
        nullable: false,
        values: ["hour", "minute"],
      },
      {
        key: "execute",
        method: "numeric",
        coerse: "number",
        optional: true,
        nullable: true,
      },
      {
        key: "execute_unit",
        method: "enumeric",
        coerse: "string",
        optional: true,
        nullable: false,
        values: ["hour", "minute"],
      },
      {
        key: "work_in_progress",
        method: "numeric",
        coerse: "number",
        optional: true,
        nullable: true,
      },
      {
        key: "work_in_progress_unit",
        method: "enumeric",
        coerse: "string",
        optional: true,
        values: ["hour", "minute"],
      },
      {
        key: "priority",
        method: "numeric",
        coerse: "number",
        optional: true,
        nullable: true,
        positive: true,
      },
      {
        key: "severity",
        method: "numeric",
        coerse: "number",
        optional: true,
        nullable: true,
        positive: true,
      },
      {
        key: "end_date_estimate",
        method: "date",
        coerse: "Date",
        optional: true,
        nullable: true,
      },
      {
        key: "end_date_execute",
        optional: true,
        nullable: true,
        method: "date",
        coerse: "Date",
      },
      {
        key: "project_kanban_cycle_card_tags",
        custom: z.array(
          z.object({
            id: z.string().optional(),
            title: z.string(),
          })
        ),
        coerse: "object",
        optional: true,
      },
      {
        key: "project_kanban_objective_id",
        method: "string",
        coerse: "string",
        nullable: true,
        optional: true,
        model: "project_kanban_objective",
        column: "id",
      },
      {
        key: "project_kanban_objective_target_id",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
        model: "project_kanban_objective_target",
        column: "id",
      },
    ],
  };

  const validator = useValidator();

  const schemaResolver = validator(schema as IValidatorRequest) as ZodSchema<FormType>;

  const values = {
    ...item,
    description: item?.description ?? "",
    project_kanban_cycle_card_tags:
      item?.project_kanban_cycle_card_tags?.map((tag) => ({
        id: tag.id,
        title: tag.title,
      })) || [],
  };

  const hook = useForm<FormType>({
    resolver: zodResolver(schemaResolver as any),
    mode: "onChange",
    values,
    defaultValues: {
      estimate_unit: "hour",
      execute_unit: "hour",
      work_in_progress_unit: "hour",
      description: "",
    },
  });

  const cycleId = hook.watch("project_kanban_cycle_id");
  const objectiveId = hook.watch("project_kanban_objective_id");
  const isDisabled = !hook.formState.isDirty || Object.keys(hook.formState.errors).length > 0;

  useEffect(() => {
    if (!hook.formState.isDirty) return;
    if (cycleId === item?.project_kanban_cycle_id) {
      hook.setValue("project_kanban_cycle_column_id", item?.project_kanban_cycle_column_id);
    } else {
      //@ts-ignore
      hook.setValue("project_kanban_cycle_column_id", null);
    }
  }, [cycleId]);

  useEffect(() => {
    if (!hook.formState.isDirty) return;
    if (objectiveId === item?.project_kanban_objective_id) {
      hook.setValue("project_kanban_objective_target_id", item?.project_kanban_objective_target_id);
    } else {
      hook.setValue("project_kanban_objective_target_id", null);
    }
  }, [objectiveId]);

  //Handlers
  const handleSubmit = (close = true) => {
    const hooks = [{ hook, data: values }];
    hookValidate(hooks, (form) => {
      const hasKeys = Object.keys(form).length;
      hasKeys && onSubmit(form, close);
    });
  };

  return {
    hook,
    handleSubmit,
    isDisabled,
    isDirty: hook.formState.isDirty,
    cycleId,
    objectiveId,
  };
};
