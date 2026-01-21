/**
 * Admin dashboard placeholder data
 * Used for initial data loading and skeleton states
 */

const now = new Date();
const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);

export const adminDashboardPlaceholder: any = {
  summary: {
    company: {
      id: "1",
      name: "Intelipro",
      createdAt: oneYearAgo.toISOString(),
      updatedAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      hasAddress: true,
      hasDocuments: true,
      hasContacts: true,
      hasFiles: true,
      hasConfig: true,
    },
    plans: [
      {
        planId: "1",
        title: "Plano Empresarial",
        price: 999.99,
        billingModel: "monthly",
        licenses: 50,
        freeTest: 14,
        isPopular: true,
        order: 1,
        icon: "Building",
        featuresCount: 25,
      },
      {
        planId: "2",
        title: "Plano Profissional",
        price: 499.99,
        billingModel: "monthly",
        licenses: 20,
        freeTest: 7,
        isPopular: false,
        order: 2,
        icon: "Briefcase",
        featuresCount: 15,
      },
    ],
    subscriptions: [
      {
        subscriptionId: "1",
        planId: "1",
        planTitle: "Plano Empresarial",
        status: "active",
        model: "monthly",
        startDate: sixMonthsAgo.toISOString(),
        endDate: new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false,
        canceledAt: null,
        isTest: false,
        daysOff: 0,
      },
    ],
    users: {
      totalUsers: 45,
      activeUsers: 38,
      inactiveUsers: 7,
      refusedInvites: 5,
      totalInvites: 60,
      pendingInvites: 5,
      acceptedInvites: 50,
      expiredInvites: 5,
    },
    licenses: {
      totalLicenses: 50,
      usedLicenses: 45,
      availableLicenses: 5,
      usagePercentage: 90,
    },
    integrations: {
      totalIntegrations: 8,
      activeIntegrations: 6,
    },
    costCenters: 12,
    levels: 5,
    workTypes: 8,
    roles: 15,
    invoices: 24,
  },
  metadata: {
    generatedAt: now.toISOString(),
  },
};
