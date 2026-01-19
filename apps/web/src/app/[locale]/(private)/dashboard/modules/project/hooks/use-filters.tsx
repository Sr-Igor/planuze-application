"use client";

import { useEffect, useRef } from "react";

import { useWatch } from "react-hook-form";

import { index as indexCostCenter } from "@repo/api/web/req/cost_center";
import { index as indexProfile } from "@repo/api/web/req/profile";
import { index as indexProjectVersion } from "@repo/api/web/req/project_version";
import { index as indexWorkType } from "@repo/api/web/req/work_type";
import { IValidatorRequest } from "@repo/form";
import { useFormList } from "@repo/form";
import { Field } from "@repo/form";
import { cost_center, profile, project_version, work_type } from "@repo/types";

import { QueryFilters } from "../types";

export interface IUseFiltersProps {
  filters: QueryFilters;
}

type FiltersFormType = QueryFilters;

export const useFilters = ({ filters }: IUseFiltersProps) => {
  const defaultValues: FiltersFormType = {
    project_id: [],
    project_version_id: [],
    work_type_id: [],
    cost_center_id: [],
    owner_id: [],
    start_date: undefined,
    end_date: undefined,
  };

  const schema: IValidatorRequest = {
    query: [
      {
        key: "project_id",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
        model: "project",
        column: "id",
      },
      {
        key: "owner_id",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
        model: "profile",
        column: "id",
      },
      {
        key: "project_version_id",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
        model: "project_version",
        column: "id",
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
        key: "cost_center_id",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
        model: "cost_center",
        column: "id",
      },
      {
        key: "start_date",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },
      {
        key: "end_date",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },
    ],
  };

  const projectId = useRef<string[] | undefined>(filters.project_id);
  const projectVersionId = useRef<string[] | undefined>(filters.project_version_id);

  const fields: Field<FiltersFormType>[] = [
    {
      field: "infinity_checkbox",
      name: "project_version_id",
      label: "project",
      className: "col-span-2 lg:col-span-1",
      disabled: false,
      cacheKey: "project_version_dashboard_filter_infinity",
      request: indexProjectVersion,
      formatter: (items: project_version[]) =>
        items?.map((item) => ({
          label: item.name || item.id,
          value: item.id,
          item,
        })) || [],
      formatterOptions: (item: project_version) => {
        return `${item.project?.name} - V${item.version}`;
      },
      enabledOnOpen: true,
    },
    {
      field: "infinity_checkbox",
      name: "owner_id",
      label: "responsible",
      className: "col-span-2 lg:col-span-1",
      disabled: false,
      cacheKey: "profile_infinity",
      request: indexProfile,
      formatter: (items: profile[]) =>
        items?.map((item) => ({
          label: item.user?.name || item.id,
          value: item.id,
          item,
        })) || [],

      enabledOnOpen: true,
    },
    {
      field: "infinity_checkbox",
      name: "work_type_id",
      label: "work_type_id",
      className: "col-span-2 lg:col-span-1",
      disabled: false,
      cacheKey: "work_type_dashboard_filter_infinity",
      request: indexWorkType,
      formatter: (items: work_type[]) =>
        items?.map((item) => ({
          label: item.title,
          value: item.id,
          item,
        })) || [],
      enabledOnOpen: true,
    },
    {
      field: "infinity_checkbox",
      name: "cost_center_id",
      label: "cost_center_id",
      className: "col-span-2 lg:col-span-1",
      disabled: false,
      cacheKey: "cost_center_dashboard_filter_infinity",
      request: indexCostCenter,
      formatter: (items: cost_center[]) =>
        items?.map((item) => ({
          label: item.title,
          value: item.id,
          item,
        })) || [],
      enabledOnOpen: true,
    },
    {
      field: "calendar",
      name: "start_date",
      label: "start_date",
      className: "col-span-2 lg:col-span-1",
      disabled: false,
      disabledPast: false,
      disabledFuture: false,
    },
    {
      field: "calendar",
      name: "end_date",
      label: "end_date",
      className: "col-span-2 lg:col-span-1",
      disabled: false,
      disabledPast: false,
      disabledFuture: false,
    },
  ];

  const defaultValuesWithDates: Partial<FiltersFormType> = {
    ...defaultValues,
    ...filters,
    start_date: filters.start_date ? new Date(filters.start_date) : undefined,
    end_date: filters.end_date ? new Date(filters.end_date) : undefined,
  };

  const form = useFormList<FiltersFormType>({
    fields,
    schema,
    defaultValues: defaultValuesWithDates,
  });

  const watch = useWatch({ control: form.hook.control });

  useEffect(() => {
    if (watch.project_id !== projectId.current) {
      projectId.current = watch.project_id;
      if (!watch.project_id) form.hook.setValue("project_version_id", undefined);
    }
  }, [watch.project_id, form.hook]);

  return {
    ...form,
    clearFilters: () => {
      form.hook.reset(defaultValues);
      projectId.current = undefined;
      projectVersionId.current = undefined;
    },
    hasActiveFilters: Boolean(
      Object.values(watch).some((value) => {
        return Array.isArray(value) ? value.length > 0 : !!value;
      })
    ),
  };
};
