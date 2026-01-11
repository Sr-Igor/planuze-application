import { project_financial_employees } from '@/api/generator/types';
import { Pagination } from '@/types/pagination';

export const placeholder: Pagination<project_financial_employees> = {
    data: [
        {
            id: '1',
            project_financial_id: '1',
            role_id: '1',
            quantity: 1,
            company_id: '1',
            project_id: '1',
            unit_value: 100,
            currency: 'BRL',
            deleted: false,
            deletedAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: '2',
            project_financial_id: '2',
            role_id: '2',
            quantity: 2,
            company_id: '2',
            project_id: '2',
            unit_value: 100,
            currency: 'BRL',
            deleted: false,
            deletedAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: '3',
            project_financial_id: '3',
            role_id: '3',
            quantity: 3,
            company_id: '3',
            project_id: '3',
            unit_value: 100,
            currency: 'BRL',
            deleted: false,
            deletedAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: '4',
            project_financial_id: '4',
            role_id: '4',
            quantity: 4,
            company_id: '4',
            project_id: '4',
            unit_value: 100,
            currency: 'BRL',
            deleted: false,
            deletedAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: '5',
            project_financial_id: '5',
            role_id: '5',
            quantity: 5,
            company_id: '5',
            project_id: '5',
            unit_value: 100,
            currency: 'BRL',
            deleted: false,
            deletedAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ],
    page: 1,
    pages: 1,
    count: 0
};
