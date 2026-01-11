import { useClientFile } from '@/api/callers/client_file';
import { client } from '@/api/generator/types';
import { useShow } from '@/templates/show/context';
import { UploadTemplate } from '@/templates/upload';

export const File = () => {
    const { data, permissions, handleState } = useShow<client>();

    return (
        <UploadTemplate
            files={data?.client_files}
            rootData={{
                client_id: data?.id
            }}
            hookReq={(filters) => useClientFile({ filters })}
            feature='client_file'
            permissions={permissions}
            handleState={handleState}
        />
    );
};
