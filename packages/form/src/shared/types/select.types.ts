import { Pagination } from '@repo/types';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';

/**
 * Opção para componentes Select
 */
export interface IOption<T = any> {
    label: string;
    value: any;
    disabled?: boolean;
    item?: T;
}

/**
 * Props base para componentes Select
 */
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

/**
 * Props para hook de infinity scroll
 */
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

/**
 * Props para handlers de checkbox
 */
export interface IUseCheckboxHandlersProps {
    values: any[];
    value: any;
    setValues: React.Dispatch<React.SetStateAction<any[]>>;
    onChange?: (value: any) => void;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
}

/**
 * Props para Simple Select
 */
export interface ISimpleSelectProps<T = any> extends ISelectProps<T> {
    options: IOption<T>[];
    containerClassName?: string;
    modal?: boolean;
    formatterOptions?: (option: IOption<T>) => React.ReactNode;
    customTrigger?: (data: { selected?: IOption<T> | null; disabled?: boolean }) => React.ReactNode;
    customSelect?: (item?: T, fallbackValue?: string) => React.ReactNode;
}

/**
 * Props para hook de dados simples
 */
export interface IUseSimpleDataProps<T = any> {
    options: IOption<T>[];
    value?: any;
}

/**
 * Props para Checkbox Select
 */
export interface ICheckboxSelectProps<T = any> extends ISelectProps<T> {
    options: IOption<T>[];
    optionChildren?: (option: IOption<T>) => React.ReactNode;
    containerClassName?: string;
    triggerClassName?: string;
    modal?: boolean;
}

/**
 * Props para hook de checkbox
 */
export interface IUseCheckboxProps<T = any> {
    options: IOption<T>[];
    value?: any;
}

/**
 * Props para Infinity Select
 */
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
