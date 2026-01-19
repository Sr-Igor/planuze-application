import {
  project_kanban_cycle_card,
  project_kanban_cycle_card_type,
} from "@repo/types";
import { DialogTitle } from "@repo/ui";
import { Icon } from "@repo/ui";

export interface ICardTypeTitleProps {
  cardType?: project_kanban_cycle_card_type;
  item?: project_kanban_cycle_card;
}

export const CardTypeTitle = ({ cardType, item }: ICardTypeTitleProps) => {
  return (
    <DialogTitle className="flex max-w-[calc(100%-20px)] items-center gap-2 overflow-hidden px-4 py-2 text-sm">
      <Icon
        name={cardType?.icon}
        className="size-4"
        size={16}
        style={{ color: cardType?.color || "#E2E8F0" }}
      />
      <p className="line-clamp-1 flex-1 truncate">
        {cardType?.title} {item?.public_id}
      </p>
    </DialogTitle>
  );
};
