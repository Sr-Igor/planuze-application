import { project_kanban } from '@/api/generator/types';
import { Pagination } from '@/types/pagination';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';

export type ISelectReturnProps = UseInfiniteQueryResult<InfiniteData<Pagination<any>, unknown>, Error>;

export type ISelectProps = {
    search?: string | null;
    kanban?: project_kanban | null;
};
