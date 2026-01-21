import { FieldValues, UseFormProps } from 'react-hook-form';
import { ZodSchema } from 'zod';
import { ValidationService } from '../../services/validation.service';
import { FormStateService } from '../../services/form-state.service';
import { ValidationConfigVO } from '../../../domain/value-objects/validation-config.vo';
import { AnyField } from '../../../domain/interfaces/field.interface';

/**
 * Use Case for form configuration creation
 * Following the Single Responsibility Principle (SRP)
 * Note: The useForm hook creation stays in the presentation layer
 */
export class CreateFormUseCase<FormType extends FieldValues> {
    constructor(
        private readonly validationService: ValidationService<FormType>,
        private readonly formStateService: FormStateService<FormType>
    ) {}

    /**
     * Creates the validation schema
     */
    createResolver(schema: ValidationConfigVO<FormType>): ZodSchema<FormType> {
        return this.validationService.createResolver(schema);
    }

    /**
     * Calculates initial form values
     */
    calculateInitialValues(
        fields: AnyField<FormType>[],
        defaultValues?: UseFormProps<FormType>['defaultValues'],
        values?: FormType
    ): Partial<FormType> {
        return this.formStateService.calculateInitialValues(
            fields,
            defaultValues as Partial<FormType> | undefined,
            values
        );
    }
}
