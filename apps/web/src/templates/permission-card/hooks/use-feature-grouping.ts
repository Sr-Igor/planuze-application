import { useMemo } from 'react';

import { UseFeatureGroupingProps } from '../types';

export const useFeatureGrouping = ({ sortedFeatures }: UseFeatureGroupingProps) => {
    const groupedFeatures = useMemo(() => {
        const groups: Record<string, typeof sortedFeatures> = {};

        sortedFeatures.forEach((feature) => {
            const group = (feature as any).group || 'default';
            if (!groups[group]) {
                groups[group] = [];
            }
            groups[group].push(feature);
        });

        return groups;
    }, [sortedFeatures]);

    return {
        groupedFeatures
    };
};
