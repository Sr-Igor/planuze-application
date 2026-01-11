import { module } from "@repo/api/generator/types";

import { IDashboardModule } from "../../types";

export interface QueryFilters {
  project_id?: string[];
  owner_id?: string[];
  project_version_id?: string[];
  work_type_id?: string[];
  cost_center_id?: string[];
  start_date?: Date | string;
  end_date?: Date | string;
  export?: boolean;
}

export interface ICurrencyValues {
  totalBudget: number;
  totalCost: number;
  totalRevenue: number;
}

export interface IFinancialSummary {
  totalBudget: number;
  totalCost: number;
  totalRevenue: number;
  profitMargin: number;
  budgetVariance: number;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  lateProjects: number;
  valuesByCurrency?: Record<string, ICurrencyValues>;
  valuesConverted?: {
    currency: string;
    totalBudget: number;
    totalCost: number;
    totalRevenue: number;
  };
}

export interface IProjectFinancial {
  projectId: string;
  projectName: string;
  versionName: string;
  budget: number;
  actualCost: number;
  revenue: number;
  profit: number;
  profitMargin: number;
  budgetVariance: number;
  estimatedDuration: number;
  actualDuration: number;
  durationVariance: number;
  status: "active" | "completed" | "late" | "on_schedule";
  progress: number;
  // Currency information
  currencies?: string[];
  valuesByCurrency?: Record<
    string,
    {
      budget: number;
      actualCost: number;
      revenue: number;
      profit: number;
    }
  >;
}

export interface ICostBreakdown {
  category: string;
  planned: number;
  executed?: number;
}

export interface IEmployeeCost {
  isGlobal: boolean;
  simultaneousProjects: number;
  profileId: string;
  profileName: string;
  roleName: string;
  allocatedHours: number;
  hourlyRateUtil?: number;
  hourlyRateTotal?: number;
  totalCost: number;
  bonuses: number;
  totalCompensation: number;
}

export interface ITimelineAnalysis {
  projectId: string;
  projectName: string;
  versionName: string;
  plannedStartDate: Date | null;
  plannedEndDate: Date | null;
  actualStartDate: Date | null;
  actualEndDate: Date | null;
  daysPlanned: number;
  daysActual: number;
  daysDeviation: number;
  isLate: boolean;
}

export interface ICostCenterAnalysis {
  costCenterId: string;
  costCenterName: string;
  totalAllocated: number;
  totalSpent: number;
  projectsCount: number;
  employeesCount: number;
}

export interface IWorkTypeAnalysis {
  workTypeId: string;
  workTypeName: string;
  totalBudget: number;
  totalCost: number;
  projectsCount: number;
  averageCostPerProject: number;
}

export interface IProfitabilityMetrics {
  roiPercentage: number;
  roiAmount: number;
  costEfficiencyRate: number;
  revenuePerHour: number;
  costPerHour: number;
  breakEvenPoint: number;
}

export interface IExportInfo {
  filename: string;
  buffer: Buffer;
  mimeType: string;
}

export interface IIndexResponseDTO {
  summary: IFinancialSummary;
  projects: IProjectFinancial[];
  costBreakdown: ICostBreakdown[];
  employeeCosts: IEmployeeCost[];
  timeline: ITimelineAnalysis[];
  costCenters: ICostCenterAnalysis[];
  workTypes: IWorkTypeAnalysis[];
  profitability: IProfitabilityMetrics;
  metadata: {
    totalProjects: number;
    dateRange: {
      start: string | null;
      end: string | null;
    };
    generatedAt: string;
  };
  currencyMetadata?: {
    availableCurrencies: string[];
    conversionApplied?: boolean;
    targetCurrency?: string;
  };
  export?: IExportInfo;
  module?: module;
}

export interface IIndexProps extends IDashboardModule {
  data?: IIndexResponseDTO;
}
