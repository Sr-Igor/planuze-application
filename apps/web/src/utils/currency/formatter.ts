import { currencyConfigs } from './data';
import type { CurrencyInfo } from './types';

export const formatCurrency = (value: number | string, currencyCode: string, locale: string = 'en'): string => {
    const config = currencyConfigs[currencyCode];

    if (!config) {
        return `${currencyCode} ${value}`;
    }

    try {
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: config.decimal_digits,
            maximumFractionDigits: config.decimal_digits
        });

        return formatter.format(Number(value));
    } catch (error) {
        return formatCurrencyManual(value, config);
    }
};

export const formatCurrencyManual = (value: number | string, config: Omit<CurrencyInfo, 'name'>): string => {
    const numValue = Number(value);

    if (isNaN(numValue)) {
        return `${config.symbol} 0`;
    }

    const parts = numValue.toFixed(config.decimal_digits).split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '';

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, config.groupSeparator);

    let formattedValue = formattedInteger;
    if (decimalPart) {
        formattedValue += config.decimalSeparator + decimalPart;
    }

    if (config.position === 'before') {
        return `${config.symbol} ${formattedValue}`;
    } else {
        return `${formattedValue} ${config.symbol}`;
    }
};

export const formatCurrencySimple = (value: number | string, currencyCode: string): string => {
    const config = currencyConfigs[currencyCode];

    if (!config) {
        return `${currencyCode} ${value}`;
    }

    return formatCurrencyManual(value, config);
};
