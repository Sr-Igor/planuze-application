import { Field } from './types';
import { FieldValues } from 'react-hook-form';

export function getInitialValueForField<FormType extends FieldValues>(field: Field<FormType>): any {
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
