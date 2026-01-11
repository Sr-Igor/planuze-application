import { useLocale } from "next-intl";

import { useConstants } from "@repo/hooks/constants";
import { TrashProps } from "@repo/ui/app";

import { formatCurrency } from "@/utils/currency";

type TrashKey<T extends Record<string, any> = any> = Omit<TrashProps<T>, "items" | "loading">;

export const useTrash = (): Record<string, () => any> => {
  const locale = useLocale();
  const { contactType, documentType, paymentRoutine, accountTypes } = useConstants();

  const trashKeys: Record<string, () => TrashKey<any>> = {
    client_contact: () => ({
      showKeys: ["type", "register"],
      conversor: { type: contactType },
    }),
    client_document: () => ({
      showKeys: ["type", "register"],
      conversor: { type: documentType },
    }),
    company_contact: () => ({
      showKeys: ["type", "register"],
      conversor: { type: contactType },
    }),
    company_document: () => ({
      showKeys: ["type", "register"],
      conversor: { type: documentType },
    }),
    client_bank_account: () => ({
      showKeys: ["bank_name", "bank_number"],
      format: {
        bank_name: (_, item) => item.bank_name,
        bank_number: (_, item) => item.bank_number,
      },
      conversor: {
        type: accountTypes,
      },
    }),
    profile_contact: () => ({
      showKeys: ["type", "register"],
      conversor: { type: contactType },
    }),
    profile_document: () => ({
      showKeys: ["type", "register"],
      conversor: { type: documentType },
    }),
    profile_bank_account: () => ({
      showKeys: ["bank_name", "bank_number"],
      format: {
        bank_name: (_, item) => item.bank_name,
        bank_number: (_, item) => item.bank_number,
      },
      conversor: {
        type: accountTypes,
      },
    }),
    kanban_template_card: () => ({
      showKeys: ["kanban_template_card_type_id"],
      format: {
        kanban_template_card_type_id: (_, item) => item.kanban_template_card_type?.title,
      },
    }),
    kanban_template_card_type: () => ({
      showKeys: ["kanban_template_card_type_id"],
      format: {
        kanban_template_card_type_id: (_, item) => item.kanban_template_card_type?.title,
      },
    }),
    kanban_template_column: () => ({
      showKeys: ["title", "order"],
    }),
    profile_bonus: () => ({
      showKeys: ["title", "pay"],
      conversor: { payment_routine: paymentRoutine },
      format: {
        cost_center_id: (_, item) => item.cost_center?.title,
        pay: (_, item) => formatCurrency(item.pay, item.currency, locale),
      },
    }),
    profile_role: () => ({
      showKeys: ["role_id", "pay"],
      format: {
        role_id: (_, item) => item.role?.title,
        cost_center_id: (_, item) => item.cost_center?.title,
        pay: (_, item) => formatCurrency(item.pay, item.currency, locale),
      },
    }),
    project_financial: () => ({
      showKeys: ["work_type_id"],
      format: {
        work_type_id: (_, item) =>
          `${item?.work_type?.title} ${item?.project_version?.version ? `- (V${item?.project_version?.version})` : ""}`,
      },
    }),
    project_financial_employees: () => ({
      showKeys: ["project_financial", "quantity", "unit_value"],
      format: {
        project_financial: (_, item) =>
          item?.project_financial?.work_type
            ? `${item?.project_financial?.work_type?.title} (${item?.project_financial?.project_version?.version ? `V${item?.project_financial?.project_version?.version}` : "-"})`
            : null,
        quantity: (_, item) => item?.quantity,
        unit_value: (_, item) => formatCurrency(item?.unit_value, item?.currency, locale),
      },
    }),
    project_member: () => ({
      showKeys: ["profile_id"],
      format: {
        profile_id: (_, item) => item?.profile?.user?.name || item?.profile?.anonymous_name || "-",
      },
    }),
    project_version: () => ({
      showKeys: ["name"],
      format: {
        name: (_, item) => `(V${item.version})${item.name ? ` - ${item.name}` : ""}`,
      },
    }),
    project_config: () => ({
      showKeys: ["project_version_id"],
      format: {
        project_version_id: (_, item) => `V${item?.project_version?.version}`,
      },
    }),
    project_tool: () => ({
      showKeys: ["title", "project_version_id"],
      format: {
        project_version_id: (_, item) => `V${item?.project_version?.version}`,
      },
    }),
    project_allocation: () => ({
      showKeys: ["profile_id", "project_version_id"],
      format: {
        profile_id: (_, item) => item?.profile?.user?.name || item?.profile?.anonymous_name || "-",
        project_version_id: (_, item) => `V${item?.project_version?.version}`,
      },
    }),
    project_kanban_objective_target: () => ({
      showKeys: ["title"],
    }),
  };

  return trashKeys;
};
