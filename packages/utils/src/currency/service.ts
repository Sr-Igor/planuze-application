import CurrencyList from "currency-list";

import { currencyConfigs } from "./data";
import type { CurrencyInfo } from "./types";

export const getCurrencyInfo = (code: string, locale: string): CurrencyInfo | undefined => {
  const config = currencyConfigs[code];
  if (!config) return undefined;

  const name = CurrencyList.get(code, locale)?.name || code;

  return { ...config, name };
};

export const getAllCurrencies = (locale: string): CurrencyInfo[] => {
  const fLocale = locale.replace("-", "_");

  let currencyListData = CurrencyList.getAll(fLocale);
  if (!currencyListData) currencyListData = CurrencyList.getAll("en");

  return Object.values(currencyConfigs).map((config: any) => {
    const name = currencyListData[config.code]?.name || config.code;
    return { ...config, name };
  });
};

export const getDefaultCurrencyByLocale = (locale: string): string => {
  for (const [code, currency] of Object.entries(currencyConfigs)) {
    if (currency.locales.includes(locale)) {
      return code;
    }
  }

  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currencyDisplay: "code",
    });

    const parts = formatter.formatToParts(0);
    const currencyPart = parts.find((part) => part.type === "currency");

    if (currencyPart && currencyConfigs[currencyPart.value]) {
      return currencyPart.value;
    }
  } catch (e) {
    console.error(e);
    console.warn(`[CurrencyService] Não foi possível determinar a moeda para o locale: ${locale}`);
  }

  return "USD";
};

export const getCurrenciesByRegion = (
  region: "americas" | "europe" | "asia" | "middle-east-africa" | "oceania",
  locale: string
): CurrencyInfo[] => {
  const regionMap: Record<typeof region, string[]> = {
    americas: [
      "ARS",
      "BOB",
      "BRL",
      "CAD",
      "CLP",
      "COP",
      "CRC",
      "CUP",
      "DOP",
      "GTQ",
      "HNL",
      "HTG",
      "JMD",
      "MXN",
      "NIO",
      "PAB",
      "PEN",
      "PYG",
      "UYU",
      "USD",
      "VES",
    ],
    europe: [
      "ALL",
      "AMD",
      "AZN",
      "BAM",
      "BGN",
      "BYN",
      "CHF",
      "CZK",
      "DKK",
      "EUR",
      "FKP",
      "GBP",
      "GEL",
      "GIP",
      "HRK",
      "HUF",
      "ISK",
      "MDL",
      "MKD",
      "NOK",
      "PLN",
      "RON",
      "RSD",
      "RUB",
      "SEK",
      "TRY",
      "UAH",
    ],
    asia: [
      "AFN",
      "BDT",
      "BND",
      "BTN",
      "CNY",
      "HKD",
      "IDR",
      "ILS",
      "INR",
      "IQD",
      "IRR",
      "JOD",
      "JPY",
      "KGS",
      "KHR",
      "KRW",
      "KZT",
      "LAK",
      "LBP",
      "LKR",
      "MMK",
      "MNT",
      "MOP",
      "MYR",
      "NPR",
      "PHP",
      "PKR",
      "SGD",
      "SYP",
      "THB",
      "TJS",
      "TMT",
      "TWD",
      "UZS",
      "VND",
      "YER",
    ],
    "middle-east-africa": [
      "AED",
      "AOA",
      "BHD",
      "BIF",
      "BWP",
      "CDF",
      "CVE",
      "DJF",
      "DZD",
      "EGP",
      "ERN",
      "ETB",
      "GHS",
      "GMD",
      "GNF",
      "KES",
      "KMF",
      "KWD",
      "LRD",
      "LSL",
      "LYD",
      "MAD",
      "MGA",
      "MRU",
      "MUR",
      "MWK",
      "MZN",
      "NAD",
      "NGN",
      "OMR",
      "QAR",
      "RWF",
      "SAR",
      "SCR",
      "SDG",
      "SLE",
      "SLL",
      "SOS",
      "SSP",
      "STN",
      "SZL",
      "TND",
      "TZS",
      "UGX",
      "XAF",
      "XOF",
      "ZAR",
      "ZMW",
      "ZWL",
    ],
    oceania: ["AUD", "FJD", "GYD", "NZD", "PGK", "SBD", "SRD", "TOP", "VUV", "WST", "XPF"],
  };

  const codesInRegion = regionMap[region] || [];

  return codesInRegion
    .map((code) => getCurrencyInfo(code, locale))
    .filter((currency): currency is CurrencyInfo => currency !== undefined);
};
