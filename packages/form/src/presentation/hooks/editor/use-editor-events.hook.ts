import { useEffect } from 'react';

import type { Editor } from '@tiptap/react';

import { EDITOR_SETTINGS } from '#/shared/constants/editor-settings.constant';
import type { EditorRefs, EditorState } from '#/shared/types/editor.types';

interface UseEditorEventsProps {
    editor: Editor | null;
    state: EditorState;
    refs: EditorRefs;
    exitEditMode: () => void;
}

export const useEditorEvents = ({ editor, state, refs, exitEditMode }: UseEditorEventsProps) => {
    // Event listener to detect clicks outside the editor
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                refs.editorRef.current &&
                !refs.editorRef.current.contains(event.target as Node) &&
                state.editable &&
                refs.isEditingRef.current &&
                !state.modalOpen
            ) {
                const target = event.target as Element;
                const isMenuElement = target.closest('[data-tiptap-menu]') || target.closest('[data-tiptap-menu-item]');

                if (!isMenuElement) {
                    exitEditMode();
                }
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && state.editable && refs.isEditingRef.current && !state.modalOpen) {
                exitEditMode();
            }
        };

        if (state.editable) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [state.editable, state.modalOpen, refs, exitEditMode]);

    // Event listener to detect when editor loses focus
    useEffect(() => {
        if (!editor) return;

        const handleBlur = () => {
            setTimeout(() => {
                if (state.editable && refs.isEditingRef.current && !state.modalOpen) {
                    const activeElement = document.activeElement;
                    const isWithinEditor = refs.editorRef.current?.contains(activeElement as Node);
                    const isMenuElement =
                        activeElement?.closest('[data-tiptap-menu]') ||
                        activeElement?.closest('[data-tiptap-menu-item]');

                    if (!isWithinEditor && !isMenuElement) {
                        exitEditMode();
                    }
                }
            }, EDITOR_SETTINGS.BLUR_DELAY);
        };

        const editorElement = editor.view.dom;
        editorElement.addEventListener('blur', handleBlur);

        return () => {
            editorElement.removeEventListener('blur', handleBlur);
        };
    }, [editor, state.editable, state.modalOpen, refs, exitEditMode]);

    // Cleanup timeouts when component is unmounted
    useEffect(() => {
        return () => {
            if (refs.hoverTimeoutRef.current) {
                clearTimeout(refs.hoverTimeoutRef.current);
            }
            if (refs.hideTimeoutRef.current) {
                clearTimeout(refs.hideTimeoutRef.current);
            }
        };
    }, [refs]);
};
