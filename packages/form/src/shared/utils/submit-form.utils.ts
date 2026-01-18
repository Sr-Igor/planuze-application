/**
 * Utility functions for form submission and data processing
 */

/**
 * Deep comparison of arrays
 */
const deepCompareArrays = (arr1: any, arr2: any): boolean => {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        return arr1 === arr2;
    }

    if (arr1.length !== arr2.length) {
        return false;
    }

    try {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    } catch (error) {
        console.warn('Error comparing arrays with JSON.stringify:', error);
        return false;
    }
};

/**
 * Date patterns we accept
 */
const DATE_PATTERNS = [
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/, // ISO 8601
    /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
    /^\d{2}\/\d{2}\/\d{4}$/, // DD/MM/YYYY
    /^\d{4}\/\d{2}\/\d{2}$/, // YYYY/MM/DD
    /^\w{3} \w{3} \d{2} \d{4}/, // Wed Oct 01 2025
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/, // YYYY-MM-DD HH:MM:SS
] as const;

/**
 * Validates if a string represents a valid date
 */
const isDateString = (value: string): boolean => {
    // Reject strings that are just numbers
    if (/^\d+$/.test(value)) return false;

    // Reject strings that are too short (less than 8 characters)
    if (value.length < 8) return false;

    // Must contain typical date characters (hyphen, slash, space, T, Z)
    if (!/[-/\sTZ]/.test(value)) return false;

    // Check if it matches any date pattern
    const matchesPattern = DATE_PATTERNS.some((pattern) => pattern.test(value));
    if (!matchesPattern) return false;

    // Check if it's a valid date
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return false;

    // Check if the year is in a reasonable range
    const year = parsed.getFullYear();
    return year >= 1900 && year <= 2100;
};

/**
 * Validates if a number represents a valid timestamp
 */
const isDateTimestamp = (value: number): boolean => {
    if (Number.isNaN(value) || value <= 0) return false;

    // Valid timestamps are greater than 1970-01-01 (0 seconds)
    // and less than 2100-01-01 (4102444800000 ms)
    const minTimestamp = 0;
    const maxTimestamp = 4102444800000;

    if (value < minTimestamp || value > maxTimestamp) return false;

    // Check if the timestamp represents a valid date
    const date = new Date(value);
    return !Number.isNaN(date.getTime()) && date.getFullYear() >= 1970;
};

/**
 * Checks if a value is a date
 */
const isDateValue = (value: any): boolean => {
    if (value instanceof Date) return true;
    if (typeof value === 'string') return isDateString(value);
    if (typeof value === 'number') return isDateTimestamp(value);
    return false;
};

/**
 * Normalizes a value to a Date object
 */
const normalizeDate = (value: any): Date | null => {
    if (value instanceof Date) return value;
    if (typeof value === 'string') {
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
    if (typeof value === 'number') {
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
    return null;
};

/**
 * Compares two date values
 */
const compareDates = (date1: any, date2: any): boolean => {
    const normalizedDate1 = normalizeDate(date1);
    const normalizedDate2 = normalizeDate(date2);

    if (!normalizedDate1 || !normalizedDate2) return false;

    // Compare only the date (without time) to avoid timezone issues
    const time1 = normalizedDate1.getTime();
    const time2 = normalizedDate2.getTime();

    // Tolerance of 1 second for timezone differences
    return Math.abs(time1 - time2) < 1000;
};

/**
 * Deep comparison of values (arrays, dates, primitives)
 */
const deepCompareValues = (value1: any, value2: any): boolean => {
    // If both are arrays, use deep comparison
    if (Array.isArray(value1) && Array.isArray(value2)) {
        return deepCompareArrays(value1, value2);
    }

    // If only one is an array, they are different
    if (Array.isArray(value1) || Array.isArray(value2)) {
        return false;
    }

    // If both are date values, use specific date comparison
    if (isDateValue(value1) && isDateValue(value2)) {
        return compareDates(value1, value2);
    }

    // If only one is a date, they are different
    if (isDateValue(value1) || isDateValue(value2)) {
        return false;
    }

    // For other types, direct comparison
    return value1 === value2;
};

/**
 * Processes form data by removing unchanged or empty values
 * 
 * @param data - Form data to process
 * @param item - Original item to compare against
 * @param onEmpty - Callback when all fields are removed
 * @returns Processed data object or undefined if empty
 */
export const submitForm = (data: any, item: any, onEmpty?: () => void) => {
    const current = Object?.keys(item || {});
    if (!current.length) return data;

    Object.keys(data).forEach((key) => {
        const dataValue = data[key];
        const itemValue = item?.[key];

        // Check if the value should be removed
        const shouldRemove =
            (!item && (dataValue === '' || dataValue === undefined)) ||
            (item && deepCompareValues(dataValue, itemValue));

        if (shouldRemove) {
            delete data[key];
        }
    });

    if (Object.keys(data).length) {
        return data;
    } else {
        onEmpty?.();
    }
};
