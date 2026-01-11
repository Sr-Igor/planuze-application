import { profile } from "@repo/api/generator/types";

import { useProfileFile } from "@/api/callers/profile_file";
import { useShow } from "@/templates/show/context";
import { UploadTemplate } from "@/templates/upload";

export const File = () => {
  const { data, permissions, handleState } = useShow<profile>();

  return (
    <UploadTemplate
      files={data?.profile_files || []}
      rootData={{
        profile_id: data?.id,
      }}
      hookReq={(filters) => useProfileFile({ filters })}
      feature="profile_file"
      permissions={permissions}
      handleState={handleState}
    />
  );
};
