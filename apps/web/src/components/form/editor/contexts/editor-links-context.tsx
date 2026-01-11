import React, { createContext, useContext } from 'react';

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
    return (
        <EditorLinksContext.Provider value={{ mentionRefLink, hashRefLink }}>{children}</EditorLinksContext.Provider>
    );
};

export const useEditorLinks = () => {
    return useContext(EditorLinksContext);
};
