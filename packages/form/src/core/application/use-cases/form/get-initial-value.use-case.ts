import { FieldValues } from 'react-hook-form';
import { IField } from '../../../domain/interfaces/field.interface';

/**
 * Use Case for getting initial field values
 * Following the Single Responsibility Principle (SRP)
 */
export class GetInitialValueUseCase<FormType extends FieldValues> {
    /**
     * Gets the initial value for a specific field
     */
    execute(field: IField<FormType>): any {
        switch (field.field) {
            case 'input':
                return '';
            case 'numeric':
            case 'money':
            case 'percentage':
                return null;
            case 'checkbox':
            case 'switch':
                return false;
            case 'calendar':
                return null;
            case 'select':
            case 'infinity_select':
            case 'country':
            case 'state':
            case 'city':
                return null;
            case 'editor':
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
