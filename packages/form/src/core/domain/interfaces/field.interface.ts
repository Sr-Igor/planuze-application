import { FieldValues, UseControllerProps } from 'react-hook-form';
import { IOption } from '#/shared/types/select.types';
import { Pagination } from '@repo/types';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';

/**
 * Base interface for form field configuration
 * Following the Interface Segregation Principle (ISP)
 */
export interface IFieldConfig<FormType extends FieldValues> {
    name: keyof FormType;
    placeholder?: string;
    label?: string;
    ref_key?: string;
    field: string; // Field type
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
}

/**
 * Interface for fields with options (Select, Checkbox, etc.)
 */
export interface IFieldWithOptions<FormType extends FieldValues> extends IFieldConfig<FormType> {
    options?: IOption[];
    formatterOptions?: (item: any) => React.ReactNode;
    optionChildren?: (option: IOption) => React.ReactNode;
}

/**
 * Interface for fields with infinite requests
 */
export interface IFieldWithRequest<FormType extends FieldValues> extends IFieldConfig<FormType> {
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
 * Interface for date/calendar fields
 */
export interface IFieldWithDate<FormType extends FieldValues> extends IFieldConfig<FormType> {
    disabledPast?: boolean;
    disabledFuture?: boolean;
    days?: number;
}

/**
 * Interface for monetary fields
 */
export interface IFieldWithCurrency<FormType extends FieldValues> extends IFieldConfig<FormType> {
    currency?: string;
    onCurrencyChange?: (currency: string) => void;
}

/**
 * Interface for numeric fields
 */
export interface IFieldWithNumeric<FormType extends FieldValues> extends IFieldConfig<FormType> {
    int?: boolean;
    positive?: boolean;
    showArrows?: boolean;
}

/**
 * Interface for file fields
 */
export interface IFieldWithFile<FormType extends FieldValues> extends IFieldConfig<FormType> {
    path?: string;
    publicFile?: boolean;
}

/**
 * Interface for fields with custom callbacks
 */
export interface IFieldWithCallbacks<FormType extends FieldValues> extends IFieldConfig<FormType> {
    onChangeCallback?: (item: any) => void;
    immediatelyCallback?: (item: any) => void;
    changeCallback?: (item: any) => void;
    customSelect?: (item: any, fallbackValue?: string) => React.ReactNode;
    customTrigger?: (data: { selected?: IOption | null; disabled?: boolean }) => React.ReactNode;
}

/**
 * Interface for fields with fallback
 */
export interface IFieldWithFallback<FormType extends FieldValues> extends IFieldConfig<FormType> {
    fallbackValue?: string | null;
}

/**
 * Complete field interface (union of all specific interfaces)
 */
export interface IField<FormType extends FieldValues>
    extends IFieldConfig<FormType>,
        Partial<Omit<IFieldWithOptions<FormType>, keyof IFieldConfig<FormType>>>,
        Partial<Omit<IFieldWithRequest<FormType>, keyof IFieldConfig<FormType>>>,
        Partial<Omit<IFieldWithDate<FormType>, keyof IFieldConfig<FormType>>>,
        Partial<Omit<IFieldWithCurrency<FormType>, keyof IFieldConfig<FormType>>>,
        Partial<Omit<IFieldWithNumeric<FormType>, keyof IFieldConfig<FormType>>>,
        Partial<Omit<IFieldWithFile<FormType>, keyof IFieldConfig<FormType>>>,
        Partial<Omit<IFieldWithCallbacks<FormType>, keyof IFieldConfig<FormType>>>,
        Partial<Omit<IFieldWithFallback<FormType>, keyof IFieldConfig<FormType>>> {
    loading?: boolean;
}

/**
 * Props for a field component controlled by react-hook-form
 */
export interface IFieldComponentProps<FormType extends FieldValues>
    extends UseControllerProps<FormType>,
        Omit<IField<FormType>, 'name'> {
    read?: string;
}
