import { BookCheck } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";
import { AppTooltip } from "@repo/ui/app";

import { project_kanban_cycle_card } from "@/api/generator/types";
import { useAuth } from "@/hooks/auth";
import { cn } from "@/lib/utils";

import { useKanbanShow } from "../../../context";
import { useCardRead } from "../../../hooks/use-req/services/use-card-read";

export interface IReadButtonProps {
  item?: project_kanban_cycle_card | null;
}

export const ReadButton = ({ item }: IReadButtonProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const { profile } = useAuth();

  const { general, page } = useKanbanShow();

  const { store } = useCardRead({
    cardId: general.state.card!.id,
    callbacks: {},
  });

  const lastRead = item?.project_kanban_cycle_card_reads?.find(
    (read) => read.profile_id === profile?.id
  );
  const isRead = lastRead?.action === "read";

  return (
    <AppTooltip text={isRead ? t("card-form-edit.unread") : t("card-form-edit.read")}>
      <Button
        className={cn(
          "hover:opacity-100",
          isRead
            ? "bg-green-600 text-white hover:bg-green-600"
            : "bg-secondary! hover:bg-secondary! text-foreground!"
        )}
        loading={store.isPending}
        onClick={() =>
          store.mutate({
            project_kanban_cycle_card_id: general.state.card!.id,
            project_id: page.kanban?.project_id,
            action: isRead ? "unread" : "read",
          })
        }
      >
        <BookCheck />
      </Button>
    </AppTooltip>
  );
};
