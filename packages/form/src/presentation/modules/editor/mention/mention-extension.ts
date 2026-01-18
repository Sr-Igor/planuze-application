import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { MentionNodeView } from './mention-node-view.component';

export interface MentionOptions {
    HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        mention: {
            setMention: (attributes: { profileId: string; name: string }) => ReturnType;
        };
    }
}

export const Mention = Node.create<MentionOptions>({
    name: 'mention',

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

    group: 'inline',

    inline: true,

    selectable: false,

    atom: true,

    addAttributes() {
        return {
            profileId: {
                default: null,
                parseHTML: (element) => element.dataset.profileId || null,
                renderHTML: (attributes) => {
                    if (!attributes.profileId) {
                        return {};
                    }
                    return {
                        'data-profile-id': attributes.profileId,
                    };
                },
            },
            name: {
                default: null,
                parseHTML: (element) => element.dataset.name || null,
                renderHTML: (attributes) => {
                    if (!attributes.name) {
                        return {};
                    }
                    return {
                        'data-name': attributes.name,
                    };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'span[data-profile-id]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'span',
            mergeAttributes(
                {
                    class: 'mention text-blue-500 font-medium',
                    'data-profile-id': HTMLAttributes['data-profile-id'],
                    'data-name': HTMLAttributes['data-name'],
                },
                this.options.HTMLAttributes,
                HTMLAttributes
            ),
            `@${HTMLAttributes['data-name'] || 'Usuário'}`,
        ];
    },

    addCommands() {
        return {
            setMention:
                (attributes) =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: attributes,
                    });
                },
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(MentionNodeView);
    },
});
