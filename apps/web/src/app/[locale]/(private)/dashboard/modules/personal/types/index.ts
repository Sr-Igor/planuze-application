import { module } from "@repo/types";

import { IDashboardModule } from "../../types";

type DateType = string | Date | null;

export interface QueryFilters {
  start_date?: Date | string;
  end_date?: Date | string;
  projectIds?: string[];
}
export interface IProfileInfo {
  companyEntryDate: DateType;
  timeInCompany: {
    years: number;
    months: number;
    days: number;
    totalDays: number;
  };
  profileCreatedAt: DateType;
  profileUpdatedAt: DateType;
}

// ============================================================================
// Financial Evolution Types
// ============================================================================

export interface IFinancialEvolutionPoint {
  date: string;
  month: string;
  year: number;
  totalSalary: number;
  totalBonuses: number;
  totalCompensation: number;
  currency: string;
  roles: Array<{
    roleId: string;
    roleName: string | null;
    amount: number;
  }>;
  bonuses: Array<{
    bonusId: string;
    bonusName: string | null;
    amount: number;
  }>;
}

export interface IFinancialEvolution {
  data: IFinancialEvolutionPoint[];
  currency: string;
  totalPeriods: number;
  averageSalary: number;
  averageBonuses: number;
  averageCompensation: number;
  highestCompensation: number;
  lowestCompensation: number;
}

export interface IFinancialEvolutionPointResponse {
  date: string;
  month: string;
  year: number;
  totalSalary: number;
  totalBonuses: number;
  totalCompensation: number;
  currency: string;
  roles: Array<{
    roleId: string;
    roleName: string | null;
    amount: number;
  }>;
  bonuses: Array<{
    bonusId: string;
    bonusName: string | null;
    amount: number;
  }>;
}

export interface IFinancialEvolutionResponse {
  data: IFinancialEvolutionPointResponse[];
  currency: string;
  totalPeriods: number;
  averageSalary: number;
  averageBonuses: number;
  averageCompensation: number;
  highestCompensation: number;
  lowestCompensation: number;
}

// ============================================================================
// Summary Types
// ============================================================================

export interface IPersonalSummary {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalAllocations: number;
  activeAllocations: number;
  totalHoursWorked: number;
  totalHoursAllocated: number;
  totalCards: number;
  pendingCards: number;
  completedCards: number;
  totalComments: number;
  unreadCards: number;
}

export interface IFinancialInfo {
  // Valores proporcionais (o que já foi recebido até hoje)
  proportional: {
    totalCompensation: number;
    baseSalary: number;
    totalBonuses: number;
  };
  // Valores integrais (o que será recebido no total)
  integral: {
    totalCompensation: number;
    baseSalary: number;
    totalBonuses: number;
  };
  roles: Array<{
    roleId: string;
    roleName: string | null;
    costCenterName: string | null;
    salary_proportional: number;
    salary_integral: number;
    currency: string;
  }>;
  bonuses: Array<{
    bonusId: string;
    bonusName: string | null;
    costCenterName: string | null;
    amount_proportional: number;
    amount_integral: number;
    currency: string;
  }>;
  currency: string;
}

export interface IProjectActivity {
  projectId: string;
  projectName: string;
  versionName?: string;
  role: string;
  status: "active" | "completed" | "pending";
  startDate: Date | null;
  endDate: Date | null;
  allocatedHours: number;
  workedHours: number;
  progress: number;
}

export interface IPersonalIndexResponseDTO {
  profile: {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    userAvatar: string | null;
    level: string | null;
    companyName: string;
  };
  profileInfo: IProfileInfo;
  summary: IPersonalSummary;
  financial: IFinancialInfo;
  financialEvolution: IFinancialEvolutionResponse;
  projects: IProjectActivity[];
  metadata: {
    generatedAt: string;
    dateRange?: {
      start: string | null;
      end: string | null;
    };
  };
  currencyMetadata?: {
    availableCurrencies: string[];
    conversionApplied?: boolean;
    targetCurrency?: string;
  };
  module?: module;
}

export interface IIndexProps extends IDashboardModule {
  data?: IPersonalIndexResponseDTO;
}
