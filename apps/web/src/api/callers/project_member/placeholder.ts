import { project_member } from '@/api/generator/types';
import { Pagination } from '@/types/pagination';

export const placeholder: Pagination<project_member> = {
    data: [
        {
            profile_id: '1',
            id: '1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false,
            deletedAt: null,
            project_id: '1',
            company_id: '1'
        },
        {
            profile_id: '2',
            id: '2',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false,
            deletedAt: null,
            project_id: '2',
            company_id: '2'
        },
        {
            profile_id: '3',
            id: '3',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false,
            deletedAt: null,
            project_id: '3',
            company_id: '3'
        },
        {
            profile_id: '4',
            id: '4',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false,
            deletedAt: null,
            project_id: '4',
            company_id: '4'
        },
        {
            profile_id: '5',
            id: '5',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false,
            deletedAt: null,
            project_id: '5',
            company_id: '5'
        }
    ],
    page: 1,
    pages: 1,
    count: 0
};
