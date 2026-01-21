/**
 * Type for cache key generator functions
 */
export type CacheKeyFunction = (filters?: unknown) => string[];

/**
 * Cache keys definition for an entity
 */
export interface EntityCacheKeys {
  index?: CacheKeyFunction;
  show?: CacheKeyFunction;
  trash?: CacheKeyFunction;
}

/**
 * Factory to create cache keys for an entity
 */
export const createEntityCacheKeys = (entityName: string): Required<EntityCacheKeys> => ({
  index: (filters?: unknown) => [entityName, filters ?? {}] as string[],
  show: (id?: unknown) => [`${entityName}_show`, id] as string[],
  trash: (filters?: unknown) => [`${entityName}_trash`, filters ?? {}] as string[],
});

/**
 * Centralized cache keys
 * Each module can add its own keys
 */
export const cacheKeys = {
  // Auth
  auth: {
    hydrate: (cache?: unknown) => ["auth_hydrate", cache],
  },

  // Shared
  action: createEntityCacheKeys("action"),
  chat: {
    ...createEntityCacheKeys("chat"),
    category: () => ["chat_category", "all"],
  },
  cities: createEntityCacheKeys("cities"),
  bank: createEntityCacheKeys("bank"),
  country: createEntityCacheKeys("country"),
  notification: createEntityCacheKeys("notification"),

  // Web Module
  client: createEntityCacheKeys("client"),
  client_contact: createEntityCacheKeys("client_contact"),
  client_document: createEntityCacheKeys("client_document"),
  client_file: createEntityCacheKeys("client_file"),
  client_bank_account: createEntityCacheKeys("client_bank_account"),
  client_address: createEntityCacheKeys("client_address"),

  company: createEntityCacheKeys("company"),
  company_contact: createEntityCacheKeys("company_contact"),
  company_document: createEntityCacheKeys("company_document"),
  company_file: createEntityCacheKeys("company_file"),
  company_config: createEntityCacheKeys("company_config"),
  company_address: createEntityCacheKeys("company_address"),

  cost_center: createEntityCacheKeys("cost_center"),

  integration: createEntityCacheKeys("integration"),
  integration_action: createEntityCacheKeys("integration_action"),

  dashboard: {
    index: (cache?: unknown) => ["dashboard", cache],
    export: (cache?: unknown) => ["dashboard_export", cache],
  },

  invite: {
    ...createEntityCacheKeys("invite"),
    me: (cache?: unknown) => ["invite_me", cache ?? {}],
  },

  level: createEntityCacheKeys("level"),
  level_action: createEntityCacheKeys("level_action"),

  me: createEntityCacheKeys("me"),
  module: createEntityCacheKeys("module"),

  plan: createEntityCacheKeys("plan"),

  profile: createEntityCacheKeys("profile"),
  profile_bonus: createEntityCacheKeys("profile_bonus"),
  profile_contact: createEntityCacheKeys("profile_contact"),
  profile_document: createEntityCacheKeys("profile_document"),
  profile_file: createEntityCacheKeys("profile_file"),
  profile_bank_account: createEntityCacheKeys("profile_bank_account"),
  profile_address: createEntityCacheKeys("profile_address"),
  profile_role: createEntityCacheKeys("profile_role"),

  project: createEntityCacheKeys("project"),
  project_member: createEntityCacheKeys("project_member"),
  project_config: createEntityCacheKeys("project_config"),
  project_allocation: createEntityCacheKeys("project_allocation"),
  project_financial: createEntityCacheKeys("project_financial"),
  project_financial_employees: createEntityCacheKeys("project_financial_employees"),
  project_tool: createEntityCacheKeys("project_tool"),
  project_version: createEntityCacheKeys("project_version"),

  project_kanban: createEntityCacheKeys("project_kanban"),
  project_kanban_cycle: createEntityCacheKeys("project_kanban_cycle"),
  project_kanban_cycle_allocation: createEntityCacheKeys("project_kanban_cycle_allocation"),
  project_kanban_cycle_card: {
    ...createEntityCacheKeys("project_kanban_cycle_card"),
    quickIndex: (filters?: unknown) => ["project_kanban_cycle_card_quick", filters ?? {}] as string[],
  },
  project_kanban_cycle_card_comment: createEntityCacheKeys("project_kanban_cycle_card_comment"),
  project_kanban_cycle_card_file: createEntityCacheKeys("project_kanban_cycle_card_file"),
  project_kanban_cycle_card_read: createEntityCacheKeys("project_kanban_cycle_card_read"),
  project_kanban_cycle_card_type: createEntityCacheKeys("project_kanban_cycle_card_type"),
  project_kanban_cycle_column: createEntityCacheKeys("project_kanban_cycle_column"),
  project_kanban_objective: createEntityCacheKeys("project_kanban_objective"),
  project_kanban_objective_target: createEntityCacheKeys("project_kanban_objective_target"),
  project_kanban_report: createEntityCacheKeys("project_kanban_report"),

  kanban_template: createEntityCacheKeys("kanban_template"),
  kanban_template_card: createEntityCacheKeys("kanban_template_card"),
  kanban_template_card_type: createEntityCacheKeys("kanban_template_card_type"),
  kanban_template_column: createEntityCacheKeys("kanban_template_column"),
  kanban_template_tag: createEntityCacheKeys("kanban_template_tag"),

  role: createEntityCacheKeys("role"),
  states: createEntityCacheKeys("states"),
  subscription: createEntityCacheKeys("subscription"),

  user: createEntityCacheKeys("user"),
  user_two_auth: createEntityCacheKeys("user_two_auth"),
  user_two_auth_code: createEntityCacheKeys("user_two_auth_code"),

  work_type: createEntityCacheKeys("work_type"),
  vectorize: createEntityCacheKeys("vectorize"),
} as const;

export type CacheKeyName = keyof typeof cacheKeys;

export default cacheKeys;
