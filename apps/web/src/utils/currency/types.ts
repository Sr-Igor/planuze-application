export interface CurrencyInfo {
    code: string;
    name: string;
    symbol: string;
    decimal_digits: number;
    groupSeparator: string;
    decimalSeparator: string;
    position: 'before' | 'after';
    locales: string[];
}
