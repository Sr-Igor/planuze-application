import { useLang } from "@repo/language/hooks";

import { IPersonalIndexResponseDTO } from "../types";

export interface IMetadataProps {
  metadata: IPersonalIndexResponseDTO["metadata"];
  currencyMetadata: IPersonalIndexResponseDTO["currencyMetadata"];
}

export const Metadata = ({ metadata, currencyMetadata }: IMetadataProps) => {
  const t = useLang();
  return (
    <div className="text-muted-foreground mt-8 text-center text-sm">
      <p>
        {t.page.dashboard("personal.metadata.generated_at")}{" "}
        {new Date(metadata.generatedAt).toLocaleString("pt-BR")}
      </p>
      {metadata.dateRange?.start && metadata.dateRange?.end && (
        <p>
          {t.page.dashboard("personal.metadata.period")}:{" "}
          {new Date(metadata.dateRange.start).toLocaleDateString("pt-BR")} -{" "}
          {new Date(metadata.dateRange.end).toLocaleDateString("pt-BR")}
        </p>
      )}
      {currencyMetadata?.conversionApplied && currencyMetadata?.targetCurrency && (
        <p>
          {t.page.dashboard("personal.metadata.conversion_applied")}{" "}
          {currencyMetadata.targetCurrency}
        </p>
      )}
    </div>
  );
};
