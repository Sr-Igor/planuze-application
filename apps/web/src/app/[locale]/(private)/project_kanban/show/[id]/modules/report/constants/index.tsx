import { BookOpen, Clock, ListTree, TrendingUp } from 'lucide-react';

export const tabs = [
    {
        icon: <BookOpen className='h-4 w-4' />,
        value: 'cards'
    },
    {
        icon: <TrendingUp className='h-4 w-4' />,
        value: 'charts'
    },
    {
        icon: <ListTree className='h-4 w-4' />,
        value: 'rankings'
    },
    {
        icon: <Clock className='h-4 w-4' />,
        value: 'hours'
    }
];
