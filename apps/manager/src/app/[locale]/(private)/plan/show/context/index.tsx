import { createContext, useContext } from 'react';

import { PlanShowContextType } from '../types';

const PlanShowContext = createContext<PlanShowContextType | undefined>(undefined);

export const PlanShowProvider = ({ children, ...value }: PlanShowContextType & { children: React.ReactNode }) => {
    return <PlanShowContext.Provider value={value}>{children}</PlanShowContext.Provider>;
};

export const usePlanShow = () => {
    const context = useContext(PlanShowContext);
    if (!context) {
        throw new Error('usePlanShow must be used within PlanShowProvider');
    }
    return context;
};
