import { QueryConfigs, useQueryOptimized } from './optimized';
import { IParams } from './types';

export const useQuery = () => {
    const {
        params: internalParams,
        setParams: internalSetParams,
        isUpdating,
        performanceMetrics
    } = useQueryOptimized(QueryConfigs.highPerformance);

    const handleSetParams = (p: Partial<IParams>) => {
        internalSetParams(p);
    };

    const finalParams = {
        ...internalParams,
        view: internalParams.view || 'principal',
        report_tab: internalParams.report_tab || 'cards'
    };

    return {
        params: finalParams,
        setParams: handleSetParams,
        _performance: {
            isUpdating,
            metrics: process.env.NODE_ENV === 'development' ? performanceMetrics : null
        }
    };
};
