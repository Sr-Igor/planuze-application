import { IValidatorRequest } from '@deviobr/validator';
import { ZodSchema } from 'zod';
import { FieldValues } from 'react-hook-form';

/**
 * Value Object for validation configuration
 * Supports both IValidatorRequest and ZodSchema
 */
export class ValidationConfigVO<T extends FieldValues> {
    private readonly schema: IValidatorRequest | ZodSchema<T>;

    constructor(schema: IValidatorRequest | ZodSchema<T>) {
        if (!schema) {
            throw new Error('Validation schema is required');
        }
        this.schema = schema;
    }

    /**
     * Returns the validation schema
     */
    getSchema(): IValidatorRequest | ZodSchema<T> {
        return this.schema;
    }

    /**
     * Checks if it's a ZodSchema
     */
    isZodSchema(): boolean {
        return typeof (this.schema as any).parse === 'function';
    }

    /**
     * Checks if it's an IValidatorRequest
     */
    isValidatorRequest(): boolean {
        return !this.isZodSchema();
    }
}
