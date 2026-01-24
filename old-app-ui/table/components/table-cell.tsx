'use client';

import React, { memo } from 'react';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/registry/new-york-v4/ui/skeleton';
import { TableCell } from '@/registry/new-york-v4/ui/table';

import { BaseTableItem, TableCellProps } from '../types/index';
import { formatCellValue, getNestedValue } from '../utils/helpers';
import { TableTooltip } from './table-tooltip';

function TableCellComponent<T extends BaseTableItem>({ item, column, isLoading, value }: TableCellProps<T>) {
    const cellValue = value ?? getNestedValue(item, column.accessor);

    const renderContent = (cellClassName: string) => {
        const value = formatCellValue(cellValue);
        if (isLoading) {
            return (
                <div className='relative w-full'>
                    <Skeleton className='absolute z-10 h-full w-full' />
                    <span className='opacity-0' aria-hidden='true'>
                        {formatCellValue(cellValue)}
                    </span>
                </div>
            );
        }

        // Renderização customizada
        if (column.customRender) {
            return column.customRender(item, isLoading, cellClassName);
        }

        // Formatação customizada
        if (column.formatValue) {
            return column.formatValue(item);
        }

        // Formatação padrão
        return <TableTooltip text={value}>{value}</TableTooltip>;
    };

    const getCellStyles = () => {
        const styles: React.CSSProperties = {};

        // Por padrão, todas as colunas têm flex: 1 para distribuição igual
        if (!column.width && !column.minWidth && !column.maxWidth) {
            styles.flex = '1';
            styles.minWidth = '120px';
        } else {
            // Quando largura específica é definida, desabilita flex
            styles.flex = 'none';

            if (column.width) {
                styles.width = typeof column.width === 'number' ? `${column.width}px` : column.width;
            }

            if (column.minWidth) {
                styles.minWidth = typeof column.minWidth === 'number' ? `${column.minWidth}px` : column.minWidth;
            }

            if (column.maxWidth) {
                styles.maxWidth = typeof column.maxWidth === 'number' ? `${column.maxWidth}px` : column.maxWidth;
            }
        }

        return styles;
    };

    const cellClassName = cn(
        'flex items-center overflow-hidden text-ellipsis whitespace-nowrap',
        column.centered ? 'justify-center' : 'justify-start'
    );

    return (
        <TableCell
            className={cn(
                'transition-colors',
                column.cellClassName,
                column.sticky && `sticky ${column.sticky === 'left' ? 'left-0' : 'right-0'} bg-background z-10`
            )}
            style={getCellStyles()}>
            <div className={cellClassName}>{renderContent(cellClassName)}</div>
        </TableCell>
    );
}

export const AppTableCell = memo(TableCellComponent) as typeof TableCellComponent;
