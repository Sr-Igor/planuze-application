import React from 'react';

import { NodeViewWrapper, type ReactNodeViewProps } from '@tiptap/react';

import { useEditorLinks } from '../../contexts/editor-links-context';

export const MentionNodeView: React.FC<ReactNodeViewProps> = ({ node }) => {
    const { profileId, name } = node.attrs as { profileId: string; name: string };
    const { mentionRefLink } = useEditorLinks();

    const handleClick = () => {
        if (mentionRefLink && profileId) {
            mentionRefLink(profileId);
        }
    };

    return (
        <NodeViewWrapper
            as='span'
            className='mention cursor-pointer rounded px-1 font-medium text-blue-500 hover:bg-blue-50'
            data-profile-id={profileId}
            data-name={name}
            contentEditable={false}
            onClick={handleClick}>
            @{name || 'Unknown_user'}
        </NodeViewWrapper>
    );
};
