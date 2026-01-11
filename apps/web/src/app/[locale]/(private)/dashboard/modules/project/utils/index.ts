export const getStatusColor = (status: string) => {
    switch (status) {
        case 'active':
            return 'text-blue-500';
        case 'completed':
            return 'text-green-500';
        case 'late':
            return 'text-red-500';
        default:
            return 'text-muted-foreground';
    }
};

export const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};
