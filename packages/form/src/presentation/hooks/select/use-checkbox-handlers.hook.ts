import { useCallback, useEffect } from 'react';

import { IUseCheckboxHandlersProps } from '#/shared/types/select.types';

export function useCheckboxHandlers({
    setValues,
    values,
    onChange,
    value,
    setIsOpen,
    isOpen,
}: IUseCheckboxHandlersProps) {
    const handleCheckboxChange = useCallback(
        (optionValue: any, checked: boolean) => {
            if (checked) {
                setValues?.((prev) => [...prev, optionValue]);
            } else {
                setValues?.((prev) => prev.filter((val) => val !== optionValue));
            }
        },
        [setValues]
    );

    const handleClose = useCallback(
        (clear = false) => {
            setIsOpen(false);
            setTimeout(() => {
                clear && onChange?.([]);
            }, 150);
        },
        [setIsOpen, onChange]
    );

    const handleApply = useCallback(() => {
        onChange?.(values);
        handleClose();
    }, [values, onChange, handleClose]);

    const handleClear = useCallback(() => {
        handleClose(!!value.length);
    }, [value, handleClose]);

    useEffect(() => {
        if (isOpen) setValues(Array.isArray(value) ? value : value?.split(',')?.filter(Boolean) || []);
    }, [isOpen, value, setValues]);

    return {
        handleCheckboxChange,
        handleApply,
        handleClear,
        handleClose,
    };
}
