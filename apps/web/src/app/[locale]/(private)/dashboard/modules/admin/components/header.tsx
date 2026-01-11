import { FileDown } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";

export interface IHeaderProps {
  onExport: () => void;
  isExporting: boolean;
}

export const Header = ({ onExport, isExporting }: IHeaderProps) => {
  const t = useLang();
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h1 className="text-md hidden font-bold sm:block xl:text-2xl">
          {t.page.dashboard("admin.header.title")}
        </h1>
        <p className="text-muted-foreground hidden text-sm xl:block">
          {t.page.dashboard("admin.header.description")}
        </p>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button
          onClick={onExport}
          size="sm"
          variant="outline"
          loading={isExporting}
          className="gap-2"
        >
          <FileDown className="h-4 w-4" />
          <span className="hidden xl:inline">{t.page.dashboard("admin.header.export")}</span>
        </Button>
      </div>
    </div>
  );
};
