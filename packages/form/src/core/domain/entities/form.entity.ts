import { FieldValues, UseFormReturn } from 'react-hook-form';
import { FieldEntity } from './field.entity';
import { IField } from '../interfaces/field.interface';

/**
 * Entity representing a complete form
 * Following the Single Responsibility Principle (SRP)
 */
export class FormEntity<FormType extends FieldValues> {
    private readonly fields: FieldEntity<FormType>[];
    private readonly hook: UseFormReturn<FormType>;

    constructor(fields: IField<FormType>[], hook: UseFormReturn<FormType>) {
        this.fields = fields.map((field) => new FieldEntity(field));
        this.hook = hook;
    }

    /**
     * Returns all fields
     */
    getFields(): FieldEntity<FormType>[] {
        return [...this.fields];
    }

    /**
     * Returns only visible fields
     */
    getVisibleFields(): FieldEntity<FormType>[] {
        return this.fields.filter((field) => !field.isHidden());
    }

    /**
     * Returns the form hook
     */
    getHook(): UseFormReturn<FormType> {
        return this.hook;
    }

    /**
     * Checks if the form has been modified
     */
    isDirty(): boolean {
        return this.hook.formState.isDirty;
    }

    /**
     * Checks if there are errors in the form
     */
    hasErrors(): boolean {
        return !!Object.keys(this.hook.formState.errors).length;
    }

    /**
     * Returns form errors
     */
    getErrors(): Record<string, any> {
        return this.hook.formState.errors;
    }

    /**
     * Returns form values
     */
    getValues(): FormType {
        return this.hook.getValues();
    }

    /**
     * Resets the form
     */
    reset(values?: Partial<FormType>): void {
        this.hook.reset(values as FormType);
    }
}
