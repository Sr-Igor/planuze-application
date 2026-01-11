import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { HashtagNodeView } from './hashtag-node-view';

export interface HashtagOptions {
    HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hashtag: {
            setHashtag: (attributes: { cardId: string; title: string }) => ReturnType;
        };
    }
}

export const Hashtag = Node.create<HashtagOptions>({
    name: 'hashtag',

    addOptions() {
        return {
            HTMLAttributes: {}
        };
    },

    group: 'inline',

    inline: true,

    selectable: false,

    atom: true,

    addAttributes() {
        return {
            cardId: {
                default: null,
                parseHTML: (element) => element.getAttribute('data-card-id'),
                renderHTML: (attributes) => {
                    if (!attributes.cardId) {
                        return {};
                    }
                    return {
                        'data-card-id': attributes.cardId
                    };
                }
            },
            title: {
                default: null,
                parseHTML: (element) => element.getAttribute('data-title'),
                renderHTML: (attributes) => {
                    if (!attributes.title) {
                        return {};
                    }
                    return {
                        'data-title': attributes.title
                    };
                }
            }
        };
    },

    parseHTML() {
        return [
            {
                tag: 'span[data-card-id]'
            }
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'span',
            mergeAttributes(
                {
                    class: 'hashtag cursor-pointer rounded px-1 font-medium text-green-500 hover:bg-green-50',
                    'data-card-id': HTMLAttributes['data-card-id'],
                    'data-title': HTMLAttributes['data-title']
                },
                this.options.HTMLAttributes,
                HTMLAttributes
            ),
            `#${HTMLAttributes['data-title'] || 'Card'}`
        ];
    },

    addCommands() {
        return {
            setHashtag:
                (attributes) =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: attributes
                    });
                }
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(HashtagNodeView);
    }
});
