import { profile } from '@/api/generator/types';
import { useShow } from '@/templates/show/context';
import { UploadTemplate } from '@/templates/upload';

export const File = () => {
    const { data, permissions } = useShow<profile>();

    return (
        <UploadTemplate
            files={data?.profile_files || []}
            rootData={{}}
            feature='profile_file'
            permissions={permissions}
        />
    );
};
