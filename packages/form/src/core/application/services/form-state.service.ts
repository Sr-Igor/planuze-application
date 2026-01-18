import { FieldValues, UseFormReturn } from 'react-hook-form';
import { IField } from '../../domain/interfaces/field.interface';

/**
 * Service for form state management
 * Following the Single Responsibility Principle (SRP)
 */
export class FormStateService<FormType extends FieldValues> {
    /**
     * Calculates initial values based on fields
     */
    calculateInitialValues(
        fields: IField<FormType>[],
        defaultValues?: Partial<FormType>,
        values?: FormType
    ): Partial<FormType> {
        const fieldDefaults = fields.reduce((acc, field) => {
            (acc as any)[field.name] = this.getInitialValueForField(field);
            return acc;
        }, {} as Partial<FormType>);

        const merged = { ...fieldDefaults, ...defaultValues, ...values };

        // Normalizes null/empty values
        return Object.fromEntries(
            Object.entries(merged).map(([key, value]) => {
                const field = fields.find((f) => f.name === key);
                if (!field) return [key, value];

                const defaultValue = fieldDefaults?.[key as keyof typeof fieldDefaults];

                if (
                    (value === null || value === undefined) &&
                    defaultValue !== null &&
                    defaultValue !== undefined
                ) {
                    return [key, defaultValue];
                }
                if (value === '' && defaultValue === null) return [key, null];
                if (value === '' && defaultValue === undefined) return [key, undefined];

                return [key, value];
            })
        ) as Partial<FormType>;
    }

    /**
     * Gets initial value for a specific field
     */
    private getInitialValueForField(field: IField<FormType>): any {
        switch (field.field) {
            case 'input':
                return '';
            case 'numeric':
            case 'money':
            case 'percentage':
                return null;
            case 'checkbox':
            case 'switch':
                return false;
            case 'calendar':
                return null;
            case 'select':
            case 'infinity_select':
            case 'country':
            case 'state':
            case 'city':
                return null;
            case 'editor':
                return null;
            case 'tags':
                return [];
            case 'textarea':
                return undefined;
            default:
                return undefined;
        }
    }

    /**
     * Checks if the form has been modified
     */
    isDirty(hook: UseFormReturn<FormType>): boolean {
        return hook.formState.isDirty;
    }

    /**
     * Checks if there are errors in the form
     */
    hasErrors(hook: UseFormReturn<FormType>): boolean {
        return !!Object.keys(hook.formState.errors).length;
    }
}
