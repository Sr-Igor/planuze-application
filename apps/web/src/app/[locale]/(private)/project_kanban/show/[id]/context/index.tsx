import { createContext, useContext } from 'react';

import { IKanbanContext } from '../types';

const ShowKanbanContext = createContext<IKanbanContext | undefined>(undefined);

export const ShowKanbanProvider = ({ children, ...value }: IKanbanContext & { children: React.ReactNode }) => {
    const items = {
        ...value
    };

    return <ShowKanbanContext.Provider value={items}>{children}</ShowKanbanContext.Provider>;
};

export const useKanbanShow = () => {
    const context = useContext<IKanbanContext | undefined>(ShowKanbanContext);
    if (!context) {
        throw new Error('useKanbanShow must be used within ShowKanbanProvider');
    }
    return context;
};
