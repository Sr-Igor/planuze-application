import { plan, subscription } from '@/api/generator/types';

export interface ITabProps {
    plans: plan[];
    subscriptions: subscription[];
    isLoading: boolean;
}
