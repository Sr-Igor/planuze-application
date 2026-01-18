import { useCallback, useEffect, useState } from 'react';

import type { Editor } from '@tiptap/react';

interface HashtagState {
    isOpen: boolean;
    query: string;
    position: { top: number; left: number };
}

export const useHashtag = (editor: Editor | null, hashtagQuery?: Record<string, string>) => {
    const [hashtagState, setHashtagState] = useState<HashtagState>({
        isOpen: false,
        query: '',
        position: { top: 0, left: 0 },
    });

    const handleTextInput = useCallback(
        ({ editor }: { editor: Editor }) => {
            if (!editor || !hashtagQuery) return;

            const { state, view } = editor;
            const { selection } = state;
            const { $from } = selection;

            const textBefore = $from.parent.textBetween(0, $from.parentOffset);

            const hashtagMatch = textBefore.match(/#(\w*)$/);

            if (hashtagMatch) {
                const query = hashtagMatch[1] || '';

                const hashtagStartPosition = $from.pos - hashtagMatch[0].length;

                const coords = view.coordsAtPos(hashtagStartPosition);

                const position = {
                    top: coords.bottom + window.scrollY + 4,
                    left: coords.left + window.scrollX,
                };

                setHashtagState({
                    isOpen: true,
                    query,
                    position,
                });
            } else {
                setHashtagState((prev) => ({ ...prev, isOpen: false }));
            }
        },
        [hashtagQuery]
    );

    const insertHashtag = useCallback(
        (card: any) => {
            if (!editor || !hashtagQuery) return;

            const { state } = editor;
            const { selection } = state;
            const { $from } = selection;

            const textBefore = $from.parent.textBetween(0, $from.parentOffset);
            const hashtagMatch = textBefore.match(/#(\w*)$/);

            if (hashtagMatch) {
                const matchStart = $from.parentOffset - hashtagMatch[0].length;
                const startPos = $from.start() + matchStart;
                const endPos = $from.pos;

                setTimeout(() => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange({ from: startPos, to: endPos })
                        .setHashtag({
                            cardId: card.id,
                            title: card.title || 'Card',
                        })
                        .insertContent(' ')
                        .run();
                }, 0);
            }

            setHashtagState((prev) => ({ ...prev, isOpen: false }));
        },
        [editor, hashtagQuery]
    );

    const closeHashtag = useCallback(() => {
        setHashtagState((prev) => ({ ...prev, isOpen: false }));
    }, []);

    useEffect(() => {
        if (!editor) return;

        const handleTransaction = () => {
            handleTextInput({ editor });
        };

        editor.on('transaction', handleTransaction);

        return () => {
            editor.off('transaction', handleTransaction);
        };
    }, [editor, handleTextInput, hashtagQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (hashtagState.isOpen) {
                const target = event.target as Element;
                const isInsideEditor = editor?.view.dom.contains(target);
                const isInsidePopover = target.closest('[data-hashtag-popover]');

                if (!isInsideEditor && !isInsidePopover) {
                    closeHashtag();
                }
            }
        };

        if (hashtagState.isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [hashtagState.isOpen, editor, closeHashtag]);

    useEffect(() => {
        const handleScroll = () => {
            if (hashtagState.isOpen) {
                closeHashtag();
            }
        };

        if (hashtagState.isOpen) {
            window.addEventListener('scroll', handleScroll, true);
            window.addEventListener('resize', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleScroll);
        };
    }, [hashtagState.isOpen, closeHashtag]);

    return {
        hashtagState,
        insertHashtag,
        closeHashtag,
    };
};
