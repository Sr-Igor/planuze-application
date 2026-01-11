import { Plus } from "lucide-react";

import { useLang } from "@repo/language/hook";

interface ActionButtonsProps {
  editing: boolean;
  selectedLength: number;
  onStartEditing: () => void;
}

export function ActionButtons({ editing, selectedLength, onStartEditing }: ActionButtonsProps) {
  const t = useLang();
  if (editing) return null;

  if (selectedLength === 0) {
    return (
      <span
        onClick={onStartEditing}
        className="text-foreground bg-secondary hover:bg-secondary/80 cursor-pointer rounded-md px-2 py-1 text-[11px] font-semibold"
      >
        {t.helper("new_tag")}
      </span>
    );
  }

  return (
    <span
      onClick={onStartEditing}
      className="text-foreground bg-secondary hover:bg-secondary/80 cursor-pointer rounded-md px-1.5 py-1.5 text-[11px] font-semibold"
    >
      <Plus size={13} />
    </span>
  );
}
