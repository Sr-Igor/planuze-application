'use client';

import React, { useEffect } from 'react';

import { cn } from '@/lib/utils';
import { EditorContent } from '@tiptap/react';

import { HashtagPopover, InsertModal, MenuBar } from './components';
import { Placeholder } from './components/placeholder';
import { EDITOR_CLASSES } from './constants/editor-settings';
import { EditorLinksProvider } from './contexts/editor-links-context';
import { useEditorActions, useEditorEvents, useEditorState, useTiptapEditor } from './hooks';
import { MentionPopover } from './modules/mention/mention-popover';
import type { EditorProps } from './types';
import { isHtmlEmpty } from './utils/html-utils';

export const Editor: React.FC<EditorProps> = ({
    value,
    onChange,
    mentionQuery,
    hashtagQuery,
    placeholder,
    editable,
    setEditable,
    className,
    hashRefLink,
    mentionRefLink,
    maxImageSize,
    disabled
}) => {
    const { state, refs, actions } = useEditorState({ editable, setEditable });
    const editor = useTiptapEditor({
        value,
        onChange,
        editable: state.editable,
        mentionQuery,
        hashtagQuery,
        className
    });

    const {
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
    } = useEditorActions({ editor, state, refs, actions, mentionQuery, hashtagQuery });

    useEditorEvents({ editor, state, refs, exitEditMode });

    useEffect(() => {
        const handleEditorFocusRequest = () => {
            if (editor && state.editable) {
                // Usa setTimeout para evitar flushSync
                setTimeout(() => {
                    editor.chain().focus().run();
                }, 0);
            }
        };

        window.addEventListener('editor-focus-request', handleEditorFocusRequest);

        return () => {
            window.removeEventListener('editor-focus-request', handleEditorFocusRequest);
        };
    }, [editor, state.editable]);

    const isEmpty = isHtmlEmpty(value) && !state.editable;

    return (
        <EditorLinksProvider mentionRefLink={mentionRefLink} hashRefLink={hashRefLink}>
            <div
                ref={refs.editorRef}
                className={cn('group relative', isEmpty && !disabled && 'cursor-pointer')}
                onClick={() => !disabled && isEmpty && enterEditMode()}
                onDoubleClick={() => !disabled && enterEditMode()}>
                <EditorContent editor={editor} disabled={disabled} />
                {isEmpty && <Placeholder placeholder={!value ? placeholder : ''} />}
                {editor && (
                    <div className='space-y-2'>
                        <MenuBar
                            editor={editor}
                            onOpenModal={openModal}
                            className={cn(
                                !state.editable && EDITOR_CLASSES.MENU_BAR.HIDDEN,
                                EDITOR_CLASSES.MENU_BAR.TRANSITION
                            )}
                        />
                    </div>
                )}

                <InsertModal
                    open={state.modalOpen}
                    onOpenChange={handleModalClose}
                    type={state.modalType}
                    onConfirm={handleModalConfirm}
                    maxImageSize={maxImageSize}
                />

                <MentionPopover
                    open={mentionState.isOpen}
                    onOpenChange={closeMention}
                    onSelect={insertMention}
                    query={mentionState.query}
                    position={mentionState.position}
                    mentionQuery={mentionQuery}
                    editor={editor}
                    mentionRefLink={mentionRefLink}
                />

                <HashtagPopover
                    open={hashtagState.isOpen}
                    onOpenChange={closeHashtag}
                    onSelect={insertHashtag}
                    query={hashtagState.query}
                    position={hashtagState.position}
                    hashtagQuery={hashtagQuery}
                    editor={editor}
                    hashRefLink={hashRefLink}
                />
            </div>
        </EditorLinksProvider>
    );
};
