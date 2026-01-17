import { useCallback, useEffect, useState } from "react";

import type { Editor } from "@tiptap/react";

import type { profile } from "@repo/types";

interface MentionState {
  isOpen: boolean;
  query: string;
  position: { top: number; left: number };
}

export const useMention = (editor: Editor | null, mentionQuery?: Record<string, string>) => {
  const [mentionState, setMentionState] = useState<MentionState>({
    isOpen: false,
    query: "",
    position: { top: 0, left: 0 },
  });

  const handleTextInput = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (!editor || !mentionQuery) return;

      const { state, view } = editor;
      const { selection } = state;
      const { $from } = selection;

      const textBefore = $from.parent.textBetween(0, $from.parentOffset);

      const mentionMatch = textBefore.match(/@(\w*)$/);

      if (mentionMatch) {
        const query = mentionMatch[1] || "";

        const mentionStartPosition = $from.pos - mentionMatch[0].length;

        const coords = view.coordsAtPos(mentionStartPosition);

        const position = {
          top: coords.bottom + window.scrollY + 4,
          left: coords.left + window.scrollX,
        };

        setMentionState({
          isOpen: true,
          query,
          position,
        });
      } else {
        setMentionState((prev) => ({ ...prev, isOpen: false }));
      }
    },
    [mentionQuery]
  );

  const insertMention = useCallback(
    (profile: profile) => {
      if (!editor || !mentionQuery) return;

      const { state } = editor;
      const { selection } = state;
      const { $from } = selection;

      const textBefore = $from.parent.textBetween(0, $from.parentOffset);
      const mentionMatch = textBefore.match(/@(\w*)$/);

      if (mentionMatch) {
        const matchStart = $from.parentOffset - mentionMatch[0].length;
        const startPos = $from.start() + matchStart;
        const endPos = $from.pos;

        // Usa setTimeout para evitar flushSync
        setTimeout(() => {
          editor
            .chain()
            .focus()
            .deleteRange({ from: startPos, to: endPos })
            .setMention({
              profileId: profile.id,
              name: profile.user?.name || "Usuário",
            })
            .insertContent(" ")
            .run();
        }, 0);
      }

      setMentionState((prev) => ({ ...prev, isOpen: false }));
    },
    [editor, mentionQuery]
  );

  const closeMention = useCallback(() => {
    setMentionState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  useEffect(() => {
    if (!editor) return;

    const handleTransaction = () => {
      handleTextInput({ editor });
    };

    editor.on("transaction", handleTransaction);

    return () => {
      editor.off("transaction", handleTransaction);
    };
  }, [editor, handleTextInput, mentionQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mentionState.isOpen) {
        const target = event.target as Element;
        const isInsideEditor = editor?.view.dom.contains(target);
        const isInsidePopover = target.closest("[data-mention-popover]");

        if (!isInsideEditor && !isInsidePopover) {
          closeMention();
        }
      }
    };

    if (mentionState.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mentionState.isOpen, editor, closeMention]);

  // Fecha o popover quando houver scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mentionState.isOpen) {
        closeMention();
      }
    };

    if (mentionState.isOpen) {
      // Escuta scroll na window e em elementos scrolláveis ancestrais
      window.addEventListener("scroll", handleScroll, true);

      // Também escuta resize para fechar
      window.addEventListener("resize", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [mentionState.isOpen, closeMention]);

  return {
    mentionState,
    insertMention,
    closeMention,
  };
};
