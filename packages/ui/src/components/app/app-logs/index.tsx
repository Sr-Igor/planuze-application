'use client';

import React from 'react';



import { EmptyState, LogContent, LogHeader } from './components';
import { useDisplayValue, useFormatApply } from './hooks';
import { ILogsComparison, LogEntry } from './types';
import { computeDiffs, copyToClipboard, formatDisplayValue } from './utils';

export type { ILogsComparison, LogEntry };
export { AppLogsModal } from "./modal";

export const Logs = <T = Record<string, any>,>({
    logs = [],
    deleteKeys = [],
    conversor,
    format,
    useLang
}: ILogsComparison<T>) => {
    const t = useLang();

    const mergedDeleteKeys = React.useMemo(
        () => Array.from(new Set(['createdAt', 'updatedAt', 'deletedAt', 'id', ...deleteKeys])),
        [deleteKeys]
    );

    const displayValue = useDisplayValue(useLang, conversor);
    const applyFormat = useFormatApply(format);

    const handleCopyToClipboard = React.useCallback((text: string) => copyToClipboard(text, t.helper), [t.helper]);

    const formatValue = React.useCallback(
        (field: keyof T | undefined, value: any, maxLength: number = 50) =>
            formatDisplayValue(field, value, maxLength, displayValue),
        [displayValue]
    );

    const calculateDiffs = React.useCallback(
        (
            oldItem: Record<string, any>,
            newItem: Record<string, any>,
            oldItemComplete: Record<string, any>,
            newItemComplete: Record<string, any>
        ) => computeDiffs(oldItem, newItem, oldItemComplete, newItemComplete, applyFormat),
        [applyFormat]
    );

    return (
        <div className='w-full space-y-4 p-2 sm:space-y-6 sm:p-3'>
            {logs.length === 0 ? (
                <EmptyState />
            ) : (
                logs
                    .slice()
                    .reverse()
                    .map((log, idx) => {
                        // Parse JSON
                        let oldItem: Record<string, any> = {};
                        let newItem: Record<string, any> = {};

                        try {
                            oldItem = log.old ? JSON.parse(log.old) : {};
                        } catch {
                            /* noop */
                        }
                        try {
                            newItem = log.new ? JSON.parse(log.new) : {};
                        } catch {
                            /* noop */
                        }

                        // Remove chaves ignoradas
                        mergedDeleteKeys.forEach((k) => {
                            delete oldItem[k];
                            delete newItem[k];
                        });

                        // Calcula diffs
                        const diffs = calculateDiffs(
                            oldItem,
                            newItem,
                            JSON.parse(log.old || '{}'),
                            JSON.parse(log.new || '{}')
                        );

                        return (
                            <div key={log.id || idx} className='bg-accent w-full overflow-hidden rounded-lg'>
                                <LogHeader log={log}/>
                                <LogContent
                                    diffs={diffs}
                                    formatDisplayValue={formatValue}
                                    copyToClipboard={handleCopyToClipboard}
                                />
                            </div>
                        );
                    })
            )}
        </div>
    );
};
