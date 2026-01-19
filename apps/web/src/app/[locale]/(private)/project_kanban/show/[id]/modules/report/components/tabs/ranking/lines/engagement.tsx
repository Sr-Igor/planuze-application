import { useLang } from "@repo/language/hooks";
import { Separator } from "@repo/ui";

import { ITopEngagedCard } from "@repo/api/web/callers/project_kanban_report/types";

export interface iLineEngagementProps {
  card: ITopEngagedCard;
}

export const LineEngagement = ({ card }: iLineEngagementProps) => {
  const lang = useLang();
  const t = lang.page.kanban;
  return (
    <div key={card.id} className="flex items-center gap-4 rounded-lg border p-3">
      <div className="flex-1 overflow-hidden">
        <p className="line-clamp-1 truncate font-medium">
          #{card.publicId} - {card.title}
        </p>
        <div className="text-muted-foreground mt-1 flex h-4 items-center gap-1 text-xs font-semibold">
          <span className="truncate">
            {card.commentsCount} {t("report.rank.line.comments")}
          </span>
          <Separator orientation="vertical" className="h-4" />
          <span className="truncate">
            {card.filesCount} {t("report.rank.line.files")}
          </span>
          <Separator orientation="vertical" className="h-4" />
          <span className="truncate">
            {card.readsCount} {t("report.rank.line.reads")}
          </span>
        </div>
      </div>
      <span className="rounded-md border border-green-500 px-3 py-1 text-sm font-medium text-green-500">
        {t("report.rank.line.score")}: {card.engagementScore}
      </span>
    </div>
  );
};
