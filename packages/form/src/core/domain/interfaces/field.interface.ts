import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { FieldValues, UseControllerProps } from "react-hook-form";

import { Pagination } from "@repo/types";

import { IOption } from "../../../shared/types/select.types";

// =============================================================================
// Base Props - common to all fields
// =============================================================================

/**
 * Base props shared by all field types
 */
export interface IFieldBaseProps<FormType extends FieldValues> {
  name: keyof FormType;
  placeholder?: string;
  label?: string;
  ref_key?: string;
  type?: string;
  className?: string;
  inputClassName?: string;
  required?: boolean;
  clearable?: boolean;
  hide?: boolean;
  disabled?: boolean;
  tooltip?: string;
  autoFocus?: boolean;
  id?: string;
  loading?: boolean;
  skipHtmlFor?: boolean;
}

// =============================================================================
// Field-specific Props - props unique to certain field types
// =============================================================================

/**
 * Props for fields with static options (select, checkbox-select)
 */
export interface IOptionsProps {
  options?: IOption[];
  formatterOptions?: (item: any) => React.ReactNode;
  optionChildren?: (option: IOption) => React.ReactNode;
  onChangeCallback?: (item: any) => void;
  customSelect?: (item: any, fallbackValue?: string) => React.ReactNode;
  customTrigger?: (data: { selected?: IOption | null; disabled?: boolean }) => React.ReactNode;
  fallbackValue?: string | null;
}

/**
 * Props for fields with infinite/async data loading
 */
export interface IRequestProps {
  request?: (filters: Record<string, any>) => Promise<Pagination<any>>;
  formatter?: (items: any[]) => { label: string; value: string; item: any }[];
  cacheKey?: string;
  limit?: number;
  searchParam?: string;
  queryParams?: Record<string, any>;
  index?: UseInfiniteQueryResult<InfiniteData<Pagination<any>, unknown>, Error>;
  setSearch?: (search: string | null) => void;
  search?: string | null;
  enabledOnOpen?: boolean;
}

/**
 * Props for date/calendar fields
 */
export interface IDateProps {
  disabledPast?: boolean;
  disabledFuture?: boolean;
  days?: number;
}

/**
 * Props for currency fields
 */
export interface ICurrencyProps {
  currency?: string;
  onCurrencyChange?: (currency: string) => void;
}

/**
 * Props for numeric fields
 */
export interface INumericProps {
  int?: boolean;
  positive?: boolean;
  showArrows?: boolean;
}

/**
 * Props for file/avatar fields
 */
export interface IFileProps {
  path?: string;
  publicFile?: boolean;
}

// =============================================================================
// Field Type Definitions - discriminated union based on 'field' property
// =============================================================================

/** Basic text input fields */
type BasicInputField<T extends FieldValues> = IFieldBaseProps<T> & {
  field: "input" | "textarea" | "cep" | "cpf" | "cnpj" | "phone";
};

/** Numeric input fields */
type NumericInputField<T extends FieldValues> = IFieldBaseProps<T> &
  INumericProps & {
    field: "numeric" | "percentage";
  };

/** Money/currency fields */
type MoneyField<T extends FieldValues> = IFieldBaseProps<T> &
  ICurrencyProps & {
    field: "money" | "currency";
  };

/** Simple select with static options */
type SimpleSelectField<T extends FieldValues> = IFieldBaseProps<T> &
  IOptionsProps & {
    field: "select" | "select-simple" | "select-checkbox";
  };

/** Select with infinite/async loading */
type InfinitySelectField<T extends FieldValues> = IFieldBaseProps<T> &
  IOptionsProps &
  IRequestProps & {
    field: "select-simple-infinity" | "select-checkbox-infinity";
  };

/** Location select fields (country, state, city) */
type LocationSelectField<T extends FieldValues> = IFieldBaseProps<T> &
  IOptionsProps & {
    field: "country" | "state" | "city" | "bank" | "icon";
  };

/** Calendar/date fields */
type CalendarField<T extends FieldValues> = IFieldBaseProps<T> &
  IDateProps & {
    field: "calendar" | "calendar-range" | "days_of_month" | "days_of_week" | "days_of_year";
  };

/** Avatar/file upload field */
type AvatarField<T extends FieldValues> = IFieldBaseProps<T> &
  IFileProps & {
    field: "avatar";
  };

/** Switch/checkbox toggle fields */
type ToggleField<T extends FieldValues> = IFieldBaseProps<T> & {
  field: "switch" | "checkbox";
};

/** Tags field */
type TagsField<T extends FieldValues> = IFieldBaseProps<T> &
  IOptionsProps &
  IRequestProps & {
    field: "tags";
  };

/** Rich text editor field */
type EditorField<T extends FieldValues> = IFieldBaseProps<T> & {
  field: "editor";
};

/**
 * Discriminated union of all field types
 * TypeScript will infer available props based on the 'field' value
 */
export type Field<T extends FieldValues> =
  | BasicInputField<T>
  | NumericInputField<T>
  | MoneyField<T>
  | SimpleSelectField<T>
  | InfinitySelectField<T>
  | LocationSelectField<T>
  | CalendarField<T>
  | AvatarField<T>
  | ToggleField<T>
  | TagsField<T>
  | EditorField<T>;

/**
 * All possible field type strings
 */
export type FieldType = Field<FieldValues>["field"];

/**
 * Internal type for architecture components that need to handle any field type
 * Use Field<T> for external/public APIs
 */
export type AnyField<T extends FieldValues> = Field<T>;

// =============================================================================
// Component Props - for field components controlled by react-hook-form
// =============================================================================

/**
 * All possible field props combined (for component implementations)
 */
export interface IAllFieldProps
  extends Partial<IOptionsProps>,
    Partial<IRequestProps>,
    Partial<IDateProps>,
    Partial<ICurrencyProps>,
    Partial<INumericProps>,
    Partial<IFileProps> {
  field?: string;
  placeholder?: string;
  label?: string;
  ref_key?: string;
  type?: string;
  className?: string;
  inputClassName?: string;
  required?: boolean;
  clearable?: boolean;
  hide?: boolean;
  disabled?: boolean;
  tooltip?: string;
  autoFocus?: boolean;
  id?: string;
  loading?: boolean;
  skipHtmlFor?: boolean;
  read?: string;
}

/**
 * Props for a field component controlled by react-hook-form
 */
export interface IFieldComponentProps<FormType extends FieldValues>
  extends UseControllerProps<FormType>,
    IAllFieldProps {}
