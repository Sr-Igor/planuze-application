import { useProjectKanbanCycleCardFile } from '@/api/callers/project_kanban_cycle_card_file';
import { project_kanban_cycle_card } from '@/api/generator/types';
import { useAccess } from '@/hooks/access';
import { UploadTemplate } from '@/templates/upload';

import { useKanbanShow } from '../../../../../context';

export interface IUploadProps {
    item?: project_kanban_cycle_card;
}

export const Upload = ({ item }: IUploadProps) => {
    const { permissions } = useAccess();
    const perm = permissions('project_kanban_cycle_card_file');

    const { unload } = useKanbanShow();
    return (
        <UploadTemplate
            files={item?.project_kanban_cycle_card_files || []}
            rootData={{
                project_kanban_cycle_card_id: item?.id,
                project_id: item?.project_id
            }}
            hookReq={(filters) => useProjectKanbanCycleCardFile({ filters })}
            feature='project_kanban_cycle_card_file'
            permissions={perm}
            handleState={({ dirty, loading }) => {
                unload.handleState({
                    feature: 'card',
                    dirty: !!dirty || !!loading,
                    modes: ['upload']
                });
            }}
        />
    );
};
