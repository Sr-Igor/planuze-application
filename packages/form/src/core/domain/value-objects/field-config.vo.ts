import { FieldValues } from 'react-hook-form';
import { AnyField } from '../interfaces/field.interface';

/**
 * Value Object for field configuration
 * Ensures immutability and validation
 */
export class FieldConfigVO<FormType extends FieldValues> {
    private readonly config: Readonly<AnyField<FormType>>;

    constructor(config: AnyField<FormType>) {
        // Basic validations
        if (!config.name) {
            throw new Error('Field name is required');
        }
        if (!config.field) {
            throw new Error('Field type is required');
        }

        this.config = Object.freeze({ ...config });
    }

    /**
     * Returns the immutable configuration
     */
    getValue(): Readonly<AnyField<FormType>> {
        return this.config;
    }

    /**
     * Creates a new instance with updates
     */
    withUpdates(updates: Partial<AnyField<FormType>>): FieldConfigVO<FormType> {
        return new FieldConfigVO<FormType>({
            ...this.config,
            ...updates,
        } as AnyField<FormType>);
    }

    /**
     * Checks equality
     */
    equals(other: FieldConfigVO<FormType>): boolean {
        return JSON.stringify(this.config) === JSON.stringify(other.config);
    }
}
