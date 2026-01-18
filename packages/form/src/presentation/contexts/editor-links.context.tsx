'use client';

import React, { createContext, useContext, useMemo } from 'react';

interface EditorLinksContextType {
    mentionRefLink?: (id: string) => void;
    hashRefLink?: (id: string) => void;
}

const EditorLinksContext = createContext<EditorLinksContextType>({});

export const EditorLinksProvider: React.FC<{
    children: React.ReactNode;
    mentionRefLink?: (id: string) => void;
    hashRefLink?: (id: string) => void;
}> = ({ children, mentionRefLink, hashRefLink }) => {
    const value = useMemo(
        () => ({
            mentionRefLink,
            hashRefLink,
        }),
        [mentionRefLink, hashRefLink]
    );

    return <EditorLinksContext.Provider value={value}>{children}</EditorLinksContext.Provider>;
};

export const useEditorLinks = () => {
    return useContext(EditorLinksContext);
};
