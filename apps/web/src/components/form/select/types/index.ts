import { Pagination } from '@/types/pagination';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';

//------------------------------- GLOBAL -------------------------------//
export interface IOption<T = any> {
    label: string;
    value: any;
    disabled?: boolean;
    item?: T;
}

export interface ISelectProps<T = any> {
    placeholder?: string;
    label?: string;
    value?: any;
    className?: string;
    triggerClassName?: string;
    disabled?: boolean;
    loading?: boolean;
    fallbackValue?: string;
    onChange?: (value: any, item?: T) => void;
    clearable?: boolean;
}

export interface IUseInfinityProps<T = any> {
    cacheKey?: string;
    queryParams?: Record<string, any>;
    searchParam?: string;
    inputDebounced: string;
    limit?: number;
    open: boolean;
    request?: (filters: Record<string, any>) => Promise<Pagination<T>>;
    formatter: (items: T[]) => { label: string; value: string; item: T; disabled?: boolean }[];
    value?: any;
    index?: UseInfiniteQueryResult<InfiniteData<Pagination<any>, unknown>, Error>;
    enabled?: boolean;
    enabledOnOpen?: boolean;
}

export interface IUseCheckboxHandlersProps {
    values: any[];
    value: any;
    setValues: React.Dispatch<React.SetStateAction<any[]>>;
    onChange?: (value: any) => void;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
}

//------------------------------- SIMPLE SELECT -------------------------------//
export interface ISimpleSelectProps<T = any> extends ISelectProps<T> {
    options: IOption<T>[];
    containerClassName?: string;
    modal?: boolean;
    formatterOptions?: (option: IOption<T>) => React.ReactNode;
    customTrigger?: (data: { selected?: IOption<T> | null; disabled?: boolean }) => React.ReactNode;
    customSelect?: (item?: T, fallbackValue?: string) => React.ReactNode;
}

export interface IUseSimpleDataProps<T = any> {
    options: IOption<T>[];
    value?: any;
}

//------------------------------- CHECKBOX SELECT -------------------------------//

export interface ICheckboxSelectProps<T = any> extends ISelectProps<T> {
    options: IOption<T>[];
    optionChildren?: (option: IOption<T>) => React.ReactNode;
    containerClassName?: string;
    triggerClassName?: string;
    modal?: boolean;
}

export interface IUseCheckboxProps<T = any> {
    options: IOption<T>[];
    value?: any;
}

//------------------------------- INFINITY SELECT -------------------------------//

export interface ISimpleInfinityProps<T>
    extends ISelectProps<T>,
        Omit<IUseInfinityProps<T>, 'inputDebounced' | 'value' | 'open'> {
    modal?: boolean;
    fallbackValue?: string;
    containerClassName?: string;
    customTrigger?: (data: { disabled?: boolean }) => React.ReactNode;
    onChangeCallback?: (item: T | null) => void;
    formatterOptions?: (item: T) => React.ReactNode;
    customSelect?: (item?: T, fallbackValue?: string) => React.ReactNode;
    search?: string | null;
    setSearch?: (search: string | null) => void;
    immediatelyCallback?: (item: T | null) => void;
}
