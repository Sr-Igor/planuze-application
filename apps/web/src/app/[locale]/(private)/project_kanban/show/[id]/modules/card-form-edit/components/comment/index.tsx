import { project_kanban_cycle_card_comment } from "@repo/types";
import { useLang } from "@repo/language/hook";

import { Permission } from "@/components/ui/permission";

import { CommentCard } from "./card";
import { NewComment } from "./new";

export interface ICommentProps {
  comments: project_kanban_cycle_card_comment[];
}

export const Comment = ({ comments }: ICommentProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <div>
      <Permission permission={["store"]} feature="project_kanban_cycle_card_comment">
        <NewComment />
      </Permission>

      <div className="space-y-4">
        {comments.map((c) => (
          <CommentCard key={c.id} comment={c} />
        ))}

        {comments.length === 0 && (
          <div className="text-muted-foreground flex min-h-46 items-center justify-center text-center text-sm">
            {t("no_value.comments")}
          </div>
        )}
      </div>
    </div>
  );
};
