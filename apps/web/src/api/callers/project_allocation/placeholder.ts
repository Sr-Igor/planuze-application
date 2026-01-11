import { project_allocation } from '@/api/generator/types';
import { Pagination } from '@/types/pagination';

export const placeholder: Pagination<project_allocation> = {
    data: [
        {
            id: '1',
            start_date: new Date().toISOString(),
            end_date: new Date().toISOString(),
            profile_id: '1',
            project_version_id: '1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false,
            deletedAt: null,
            project_id: '1',
            company_id: '1'
        },
        {
            id: '2',
            start_date: new Date().toISOString(),
            end_date: new Date().toISOString(),
            profile_id: '2',
            project_version_id: '2',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false,
            deletedAt: null,
            project_id: '2',
            company_id: '2'
        },
        {
            id: '3',
            start_date: new Date().toISOString(),
            end_date: new Date().toISOString(),
            profile_id: '3',
            project_version_id: '3',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false,
            deletedAt: null,
            project_id: '3',
            company_id: '3'
        },
        {
            id: '4',
            start_date: new Date().toISOString(),
            end_date: new Date().toISOString(),
            profile_id: '4',
            project_version_id: '4',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false,
            deletedAt: null,
            project_id: '4',
            company_id: '4'
        },
        {
            id: '5',
            start_date: new Date().toISOString(),
            end_date: new Date().toISOString(),
            profile_id: '5',
            project_version_id: '5',
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
