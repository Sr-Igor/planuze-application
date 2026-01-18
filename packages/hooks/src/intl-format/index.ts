import { useLocale } from "next-intl";

import { format, Locale } from "date-fns";
import * as allLocales from "date-fns/locale";

const dateFnsLocales: Record<string, Locale> = allLocales;

function getDynamicDateFnsLocale(locale: string): Locale {
  const camelCaseKey = locale.replace(/-(\w)/, (_, letter) => letter.toUpperCase());

  const shortKey = locale.split("-")[0];

  if (dateFnsLocales[camelCaseKey]) {
    return dateFnsLocales[camelCaseKey];
  }
  if (dateFnsLocales[shortKey]) {
    return dateFnsLocales[shortKey];
  }

  return dateFnsLocales.enUS;
}

type Money = {
  currency: string;
  decimalSeparator: string;
  groupSeparator: string;
};

type Dates = {
  dateFormat: string;
  timeFormat: string;
  formatDate: (date?: Date | string | null) => string;
  format: (date?: Date | string | null) => string;
  ppp: (date?: Date | string | null) => string;
  rangeSingle: (date?: Date | string | null) => string;
  rangeFull: (from?: Date | string | null, to?: Date | string | null) => string;
};

type Locales = "pt-BR" | "en-US";

type Defaults = {
  money: Record<Locales, Money>;
  dates: Record<Locales, Dates>;
};

export const useIntlFormat = () => {
  const defaults: Defaults = {
    money: {
      "pt-BR": {
        currency: "BRL",
        decimalSeparator: ",",
        groupSeparator: ".",
      },
      "en-US": {
        currency: "USD",
        decimalSeparator: ".",
        groupSeparator: ",",
      },
    },
    dates: {
      "pt-BR": {
        dateFormat: "dd/MM/yyyy",
        timeFormat: "HH:mm",
        formatDate: (date?: Date | string | null) =>
          date
            ? format(new Date(date), "dd/MM/yyyy", { locale: getDynamicDateFnsLocale("pt-BR") })
            : "-",

        format: (date?: Date | string | null) =>
          date
            ? format(new Date(date), "dd/MM/yyyy HH:mm", {
                locale: getDynamicDateFnsLocale("pt-BR"),
              })
            : "-",
        ppp: (date?: Date | string | null) =>
          date ? format(new Date(date), "PPP", { locale: getDynamicDateFnsLocale("pt-BR") }) : "-",
        rangeSingle: (date?: Date | string | null) =>
          date
            ? format(new Date(date), "LLL dd, y", { locale: getDynamicDateFnsLocale("pt-BR") })
            : "-",
        rangeFull: (from?: Date | string | null, to?: Date | string | null) => {
          if (!from) return "-";
          const locale = getDynamicDateFnsLocale("pt-BR");
          if (to) {
            return `${format(new Date(from), "LLL dd, y", { locale })} - ${format(new Date(to), "LLL dd, y", { locale })}`;
          }
          return format(new Date(from), "LLL dd, y", { locale });
        },
      },
      "en-US": {
        dateFormat: "MM/dd/yyyy",
        timeFormat: "HH:mm",
        formatDate: (date?: Date | string | null) =>
          date
            ? format(new Date(date), "MM/dd/yyyy", { locale: getDynamicDateFnsLocale("en-US") })
            : "-",
        format: (date?: Date | string | null) =>
          date
            ? format(new Date(date), "MM/dd/yyyy HH:mm", {
                locale: getDynamicDateFnsLocale("en-US"),
              })
            : "-",
        ppp: (date?: Date | string | null) =>
          date ? format(new Date(date), "PPP", { locale: getDynamicDateFnsLocale("en-US") }) : "-",
        rangeSingle: (date?: Date | string | null) =>
          date
            ? format(new Date(date), "LLL dd, y", { locale: getDynamicDateFnsLocale("en-US") })
            : "-",
        rangeFull: (from?: Date | string | null, to?: Date | string | null) => {
          if (!from) return "-";
          const locale = getDynamicDateFnsLocale("en-US");
          if (to) {
            return `${format(new Date(from), "LLL dd, y", { locale })} - ${format(new Date(to), "LLL dd, y", { locale })}`;
          }
          return format(new Date(from), "LLL dd, y", { locale });
        },
      },
    },
  };

  const locale = (useLocale() || "pt-BR") as Locales;

  return {
    money: defaults.money[locale],
    dates: defaults.dates[locale],
  };
};
