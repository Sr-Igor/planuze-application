import { IValidatorRequest } from '@deviobr/validator';
import { ZodSchema } from 'zod';
import { FieldValues } from 'react-hook-form';

/**
 * Interface for validators
 * Allows different validation implementations
 */
export interface IValidator {
    validate<T extends FieldValues>(
        schema: IValidatorRequest | ZodSchema<T>
    ): ZodSchema<T>;
}
