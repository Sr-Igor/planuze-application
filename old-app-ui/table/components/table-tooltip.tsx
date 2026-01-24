import * as React from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york-v4/ui/tooltip';

export interface ITableTooltipProps {
    children?: React.ReactNode;
    text: string;
    className?: string;
    showOnlyWhenTruncated?: boolean;
}

export function TableTooltip({ children, text, className, showOnlyWhenTruncated = true }: ITableTooltipProps) {
    const [isTruncated, setIsTruncated] = React.useState(false);
    const textRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const checkTruncation = () => {
            if (textRef.current) {
                const element = textRef.current;
                const truncated = element.scrollWidth > element.clientWidth;
                setIsTruncated(truncated);
            }
        };

        // Delay para garantir que o elemento esteja renderizado
        const timeoutId = setTimeout(checkTruncation, 100);
        window.addEventListener('resize', checkTruncation);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', checkTruncation);
        };
    }, [text]);

    const formatText = (text: string) => {
        const lines = text.split('\n');
        return lines.map((line, index) => (
            <span key={index}>
                {line}
                {index < lines.length - 1 && <br />}
            </span>
        ));
    };

    const shouldShowTooltip = text && text.trim() !== '' && (!showOnlyWhenTruncated || isTruncated);

    if (!shouldShowTooltip) {
        return (
            <span ref={textRef} className='block truncate'>
                {children}
            </span>
        );
    }

    return (
        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild className={className}>
                <span ref={textRef} className='block truncate'>
                    {children}
                </span>
            </TooltipTrigger>
            <TooltipContent>
                <p>{formatText(text)}</p>
            </TooltipContent>
        </Tooltip>
    );
}
