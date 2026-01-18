import { useCallback } from 'react';

import type { Editor } from '@tiptap/react';

import { EDITOR_SETTINGS } from '#/shared/constants/editor-settings.constant';
import { useHashtag } from '../../modules/editor/hashtag';
import { useMention } from '../../modules/editor/mention';
import type { EditorRefs, EditorState, ModalType } from '#/shared/types/editor.types';

interface UseEditorActionsProps {
    editor: Editor | null;
    state: EditorState;
    refs: EditorRefs;
    actions: {
        setEditable: (value: boolean) => void;
        setShowEditButton: (value: boolean) => void;
        setModalOpen: (value: boolean) => void;
        setModalType: (value: ModalType) => void;
    };
    mentionQuery?: Record<string, string>;
    hashtagQuery?: Record<string, string>;
}

export const useEditorActions = ({
    editor,
    state,
    refs,
    actions,
    mentionQuery,
    hashtagQuery,
}: UseEditorActionsProps) => {
    const { mentionState, insertMention, closeMention } = useMention(editor, mentionQuery);
    const { hashtagState, insertHashtag, closeHashtag } = useHashtag(editor, hashtagQuery);

    const exitEditMode = useCallback(() => {
        if (refs.isEditingRef.current) {
            actions.setEditable(false);
            refs.isEditingRef.current = false;
        }
    }, [actions, refs]);

    const enterEditMode = useCallback(() => {
        actions.setEditable(true);
        refs.isEditingRef.current = true;
        actions.setShowEditButton(false);

        setTimeout(() => {
            editor?.chain().focus().run();
        }, 50);
    }, [actions, refs, editor]);

    const openModal = useCallback(
        (type: ModalType) => {
            actions.setModalType(type);
            actions.setModalOpen(true);
        },
        [actions]
    );

    const handleModalClose = useCallback(
        (open: boolean) => {
            actions.setModalOpen(open);

            if (!open) {
                setTimeout(() => {
                    editor?.chain().focus().run();
                }, EDITOR_SETTINGS.FOCUS_DELAY);
            }
        },
        [actions, editor]
    );

    const handleModalConfirm = useCallback(
        (value: string) => {
            if (!editor) return;

            // Use setTimeout to avoid flushSync
            setTimeout(() => {
                switch (state.modalType) {
                    case 'image':
                        editor.chain().focus().setImage({ src: value }).run();
                        break;
                    case 'youtube':
                        editor.chain().focus().setYoutubeVideo({ src: value }).run();
                        break;
                    case 'link': {
                        // Try to parse JSON to get URL and text
                        let url: string;
                        let text: string;

                        try {
                            const linkData = JSON.parse(value);
                            url = linkData.url;
                            text = linkData.text;
                        } catch (error) {
                            // If not valid JSON, treat as simple URL
                            if (error instanceof SyntaxError) {
                                url = value;
                                text = value;
                            } else {
                                // Unexpected error, log and use value as fallback
                                console.warn('Unexpected error parsing link data:', error);
                                url = value;
                                text = value;
                            }
                        }

                        // If there's selected text, apply link to text
                        if (editor.state.selection.empty) {
                            // If no text is selected, insert link with custom text
                            editor.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run();
                        } else {
                            // If there's selected text, apply link to text
                            editor.chain().focus().setLink({ href: url }).run();
                        }
                        break;
                    }
                }
            }, 0);
        },
        [editor, state.modalType]
    );

    return {
        exitEditMode,
        enterEditMode,
        openModal,
        handleModalClose,
        handleModalConfirm,
        mentionState,
        insertMention,
        closeMention,
        hashtagState,
        insertHashtag,
        closeHashtag,
    };
};
