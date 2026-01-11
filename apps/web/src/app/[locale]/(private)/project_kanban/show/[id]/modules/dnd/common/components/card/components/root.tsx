import { Card } from "@repo/ui";

import { project_kanban_cycle_card } from "@/api/generator/types";
import { cn } from "@/lib/utils";

export interface IRootProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  card: project_kanban_cycle_card | null;
  selected?: boolean;
  setSelected: (selected: boolean) => void;
  isDragging?: boolean;
  className?: string;
  cardId: string;
  children: React.ReactNode;
  isUnlinked?: boolean;
  loading?: boolean;
  isPlaceholder?: boolean;
  disabled?: boolean;
}

export const Root = ({
  cardRef,
  card,
  selected,
  setSelected,
  isDragging,
  className,
  cardId,
  children,
  isUnlinked,
  loading,
  isPlaceholder,
  disabled,
}: IRootProps) => {
  return (
    <Card
      ref={cardRef}
      id={card?.id}
      data-card-id={cardId}
      className={cn(
        "rounded-sm transition-all duration-200 hover:shadow-md",
        isDragging && "rotate-2 opacity-50 shadow-lg",
        "relative min-h-[150px] overflow-hidden p-3",
        (selected || loading) && "bg-primary/10",
        isUnlinked && "bg-foreground/20 min-h-0",
        isPlaceholder && "h-12 min-h-12",
        "transition-all duration-200 ease-in-out",
        className
      )}
      onClick={() => {
        if (disabled) return;
        setSelected(true);
      }}
    >
      {children}
    </Card>
  );
};
