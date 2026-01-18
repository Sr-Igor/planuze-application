import { IValidator } from '../../domain/interfaces/validator.interface';
import { ValidationConfigVO } from '../../domain/value-objects/validation-config.vo';
import { FieldValues } from 'react-hook-form';

/**
 * Service for form validation
 * Following the Single Responsibility Principle (SRP)
 */
export class ValidationService<T extends FieldValues> {
    constructor(private readonly validator: IValidator) {}

    /**
     * Creates a validation resolver from the configuration
     */
    createResolver(config: ValidationConfigVO<T>) {
        return this.validator.validate(config.getSchema());
    }
}
