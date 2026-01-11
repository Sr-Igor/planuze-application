export default {
    auth: {
        hydrate: (cache?: any) => ['auth_hydrate', cache]
    },
    action: {
        index: (cache?: any) => ['action', cache]
    },
    chat: {
        index: (cache?: any) => ['chat', cache],
        show: (cache?: any) => ['chat_show', cache],
        category: () => ['chat_category', 'all']
    },
    cities: {
        index: (cache?: any) => ['cities', cache]
    },
    bank: {
        index: (cache?: any) => ['bank', cache]
    },
    client: {
        index: (cache?: any) => ['client', cache],
        show: (cache?: any) => ['client_show', cache],
        trash: (cache?: any) => ['client_trash', cache]
    },
    client_contact: {
        trash: (cache?: any) => ['client_contact_trash', cache]
    },
    client_document: {
        trash: (cache?: any) => ['client_document_trash', cache]
    },
    client_file: {
        trash: (cache?: any) => ['client_file_trash', cache]
    },
    client_bank_account: {
        index: (cache?: any) => ['client_bank_account_index', cache],
        trash: (cache?: any) => ['client_bank_account_trash', cache]
    },
    client_address: {},
    company: {
        show: (cache?: any) => ['company_show', cache]
    },
    company_contact: {
        trash: (cache?: any) => ['company_contact_trash', cache]
    },
    company_document: {
        trash: (cache?: any) => ['company_document_trash', cache]
    },
    company_file: {
        trash: (cache?: any) => ['company_file_trash', cache]
    },
    company_config: {
        show: (cache?: any) => ['company_config_show', cache]
    },
    cost_center: {
        index: (cache?: any) => ['cost_center', cache],
        trash: (cache?: any) => ['cost_center_trash', cache]
    },
    company_address: {},
    country: {
        index: (cache?: any) => ['country', cache]
    },
    integration: {
        index: (cache?: any) => ['integration', cache],
        show: (cache?: any) => ['integration_show', cache],
        trash: (cache?: any) => ['integration_trash', cache]
    },
    dashboard: {
        index: (cache?: any) => ['dashboard', cache],
        export: (cache?: any) => ['dashboard_export', cache]
    },
    invite: {
        index: (cache?: any) => ['invite', cache],
        me: (cache?: any) => ['invite_me', cache || {}],
        trash: (cache?: any) => ['invite_trash', cache]
    },
    level: {
        index: (cache?: any) => ['level', cache],
        show: (cache?: any) => ['level_show', cache],
        trash: (cache?: any) => ['level_trash', cache]
    },
    me: {
        show: (cache?: any) => ['me_show', cache]
    },
    module: {
        index: (cache?: any) => ['module', cache]
    },
    notification: {
        index: (cache?: any) => ['notification', cache]
    },
    plan: {
        index: (cache?: any) => ['plan', cache]
    },
    profile: {
        index: (cache?: any) => ['profile', cache],
        show: (cache?: any) => ['profile_show', cache],
        trash: (cache?: any) => ['profile_trash', cache]
    },
    profile_bonus: {
        trash: (cache?: any) => ['profile_bonus_trash', cache]
    },
    profile_contact: {
        trash: (cache?: any) => ['profile_contact_trash', cache]
    },
    profile_document: {
        trash: (cache?: any) => ['profile_document_trash', cache]
    },
    profile_file: {
        trash: (cache?: any) => ['profile_file_trash', cache]
    },
    profile_role: {
        trash: (cache?: any) => ['profile_role_trash', cache]
    },
    profile_address: {},
    profile_bank_account: {
        index: (cache?: any) => ['profile_bank_account_index', cache],
        trash: (cache?: any) => ['profile_bank_account_trash', cache]
    },
    project: {
        index: (cache?: any) => ['project', cache],
        show: (cache?: any) => ['project_show', cache],
        trash: (cache?: any) => ['project_trash', cache]
    },
    project_version: {
        index: (cache?: any) => ['project_version', cache],
        show: (cache?: any) => ['project_version_show', cache],
        trash: (cache?: any) => ['project_version_trash', cache]
    },
    project_config: {
        index: (cache?: any) => ['project_config', cache],
        trash: (cache?: any) => ['project_config_trash', cache]
    },
    project_tool: {
        index: (cache?: any) => ['project_tool', cache],
        trash: (cache?: any) => ['project_tool_trash', cache]
    },
    project_financial: {
        index: (cache?: any) => ['project_financial', cache],
        show: (cache?: any) => ['project_financial_show', cache],
        trash: (cache?: any) => ['project_financial_trash', cache]
    },
    project_financial_employees: {
        index: (cache?: any) => ['project_financial_employees', cache],
        show: (cache?: any) => ['project_financial_employees_show', cache],
        trash: (cache?: any) => ['project_financial_employees_trash', cache]
    },
    project_member: {
        index: (cache?: any) => ['project_member', cache],
        trash: (cache?: any) => ['project_member_trash', cache]
    },
    project_kanban: {
        index: (cache?: any) => ['project_kanban', cache],
        show: (cache?: any) => ['project_kanban_show', cache],
        trash: (cache?: any) => ['project_kanban_trash', cache]
    },
    project_kanban_cycle: {
        index: (cache?: any) => ['project_kanban_cycle', cache],
        show: (cache?: any) => ['project_kanban_cycle_show', cache],
        trash: (cache?: any) => ['project_kanban_cycle_trash', cache]
    },
    project_kanban_cycle_column: {
        index: (cache?: any) => ['project_kanban_cycle_column', cache],
        trash: (cache?: any) => ['project_kanban_cycle_column_trash', cache]
    },
    project_kanban_cycle_card_type: {
        index: (cache?: any) => ['project_kanban_cycle_card_type', cache],
        trash: (cache?: any) => ['project_kanban_cycle_card_type_trash', cache]
    },
    project_kanban_cycle_card: {
        quickIndex: (cache?: any) => ['project_kanban_cycle_card_quick_index', cache],
        index: (cache?: any) => ['project_kanban_cycle_card', cache],
        trash: (cache?: any) => ['project_kanban_cycle_card_trash', cache],
        show: (cache?: any) => ['project_kanban_cycle_card_show', cache]
    },
    project_kanban_cycle_allocation: {
        index: (cache?: any) => ['project_kanban_cycle_allocation', cache],
        trash: (cache?: any) => ['project_kanban_cycle_allocation_trash', cache]
    },
    role: {
        index: (cache?: any) => ['role', cache],
        trash: (cache?: any) => ['role_trash', cache]
    },
    state: {
        index: (cache?: any) => ['state', cache]
    },
    subscription: {
        index: (cache?: any) => ['subscription', cache]
    },
    work_type: {
        index: (cache?: any) => ['work_type', cache],
        trash: (cache?: any) => ['work_type_trash', cache]
    },
    kanban_template: {
        index: (cache?: any) => ['kanban_template', cache],
        show: (cache?: any) => ['kanban_template_show', cache],
        trash: (cache?: any) => ['kanban_template_trash', cache]
    },
    kanban_template_column: {
        index: (cache?: any) => ['kanban_template_column', cache],
        trash: (cache?: any) => ['kanban_template_column_trash', cache]
    },
    kanban_template_card: {
        index: (cache?: any) => ['kanban_template_card', cache],
        trash: (cache?: any) => ['kanban_template_card_trash', cache]
    },
    kanban_template_card_type: {
        index: (cache?: any) => ['kanban_template_card_type', cache],
        trash: (cache?: any) => ['kanban_template_card_type_trash', cache]
    },
    kanban_template_tag: {
        index: (cache?: any) => ['kanban_template_tag', cache],
        trash: (cache?: any) => ['kanban_template_tag_trash', cache]
    },
    project_kanban_cycle_card_file: {
        trash: (cache?: any) => ['project_kanban_cycle_card_file_trash', cache]
    },
    project_kanban_objective: {
        index: (cache?: any) => ['project_kanban_objective', cache],
        show: (cache?: any) => ['project_kanban_objective_show', cache],
        trash: (cache?: any) => ['project_kanban_objective_trash', cache]
    },
    project_kanban_objective_target: {
        index: (cache?: any) => ['project_kanban_objective_target', cache],
        trash: (cache?: any) => ['project_kanban_objective_target_trash', cache]
    },
    project_kanban_report: {
        index: (cache?: any) => ['project_kanban_report', cache],
        export: (cache?: any) => ['project_kanban_report_export', cache]
    },
    project_allocation: {
        index: (cache?: any) => ['project_allocation', cache],
        trash: (cache?: any) => ['project_allocation_trash', cache]
    }
};
