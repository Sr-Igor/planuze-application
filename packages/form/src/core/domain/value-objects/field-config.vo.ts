import { FieldValues } from 'react-hook-form';
import { IField } from '../interfaces/field.interface';

/**
 * Value Object for field configuration
 * Ensures immutability and validation
 */
export class FieldConfigVO<FormType extends FieldValues> {
    private readonly config: Readonly<IField<FormType>>;

    constructor(config: IField<FormType>) {
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
    getValue(): Readonly<IField<FormType>> {
        return this.config;
    }

    /**
     * Creates a new instance with updates
     */
    withUpdates(updates: Partial<IField<FormType>>): FieldConfigVO<FormType> {
        return new FieldConfigVO<FormType>({
            ...this.config,
            ...updates,
        });
    }

    /**
     * Checks equality
     */
    equals(other: FieldConfigVO<FormType>): boolean {
        return JSON.stringify(this.config) === JSON.stringify(other.config);
    }
}
