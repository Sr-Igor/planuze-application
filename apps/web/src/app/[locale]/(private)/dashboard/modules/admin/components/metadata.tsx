import { useLang } from "@repo/language/hook";

import { IAdminIndexResponseDTO } from "../types";

export interface IMetadataProps {
  metadata: IAdminIndexResponseDTO["metadata"];
}

export const Metadata = ({ metadata }: IMetadataProps) => {
  const t = useLang();
  return (
    <div className="text-muted-foreground mt-8 text-center text-sm">
      <p>
        {t.page.dashboard("admin.metadata.generated_at")}{" "}
        {new Date(metadata.generatedAt).toLocaleString("pt-BR")}
      </p>
    </div>
  );
};
