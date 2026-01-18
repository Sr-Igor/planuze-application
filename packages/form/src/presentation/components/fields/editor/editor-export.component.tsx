'use client';

import React, { useEffect } from 'react';

import { cn } from '@repo/ui';
import { EditorContent } from '@tiptap/react';

import { InsertModal, MenuBar } from '../../base/editor';
import { Placeholder } from '../../base/editor/placeholder.component';
import { HashtagPopover } from '../../../modules/editor/hashtag';
import { EDITOR_CLASSES } from '#/shared/constants/editor-settings.constant';
import { EditorLinksProvider } from '../../../contexts/editor-links.context';
import { useEditorActions, useEditorEvents, useEditorState, useTiptapEditor } from '../../../hooks/editor';
import { MentionPopover } from '../../../modules/editor/mention';
import type { EditorProps } from '#/shared/types/editor.types';
import { isHtmlEmpty } from '#/shared/utils/html.utils';

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
    disabled,
}) => {
    const { state, refs, actions } = useEditorState({ editable, setEditable });
    const editor = useTiptapEditor({
        value,
        onChange,
        editable: state.editable,
        mentionQuery,
        hashtagQuery,
        className,
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
        closeHashtag,
    } = useEditorActions({ editor, state, refs, actions, mentionQuery, hashtagQuery });

    useEditorEvents({ editor, state, refs, exitEditMode });

    useEffect(() => {
        const handleEditorFocusRequest = () => {
            if (editor && state.editable) {
                // Use setTimeout to avoid flushSync
                setTimeout(() => {
                    editor.chain().focus().run();
                }, 0);
            }
        };

        globalThis.window.addEventListener('editor-focus-request', handleEditorFocusRequest);

        return () => {
            globalThis.window.removeEventListener('editor-focus-request', handleEditorFocusRequest);
        };
    }, [editor, state.editable]);

    const isEmpty = isHtmlEmpty(value) && !state.editable;

    const handleClick = () => {
        if (!disabled && isEmpty) {
            enterEditMode();
        }
    };

    const handleDoubleClick = () => {
        if (!disabled) {
            enterEditMode();
        }
    };

    const isEmptyAndNotDisabled = isEmpty && !disabled;

    return (
        <EditorLinksProvider mentionRefLink={mentionRefLink} hashRefLink={hashRefLink}>
            <div ref={refs.editorRef} className={cn('group relative', isEmptyAndNotDisabled && 'cursor-pointer')}>
                {isEmptyAndNotDisabled && (
                    <button
                        type="button"
                        className="absolute inset-0 z-10 h-full w-full cursor-pointer"
                        onClick={handleClick}
                        onDoubleClick={handleDoubleClick}
                        aria-label={placeholder || 'Click to edit'}
                    />
                )}
                <EditorContent editor={editor} disabled={disabled} />
                {isEmpty && <Placeholder placeholder={value ? '' : placeholder || ''} />}
                {editor && (
                    <div className="space-y-2">
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
