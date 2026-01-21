import { useLang } from "@repo/language/hooks";

import { IProjectIndexResponseDTO } from "../types";

export interface IMetadataProps {
  metadata: IProjectIndexResponseDTO["metadata"];
  currencyMetadata: IProjectIndexResponseDTO["currencyMetadata"];
}

export const Metadata = ({ metadata, currencyMetadata }: IMetadataProps) => {
  const t = useLang();
  return (
    <div className="text-muted-foreground mt-8 text-center text-sm">
      <p>
        {t.page.dashboard("project.metadata.generated_at")}{" "}
        {new Date(metadata.generatedAt).toLocaleString("pt-BR")}
      </p>
      {metadata.dateRange.start && metadata.dateRange.end && (
        <p>
          {t.page.dashboard("project.metadata.period")}:{" "}
          {new Date(metadata.dateRange.start).toLocaleDateString("pt-BR")} -{" "}
          {new Date(metadata.dateRange.end).toLocaleDateString("pt-BR")}
        </p>
      )}
      {currencyMetadata?.conversionApplied && currencyMetadata?.targetCurrency && (
        <p>
          {t.page.dashboard("project.metadata.conversion_applied")}:{" "}
          {currencyMetadata.targetCurrency}
        </p>
      )}
      <p>
        {t.page.dashboard("project.metadata.total_projects")}: {metadata.totalProjects}
      </p>
    </div>
  );
};
