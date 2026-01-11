import { DialogHeader } from "@repo/ui";

import { project_kanban_cycle_card_type } from "@/api/generator/types";

export interface IHeaderProps {
  cardType?: project_kanban_cycle_card_type;
  children: React.ReactNode;
}

export const Header = ({ cardType, children }: IHeaderProps) => {
  return (
    <DialogHeader
      className="border-l-primary flex flex-col justify-between gap-2 border-l-8"
      style={{
        borderColor: cardType?.color || "#E2E8F0",
      }}
    >
      {children}
    </DialogHeader>
  );
};
