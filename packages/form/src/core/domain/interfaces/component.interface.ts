import { FieldValues } from "react-hook-form";

import { IFieldComponentProps } from "./field.interface";

/**
 * Type for field components
 * Following the Dependency Inversion Principle (DIP)
 *
 * AdditionalProps allows components to have extra props beyond the base IFieldComponentProps
 */
export type IFieldComponent<
  FormType extends FieldValues = FieldValues,
  AdditionalProps = unknown,
> = (props: IFieldComponentProps<FormType> & AdditionalProps) => React.ReactElement | null;

/**
 * Base type for registrable field components
 * Uses a generic function type to allow components with varying prop requirements
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RegisterableFieldComponent = (props: any) => React.ReactElement | null;

/**
 * Registry of available components
 */
export interface IComponentRegistry {
  [key: string]: RegisterableFieldComponent;
}
