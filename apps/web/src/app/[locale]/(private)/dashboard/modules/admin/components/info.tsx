import { cn } from '@repo/ui-new';

export interface IInfoProps {
    title: string;
    value: any;
    className?: string;
    titleClassName?: string;
    valueClassName?: string;
}

export const Info = ({ title, value, className, titleClassName, valueClassName }: IInfoProps) => {
    return (
        <div className={className}>
            <p className={cn('text-muted-foreground text-xs', titleClassName)}>{title}</p>
            <p className={cn('font-semibold', valueClassName)}>{value}</p>
        </div>
    );
};

