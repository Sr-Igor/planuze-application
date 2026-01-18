import { useEffect, useState } from "react";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";

import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";
import { useCardComment } from "@/app/[locale]/(private)/project_kanban/show/[id]/hooks/use-req/services";
import { Editor } from "@repo/form";
import { isHtmlEmpty } from "@repo/form/utils";

export const NewComment = () => {
  const lang = useLang();
  const t = lang.page.kanban;

  const { page, general, unload } = useKanbanShow();
  const [comment, setComment] = useState<string | null>(null);
  const [editable, setEditable] = useState<boolean>(false);

  const { store } = useCardComment({
    cardId: general.state.card!.id,
    callbacks: {
      store: {
        onSuccess: (e) => {
          setComment(null);
          setEditable(false);
        },
      },
    },
  });

  const hasComment = !isHtmlEmpty(comment);
  useEffect(() => {
    unload.handleState({
      feature: "card",
      dirty: hasComment,
      modes: ["new_comment"],
    });
  }, [hasComment]);

  return (
    <div className="bg-sidebar mb-4 rounded-md p-4">
      <div className="bg-background rounded-md p-2">
        <Editor
          editable={editable}
          setEditable={setEditable}
          value={comment}
          className="min-h-[120px] hover:border-transparent"
          onChange={setComment}
          placeholder={t("card-form-edit.placeholder.comment")}
          mentionQuery={{}}
          hashtagQuery={page.id ? { project_kanban_id: page.id } : undefined}
          hashRefLink={(id) => {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set("card_id", id);
            window.open(currentUrl.toString(), "_blank", "noopener,noreferrer");
          }}
          mentionRefLink={(id) => {
            window.open(`/profile/show/${id}`, "_blank", "noopener,noreferrer");
          }}
        />

        {(!isHtmlEmpty(comment) || editable) && (
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="secondary"
              disabled={store.isPending}
              onClick={() => {
                setComment(null);
                setEditable(false);
              }}
            >
              {t("card-form-edit.cancel")}
            </Button>
            <Button
              disabled={!comment?.trim()}
              loading={store.isPending}
              onClick={() => {
                const text = comment?.trim();
                text &&
                  !isHtmlEmpty(text) &&
                  store.mutate({
                    text,
                    project_id: page.kanban?.project_id,
                    project_kanban_id: page.kanban?.id,
                    project_kanban_cycle_card_id: general.state.card?.id,
                  });
              }}
            >
              {t("card-form-edit.save")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
