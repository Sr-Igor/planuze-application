import { client } from "@repo/types";

import { useClientFile } from "@repo/api/web/callers/client_file";
import { useShow } from "@/templates/show/context";
import { UploadTemplate } from "@/templates/upload";

export const File = () => {
  const { data, permissions, handleState } = useShow<client>();

  return (
    <UploadTemplate
      files={data?.client_files}
      rootData={{
        client_id: data?.id,
      }}
      hookReq={(filters) => useClientFile({ filters })}
      feature="client_file"
      permissions={permissions}
      handleState={handleState}
    />
  );
};
