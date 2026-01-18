import { FieldValues } from 'react-hook-form';
import { IFieldComponentProps } from './field.interface';

/**
 * Type for field components
 * Following the Dependency Inversion Principle (DIP)
 */
export type IFieldComponent<FormType extends FieldValues> = (
    props: IFieldComponentProps<FormType>
) => React.ReactElement | null;

/**
 * Registry of available components
 */
export interface IComponentRegistry {
    [key: string]: IFieldComponent<any>;
}
