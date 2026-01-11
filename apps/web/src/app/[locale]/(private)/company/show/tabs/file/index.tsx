import { company } from "@repo/api/generator/types";

import { useCompanyFile } from "@/api/callers/company_file";
import { useShow } from "@/templates/show/context";
import { UploadTemplate } from "@/templates/upload";

export const File = () => {
  const { data, permissions, handleState } = useShow<company>();

  return (
    <UploadTemplate
      files={data?.company_files || []}
      rootData={{
        company_id: data?.id,
      }}
      hookReq={(filters) => useCompanyFile({ filters })}
      feature="company_file"
      permissions={permissions}
      handleState={handleState}
    />
  );
};
