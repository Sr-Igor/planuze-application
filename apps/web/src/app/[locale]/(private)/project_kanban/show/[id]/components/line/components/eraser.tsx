import { EraserIcon } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui-new";
import { AppTooltip } from "@repo/ui-new";

export interface IEraserProps {
  onClear: () => void;
  disabled: boolean;
}

export const Eraser = ({ onClear, disabled }: IEraserProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <AppTooltip text={t("component.line.clean_filters")}>
      <Button size="sm" variant="destructive" disabled={disabled} onClick={onClear}>
        <EraserIcon className="text-white" />
      </Button>
    </AppTooltip>
  );
};
