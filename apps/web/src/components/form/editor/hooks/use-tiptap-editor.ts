import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';
import { useEditor } from '@tiptap/react';

import { createEditorExtensions } from '../config/extensions';
import { EDITOR_CLASSES } from '../constants/editor-settings';
import { isHtmlEmpty } from '../utils/html-utils';

interface UseTiptapEditorProps {
    value?: string | null;
    onChange?: (content: string | null) => void;
    editable: boolean;
    mentionQuery?: Record<string, string>;
    hashtagQuery?: Record<string, string>;
    className?: string;
}

export const useTiptapEditor = ({
    value,
    onChange,
    editable,
    mentionQuery,
    hashtagQuery,
    className
}: UseTiptapEditorProps) => {
    const isInitialized = useRef(false);
    const lastValue = useRef<string | null>(null);
    const isUpdatingFromProps = useRef(false);

    const editor = useEditor({
        extensions: createEditorExtensions(mentionQuery, hashtagQuery),
        content: value,
        editorProps: {
            attributes: {
                class: cn(EDITOR_CLASSES.BASE, !editable && EDITOR_CLASSES.DISABLED, className)
            }
        },
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            if (isUpdatingFromProps.current) return;

            const html = editor.getHTML();
            const content = isHtmlEmpty(html) ? null : html;

            if (isInitialized.current && lastValue.current !== content) {
                lastValue.current = content;
                onChange?.(content);
            }
        }
    });

    useEffect(() => {
        if (editor) {
            editor.setEditable(editable);
        }
    }, [editor, editable]);

    useEffect(() => {
        if (editor) {
            const timer = setTimeout(() => {
                isInitialized.current = true;

                const initialContent = editor.getHTML();
                lastValue.current = isHtmlEmpty(initialContent) ? null : initialContent;
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [editor]);

    useEffect(() => {
        if (editor && value !== undefined) {
            const currentContent = editor.getHTML();
            const isEmpty = isHtmlEmpty(value);
            const currentIsEmpty = isHtmlEmpty(currentContent);

            const normalizedValue = isEmpty ? null : value;
            const normalizedCurrent = currentIsEmpty ? null : currentContent;

            if (normalizedValue !== normalizedCurrent) {
                isUpdatingFromProps.current = true;

                // Usa queueMicrotask para evitar flushSync
                queueMicrotask(() => {
                    if (isEmpty) {
                        editor.commands.setContent('');
                        lastValue.current = '';
                    } else {
                        editor.commands.setContent(value);
                        lastValue.current = value;
                    }

                    setTimeout(() => {
                        isUpdatingFromProps.current = false;
                    }, 0);
                });
            }
        }
    }, [editor, value]);

    return editor;
};
