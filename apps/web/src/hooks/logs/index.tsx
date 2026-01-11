import { useLang } from "@repo/language/hook";
import { ILogsComparison } from "@repo/ui/app";

import { project_kanban_cycle_card_tag } from "@/api/generator/types";

import { useConstants } from "../constants";

type LogKey = Omit<ILogsComparison<any>, "logs">;

export const useLogs = () => {
  const t = useLang();
  const {
    recurrenceType,
    recurrenceTypeWithoutNo,
    paymentRoutine,
    contactType,
    documentType,
    units,
    accountTypes,
    toolsTypes,
    bonusesTypes,
    consumptionType,
  } = useConstants();

  const logKeys: Record<string, () => LogKey> = {
    company: () => ({
      deleteKeys: [
        "company_address",
        "company_documents",
        "company_contacts",
        "company_files",
        "logo",
      ],
    }),
    company_config: () => ({
      deleteKeys: ["company_id"],
    }),
    company_address: () => ({
      deleteKeys: ["company_id"],
    }),
    company_document: () => ({
      deleteKeys: ["company_id"],
      conversor: {
        type: documentType,
      },
    }),
    company_contact: () => ({
      deleteKeys: ["company_id"],
      conversor: {
        type: contactType,
      },
    }),
    profile: () => ({
      deleteKeys: [
        "user",
        "user_id",
        "level_id",
        "company_id",
        "profile_address",
        "profile_documents",
        "profile_contacts",
        "profile_files",
        "profile_roles",
        "profile_bonus",
      ],
      format: {
        level: (_, item) => item?.level?.title,
      },
    }),
    profile_address: () => ({
      deleteKeys: ["profile_id", "company_id"],
    }),
    profile_bonus: () => ({
      deleteKeys: ["profile_id", "company_id", "cost_center_id"],
      format: {
        cost_center: (value) => value?.title,
      },
      conversor: {
        recurrence: recurrenceTypeWithoutNo,
        payment_routine: paymentRoutine,
        type: bonusesTypes,
      },
    }),
    profile_contact: () => ({
      deleteKeys: ["profile_id", "company_id"],
      conversor: {
        type: contactType,
      },
    }),
    profile_document: () => ({
      deleteKeys: ["profile_id", "company_id"],
      conversor: {
        type: documentType,
      },
    }),
    profile_role: () => ({
      deleteKeys: ["profile_id", "company_id", "role_id", "cost_center_id"],
      format: {
        role: (value) => value?.title,
        cost_center: (value) => value?.title,
      },

      conversor: { recurrence: recurrenceType },
    }),
    profile_bank_account: () => ({
      deleteKeys: ["profile_id", "company_id"],
      format: {
        bank_name: (_, item) => item.bank_name,
        bank_number: (_, item) => item.bank_number,
      },
      conversor: {
        type: accountTypes,
      },
    }),
    work_type: () => ({
      deleteKeys: ["company_id"],
    }),
    cost_center: () => ({
      deleteKeys: ["company_id"],
    }),
    role: () => ({
      deleteKeys: ["company_id", "cost_center_id", "work_type_id"],
      format: {
        cost_center: (value) => value?.title,
        work_type: (value) => value?.title,
      },
      conversor: {
        recurrence: recurrenceType,
      },
    }),
    integration: () => ({
      deleteKeys: ["integration_actions", "token", "company_id"],
    }),
    invite: () => ({
      deleteKeys: ["profile_id", "level_id", "company_id"],
      format: {
        level: (value) => value?.title,
      },
    }),
    level: () => ({
      deleteKeys: ["company_id", "level_actions", "profiles"],
    }),
    kanban_template: () => ({
      deleteKeys: [
        "company_id",
        "kanban_template_cards",
        "kanban_template_columns",
        "profile_id",
        "profile",
      ],
    }),
    kanban_template_card: () => ({
      deleteKeys: ["kanban_template_id", "company_id"],
    }),
    kanban_template_column: () => ({
      deleteKeys: ["kanban_template_id", "company_id"],
    }),
    kanban_template_card_type: () => ({
      deleteKeys: ["company_id"],
    }),
    project_kanban: () => ({
      deleteKeys: ["company_id", "project_id", "profile_id"],
      format: {
        project: (_, item) => item?.project?.name,
      },
    }),
    client: () => ({
      deleteKeys: [
        "company_id",
        "client_address",
        "client_contacts",
        "client_documents",
        "client_files",
        "projects",
      ],
    }),
    client_document: () => ({
      deleteKeys: ["client_id", "company_id"],
      conversor: {
        type: documentType,
      },
    }),
    client_contact: () => ({
      deleteKeys: ["client_id", "company_id"],
      conversor: {
        type: contactType,
      },
    }),
    client_address: () => ({
      deleteKeys: ["client_id", "company_id"],
    }),
    client_bank_account: () => ({
      deleteKeys: ["client_id", "company_id"],
      format: {
        bank_name: (_, item) => item.bank_name,
        bank_number: (_, item) => item.bank_number,
      },
      conversor: {
        type: accountTypes,
      },
    }),
    project: () => ({
      deleteKeys: ["company_id", "client_id", "project_kanbans", "project_configs"],
      format: {
        client: (_, item) => item?.client?.name,
      },
    }),
    project_financial: () => ({
      deleteKeys: ["project_id", "company_id", "project_version_id", "work_type_id"],
      format: {
        work_type: (_, item) => item?.work_type?.title,
        project_version: (_, item) =>
          item?.project_version?.version ? `V${item?.project_version?.version}` : null,
      },
    }),
    project_financial_employees: () => ({
      deleteKeys: ["project_id", "company_id", "project_financial_id", "role_id"],
      format: {
        role: (_, item) => item?.role?.title,
        project_financial: (_, item) =>
          item?.project_financial?.work_type
            ? `${item?.project_financial?.work_type?.title} (V${item?.project_financial?.project_version?.version})`
            : null,
      },
    }),
    project_member: () => ({
      deleteKeys: ["project_id", "company_id", "profile_id"],
      format: {
        profile: (_, item) => item?.profile?.user?.name,
      },
    }),
    project_version: () => ({
      deleteKeys: ["project_id", "company_id"],
    }),
    project_config: () => ({
      deleteKeys: ["project_id", "company_id", "project_version_id"],
      format: {
        project_version: (_, item) =>
          item?.project_version?.version && `V${item?.project_version?.version}`,
      },
    }),
    project_allocation: () => ({
      deleteKeys: ["project_id", "company_id", "project_version_id", "profile_id"],
      format: {
        project_version: (_, item) =>
          item?.project_version?.version && `V${item?.project_version?.version}`,
        profile: (_, item) => item?.profile?.user?.name,
      },
    }),
    client_file: () => ({
      deleteKeys: [
        "client_id",
        "company_id",
        "idx",
        "localId",
        "file",
        "progress",
        "status",
        "error",
        "vector",
        "vector_error",
      ],
    }),
    company_file: () => ({
      deleteKeys: [
        "company_id",
        "idx",
        "localId",
        "file",
        "progress",
        "status",
        "error",
        "vector",
        "vector_error",
      ],
    }),
    profile_file: () => ({
      deleteKeys: [
        "profile_id",
        "company_id",
        "idx",
        "localId",
        "file",
        "progress",
        "status",
        "error",
        "vector",
        "vector_error",
      ],
    }),
    project_kanban_cycle_card: () => ({
      deleteKeys: [
        "company_id",
        "order",
        "estimate_unit",
        "work_in_progress_unit",
        "execute_unit",
        "public_id",
        "project_kanban_id",
        "project",
        "profile",
        "project_version",
        "project_kanban_cycle_card_type",
        "project_kanban_cycle_column",
        "project_kanban_cycle",
        "project_kanban_cycle_cards",
        "project_id",
        "work_type",
        "card",
        "description",
        "project_kanban_cycle_card_files",
        "project_kanban_cycle_card_comments",
        "project_kanban_objective_target",
        "project_kanban_objective",
        "project_kanban_cycle_card_reads",
      ],
      format: {
        project_kanban_cycle_card_type_id: (_, item) => item?.project_kanban_cycle_card_type?.title,
        project_kanban_cycle_column_id: (_, item) =>
          `${item?.project_kanban_cycle_column?.title || "unknown"} (${item?.project_kanban_cycle?.title || "unknown"})`,
        project_kanban_cycle_id: (_, item) => item?.project_kanban_cycle?.title,
        profile_id: (_, item) => item?.profile?.user?.name,
        work_type_id: (_, item) => item?.work_type?.title,
        card_id: (_, item) => item?.card?.title,
        estimate: (_, item) =>
          item?.estimate && `${item?.estimate} ${t.helper(item?.estimate_unit)}`,
        execute: (_, item) => item?.execute && `${item?.execute} ${t.helper(item?.execute_unit)}`,
        work_in_progress: (_, item) =>
          item?.work_in_progress &&
          `${item?.work_in_progress} ${t.helper(item?.work_in_progress_unit)}`,
        project_kanban_cycle_card_tags: (_, item) =>
          item?.project_kanban_cycle_card_tags
            ?.map((tag: project_kanban_cycle_card_tag) => tag.title)
            ?.join(", "),
        project_kanban_objective_target_id: (_, item) =>
          item?.project_kanban_objective_target?.title,
        project_kanban_objective_id: (_, item) => item?.project_kanban_objective?.title,
      },
    }),
    project_kanban_cycle_card_file: () => ({
      deleteKeys: [
        "project_kanban_cycle_card_id",
        "company_id",
        "project_id",
        "idx",
        "localId",
        "file",
        "progress",
        "status",
        "error",
        "vector",
        "vector_error",
      ],
    }),
    project_kanban_objective: () => ({
      deleteKeys: [
        "company_id",
        "project_id",
        "project_kanban_id",
        "public_id",
        "project",
        "project_kanban_objective_targets",
      ],
    }),
    project_kanban_objective_target: () => ({
      deleteKeys: [
        "project_kanban_objective_id",
        "project_id",
        "project_kanban_id",
        "company_id",
        "public_id",
      ],
    }),
    project_kanban_cycle: () => ({
      deleteKeys: [
        "company_id",
        "project_id",
        "project_kanban_id",
        "public_id",
        "project",
        "project_kanban_cycles",
        "project_kanban_cycle_cards",
        "project_kanban_cycle_card_types",
        "project_kanban_cycle_columns",
      ],
      format: {
        project_version_id: (_, item) =>
          item?.project_version?.version && `V${item?.project_version?.version}`,
      },
    }),
    project_kanban_cycle_allocation: () => ({
      deleteKeys: [
        "project_kanban_cycle_id",
        "company_id",
        "public_id",
        "profile_id",
        "project_member",
        "project_member_id",
        "project_id",
        "project_kanban_id",
      ],
      format: {
        profile: (_, item) => item?.profile?.user?.name,
      },
      conversor: {
        unit: units,
      },
    }),
    project_kanban_cycle_column: () => ({
      deleteKeys: [
        "project_kanban_cycle_id",
        "company_id",
        "public_id",
        "project_id",
        "project_kanban_id",
      ],
    }),
    project_kanban_cycle_card_type: () => ({
      deleteKeys: [
        "project_kanban_cycle_id",
        "company_id",
        "public_id",
        "project_id",
        "project_kanban_id",
        "kanban_template_card_type_id",
      ],
    }),
    project_tool: () => ({
      deleteKeys: ["project_id", "company_id", "project_version"],
      format: {
        project_version_id: (_, item) =>
          item?.project_version?.version && `V${item?.project_version?.version}`,
      },
      conversor: {
        recurrence: recurrenceTypeWithoutNo,
        type: toolsTypes,
        consumption: consumptionType,
      },
    }),
  };

  return logKeys;
};
