import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';

export type ITimeLabelProps = {
    date?: string | null | Date;
    t: any;
};

export const timeLabel = ({ date, t }: ITimeLabelProps) => {
    if (!date) return '';

    const startDate = new Date(date);
    const currentDate = new Date();

    const years = differenceInYears(currentDate, startDate);
    const months = differenceInMonths(currentDate, startDate) % 12;
    const days = differenceInDays(currentDate, startDate) % 30;

    const parts: string[] = [];

    // Adicionar anos
    if (years > 0) {
        parts.push(years === 1 ? `1 ${t.calendar('year')}` : `${years} ${t.calendar('years')}`);
    }

    // Adicionar meses
    if (months > 0) {
        parts.push(months === 1 ? `1 ${t.calendar('month')}` : `${months} ${t.calendar('months')}`);
    }

    // Adicionar dias (apenas se não houver anos ou meses, ou se for menos de 1 mês)
    if (days > 0 && years === 0 && months === 0) {
        parts.push(days === 1 ? `1 ${t.calendar('day')}` : `${days} ${t.calendar('days')}`);
    }

    // Se não há nenhuma parte, significa que é menos de 1 dia
    if (parts.length === 0) {
        return t.calendar('lessThanOneDay');
    }

    // Juntar as partes com "e"
    return parts.join(` ${t.calendar('and')} `);
};
