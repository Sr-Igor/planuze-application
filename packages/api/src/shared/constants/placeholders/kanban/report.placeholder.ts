/**
 * Project kanban report placeholder data
 * Used for initial data loading and skeleton states
 */

/**
 * Interface for column distribution data
 */
export interface IColumnDistribution {
  columnTitle: string;
  columnOrder: number;
  color: string | null;
  count: number;
}

/**
 * Interface for cards by type data
 */
export interface ICardsByType {
  type: string;
  icon: string;
  color: string | null;
  count: number;
}

/**
 * Interface for total cards by type with description
 */
export interface ICardsTotalByType {
  type: string;
  icon: string;
  color: string | null;
  total: number;
  description: "principal" | "problem" | "sub_task";
  averageCardsPerCycle: number;
}

/**
 * Interface for cards by priority data
 */
export interface ICardsByPriority {
  priority: number;
  count: number;
}

/**
 * Interface for cards by objective data
 */
export interface ICardsByObjective {
  objective: string;
  count: number;
}

/**
 * Interface for cards by version data
 */
export interface ICardsByVersion {
  version: string;
  count: number;
}

/**
 * Interface for cards by work type data
 */
export interface ICardsByWorkType {
  workType: string;
  count: number;
}

/**
 * Interface for tag distribution data
 */
export interface ITagDistribution {
  tag: string;
  count: number;
}

/**
 * Interface for member stats (ranking)
 */
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

/**
 * Interface for top engaged cards
 */
export interface ITopEngagedCard {
  id: string;
  publicId: number;
  title: string;
  commentsCount: number;
  filesCount: number;
  readsCount: number;
  engagementScore: number;
}

/**
 * Interface for critical cards
 */
export interface ICriticalCard {
  id: string;
  publicId: number;
  title: string;
  priority: number | null;
  daysLate: number;
  assignee: string;
  column: string;
}

/**
 * Interface for time analysis item
 */
export interface ITimeAnalysisItem {
  cardId: string;
  publicId: number;
  title: string;
  leadTime: number;
  estimatedHours: number;
  executedHours: number;
}

/**
 * Interface for cycle stats
 */
export interface ICycleStats {
  cycleId: string;
  cycleTitle: string;
  totalCards: number;
  completedCards: number;
  completionRate: number;
  startDate: Date | null;
  endDate: Date | null;
}

/**
 * Interface for lead time with unit
 */
export interface ILeadTimeWithUnit {
  value: number;
  unit: "d" | "h" | "m";
  formatted: string;
}

/**
 * Interface for summary
 */
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

/**
 * Interface for charts
 */
export interface ICharts {
  cardsByColumn: IColumnDistribution[];
  cardsByType: ICardsByType[];
  cardsByPriority: ICardsByPriority[];
  cardsByObjective: ICardsByObjective[];
  cardsByVersion: ICardsByVersion[];
  cardsByWorkType: ICardsByWorkType[];
  tagDistribution: ITagDistribution[];
}

/**
 * Interface for hours by allocation
 */
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

/**
 * Interface for rankings
 */
export interface IRankings {
  topMembers: IMemberStats[];
  topEngagedCards: ITopEngagedCard[];
  criticalCards: ICriticalCard[];
  cardsTotalByType: ICardsTotalByType[];
  hoursByAllocation: IHoursByAllocation[];
}

/**
 * Interface for time analysis
 */
export interface ITimeAnalysis {
  averageLeadTime: number;
  completedCardsTimeline: ITimeAnalysisItem[];
}

/**
 * Interface for cycle hours analysis
 */
export interface ICycleHoursAnalysis {
  cycleId: string;
  cycleTitle: string;
  startDate: Date | null;
  endDate: Date | null;
  utilDays: number | null;
  availableHours: number;
  maxHours: number;
  totalAvailableHours: number;
  totalMaxHours: number;
  allocatedMembers: number;
  estimatedHours: number;
  executedHours: number;
  wipHours: number;
  allocatedHours: number;
  utilizationRate: number;
  occupancyRate: number;
  capacityUsage: number;
  remainingCapacity: number;
  remainingHours: number;
}

/**
 * Interface for profile hours analysis
 */
export interface IProfileHoursAnalysis {
  profileId: string;
  profileName: string;
  profileAvatar: string | null;
  availableHours: number;
  maxHours: number;
  allocatedHours: number;
  workedHours: number;
  wipHours: number;
  estimatedHours: number;
  productivityRate: number;
  utilizationRate: number;
  maxUtilizationRate: number;
  estimatedRate: number;
  allocationRate: number;
  maxAllocationRate: number;
  idleHours: number;
}

/**
 * Interface for hours analysis
 */
export interface IHoursAnalysis {
  totalAvailableHours: number;
  totalEstimatedHours: number;
  totalExecutedHours: number;
  totalWIPHours: number;
  totalAllocatedHours: number;
  overallUtilizationRate: number;
  overallOccupancyRate: number;
  overallCapacityUsage: number;
  cyclesAnalysis: ICycleHoursAnalysis[];
  profilesAnalysis: IProfileHoursAnalysis[];
}

/**
 * Interface for metadata
 */
export interface IMetadata {
  totalCycles: number;
  generatedAt: string;
}

/**
 * Interface for export info
 */
export interface IExportInfo {
  filename: string;
  buffer: Buffer;
  mimeType: string;
}

/**
 * Interface for complete dashboard response
 */
export interface IKanbanReportResponse {
  summary: ISummary;
  charts: ICharts;
  rankings: IRankings;
  timeAnalysis: ITimeAnalysis;
  hours: IHoursAnalysis;
  cycleStats: ICycleStats[];
  metadata: IMetadata;
  export?: IExportInfo;
}

export const projectKanbanReportPlaceholder: IKanbanReportResponse = {
  summary: {
    totalCards: 150,
    cardsCompleted: 85,
    cardsInProgress: 35,
    cardsLate: 8,
    completionRate: 56.67,
    totalEstimatedHours: 450,
    totalExecutedHours: 380,
    totalWIPHours: 120,
    estimatedVsExecutedPercentage: 84.44,
    averageLeadTime: {
      value: 4.5,
      unit: "d",
      formatted: "4.5 dias",
    },
    cardsTotalByType: [
      {
        type: "Feature",
        icon: "BookOpen",
        color: "#3b82f6",
        total: 65,
        description: "principal",
        averageCardsPerCycle: 13,
      },
      {
        type: "Bug",
        icon: "Bug",
        color: "#ef4444",
        total: 35,
        description: "problem",
        averageCardsPerCycle: 7,
      },
      {
        type: "Task",
        icon: "Task",
        color: "#10b981",
        total: 40,
        description: "sub_task",
        averageCardsPerCycle: 8,
      },
      {
        type: "Improvement",
        icon: "Improvement",
        color: "#f59e0b",
        total: 10,
        description: "principal",
        averageCardsPerCycle: 2,
      },
    ],
  },
  charts: {
    cardsByColumn: [
      { columnTitle: "Backlog", columnOrder: 1, color: "#6b7280", count: 45 },
      { columnTitle: "To Do", columnOrder: 2, color: "#3b82f6", count: 25 },
      { columnTitle: "In Progress", columnOrder: 3, color: "#f59e0b", count: 18 },
      { columnTitle: "Review", columnOrder: 4, color: "#8b5cf6", count: 12 },
      { columnTitle: "Done", columnOrder: 5, color: "#10b981", count: 50 },
    ],
    cardsByType: [
      { type: "Bug", icon: "Bug", color: "#ef4444", count: 35 },
      { type: "Feature", icon: "BookOpen", color: "#3b82f6", count: 65 },
      { type: "Task", icon: "ListTodo", color: "#10b981", count: 40 },
      { type: "Improvement", icon: "Zap", color: "#f59e0b", count: 10 },
    ],
    cardsByPriority: [
      { priority: 1, count: 15 },
      { priority: 2, count: 35 },
      { priority: 3, count: 60 },
      { priority: 4, count: 40 },
    ],
    cardsByObjective: [
      { objective: "Sprint 1 - Q1", count: 40 },
      { objective: "Sprint 2 - Q1", count: 45 },
      { objective: "Sprint 3 - Q2", count: 35 },
      { objective: "Sprint 4 - Q2", count: 30 },
    ],
    cardsByVersion: [
      { version: "v1.0.0", count: 50 },
      { version: "v1.1.0", count: 45 },
      { version: "v1.2.0", count: 35 },
      { version: "v2.0.0", count: 20 },
    ],
    cardsByWorkType: [
      { workType: "Desenvolvimento", count: 70 },
      { workType: "Design", count: 30 },
      { workType: "Testes", count: 25 },
      { workType: "Documentação", count: 15 },
      { workType: "DevOps", count: 10 },
    ],
    tagDistribution: [
      { tag: "Frontend", count: 45 },
      { tag: "Backend", count: 50 },
      { tag: "Database", count: 20 },
      { tag: "API", count: 30 },
      { tag: "Mobile", count: 5 },
    ],
  },
  rankings: {
    topMembers: [
      {
        memberId: "1",
        memberName: "João Silva",
        memberAvatar: "https://i.pravatar.cc/150?img=1",
        totalCards: 35,
        completedCards: 28,
        lateCards: 2,
        totalEstimatedHours: 120,
        totalExecutedHours: 105,
      },
      {
        memberId: "2",
        memberName: "Maria Santos",
        memberAvatar: "https://i.pravatar.cc/150?img=2",
        totalCards: 42,
        completedCards: 32,
        lateCards: 3,
        totalEstimatedHours: 145,
        totalExecutedHours: 130,
      },
      {
        memberId: "3",
        memberName: "Pedro Oliveira",
        memberAvatar: "https://i.pravatar.cc/150?img=3",
        totalCards: 28,
        completedCards: 22,
        lateCards: 1,
        totalEstimatedHours: 95,
        totalExecutedHours: 88,
      },
      {
        memberId: "4",
        memberName: "Ana Costa",
        memberAvatar: "https://i.pravatar.cc/150?img=4",
        totalCards: 31,
        completedCards: 24,
        lateCards: 2,
        totalEstimatedHours: 110,
        totalExecutedHours: 98,
      },
      {
        memberId: "5",
        memberName: "Carlos Souza",
        memberAvatar: "https://i.pravatar.cc/150?img=5",
        totalCards: 25,
        completedCards: 18,
        lateCards: 4,
        totalEstimatedHours: 85,
        totalExecutedHours: 72,
      },
    ],
    topEngagedCards: [
      {
        id: "card-1",
        publicId: 125,
        title: "Implementar autenticação OAuth2",
        commentsCount: 45,
        filesCount: 12,
        readsCount: 180,
        engagementScore: 92.5,
      },
      {
        id: "card-2",
        publicId: 89,
        title: "Refatorar sistema de notificações",
        commentsCount: 32,
        filesCount: 8,
        readsCount: 145,
        engagementScore: 78.3,
      },
      {
        id: "card-3",
        publicId: 156,
        title: "Criar dashboard de analytics",
        commentsCount: 28,
        filesCount: 15,
        readsCount: 132,
        engagementScore: 71.2,
      },
      {
        id: "card-4",
        publicId: 78,
        title: "Otimizar performance do banco de dados",
        commentsCount: 24,
        filesCount: 6,
        readsCount: 118,
        engagementScore: 65.8,
      },
      {
        id: "card-5",
        publicId: 134,
        title: "Implementar testes automatizados",
        commentsCount: 19,
        filesCount: 20,
        readsCount: 105,
        engagementScore: 58.4,
      },
    ],
    criticalCards: [
      {
        id: "critical-1",
        publicId: 45,
        title: "Corrigir falha crítica no sistema de pagamento",
        priority: 1,
        daysLate: 5,
        assignee: "João Silva",
        column: "In Progress",
      },
      {
        id: "critical-2",
        publicId: 78,
        title: "Vulnerabilidade de segurança - SQL Injection",
        priority: 1,
        daysLate: 3,
        assignee: "Maria Santos",
        column: "Review",
      },
      {
        id: "critical-3",
        publicId: 92,
        title: "Erro em produção - dados corrompidos",
        priority: 1,
        daysLate: 2,
        assignee: "Pedro Oliveira",
        column: "In Progress",
      },
      {
        id: "critical-4",
        publicId: 115,
        title: "API timeout causando lentidão",
        priority: 2,
        daysLate: 4,
        assignee: "Ana Costa",
        column: "To Do",
      },
      {
        id: "critical-5",
        publicId: 138,
        title: "Perda de dados em backup automático",
        priority: 2,
        daysLate: 1,
        assignee: "Carlos Souza",
        column: "In Progress",
      },
    ],
    cardsTotalByType: [
      {
        type: "Feature",
        icon: "BookOpen",
        color: "#3b82f6",
        total: 65,
        description: "principal",
        averageCardsPerCycle: 13,
      },
      {
        type: "Bug",
        icon: "Bug",
        color: "#ef4444",
        total: 35,
        description: "problem",
        averageCardsPerCycle: 7,
      },
      {
        type: "Task",
        icon: "Task",
        color: "#10b981",
        total: 40,
        description: "sub_task",
        averageCardsPerCycle: 8,
      },
      {
        type: "Improvement",
        icon: "Improvement",
        color: "#f59e0b",
        total: 10,
        description: "principal",
        averageCardsPerCycle: 2,
      },
    ],
    hoursByAllocation: [
      {
        allocationId: "alloc-1",
        memberAvatar: "https://i.pravatar.cc/150?img=1",
        memberName: "João Silva",
        totalEstimatedHours: 120,
        totalExecutedHours: 105,
        totalWIPHours: 15,
        efficiencyRate: 87.5,
        totalAllocatedHours: 100,
      },
      {
        allocationId: "alloc-2",
        memberAvatar: "https://i.pravatar.cc/150?img=2",
        memberName: "Maria Santos",
        totalEstimatedHours: 145,
        totalExecutedHours: 130,
        totalWIPHours: 20,
        efficiencyRate: 89.7,
        totalAllocatedHours: 120,
      },
      {
        allocationId: "alloc-3",
        memberAvatar: "https://i.pravatar.cc/150?img=3",
        memberName: "Pedro Oliveira",
        totalEstimatedHours: 95,
        totalExecutedHours: 88,
        totalWIPHours: 12,
        efficiencyRate: 92.6,
        totalAllocatedHours: 110,
      },
      {
        allocationId: "alloc-4",
        memberAvatar: "https://i.pravatar.cc/150?img=4",
        memberName: "Ana Costa",
        totalEstimatedHours: 110,
        totalExecutedHours: 98,
        totalWIPHours: 18,
        efficiencyRate: 89.1,
        totalAllocatedHours: 130,
      },
      {
        allocationId: "alloc-5",
        memberAvatar: "https://i.pravatar.cc/150?img=5",
        memberName: "Carlos Souza",
        totalEstimatedHours: 85,
        totalExecutedHours: 72,
        totalWIPHours: 25,
        efficiencyRate: 84.7,
        totalAllocatedHours: 140,
      },
      {
        allocationId: null,
        memberAvatar: null,
        memberName: null,
        noAllocated: true,
        totalEstimatedHours: 35,
        totalExecutedHours: 28,
        totalWIPHours: 7,
        efficiencyRate: 80.0,
        totalAllocatedHours: 0,
      },
    ],
  },
  timeAnalysis: {
    averageLeadTime: 4.5,
    completedCardsTimeline: [
      {
        cardId: "card-101",
        publicId: 101,
        title: "Implementar login social",
        leadTime: 3.2,
        estimatedHours: 16,
        executedHours: 14,
      },
      {
        cardId: "card-102",
        publicId: 102,
        title: "Criar tela de dashboard",
        leadTime: 5.1,
        estimatedHours: 24,
        executedHours: 28,
      },
      {
        cardId: "card-103",
        publicId: 103,
        title: "Configurar CI/CD",
        leadTime: 2.8,
        estimatedHours: 12,
        executedHours: 10,
      },
      {
        cardId: "card-104",
        publicId: 104,
        title: "Implementar notificações push",
        leadTime: 4.5,
        estimatedHours: 20,
        executedHours: 18,
      },
      {
        cardId: "card-105",
        publicId: 105,
        title: "Otimizar queries do banco",
        leadTime: 6.2,
        estimatedHours: 18,
        executedHours: 22,
      },
      {
        cardId: "card-106",
        publicId: 106,
        title: "Adicionar testes unitários",
        leadTime: 3.5,
        estimatedHours: 14,
        executedHours: 12,
      },
      {
        cardId: "card-107",
        publicId: 107,
        title: "Refatorar código legado",
        leadTime: 7.8,
        estimatedHours: 32,
        executedHours: 38,
      },
      {
        cardId: "card-108",
        publicId: 108,
        title: "Implementar paginação",
        leadTime: 2.3,
        estimatedHours: 8,
        executedHours: 7,
      },
      {
        cardId: "card-109",
        publicId: 109,
        title: "Adicionar logs detalhados",
        leadTime: 1.9,
        estimatedHours: 6,
        executedHours: 5,
      },
      {
        cardId: "card-110",
        publicId: 110,
        title: "Corrigir bugs críticos",
        leadTime: 4.8,
        estimatedHours: 16,
        executedHours: 19,
      },
    ],
  },
  cycleStats: [
    {
      cycleId: "1",
      cycleTitle: "Sprint 1 - Q1 2024",
      totalCards: 42,
      completedCards: 28,
      completionRate: 66.67,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-01-15"),
    },
    {
      cycleId: "2",
      cycleTitle: "Sprint 2 - Q1 2024",
      totalCards: 48,
      completedCards: 35,
      completionRate: 72.92,
      startDate: new Date("2024-01-16"),
      endDate: new Date("2024-01-30"),
    },
    {
      cycleId: "3",
      cycleTitle: "Sprint 3 - Q2 2024",
      totalCards: 38,
      completedCards: 22,
      completionRate: 57.89,
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-02-15"),
    },
    {
      cycleId: "4",
      cycleTitle: "Sprint 4 - Q2 2024",
      totalCards: 45,
      completedCards: 32,
      completionRate: 71.11,
      startDate: new Date("2024-02-16"),
      endDate: new Date("2024-03-01"),
    },
    {
      cycleId: "5",
      cycleTitle: "Sprint 5 - Q2 2024",
      totalCards: 50,
      completedCards: 38,
      completionRate: 76.0,
      startDate: new Date("2024-03-02"),
      endDate: new Date("2024-03-16"),
    },
  ],
  hours: {
    totalAvailableHours: 2400,
    totalEstimatedHours: 1800,
    totalExecutedHours: 1520,
    totalWIPHours: 280,
    totalAllocatedHours: 2000,
    overallUtilizationRate: 63.33,
    overallOccupancyRate: 75.0,
    overallCapacityUsage: 83.33,
    cyclesAnalysis: [
      {
        cycleId: "1",
        cycleTitle: "Sprint 1 - Q1 2024",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-15"),
        utilDays: 10,
        availableHours: 480,
        maxHours: 640,
        totalAvailableHours: 2400,
        totalMaxHours: 3200,
        allocatedMembers: 5,
        estimatedHours: 380,
        executedHours: 320,
        wipHours: 60,
        allocatedHours: 400,
        utilizationRate: 13.33,
        occupancyRate: 15.83,
        capacityUsage: 16.67,
        remainingCapacity: 2000,
        remainingHours: 200,
      },
      {
        cycleId: "2",
        cycleTitle: "Sprint 2 - Q1 2024",
        startDate: new Date("2024-01-16"),
        endDate: new Date("2024-01-30"),
        utilDays: 10,
        availableHours: 480,
        maxHours: 640,
        totalAvailableHours: 2880,
        totalMaxHours: 3840,
        allocatedMembers: 6,
        estimatedHours: 400,
        executedHours: 340,
        wipHours: 60,
        allocatedHours: 420,
        utilizationRate: 11.81,
        occupancyRate: 13.89,
        capacityUsage: 14.58,
        remainingCapacity: 2460,
        remainingHours: 200,
      },
      {
        cycleId: "3",
        cycleTitle: "Sprint 3 - Q2 2024",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-02-15"),
        utilDays: 10,
        availableHours: 480,
        maxHours: 640,
        totalAvailableHours: 1920,
        totalMaxHours: 2560,
        allocatedMembers: 4,
        estimatedHours: 350,
        executedHours: 280,
        wipHours: 70,
        allocatedHours: 380,
        utilizationRate: 14.58,
        occupancyRate: 18.23,
        capacityUsage: 19.79,
        remainingCapacity: 1540,
        remainingHours: 200,
      },
      {
        cycleId: "4",
        cycleTitle: "Sprint 4 - Q2 2024",
        startDate: new Date("2024-02-16"),
        endDate: new Date("2024-03-01"),
        utilDays: 10,
        availableHours: 480,
        maxHours: 640,
        totalAvailableHours: 2400,
        totalMaxHours: 3200,
        allocatedMembers: 5,
        estimatedHours: 370,
        executedHours: 300,
        wipHours: 70,
        allocatedHours: 400,
        utilizationRate: 12.5,
        occupancyRate: 15.42,
        capacityUsage: 16.67,
        remainingCapacity: 2000,
        remainingHours: 200,
      },
      {
        cycleId: "5",
        cycleTitle: "Sprint 5 - Q2 2024",
        startDate: new Date("2024-03-02"),
        endDate: new Date("2024-03-16"),
        utilDays: 10,
        availableHours: 480,
        maxHours: 640,
        totalAvailableHours: 2400,
        totalMaxHours: 3200,
        allocatedMembers: 5,
        estimatedHours: 300,
        executedHours: 280,
        wipHours: 20,
        allocatedHours: 400,
        utilizationRate: 11.67,
        occupancyRate: 12.5,
        capacityUsage: 16.67,
        remainingCapacity: 2000,
        remainingHours: 200,
      },
    ],
    profilesAnalysis: [
      {
        profileId: "profile-1",
        profileName: "Desenvolvedor Full Stack",
        profileAvatar: "https://i.pravatar.cc/150?img=11",
        availableHours: 1200,
        maxHours: 1600,
        allocatedHours: 1200,
        workedHours: 800,
        wipHours: 150,
        estimatedHours: 900,
        productivityRate: 66.67,
        utilizationRate: 79.17,
        maxUtilizationRate: 59.38,
        estimatedRate: 133.33,
        allocationRate: 100.0,
        maxAllocationRate: 75.0,
        idleHours: 250,
      },
      {
        profileId: "profile-2",
        profileName: "Designer UX/UI",
        profileAvatar: "https://i.pravatar.cc/150?img=12",
        availableHours: 600,
        maxHours: 800,
        allocatedHours: 600,
        workedHours: 450,
        wipHours: 80,
        estimatedHours: 500,
        productivityRate: 75.0,
        utilizationRate: 88.33,
        maxUtilizationRate: 66.25,
        estimatedRate: 120.0,
        allocationRate: 100.0,
        maxAllocationRate: 75.0,
        idleHours: 70,
      },
      {
        profileId: "profile-3",
        profileName: "QA/Tester",
        profileAvatar: "https://i.pravatar.cc/150?img=13",
        availableHours: 400,
        maxHours: 600,
        allocatedHours: 400,
        workedHours: 270,
        wipHours: 50,
        estimatedHours: 400,
        productivityRate: 67.5,
        utilizationRate: 80.0,
        maxUtilizationRate: 53.33,
        estimatedRate: 100.0,
        allocationRate: 100.0,
        maxAllocationRate: 66.67,
        idleHours: 80,
      },
      {
        profileId: "profile-4",
        profileName: "DevOps",
        profileAvatar: null,
        availableHours: 200,
        maxHours: 400,
        allocatedHours: 200,
        workedHours: 150,
        wipHours: 30,
        estimatedHours: 180,
        productivityRate: 75.0,
        utilizationRate: 90.0,
        maxUtilizationRate: 45.0,
        estimatedRate: 111.11,
        allocationRate: 100.0,
        maxAllocationRate: 50.0,
        idleHours: 20,
      },
    ],
  },
  metadata: {
    totalCycles: 5,
    generatedAt: new Date().toISOString(),
  },
};
