// Tipagem dos dados de coluna
export interface IColumnDistribution {
    columnTitle: string;
    columnOrder: number;
    color: string | null;
    count: number;
}

// Tipagem dos dados de tipo de card
export interface ICardsByType {
    type: string;
    icon: string;
    color: string | null;
    count: number;
}

// Tipagem para total de cards por tipo com descrição
export interface ICardsTotalByType {
    type: string;
    icon: string;
    color: string | null;
    total: number;
    description: 'principal' | 'problem' | 'sub_task';
    averageCardsPerCycle: number;
}

// Tipagem dos dados de prioridade
export interface ICardsByPriority {
    priority: number;
    count: number;
}

// Tipagem dos dados de objetivo
export interface ICardsByObjective {
    objective: string;
    count: number;
}

// Tipagem dos dados de versão
export interface ICardsByVersion {
    version: string;
    count: number;
}

// Tipagem dos dados de tipo de trabalho
export interface ICardsByWorkType {
    workType: string;
    count: number;
}

// Tipagem dos dados de distribuição de tags
export interface ITagDistribution {
    tag: string;
    count: number;
}

// Tipagem dos dados de membro (ranking)
export interface IMemberStats {
    memberId: string;
    memberName: string;
    memberAvatar: string | null;
    totalCards: number;
    completedCards: number;
    lateCards: number;
    totalEstimatedHours: number;
    totalExecutedHours: number;
}

// Tipagem dos dados de cards engajados
export interface ITopEngagedCard {
    id: string;
    publicId: number;
    title: string;
    commentsCount: number;
    filesCount: number;
    readsCount: number;
    engagementScore: number;
}

// Tipagem dos dados de cards críticos
export interface ICriticalCard {
    id: string;
    publicId: number;
    title: string;
    priority: number | null;
    daysLate: number;
    assignee: string;
    column: string;
}

// Tipagem dos dados de análise de tempo
export interface ITimeAnalysisItem {
    cardId: string;
    publicId: number;
    title: string;
    leadTime: number;
    estimatedHours: number;
    executedHours: number;
}

// Tipagem dos dados de estatísticas por cycle
export interface ICycleStats {
    cycleId: string;
    cycleTitle: string;
    totalCards: number;
    completedCards: number;
    completionRate: number;
    startDate: Date | null;
    endDate: Date | null;
}

// Resumo geral do dashboard
export interface ISummary {
    totalCards: number;
    cardsCompleted: number;
    cardsInProgress: number;
    cardsLate: number;
    completionRate: number;
    totalEstimatedHours: number;
    totalExecutedHours: number;
    totalWIPHours: number;
    estimatedVsExecutedPercentage: number;
    averageLeadTime: ILeadTimeWithUnit;
    cardsTotalByType: ICardsTotalByType[];
}

// Gráficos de distribuição
export interface ICharts {
    cardsByColumn: IColumnDistribution[];
    cardsByType: ICardsByType[];
    cardsByPriority: ICardsByPriority[];
    cardsByObjective: ICardsByObjective[];
    cardsByVersion: ICardsByVersion[];
    cardsByWorkType: ICardsByWorkType[];
    tagDistribution: ITagDistribution[];
}

// Tipagem dos dados de horas por alocação
export interface IHoursByAllocation {
    allocationId: string | null;
    memberName: string | null;
    memberAvatar: string | null;
    noAllocated?: boolean;
    totalEstimatedHours: number;
    totalExecutedHours: number;
    totalWIPHours: number;
    totalAllocatedHours: number;
    efficiencyRate: number;
}

// Rankings
export interface IRankings {
    topMembers: IMemberStats[];
    topEngagedCards: ITopEngagedCard[];
    criticalCards: ICriticalCard[];
    cardsTotalByType: ICardsTotalByType[];
    hoursByAllocation: IHoursByAllocation[];
}

// Análise de tempo
export interface ITimeAnalysis {
    averageLeadTime: number;
    completedCardsTimeline: ITimeAnalysisItem[];
}

// Horas - Análise de capacidade e utilização
export interface ICycleHoursAnalysis {
    cycleId: string;
    cycleTitle: string;
    startDate: Date | null;
    endDate: Date | null;
    utilDays: number | null;
    availableHours: number; // utilDays * util_hour_day do project_config (por pessoa)
    maxHours: number; // utilDays * total_hour_day (jornada completa por pessoa)
    totalAvailableHours: number; // availableHours * número de membros alocados (total)
    totalMaxHours: number; // maxHours * número de membros alocados (total)
    allocatedMembers: number; // Número de membros únicos alocados no ciclo
    estimatedHours: number; // Total estimado dos cards
    executedHours: number; // Total executado dos cards
    wipHours: number; // Total WIP dos cards
    allocatedHours: number; // Total alocado nas allocations
    utilizationRate: number; // executedHours / totalAvailableHours * 100
    occupancyRate: number; // estimatedHours / totalAvailableHours * 100
    capacityUsage: number; // allocatedHours / totalAvailableHours * 100
    remainingCapacity: number; // totalAvailableHours - allocatedHours
    remainingHours: number;
}

export interface IProfileHoursAnalysis {
    profileId: string;
    profileName: string;
    profileAvatar: string | null;
    availableHours: number; // Horas disponíveis baseadas em util_hour_day dos cycles onde está alocado
    maxHours: number; // Horas máximas baseadas em total_hour_day dos cycles (jornada completa)
    allocatedHours: number; // Horas alocadas nas project_kanban_cycle_allocations
    workedHours: number; // Horas executadas nos cards deste profile
    wipHours: number; // Horas WIP nos cards deste profile
    estimatedHours: number; // Horas estimadas nos cards deste profile
    productivityRate: number; // workedHours / availableHours * 100
    utilizationRate: number; // (workedHours + wipHours) / availableHours * 100
    maxUtilizationRate: number; // (workedHours + wipHours) / maxHours * 100
    estimatedRate: number; // allocatedHours / estimatedHours * 100 (taxa de estimativas)
    allocationRate: number; // allocatedHours / availableHours * 100 (taxa de alocação)
    maxAllocationRate: number; // allocatedHours / maxHours * 100 (taxa de alocação máxima)
    idleHours: number; // availableHours - (workedHours + wipHours)
}

export interface IHoursAnalysis {
    totalAvailableHours: number; // Soma de todas as horas disponíveis dos cycles
    totalEstimatedHours: number; // Soma de todas as horas estimadas
    totalExecutedHours: number; // Soma de todas as horas executadas
    totalWIPHours: number; // Soma de todas as horas WIP
    totalAllocatedHours: number; // Soma de todas as horas alocadas
    overallUtilizationRate: number; // totalExecutedHours / totalAvailableHours * 100
    overallOccupancyRate: number; // totalEstimatedHours / totalAvailableHours * 100
    overallCapacityUsage: number; // totalAllocatedHours / totalAvailableHours * 100
    cyclesAnalysis: ICycleHoursAnalysis[];
    profilesAnalysis: IProfileHoursAnalysis[];
}

// Metadata
export interface IMetadata {
    totalCycles: number;
    generatedAt: string;
}

// Informações de exportação
export interface IExportInfo {
    filename: string;
    buffer: Buffer;
    mimeType: string;
}

// Resposta completa do dashboard
export interface IIndexResponseDTO {
    summary: ISummary;
    charts: ICharts;
    rankings: IRankings;
    timeAnalysis: ITimeAnalysis;
    hours: IHoursAnalysis;
    cycleStats: ICycleStats[];
    metadata: IMetadata;
    export?: IExportInfo;
}

/**
 * Interface para lead time formatado com unidade
 */
export interface ILeadTimeWithUnit {
    value: number;
    unit: 'd' | 'h' | 'm';
    formatted: string;
}
