import { Copy, FileDown, Filter } from "lucide-react";
import { toast } from "sonner";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";
import { AppTooltip } from "@repo/ui/app";

import { Currency } from "@/components/form/currency";

export interface IHeaderProps {
  onExport: () => void;
  isExporting: boolean;
  onOpenFilters: () => void;
  countFilters: number;
  selectedCurrency?: string;
  onCurrencyChange: (currency: string) => void;
}

export const Header = ({
  onExport,
  isExporting,
  onOpenFilters,
  countFilters,
  selectedCurrency,
  onCurrencyChange,
}: IHeaderProps) => {
  const t = useLang();
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h1 className="text-md hidden font-bold sm:block xl:text-2xl">
          {t.page.dashboard("project.header.title")}
        </h1>
        <p className="text-muted-foreground hidden text-sm xl:block">
          {t.page.dashboard("project.header.description")}
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
          <span className="hidden xl:inline">{t.page.dashboard("project.header.export")}</span>
        </Button>

        <span className="relative">
          <Button
            onClick={onOpenFilters}
            size="sm"
            variant="default"
            disabled={isExporting}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden xl:inline">{t.page.dashboard("project.header.filters")}</span>
          </Button>
          {countFilters > 0 && (
            <span className="absolute -top-1 -right-1 z-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {countFilters > 9 ? "9+" : countFilters}
            </span>
          )}
        </span>

        <AppTooltip text={t.helper("copy_url_with_filters")}>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.info(t.helper("copied"));
            }}
            size="sm"
            variant="secondary"
            className="gap-2"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </AppTooltip>
      </div>
    </div>
  );
};
