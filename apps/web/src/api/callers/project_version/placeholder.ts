import { project_version } from '@/api/generator/types';
import { Pagination } from '@/types/pagination';

export const placeholder: Pagination<project_version> = {
    data: [
        {
            id: '1',
            name: '1',
            version: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false,
            owner_id: '1',
            deletedAt: null,
            project_id: '1',
            company_id: '1',
            original_start_date: new Date().toISOString(),
            original_end_date: new Date().toISOString(),
            real_start_date: new Date().toISOString(),
            real_end_date: new Date().toISOString()
        },

        {
            id: '2',
            name: '2',
            version: 2,
            owner_id: '2',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false,
            deletedAt: null,
            project_id: '2',
            company_id: '2',
            original_start_date: new Date().toISOString(),
            original_end_date: new Date().toISOString(),
            real_start_date: new Date().toISOString(),
            real_end_date: new Date().toISOString()
        },
        {
            id: '3',
            name: '3',
            version: 3,
            owner_id: '3',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false,
            deletedAt: null,
            project_id: '3',
            company_id: '3',
            original_start_date: new Date().toISOString(),
            original_end_date: new Date().toISOString(),
            real_start_date: new Date().toISOString(),
            real_end_date: new Date().toISOString()
        },
        {
            id: '4',
            name: '4',
            version: 4,
            owner_id: '4',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false,
            deletedAt: null,
            project_id: '4',
            company_id: '4',
            original_start_date: new Date().toISOString(),
            original_end_date: new Date().toISOString(),
            real_start_date: new Date().toISOString(),
            real_end_date: new Date().toISOString()
        },
        {
            id: '5',
            name: '5',
            version: 5,
            owner_id: '5',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false,
            deletedAt: null,
            project_id: '5',
            company_id: '5',
            original_start_date: new Date().toISOString(),
            original_end_date: new Date().toISOString(),
            real_start_date: new Date().toISOString(),
            real_end_date: new Date().toISOString()
        }
    ],
    page: 1,
    pages: 1,
    count: 0
};
