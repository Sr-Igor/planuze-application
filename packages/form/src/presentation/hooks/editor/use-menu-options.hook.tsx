import React, { useEffect, useMemo, useState } from 'react';

import { useTheme } from 'next-themes';

import type { Editor } from '@tiptap/react';
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Code,
    Code2,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Highlighter,
    Image,
    Italic,
    Link,
    List,
    ListChecks,
    ListOrdered,
    Minus,
    Quote,
    Redo,
    Strikethrough,
    Subscript,
    Superscript,
    Table,
    Type,
    Underline,
    Undo,
    Youtube,
} from 'lucide-react';

import { useLang } from '@repo/language/hook';

import { EDITOR_SETTINGS } from '#/shared/constants/editor-settings.constant';
import type { MenuOption, ModalType } from '#/shared/types/editor.types';

export const useMenuOptions = (editor: Editor, onOpenModal: (type: ModalType) => void) => {
    const t = useLang();
    const { resolvedTheme } = useTheme();
    const [forceUpdate, setForceUpdate] = useState({});

    // Force re-render when editor changes
    useEffect(() => {
        if (!editor) return;

        const updateHandler = () => {
            setForceUpdate({});
        };

        editor.on('update', updateHandler);
        editor.on('selectionUpdate', updateHandler);

        return () => {
            editor.off('update', updateHandler);
            editor.off('selectionUpdate', updateHandler);
        };
    }, [editor]);

    const insertTable = () => {
        editor.chain().focus().insertTable(EDITOR_SETTINGS.TABLE_DEFAULTS).run();
    };

    const menuOptions = useMemo(() => {
        const headingOptions: MenuOption[] = [
            {
                icon: <Type className="size-4" />,
                onClick: () => editor.chain().focus().setParagraph().run(),
                pressed: editor.isActive('paragraph'),
                title: t.editor('toolbar.paragraph'),
            },
            {
                icon: <Heading1 className="size-4" />,
                onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
                pressed: editor.isActive('heading', { level: 1 }),
                title: t.editor('toolbar.h1'),
            },
            {
                icon: <Heading2 className="size-4" />,
                onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
                pressed: editor.isActive('heading', { level: 2 }),
                title: t.editor('toolbar.h2'),
            },
            {
                icon: <Heading3 className="size-4" />,
                onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
                pressed: editor.isActive('heading', { level: 3 }),
                title: t.editor('toolbar.h3'),
            },
            {
                icon: <Heading4 className="size-4" />,
                onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
                pressed: editor.isActive('heading', { level: 4 }),
                title: t.editor('toolbar.h4'),
            },
            {
                icon: <Heading5 className="size-4" />,
                onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
                pressed: editor.isActive('heading', { level: 5 }),
                title: t.editor('toolbar.h5'),
            },
            {
                icon: <Heading6 className="size-4" />,
                onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
                pressed: editor.isActive('heading', { level: 6 }),
                title: t.editor('toolbar.h6'),
            },
        ];

        const textFormattingOptions: MenuOption[] = [
            {
                icon: <Bold className="size-4" />,
                onClick: () => editor.chain().focus().toggleBold().run(),
                pressed: editor.isActive('bold'),
                title: t.editor('toolbar.bold'),
            },
            {
                icon: <Italic className="size-4" />,
                onClick: () => editor.chain().focus().toggleItalic().run(),
                pressed: editor.isActive('italic'),
                title: t.editor('toolbar.italic'),
            },
            {
                icon: <Underline className="size-4" />,
                onClick: () => editor.chain().focus().toggleUnderline().run(),
                pressed: editor.isActive('underline'),
                title: t.editor('toolbar.underline'),
            },
            {
                icon: <Strikethrough className="size-4" />,
                onClick: () => editor.chain().focus().toggleStrike().run(),
                pressed: editor.isActive('strike'),
                title: t.editor('toolbar.strike'),
            },
            {
                icon: <Code className="size-4" />,
                onClick: () => editor.chain().focus().toggleCode().run(),
                pressed: editor.isActive('code'),
                title: t.editor('toolbar.code'),
            },
            {
                icon: <Highlighter className="size-4" />,
                onClick: () => editor.chain().focus().toggleHighlight().run(),
                pressed: editor.isActive('highlight'),
                title: t.editor('toolbar.highlight'),
            },
            {
                icon: <Subscript className="size-4" />,
                onClick: () => editor.chain().focus().toggleSubscript().run(),
                pressed: editor.isActive('subscript'),
                title: t.editor('toolbar.subscript'),
            },
            {
                icon: <Superscript className="size-4" />,
                onClick: () => editor.chain().focus().toggleSuperscript().run(),
                pressed: editor.isActive('superscript'),
                title: t.editor('toolbar.superscript'),
            },
        ];

        const alignmentOptions: MenuOption[] = [
            {
                icon: <AlignLeft className="size-4" />,
                onClick: () => {
                    if (editor.isActive('image')) {
                        // Detect current alignment before applying
                        editor.chain().focus().detectImageAlign().run();
                        editor.chain().focus().setImageAlign('left').run();
                    } else {
                        editor.chain().focus().setTextAlign('left').run();
                    }
                },
                pressed:
                    editor.isActive({ textAlign: 'left' }) ||
                    (editor.isActive('image') && editor.getAttributes('image').textAlign === 'left'),
                title: t.editor('toolbar.align_left'),
            },
            {
                icon: <AlignCenter className="size-4" />,
                onClick: () => {
                    if (editor.isActive('image')) {
                        // Detect current alignment before applying
                        editor.chain().focus().detectImageAlign().run();
                        editor.chain().focus().setImageAlign('center').run();
                    } else {
                        editor.chain().focus().setTextAlign('center').run();
                    }
                },
                pressed:
                    editor.isActive({ textAlign: 'center' }) ||
                    (editor.isActive('image') && editor.getAttributes('image').textAlign === 'center'),
                title: t.editor('toolbar.align_center'),
            },
            {
                icon: <AlignRight className="size-4" />,
                onClick: () => {
                    if (editor.isActive('image')) {
                        // Detect current alignment before applying
                        editor.chain().focus().detectImageAlign().run();
                        editor.chain().focus().setImageAlign('right').run();
                    } else {
                        editor.chain().focus().setTextAlign('right').run();
                    }
                },
                pressed:
                    editor.isActive({ textAlign: 'right' }) ||
                    (editor.isActive('image') && editor.getAttributes('image').textAlign === 'right'),
                title: t.editor('toolbar.align_right'),
            },
        ];

        const listOptions: MenuOption[] = [
            {
                icon: <List className="size-4" />,
                onClick: () => editor.chain().focus().toggleBulletList().run(),
                pressed: editor.isActive('bulletList'),
                title: t.editor('toolbar.list_bullet'),
            },
            {
                icon: <ListOrdered className="size-4" />,
                onClick: () => editor.chain().focus().toggleOrderedList().run(),
                pressed: editor.isActive('orderedList'),
                title: t.editor('toolbar.list_ordered'),
            },
            {
                icon: <ListChecks className="size-4" />,
                onClick: () => editor.chain().focus().toggleTaskList().run(),
                pressed: editor.isActive('taskList'),
                title: t.editor('toolbar.list_task'),
            },
        ];

        const blockOptions: MenuOption[] = [
            {
                icon: <Quote className="size-4" />,
                onClick: () => editor.chain().focus().toggleBlockquote().run(),
                pressed: editor.isActive('blockquote'),
                title: t.editor('toolbar.quote'),
            },
            {
                icon: <Code2 className="size-4" />,
                onClick: () => editor.chain().focus().toggleCodeBlock().run(),
                pressed: editor.isActive('codeBlock'),
                title: t.editor('toolbar.code_block'),
            },
            {
                icon: <Minus className="size-4" />,
                onClick: () => editor.chain().focus().setHorizontalRule().run(),
                pressed: false,
                title: t.editor('toolbar.horizontal_rule'),
            },
        ];

        const mediaOptions: MenuOption[] = [
            {
                icon: <Image className="size-4" />,
                onClick: () => onOpenModal('image'),
                pressed: false,
                title: t.editor('toolbar.image'),
            },
            {
                icon: <Youtube className="size-4" />,
                onClick: () => onOpenModal('youtube'),
                pressed: false,
                title: t.editor('toolbar.youtube'),
            },
            {
                icon: <Link className="size-4" />,
                onClick: () => onOpenModal('link'),
                pressed: editor.isActive('link'),
                title: t.editor('toolbar.link'),
            },
        ];

        const tableOptions: MenuOption[] = [
            {
                icon: <Table className="size-4" />,
                onClick: insertTable,
                pressed: editor.isActive('table'),
                title: t.editor('toolbar.table'),
            },
        ];

        const historyOptions: MenuOption[] = [
            {
                icon: <Undo className="size-4" />,
                onClick: () => editor.chain().focus().undo().run(),
                pressed: false,
                title: t.editor('toolbar.undo'),
                disabled: !editor.can().undo(),
            },
            {
                icon: <Redo className="size-4" />,
                onClick: () => editor.chain().focus().redo().run(),
                pressed: false,
                title: t.editor('toolbar.redo'),
                disabled: !editor.can().redo(),
            },
        ];

        return {
            headingOptions,
            textFormattingOptions,
            alignmentOptions,
            listOptions,
            blockOptions,
            mediaOptions,
            tableOptions,
            historyOptions,
        };
    }, [editor, onOpenModal, resolvedTheme, forceUpdate, t]);

    return menuOptions;
};
