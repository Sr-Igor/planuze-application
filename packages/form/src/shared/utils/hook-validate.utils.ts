import { UseFormReturn, FieldErrors, FieldValues } from 'react-hook-form';

import { submitForm } from './submit-form.utils';

/**
 * Hook configuration for form validation
 */
export interface HookConfig<FormType extends FieldValues = FieldValues> {
    hook: UseFormReturn<FormType>;
    data?: Record<string, any>;
    custom?: (data: any) => any;
}

/**
 * Validates multiple forms and processes their data
 * 
 * @param forms - Array of form configurations
 * @param onValidate - Callback when validation succeeds
 * @param onError - Callback when validation fails
 */
export function hookValidate<FormType extends FieldValues = FieldValues>(
    forms: HookConfig<FormType>[],
    onValidate: (data: any) => void,
    onError?: (errors: FieldErrors<FormType>) => void
) {
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
                    keepDirty: false,
                });
            });

            onValidate(data);

            return data;
        })
        .catch((err) => {
            console.error('Error in hookValidate:', err);
        });
}
