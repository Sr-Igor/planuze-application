'use client';

import { memo } from 'react';

import { useLang } from '@repo/language/hook';
import { Button } from '@repo/ui';

interface SelectFooterProps {
    onApply?: () => void;
    onClear?: () => void;
    showClear?: boolean;
    className?: string;
}

export const SelectFooter = memo(
    ({ onApply, onClear, showClear = false, className = '' }: SelectFooterProps) => {
        const t = useLang();

        return (
            <div className={`border-border flex justify-end border-t p-2 ${className}`}>
                {showClear && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClear}
                        className="mr-2 flex items-center space-x-1"
                    >
                        <span>{t.helper('clear')}</span>
                    </Button>
                )}
                <Button variant="outline" size="sm" onClick={onApply} className="flex items-center space-x-1">
                    <span>{t.helper('apply')}</span>
                </Button>
            </div>
        );
    }
);

SelectFooter.displayName = 'SelectFooter';
