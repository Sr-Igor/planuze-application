import { IValidator } from '../../domain/interfaces/validator.interface';
import { IValidatorRequest, validatorWeb } from '@deviobr/validator';
import { ZodSchema } from 'zod';
import { FieldValues } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';

/**
 * Adapter for integration with @deviobr/validator
 * Following the Dependency Inversion Principle (DIP)
 */
export class ValidatorAdapter implements IValidator {
    readonly locale: string;
    readonly translations: any;

    constructor(locale: string, translations: any) {
        this.locale = locale;
        this.translations = translations;
    }

    validate<T extends FieldValues>(schema: IValidatorRequest | ZodSchema<T>): ZodSchema<T> {
        // If it's already a ZodSchema, return directly
        if (this.isZodSchema(schema)) {
            return schema as ZodSchema<T>;
        }

        // Converts IValidatorRequest to ZodSchema
        const validatorRequest = schema as IValidatorRequest;
        const result = validatorWeb(validatorRequest, { getFixedT: () => this.translations }, this.locale);

        return result.body as unknown as ZodSchema<T>;
    }

    private isZodSchema(schema: any): boolean {
        return typeof schema?.parse === 'function' && typeof schema?.safeParse === 'function';
    }
}

/**
 * Factory to create ValidatorAdapter using next-intl hooks
 * This function must be called inside a React component
 */
export function createValidatorAdapter(): (schema: IValidatorRequest | ZodSchema<any>) => ZodSchema<any> {
    const locale = useLocale();
    const t = useTranslations('zod');

    const adapter = new ValidatorAdapter(locale, t);

    return (schema: IValidatorRequest | ZodSchema<any>) => adapter.validate(schema);
}
