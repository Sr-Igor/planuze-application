import { FileDown } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";

import { Currency } from "@repo/form";

export interface IHeaderProps {
  onExport: () => void;
  isExporting: boolean;
  selectedCurrency?: string;
  onCurrencyChange: (currency: string) => void;
}

export const Header = ({
  onExport,
  isExporting,
  selectedCurrency,
  onCurrencyChange,
}: IHeaderProps) => {
  const t = useLang();
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h1 className="text-md hidden font-bold sm:block xl:text-2xl">
          {t.page.dashboard("personal.header.title")}
        </h1>
        <p className="text-muted-foreground hidden text-sm xl:block">
          {t.page.dashboard("personal.header.description")}
        </p>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Currency
          value={selectedCurrency}
          onChange={onCurrencyChange}
          disabled={isExporting}
          showSelectedName={true}
        />
        <Button
          onClick={onExport}
          size="sm"
          variant="outline"
          loading={isExporting}
          className="gap-2"
        >
          <FileDown className="h-4 w-4" />
          <span className="hidden xl:inline">{t.page.dashboard("personal.header.export")}</span>
        </Button>
      </div>
    </div>
  );
};
