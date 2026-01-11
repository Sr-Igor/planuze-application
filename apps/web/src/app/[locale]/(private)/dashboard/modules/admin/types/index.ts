import { module } from '@/api/generator/types';

import { IDashboardModule } from '../../types';

export interface ICompanyInfo {
    id: string;
    name: string;
    createdAt: string | Date | null;
    updatedAt: string | Date | null;
    hasAddress: boolean;
    hasDocuments: boolean;
    hasContacts: boolean;
    hasFiles: boolean;
    hasConfig: boolean;
}

export interface IPlanInfo {
    planId: string;
    title: string;
    price: number | null;
    billingModel: string;
    licenses: number | null;
    freeTest: number | null;
    isPopular: boolean;
    order: number;
    icon: string | null;
    featuresCount: number;
}

export interface ISubscriptionInfo {
    subscriptionId: string;
    planId: string;
    planTitle: string;
    status: string;
    model: string;
    startDate: string | Date | null;
    endDate: string | Date | null;
    cancelAtPeriodEnd: boolean;
    canceledAt: string | Date | null;
    isTest: boolean;
    daysOff: number;
}

export interface IUsersInfo {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    totalInvites: number;
    pendingInvites: number;
    acceptedInvites: number;
    refusedInvites: number;
    expiredInvites: number;
}

export interface ILicensesInfo {
    totalLicenses: number | null;
    usedLicenses: number;
    availableLicenses: number | null;
    usagePercentage: number | null;
}

export interface IIntegrationsInfo {
    totalIntegrations: number;
    activeIntegrations: number;
}

export interface IAdminSummary {
    company: ICompanyInfo;
    plans: IPlanInfo[];
    subscriptions: ISubscriptionInfo[];
    users: IUsersInfo;
    licenses: ILicensesInfo;
    integrations: IIntegrationsInfo;
    costCenters: number;
    levels: number;
    workTypes: number;
    roles: number;
    invoices: number;
}

export interface IAdminIndexResponseDTO {
    summary: IAdminSummary;
    metadata: {
        generatedAt: string;
    };
    module?: module;
}

export interface IIndexProps extends IDashboardModule {
    data?: IAdminIndexResponseDTO;
}
