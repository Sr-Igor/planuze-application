import { useEffect, useRef } from 'react';

export interface IUseClickProps {
    selected: boolean;
    cardRef: React.RefObject<HTMLDivElement | null>;
    setSelected: (selected: boolean) => void;
    handleSubmit: () => void;
    isDisabled: boolean;
    reset: () => void;
}

export const useClick = ({ selected, cardRef, setSelected, handleSubmit, isDisabled, reset }: IUseClickProps) => {
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!selected) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (!cardRef.current) return;

            const target = event.target as Element;
            if (cardRef.current.contains(target)) return;

            const isInPortal =
                target.closest('[data-radix-popper-content-wrapper]') ||
                target.closest('[data-radix-portal]') ||
                target.closest('[data-slot="popover-content"]') ||
                target.closest('[data-slot="dropdown-menu-content"]') ||
                target.closest('[data-slot="command"]') ||
                target.closest('[role="dialog"]') ||
                target.closest('[role="menu"]') ||
                target.closest('[role="listbox"]');

            if (isInPortal) return;

            saveTimeoutRef.current = setTimeout(() => {
                saveAndDeselect();
            }, 150);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && document.activeElement?.tagName !== 'TEXTAREA') {
                event.preventDefault();
                saveAndDeselect();
            } else if (event.key === 'Escape') {
                event.preventDefault();
                setSelected(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        };
    }, [selected, handleSubmit]);

    const saveAndDeselect = () => {
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

        if (document.activeElement && cardRef.current?.contains(document.activeElement))
            (document.activeElement as HTMLElement).blur();

        setSelected(false);

        isDisabled ? reset() : handleSubmit();
    };

    return {
        saveAndDeselect
    };
};
