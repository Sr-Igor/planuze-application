import { Components } from '@/components/controllers';
import { IOption } from '@/components/form/select/types';
import { Pagination } from '@/types/pagination';
import { IValidatorRequest } from '@deviobr/validator';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';

import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';
import { ZodSchema } from 'zod';

export interface Field<FormType extends FieldValues> {
    name: keyof FormType;
    placeholder?: string;
    label?: string;
    ref_key?: string;
    field: keyof Components;
    type?: string;
    className?: string;
    options?: IOption[];
    required?: boolean;
    clearable?: boolean;
    hide?: boolean;
    inputClassName?: string;
    disabled?: boolean;
    path?: string;
    publicFile?: boolean;
    disabledPast?: boolean;
    disabledFuture?: boolean;
    days?: number;
    currency?: string;
    tooltip?: string;
    onCurrencyChange?: (currency: string) => void;
    loading?: boolean;
    request?: (filters: Record<string, any>) => Promise<Pagination<any>>;
    formatter?: (items: any[]) => { label: string; value: string; item: any }[];
    formatterOptions?: (item: any) => React.ReactNode;
    cacheKey?: string;
    limit?: number;
    searchParam?: string;
    fallbackValue?: string | null;
    queryParams?: Record<string, any>;
    int?: boolean;
    positive?: boolean;
    customSelect?: (item: any, fallbackValue?: string) => React.ReactNode;
    onChangeCallback?: (item: any) => void;
    immediatelyCallback?: (item: any) => void;
    autoFocus?: boolean;
    showArrows?: boolean;
    id?: string;
    index?: UseInfiniteQueryResult<InfiniteData<Pagination<any>, unknown>, Error>;
    setSearch?: (search: string | null) => void;
    search?: string | null;
    enabledOnOpen?: boolean;
    optionChildren?: (option: IOption) => React.ReactNode;
    customTrigger?: (data: { selected?: IOption | null; disabled?: boolean }) => React.ReactNode;
    changeCallback?: (item: any) => void;
}

export interface UseFormListProps<FormType extends FieldValues> {
    fields: Field<FormType>[];
    schema: IValidatorRequest | ZodSchema<FormType>;
    defaultValues?: UseFormProps<FormType>['defaultValues'];
    values?: FormType;
    onlyRead?: boolean;
    dependencies?: any;
    resetOptions?: UseFormProps<FormType>['resetOptions'];
}

export interface FormProps<FormType extends FieldValues> extends React.ComponentPropsWithoutRef<'form'> {
    fields: Field<FormType>[];
    hook: UseFormReturn<FormType>;
    onlyRead?: boolean;
}

export interface IUseFormListReturn<FormType extends FieldValues> {
    formProps: {
        fields: Field<FormType>[];
        dependencies: any;
        hook: UseFormReturn<FormType>;
        onlyRead?: boolean;
        className?: string;
    };
    hook: UseFormReturn<FormType>;
    Form: (props: FormProps<FormType>) => React.ReactNode;
    isDirty: boolean;
    isError: boolean;
}
