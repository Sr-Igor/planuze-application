import { useLang } from "@repo/language/hooks";

export const useConstants = () => {
  const t = useLang();

  const contactType = [
    {
      label: t.property("email"),
      value: "email",
    },
    {
      label: t.property("phone"),
      value: "phone",
    },
    {
      label: t.property("string"),
      value: "string",
    },
  ];

  const documentType = [
    {
      label: t.property("cnpj"),
      value: "cnpj",
    },
    {
      label: t.property("cpf"),
      value: "cpf",
    },
    {
      label: t.property("string"),
      value: "string",
    },
  ];

  const brazilDocumentType = [
    {
      label: t.property("cnpj"),
      value: "cnpj",
    },
    {
      label: t.property("cpf"),
      value: "cpf",
    },
  ];

  const twoFactorMethod = [
    {
      label: t.property("email"),
      value: "email",
    },
    {
      label: t.property("phone"),
      value: "phone",
    },
  ];

  const recurrenceType = [
    {
      label: t.helper("month"),
      value: "month",
    },
    {
      label: t.helper("week"),
      value: "week",
    },
    {
      label: t.helper("year"),
      value: "year",
    },
    {
      label: t.helper("day"),
      value: "day",
    },
  ];

  const consumptionType = [
    {
      label: t.helper("daily"),
      value: "daily",
    },
    {
      label: t.helper("integral"),
      value: "integral",
    },
  ];

  const bonusesTypes = [
    {
      label: t.helper("bonus"),
      value: "bonus",
    },
    {
      label: t.helper("extra"),
      value: "extra",
    },
  ];

  const toolsTypes = [
    {
      label: t.helper("tool"),
      value: "tool",
    },
    {
      label: t.helper("material"),
      value: "material",
    },
  ];

  const recurrenceTypeWithoutNo = [
    {
      label: t.helper("no_recurrence"),
      value: "no_recurrence",
    },
    ...recurrenceType,
  ];

  const paymentRoutine = [
    {
      label: t.helper("all_days"),
      value: "all_days",
    },
    {
      label: t.helper("unique_payment"),
      value: "unique_payment",
    },
    {
      label: t.helper("no_recurrence"),
      value: "no_recurrence",
    },
    ...recurrenceType,
  ];

  const payRecurrenceType = [
    {
      label: t.helper("all_days"),
      value: "all_days",
    },
    {
      label: t.helper("month"),
      value: "month",
    },
    {
      label: t.helper("week"),
      value: "week",
    },
    {
      label: t.helper("year"),
      value: "year",
    },
    {
      label: t.helper("day"),
      value: "day",
    },
  ];

  const providerType = [
    {
      label: t.helper("google"),
      value: "google",
    },
    {
      label: t.helper("manual"),
      value: "manual",
    },
  ];

  const units = [
    {
      label: t.helper("hour"),
      value: "hour",
    },
    {
      label: t.helper("minute"),
      value: "minute",
    },
  ];

  const accountTypes = [
    {
      label: t.helper("current_account"),
      value: "current_account",
    },
    {
      label: t.helper("savings_account"),
      value: "savings_account",
    },
    {
      label: t.helper("salary_account"),
      value: "salary_account",
    },
    {
      label: t.helper("digital_account"),
      value: "digital_account",
    },
    {
      label: t.helper("payment_account"),
      value: "payment_account",
    },
    {
      label: t.helper("investment_account"),
      value: "investment_account",
    },
    {
      label: t.helper("business_account"),
      value: "business_account",
    },
    {
      label: t.helper("personal_account"),
      value: "personal_account",
    },
    {
      label: t.helper("joint_account"),
      value: "joint_account",
    },
    {
      label: t.helper("other_account"),
      value: "other_account",
    },
  ];

  return {
    recurrenceType,
    recurrenceTypeWithoutNo,
    paymentRoutine,
    consumptionType,
    contactType,
    documentType,
    brazilDocumentType,
    payRecurrenceType,
    providerType,
    units,
    bonusesTypes,
    accountTypes,
    toolsTypes,
    twoFactorMethod,
  };
};
