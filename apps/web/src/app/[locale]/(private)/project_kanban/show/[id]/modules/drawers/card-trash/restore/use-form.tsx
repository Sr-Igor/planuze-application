"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { IValidatorRequest } from "@deviobr/validator";

import { project_kanban_cycle_card } from "@repo/types";

import { index as indexProjectKanbanCycleCard } from "@repo/api/web/req/project_kanban_cycle_card";
import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";
import { AppCardTypeSelector } from "@/components/ui/app-card-type-selector";
import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";

export interface IUseFormProps {
  disabled: boolean;
  item?: project_kanban_cycle_card;
  open: boolean;
}

export interface FormData {
  project_kanban_cycle_id: string;
  project_kanban_cycle_column_id: string | null;
  project_kanban_cycle_card_type_id: string;
  card_id?: string | null;
}

interface WatchedValues {
  cycle?: string;
  column?: string | null;
  cardType?: string;
}

interface SelectOption {
  label: string;
  value: string;
  principal?: boolean;
}

export const useForm = ({ disabled, item, open }: IUseFormProps) => {
  const { data, page } = useKanbanShow();

  const [watches, setWatches] = useState<WatchedValues>(() => {
    if (!item) return {};

    // Verificar se o ciclo ainda existe antes de inicializar
    const cycleExists = data.cycles.some((cycle) => cycle.id === item.project_kanban_cycle_id);
    if (!cycleExists) {
      return {};
    }

    // Se o ciclo existe, verificar se os outros valores ainda são válidos
    const selectedCycle = data.cycles.find((cycle) => cycle.id === item.project_kanban_cycle_id);
    const columnExists = selectedCycle?.project_kanban_cycle_columns?.some(
      (column) => column.id === item.project_kanban_cycle_column_id
    );

    return {
      cycle: item.project_kanban_cycle_id,
      column: columnExists ? item.project_kanban_cycle_column_id : undefined,
      cardType: undefined, // Será definido após carregar os tipos de cartão
    };
  });

  const columns = useMemo<SelectOption[]>(() => {
    if (!watches.cycle) return [];

    const selectedCycle = data.cycles.find((cycle) => cycle.id === watches.cycle);
    return (
      selectedCycle?.project_kanban_cycle_columns?.map((column) => ({
        label: column.title,
        value: column.id,
      })) || []
    );
  }, [data.cycles, watches.cycle]);

  const defaultValues = useMemo<Partial<FormData>>(() => {
    if (!item) return {};

    const cycleExists = data.cycles.some((cycle) => cycle.id === item.project_kanban_cycle_id);

    const selectedCycle = data.cycles.find((cycle) => cycle.id === item.project_kanban_cycle_id);
    const columnExists = selectedCycle?.project_kanban_cycle_columns?.some(
      (column) => column.id === item.project_kanban_cycle_column_id
    );

    const cardTypeExists = data.cardsTypes?.some(
      (cardType) => cardType.id === item?.project_kanban_cycle_card_type_id
    );

    return {
      project_kanban_cycle_id: cycleExists ? item.project_kanban_cycle_id : undefined,
      project_kanban_cycle_column_id: columnExists
        ? item.project_kanban_cycle_column_id
        : undefined,
      project_kanban_cycle_card_type_id: cardTypeExists
        ? item.project_kanban_cycle_card_type_id
        : undefined,
      card_id: item.card?.id ? item.card_id : undefined,
    };
  }, [item, data.cycles]);

  const schema = useMemo<IValidatorRequest>(
    () => ({
      body: [
        {
          key: "project_kanban_cycle_id",
          method: "string",
          coerse: "string",
        },
        {
          key: "project_kanban_cycle_column_id",
          method: "string",
          coerse: "string",
        },
        {
          key: "project_kanban_cycle_card_type_id",
          method: "string",
          coerse: "string",
        },
        {
          key: "card_id",
          method: "string",
          coerse: "string",
          optional: true,
          nullable: true,
        },
      ],
    }),
    []
  );

  const cycleOptions = useMemo<SelectOption[]>(
    () =>
      data.cycles.map((cycle) => ({
        label: cycle.title,
        value: cycle.id,
      })),
    [data.cycles]
  );

  const cardTypes =
    data.cardsTypes?.map((cardType) => ({
      label: cardType.title,
      value: cardType.id,
      item: cardType,
    })) || [];
  const cardTypeItem = data.cardsTypes?.find((cardType) => cardType.id === watches.cardType);

  const fields = useMemo<Field<Partial<FormData>>[]>(
    () => [
      {
        field: "select",
        name: "project_kanban_cycle_id",
        label: "project_kanban_cycle_id",
        required: true,
        disabled,
        className: "col-span-2",
        options: cycleOptions,
      },
      {
        field: "select",
        name: "project_kanban_cycle_column_id",
        label: "project_kanban_cycle_column_id",
        required: true,
        disabled,
        className: "col-span-2",
        options: columns,
        hide: !watches.cycle,
      },
      {
        field: "select",
        name: "project_kanban_cycle_card_type_id",
        label: "project_kanban_cycle_card_type_id",
        required: true,
        disabled,
        className: "col-span-2",
        options: cardTypes,
        hide: !watches.cycle,
        formatterOptions: ({ item }) => {
          return <AppCardTypeSelector item={item} />;
        },
        customSelect: (item) => {
          return item && <AppCardTypeSelector item={item} />;
        },
      },
      {
        field: "infinity_select",
        name: "card_id",
        label: "card_id",
        disabled,
        className: "col-span-2",
        cacheKey: "project_kanban_cycle_card_anchored_infinity",
        request: indexProjectKanbanCycleCard,
        queryParams: {
          project_kanban_cycle_id: watches.cycle,
          principal: true,
        },
        formatter: (items: project_kanban_cycle_card[]) =>
          items?.map((card) => ({
            label: card.title,
            value: card.id,
            item: card,
          })) || [],
        hide: !!cardTypeItem?.principal,
        fallbackValue: item?.card?.title,
        enabledOnOpen: true,
      },
    ],
    [
      disabled,
      cycleOptions,
      columns,
      watches.cycle,
      watches.cardType,
      page.kanban?.project_id,
      item,
    ]
  );

  const form = useFormList<Partial<FormData>>({
    fields,
    schema,
    defaultValues,
  });

  const cycle = form.hook.watch("project_kanban_cycle_id");
  const column = form.hook.watch("project_kanban_cycle_column_id");
  const cardType = form.hook.watch("project_kanban_cycle_card_type_id");

  useEffect(() => {
    setWatches((prev) => ({
      ...prev,
      cycle,
      column,
      cardType,
    }));
  }, [cycle, column, cardType]);

  const validateAndResetDependentFields = useCallback(() => {
    const currentValues = form.hook.getValues();

    const columnExists = columns.some((col) => col.value === watches.column);

    if (watches.column && !columnExists) {
      form.hook.setValue("project_kanban_cycle_column_id", null);
    } else if (watches.cycle === item?.project_kanban_cycle_id && !watches.column) {
      const initialColumnExists = columns.some(
        (col) => col.value === item?.project_kanban_cycle_column_id
      );
      if (
        initialColumnExists &&
        currentValues.project_kanban_cycle_column_id !== item?.project_kanban_cycle_column_id
      ) {
        form.hook.setValue("project_kanban_cycle_column_id", item?.project_kanban_cycle_column_id);
      }
    }
  }, [watches, columns, form.hook, item]);

  useEffect(() => {
    validateAndResetDependentFields();
  }, [validateAndResetDependentFields]);

  return {
    ...form,
    config: {
      schema,
      fields,
      defaultValues,
    },
  };
};
