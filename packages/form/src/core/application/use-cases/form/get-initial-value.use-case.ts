import { FieldValues } from 'react-hook-form';
import { AnyField } from '../../../domain/interfaces/field.interface';

/**
 * Use Case for getting initial field values
 * Following the Single Responsibility Principle (SRP)
 */
export class GetInitialValueUseCase<FormType extends FieldValues> {
    /**
     * Gets the initial value for a specific field
     */
    execute(field: AnyField<FormType>): any {
        switch (field.field) {
            case 'input':
            case 'cep':
            case 'cpf':
            case 'cnpj':
            case 'phone':
                return '';
            case 'numeric':
            case 'money':
            case 'percentage':
            case 'currency':
                return null;
            case 'checkbox':
            case 'switch':
                return false;
            case 'calendar':
            case 'calendar-range':
            case 'days_of_month':
            case 'days_of_week':
            case 'days_of_year':
                return null;
            case 'select':
            case 'select-simple':
            case 'select-checkbox':
            case 'select-simple-infinity':
            case 'select-checkbox-infinity':
            case 'country':
            case 'state':
            case 'city':
            case 'bank':
            case 'icon':
                return null;
            case 'editor':
                return null;
            case 'avatar':
                return null;
            case 'tags':
                return [];
            case 'textarea':
                return undefined;
            default:
                return undefined;
        }
    }
}
