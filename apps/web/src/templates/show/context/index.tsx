import { createContext, useContext } from 'react';

import { IShowContextType } from '../types';

const ShowContext = createContext<IShowContextType<any> | undefined>(undefined);

export const ShowProvider = <T extends { id: string }>({
    children,
    ...value
}: IShowContextType<T> & { children: React.ReactNode }) => {
    const items = {
        ...value
    };

    return <ShowContext.Provider value={items}>{children}</ShowContext.Provider>;
};

export const useShow = <T extends { id: string }>() => {
    const context = useContext<IShowContextType<T> | undefined>(ShowContext);
    if (!context) {
        throw new Error('useShow must be used within ShowProvider');
    }
    return context;
};
