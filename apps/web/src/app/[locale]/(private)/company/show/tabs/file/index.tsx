import { useCompanyFile } from "@repo/api/web";
import { company } from "@repo/types";

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
