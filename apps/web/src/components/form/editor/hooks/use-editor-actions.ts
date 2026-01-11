import { useCallback } from 'react';

import type { Editor } from '@tiptap/react';

import { EDITOR_SETTINGS } from '../constants/editor-settings';
import { useHashtag } from '../modules/hashtag/use-hashtag';
import { useMention } from '../modules/mention/use-mention';
import type { EditorRefs, EditorState, ModalType } from '../types';

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
    hashtagQuery
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

            // Usa setTimeout para evitar flushSync
            setTimeout(() => {
                switch (state.modalType) {
                    case 'image':
                        editor.chain().focus().setImage({ src: value }).run();
                        break;
                    case 'youtube':
                        editor.chain().focus().setYoutubeVideo({ src: value }).run();
                        break;
                    case 'link':
                        try {
                            // Tenta fazer parse do JSON para obter URL e texto
                            const linkData = JSON.parse(value);
                            const { url, text } = linkData;

                            // Se há texto selecionado, aplica o link ao texto
                            if (editor.state.selection.empty) {
                                // Se não há texto selecionado, insere o link com texto personalizado
                                editor.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run();
                            } else {
                                // Se há texto selecionado, aplica o link ao texto
                                editor.chain().focus().setLink({ href: url }).run();
                            }
                        } catch (error) {
                            // Fallback: se não for JSON válido, trata como URL simples
                            if (editor.state.selection.empty) {
                                editor.chain().focus().insertContent(`<a href="${value}">${value}</a>`).run();
                            } else {
                                editor.chain().focus().setLink({ href: value }).run();
                            }
                        }
                        break;
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
        closeHashtag
    };
};
