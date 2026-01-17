import { useLang } from "@repo/language/hook";

import { IMemberStats } from "@repo/api/web/callers/project_kanban_report/types";

export interface iLineMemberProps {
  member: IMemberStats;
  index: number;
}

export const LineMember = ({ member, index }: iLineMemberProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <div key={member.memberId} className="flex items-center gap-4 rounded-lg border p-3">
      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold">
        {index + 1}
      </div>
      <div className="flex-1">
        <p className="font-medium">{member.memberName}</p>
        <p className="text-muted-foreground text-sm">
          {t("report.rank.line.completed", {
            completed: member.completedCards,
            total: member.totalCards,
          })}
        </p>
      </div>
    </div>
  );
};
