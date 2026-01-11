import { useRef, useState } from 'react';

import type { EditorRefs, EditorState, ModalType } from '../types';

export interface UseEditorStateProps {
    editable?: boolean;
    setEditable?: (value: boolean) => void;
}

export const useEditorState = ({
    editable: externalEditable,
    setEditable: externalSetEditable
}: UseEditorStateProps) => {
    const [internalEditable, setInternalEditable] = useState(false);
    const [showEditButton, setShowEditButton] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<ModalType>('image');

    const editorRef = useRef<HTMLDivElement>(null);
    const isEditingRef = useRef(false);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const editable = externalEditable ?? internalEditable;
    const setEditable = externalSetEditable ?? setInternalEditable;

    const state: EditorState = {
        editable,
        showEditButton,
        modalOpen,
        modalType
    };

    const refs: EditorRefs = {
        editorRef,
        isEditingRef,
        hoverTimeoutRef,
        hideTimeoutRef
    };

    const actions = {
        setEditable,
        setShowEditButton,
        setModalOpen,
        setModalType
    };

    return {
        state,
        refs,
        actions
    };
};
