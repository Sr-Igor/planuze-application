// Node extensions
import Blockquote from '@tiptap/extension-blockquote';
// Mark extensions
import Bold from '@tiptap/extension-bold';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import BulletList from '@tiptap/extension-bullet-list';
import CharacterCount from '@tiptap/extension-character-count';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Color from '@tiptap/extension-color';
import Details from '@tiptap/extension-details';
import DetailsContent from '@tiptap/extension-details-content';
import DetailsSummary from '@tiptap/extension-details-summary';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import FloatingMenu from '@tiptap/extension-floating-menu';
import Focus from '@tiptap/extension-focus';
import FontFamily from '@tiptap/extension-font-family';
import Gapcursor from '@tiptap/extension-gapcursor';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Text from '@tiptap/extension-text';
// Functionality extensions
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';

import { CustomImage } from '../../extensions/editor/custom-image.extension';
import { Hashtag } from '../../modules/editor/hashtag';
import { Mention } from '../../modules/editor/mention';

export const createEditorExtensions = (
    mentionQuery?: Record<string, string>,
    hashtagQuery?: Record<string, string>
) => {
    const extensions = [
        // Core document structure
        Document,
        Paragraph,
        Text,
        HardBreak,

        // Headings
        Heading.configure({
            levels: [1, 2, 3, 4, 5, 6],
            HTMLAttributes: {
                class: 'font-bold',
            },
        }),

        // Lists
        BulletList.configure({
            HTMLAttributes: {
                class: 'list-disc ml-3',
            },
        }),
        OrderedList.configure({
            HTMLAttributes: {
                class: 'list-decimal ml-3',
            },
        }),
        ListItem,
        TaskList,
        TaskItem.configure({
            nested: true,
        }),

        // Blocks
        Blockquote.configure({
            HTMLAttributes: {
                class: 'border-l-4 border-gray-300 pl-4 italic',
            },
        }),
        CodeBlock.configure({
            HTMLAttributes: {
                class: 'bg-gray-100 rounded p-2 font-mono',
            },
        }),
        HorizontalRule,

        // Media
        CustomImage.configure({
            inline: false,
            allowBase64: true,
            HTMLAttributes: {
                class: 'max-w-full h-auto block',
            },
        }),
        Youtube.configure({
            width: 640,
            height: 480,
        }),

        // Tables
        Table.configure({
            resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,

        // Text formatting marks
        Bold,
        Italic,
        Strike,
        Code.configure({
            HTMLAttributes: {
                class: 'bg-gray-100 rounded px-1 font-mono',
            },
        }),
        Underline,
        Subscript,
        Superscript,
        Highlight.configure({
            multicolor: true,
        }),

        // Text styling
        TextStyle,
        Color.configure({
            types: ['textStyle'],
        }),
        FontFamily.configure({
            types: ['textStyle'],
        }),

        // Links
        Link.configure({
            openOnClick: false,
            HTMLAttributes: {
                class: 'cursor-pointer',
            },
        }),

        // Text alignment
        TextAlign.configure({
            types: ['heading', 'paragraph', 'image'],
            alignments: ['left', 'center', 'right'],
        }),

        // Functionality
        Typography,
        Placeholder.configure({
            placeholder: 'Digite seu conteúdo aqui...',
        }),
        Focus.configure({
            className: 'has-focus',
            mode: 'all',
        }),
        CharacterCount,
        Dropcursor.configure({
            color: '#DBEAFE',
            width: 4,
        }),
        Gapcursor,
        History,

        // Interactive menus
        FloatingMenu.configure({
            element: null,
        }),
        BubbleMenu.configure({
            element: null,
        }),

        // Details/Summary
        Details,
        DetailsSummary,
        DetailsContent,
    ];

    // Add extensions conditionally based on available queries
    if (mentionQuery) {
        extensions.push(
            Mention.configure({
                HTMLAttributes: {
                    class: 'mention text-blue-500 font-medium',
                },
            })
        );
    }

    if (hashtagQuery) {
        extensions.push(
            Hashtag.configure({
                HTMLAttributes: {
                    class: 'hashtag text-green-500 font-medium',
                },
            })
        );
    }

    return extensions;
};
