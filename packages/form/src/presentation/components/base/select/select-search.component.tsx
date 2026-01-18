'use client';

import { memo, useCallback } from 'react';

import { Loader2, Trash } from 'lucide-react';

import { useLang } from '@repo/language/hook';
import * as C from '@repo/ui';
import { cn } from '@repo/ui';

interface SelectSearchProps {
    search?: string | null;
    setSearch?: (search: string | null) => void;
    onClear?: () => void;
    placeholder?: string;
    maxLength?: number;
    useCommandInput?: boolean;
    className?: string;
    clearable?: boolean;
    loading?: boolean;
}

export const SelectSearch = memo(
    ({
        search = '',
        setSearch,
        onClear,
        placeholder,
        maxLength = 50,
        useCommandInput = false,
        className,
        clearable = true,
        loading = false,
    }: SelectSearchProps) => {
        const t = useLang();

        const handleClear = useCallback(() => {
            setSearch?.('');
            onClear?.();
        }, [setSearch, onClear]);

        if (useCommandInput) {
            return (
                <span className={cn('relative p-2', className)}>
                    <C.CommandInput
                        maxLength={maxLength}
                        placeholder={placeholder || t.helper('search') + '...'}
                        style={{ width: 'calc(100% - 3rem)' }}
                        value={search || ''}
                        onValueChange={(value) => setSearch?.(value)}
                    />

                    <span className="absolute top-2 right-1 flex items-center justify-center">
                        {!loading && clearable && (
                            <button
                                type="button"
                                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:opacity-80"
                                onClick={handleClear}
                                aria-label={t.helper('clear')}
                            >
                                <Trash className="h-4 w-4 text-red-500" />
                            </button>
                        )}

                        {loading && (
                            <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:opacity-80">
                                <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
                            </span>
                        )}
                    </span>
                </span>
            );
        }

        return (
            <div
                className={cn(
                    'border-border flex items-center justify-between gap-2 border-b p-2',
                    className
                )}
            >
                <input
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder={placeholder || t.helper('search')}
                    value={search || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch?.(e.target.value)}
                />
                {clearable && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="flex items-center space-x-1 text-sm text-red-500"
                    >
                        <span>{t.helper('clear')}</span>
                    </button>
                )}
            </div>
        );
    }
);

SelectSearch.displayName = 'SelectSearch';
