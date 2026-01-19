import { useEffect, useState } from "react";

import { Pen, Trash } from "lucide-react";

import { project_kanban_cycle_card_comment } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import { Button , cn , AppDialog , AppAvatar } from "@repo/ui";

import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";
import { useCardComment } from "@/app/[locale]/(private)/project_kanban/show/[id]/hooks/use-req/services";
import { Editor } from "@repo/form";
import { isHtmlEmpty, normalizeHtml } from "@repo/form/utils";
import { Permission } from "@/components/permission";
import { useAccess } from "@/hooks/access";

export interface ICommentCardProps {
  comment: project_kanban_cycle_card_comment;
}

export const CommentCard = ({ comment }: ICommentCardProps) => {
  const { permissions, profile } = useAccess();
  const perm = permissions("project_kanban_cycle_card_comment");

  const { dates } = useIntlFormat();

  const lang = useLang();
  const t = lang.page.kanban;

  const { page, general, unload } = useKanbanShow();
  const [text, setText] = useState<string | null>(comment.text);
  const [editable, setEditable] = useState<boolean>(false);
  const [openDestroy, setOpenDestroy] = useState<boolean>(false);

  useEffect(() => {
    setText(comment.text);
  }, [comment.text]);

  const { update, destroy } = useCardComment({
    id: comment.id,
    cardId: general.state.card!.id,
    callbacks: {
      update: {
        onSuccess: () => {
          setEditable(false);
        },
      },
    },
  });

  const isDifferent =
    normalizeHtml(text) !== normalizeHtml(comment.text) && !isHtmlEmpty(comment.text);

  useEffect(() => {
    unload.handleState({
      feature: "card",
      dirty: isDifferent,
      modes: ["update_comment"],
    });
  }, [isDifferent]);
  return (
    <>
      <div key={comment.id} className="bg-sidebar relative rounded-md p-4">
        <div className="relative z-1 mb-2 flex items-center justify-between px-5">
          <div className="z-1 flex items-center gap-2">
            <AppAvatar
              src={comment.profile?.user?.avatar || ""}
              path="user/avatar"
              publicFile
              name={comment.profile?.user?.name || ""}
              className="h-7 w-7"
            />
            <p className="text-sm font-medium">{comment.profile?.user?.name}</p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-muted-foreground text-xs">
              {dates.format(new Date(comment.createdAt))}
            </p>
            <div className="flex gap-1">
              <Permission permission={["update"]} feature="project_kanban_cycle_card_comment">
                {profile?.id === comment.profile?.id && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setEditable((prev) => !prev)}
                  >
                    <Pen className="size-3" />
                  </Button>
                )}
              </Permission>
              <Permission permission={["destroy"]} feature="project_kanban_cycle_card_comment">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setOpenDestroy(true)}
                >
                  <Trash className="size-3 text-red-500" />
                </Button>
              </Permission>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "rounded-md p-2",
            "transition-all duration-300",
            editable && "bg-background"
          )}
        >
          <Editor
            editable={editable}
            setEditable={setEditable}
            value={text}
            disabled={!perm.update || profile?.id !== comment.profile?.id}
            className={cn("hover:border-transparent", editable ? "min-h-[156px]" : "min-h-[1px]")}
            onChange={setText}
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
        </div>
        {(editable || isDifferent) && (
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="secondary"
              disabled={update.isPending}
              onClick={() => {
                setEditable(false);
                setText(comment.text);
              }}
            >
              {t("card-form-edit.cancel")}
            </Button>
            <Button
              disabled={!text?.trim() || !isDifferent}
              loading={update.isPending}
              onClick={() => {
                text?.trim() &&
                  update.mutate({
                    text: text?.trim(),
                  });
              }}
            >
              {t("card-form-edit.save")}
            </Button>
          </div>
        )}
      </div>

      <AppDialog
        title={t("card-form-edit.comment.title")}
        description={t("card-form-edit.comment.description")}
        open={openDestroy}
        loading={destroy.isPending}
        onOpenChange={setOpenDestroy}
        footer={
          <Button
            variant="destructive"
            onClick={() => destroy.mutate()}
            loading={destroy.isPending}
          >
            {t("card-form-edit.destroy")}
          </Button>
        }
      />
    </>
  );
};
