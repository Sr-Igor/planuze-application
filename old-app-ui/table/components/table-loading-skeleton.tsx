'use client';

import React, { memo } from 'react';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/registry/new-york-v4/ui/skeleton';
import { TableBody, TableCell, TableRow } from '@/registry/new-york-v4/ui/table';

import { BaseTableItem, TableColumn } from '../types/index';

interface TableLoadingSkeletonProps<T extends BaseTableItem> {
    columns: TableColumn<T>[];
    rows?: number;
    selectable?: boolean;
    hasActions?: boolean;
}

function TableLoadingSkeletonComponent<T extends BaseTableItem>({
    columns,
    rows = 5,
    selectable = false,
    hasActions = false
}: TableLoadingSkeletonProps<T>) {
    return (
        <TableBody>
            {Array.from({ length: rows }, (_, index) => (
                <TableRow
                    key={`skeleton-row-${index}`}
                    className={cn('group transition-none', 'animate-pulse', 'border-border/50 border-b')}>
                    {selectable && (
                        <TableCell
                            className='bg-background sticky left-0 z-10 w-12 px-2'
                            style={{ flex: 'none', width: '48px', minWidth: 48 }}>
                            <div className='flex items-center justify-center'>
                                <Skeleton className='h-4 w-4 rounded' />
                            </div>
                        </TableCell>
                    )}

                    {columns.map((column) => {
                        const getCellStyles = () => {
                            const styles: React.CSSProperties = {};

                            // Por padrão, todas as colunas têm flex: 1 para distribuição igual
                            if (!column.width && !column.minWidth && !column.maxWidth) {
                                styles.flex = '1';
                                styles.minWidth = '120px'; // Largura mínima para legibilidade
                            } else {
                                // Quando largura específica é definida, desabilita flex
                                styles.flex = 'none';

                                if (column.width) {
                                    styles.width =
                                        typeof column.width === 'number' ? `${column.width}px` : column.width;
                                }

                                if (column.minWidth) {
                                    styles.minWidth =
                                        typeof column.minWidth === 'number' ? `${column.minWidth}px` : column.minWidth;
                                }

                                if (column.maxWidth) {
                                    styles.maxWidth =
                                        typeof column.maxWidth === 'number' ? `${column.maxWidth}px` : column.maxWidth;
                                }
                            }

                            return styles;
                        };

                        return (
                            <TableCell key={column.accessor} style={getCellStyles()}>
                                <div
                                    className={`flex items-center ${
                                        column.centered ? 'justify-center' : 'justify-start'
                                    }`}>
                                    <Skeleton className='h-4 w-full max-w-[120px] rounded' />
                                </div>
                            </TableCell>
                        );
                    })}

                    {hasActions && (
                        <TableCell
                            className='bg-background sticky right-0 z-10 w-12 px-2'
                            style={{ flex: 'none', width: '80px', minWidth: 80 }}>
                            <div className='flex items-center justify-center'>
                                <Skeleton className='h-8 w-8 rounded' />
                            </div>
                        </TableCell>
                    )}
                </TableRow>
            ))}
        </TableBody>
    );
}

export const AppTableLoadingSkeleton = memo(TableLoadingSkeletonComponent) as typeof TableLoadingSkeletonComponent;
