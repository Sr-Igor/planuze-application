import { FieldValues, UseFormReturn, useForm, UseFormProps , Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Adapter for integration with react-hook-form
 * Following the Dependency Inversion Principle (DIP)
 */
export class ReactHookFormAdapter {
    /**
     * Creates a form hook
     */
    createForm<T extends FieldValues>(
        resolver: Resolver<T>,
        defaultValues?: UseFormProps<T>['defaultValues'],
        values?: T,
        resetOptions?: UseFormProps<T>['resetOptions']
    ): UseFormReturn<T> {
        return useForm<T>({
            resolver: zodResolver(resolver as any),
            mode: 'onChange',
            defaultValues: defaultValues as any,
            values: values as T,
            resetOptions,
        });
    }
}
