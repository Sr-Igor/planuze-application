import { UseFormReturn } from 'react-hook-form';

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
        console.warn('Erro ao comparar arrays com JSON.stringify:', error);
        return false;
    }
};

const isDateValue = (value: any): boolean => {
    // Se é uma instância de Date, é data
    if (value instanceof Date) return true;

    // Se é string, verifica se é uma data válida com padrões específicos
    if (typeof value === 'string') {
        // Rejeita strings que são apenas números
        if (/^\d+$/.test(value)) return false;

        // Rejeita strings muito curtas (menos de 8 caracteres)
        if (value.length < 8) return false;

        // Deve conter caracteres típicos de data (hífen, barra, espaço, T, Z)
        if (!/[-/sTZ]/.test(value)) return false;

        // Padrões específicos de data que aceitamos
        const datePatterns = [
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/, // ISO 8601
            /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
            /^\d{2}\/\d{2}\/\d{4}$/, // DD/MM/YYYY
            /^\d{4}\/\d{2}\/\d{2}$/, // YYYY/MM/DD
            /^\w{3} \w{3} \d{2} \d{4}/, // Wed Oct 01 2025
            /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/ // YYYY-MM-DD HH:MM:SS
        ];

        // Verifica se corresponde a algum padrão de data
        const matchesPattern = datePatterns.some((pattern) => pattern.test(value));
        if (!matchesPattern) return false;

        // Verifica se é uma data válida
        const parsed = new Date(value);
        if (isNaN(parsed.getTime())) return false;

        // Verifica se o ano está em um range razoável
        const year = parsed.getFullYear();
        return year >= 1900 && year <= 2100;
    }

    // Se é número, verifica se é um timestamp válido (muito restritivo)
    if (typeof value === 'number') {
        if (isNaN(value) || value <= 0) return false;

        // Timestamps válidos são maiores que 1970-01-01 (0 segundos)
        // e menores que 2100-01-01 (4102444800000 ms)
        const minTimestamp = 0;
        const maxTimestamp = 4102444800000;

        if (value < minTimestamp || value > maxTimestamp) return false;

        // Verifica se o timestamp representa uma data válida
        const date = new Date(value);
        return !isNaN(date.getTime()) && date.getFullYear() >= 1970;
    }

    return false;
};

const normalizeDate = (value: any): Date | null => {
    if (value instanceof Date) return value;
    if (typeof value === 'string') {
        const parsed = new Date(value);
        return isNaN(parsed.getTime()) ? null : parsed;
    }
    if (typeof value === 'number') {
        const parsed = new Date(value);
        return isNaN(parsed.getTime()) ? null : parsed;
    }
    return null;
};

const compareDates = (date1: any, date2: any): boolean => {
    const normalizedDate1 = normalizeDate(date1);
    const normalizedDate2 = normalizeDate(date2);

    if (!normalizedDate1 || !normalizedDate2) return false;

    // Compara apenas a data (sem horário) para evitar problemas de timezone
    const time1 = normalizedDate1.getTime();
    const time2 = normalizedDate2.getTime();

    // Tolerância de 1 segundo para diferenças de timezone
    return Math.abs(time1 - time2) < 1000;
};

const deepCompareValues = (value1: any, value2: any): boolean => {
    // Se ambos são arrays, usa comparação profunda
    if (Array.isArray(value1) && Array.isArray(value2)) {
        return deepCompareArrays(value1, value2);
    }

    // Se apenas um é array, são diferentes
    if (Array.isArray(value1) || Array.isArray(value2)) {
        return false;
    }

    // Se ambos são valores de data, usa comparação específica para datas
    if (isDateValue(value1) && isDateValue(value2)) {
        return compareDates(value1, value2);
    }

    // Se apenas um é data, são diferentes
    if (isDateValue(value1) || isDateValue(value2)) {
        return false;
    }

    // Para outros tipos, comparação direta
    return value1 === value2;
};

export const submitForm = (data: any, item: any, onEmpty?: () => void) => {
    const current = Object?.keys(item || {});
    if (!current.length) return data;

    Object.keys(data).forEach((key) => {
        const dataValue = data[key];
        const itemValue = item?.[key];

        // Verifica se o valor deve ser removido
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
        onEmpty && onEmpty();
    }
};

type Hook = {
    hook: UseFormReturn<any>;
    data?: Record<string, any>;
    custom?: (data: any) => any;
};

export function hookValidate(forms: Hook[], onValidate: (data: any) => void, onError?: (e: any) => void) {
    let error = false;
    new Promise((resolve) => {
        let current = {};
        const promises = forms.map(({ hook, data, custom }) => {
            return new Promise((resolve) => {
                const errors = hook.formState.errors;
                const hasErrors = Object.keys(errors).length;

                if (hasErrors) {
                    error = true;
                    onError?.(errors);
                    resolve(current);

                    return;
                }

                hook.handleSubmit(
                    (v) => {
                        const item = submitForm(v, data);

                        current = { ...current, ...(custom ? custom(item) : item) };
                        resolve(current);
                    },
                    () => {
                        error = true;
                        resolve(current);
                    }
                )();
            });
        });

        Promise.all(promises)
            .then(() => {
                resolve(current);

                return current;
            })
            .catch((err) => {
                console.error('Error in hookValidate promises:', err);
                error = true;
                resolve(current);
            });
    })
        .then((data: any) => {
            if (error) return error;

            forms.forEach(({ hook }) => {
                hook.reset(undefined, {
                    keepValues: true,
                    keepDirty: false
                });
            });

            onValidate(data);

            return data;
        })
        .catch((err) => {
            console.error('Error in hookValidate:', err);
        });
}
