'use client';

import React from 'react';

import { NodeViewWrapper, type ReactNodeViewProps } from '@tiptap/react';

import { useEditorLinks } from '../../../contexts/editor-links.context';

export const HashtagNodeView: React.FC<ReactNodeViewProps> = ({ node }) => {
    const { cardId, title } = node.attrs as { cardId: string; title: string };
    const { hashRefLink } = useEditorLinks();

    const handleClick = () => {
        if (hashRefLink && cardId) {
            hashRefLink(cardId);
        }
    };

    return (
        <NodeViewWrapper
            as="span"
            className="hashtag cursor-pointer rounded px-1 font-medium text-green-500 hover:bg-green-50"
            data-card-id={cardId}
            data-title={title}
            contentEditable={false}
            onClick={handleClick}
        >
            #{title || 'Card'}
        </NodeViewWrapper>
    );
};
