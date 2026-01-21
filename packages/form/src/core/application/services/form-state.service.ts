import { FieldValues, UseFormReturn } from "react-hook-form";

import { AnyField } from "../../domain/interfaces/field.interface";

/**
 * Service for form state management
 * Following the Single Responsibility Principle (SRP)
 */
export class FormStateService<FormType extends FieldValues> {
  /**
   * Calculates initial values based on fields
   */
  calculateInitialValues(
    fields: AnyField<FormType>[],
    defaultValues?: Partial<FormType>,
    values?: FormType
  ): Partial<FormType> {
    const fieldDefaults = fields.reduce((acc, field) => {
      (acc as any)[field.name] = this.getInitialValueForField(field);
      return acc;
    }, {} as Partial<FormType>);

    const merged = { ...fieldDefaults, ...defaultValues, ...values };

    // Normalizes null/empty values
    return Object.fromEntries(
      Object.entries(merged).map(([key, value]) => {
        const field = fields.find((f) => f.name === key);
        if (!field) return [key, value];

        const defaultValue = fieldDefaults?.[key as keyof typeof fieldDefaults];

        if (
          (value === null || value === undefined) &&
          defaultValue !== null &&
          defaultValue !== undefined
        ) {
          return [key, defaultValue];
        }
        if (value === "" && defaultValue === null) return [key, null];
        if (value === "" && defaultValue === undefined) return [key, undefined];

        return [key, value];
      })
    ) as Partial<FormType>;
  }

  /**
   * Gets initial value for a specific field
   */
  private getInitialValueForField(field: AnyField<FormType>): any {
    switch (field.field) {
      case "input":
      case "cep":
      case "cpf":
      case "cnpj":
      case "phone":
        return "";
      case "numeric":
      case "money":
      case "percentage":
      case "currency":
        return null;
      case "checkbox":
      case "switch":
        return false;
      case "calendar":
      case "calendar-range":
      case "days_of_month":
      case "days_of_week":
      case "days_of_year":
        return null;
      case "select":
      case "select-simple":
      case "select-checkbox":
      case "select-simple-infinity":
      case "select-checkbox-infinity":
      case "country":
      case "state":
      case "city":
      case "bank":
      case "icon":
        return null;
      case "editor":
        return null;
      case "avatar":
        return null;
      case "tags":
        return [];
      case "textarea":
        return undefined;
      default:
        return undefined;
    }
  }

  /**
   * Checks if the form has been modified
   */
  isDirty(hook: UseFormReturn<FormType>): boolean {
    return hook.formState.isDirty;
  }

  /**
   * Checks if there are errors in the form
   */
  hasErrors(hook: UseFormReturn<FormType>): boolean {
    return !!Object.keys(hook.formState.errors).length;
  }
}
