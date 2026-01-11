import { useTranslations } from 'next-intl';

export const useLang = () => {
    const parser = (key: string) => {
        const t = useTranslations(key);

        return (value: string, options?: Record<string, any>) => {
            let item = value;

            item = t(value, options);
            const isEquals = item === (key ? `${key}.${value}` : value);
            if (isEquals) item = (item.split('.').pop() || '')?.replaceAll('_', ' ');
            return item;
        };
    };

    const rootTranslations = {
        calendar: parser('calendar'),
        chat: parser('chat'),
        editor: parser('editor'),
        error: parser('error'),
        helper: parser('helper'),
        logs: parser('logs'),
        modal: parser('modal'),
        model: parser('model'),
        module: parser('module'),
        navBar: useTranslations('navBar'),
        notification: parser('notification'),
        permission: parser('permission'),
        property: parser('property'),
        requirement: parser('requirement'),
        tooltip: parser('tooltip'),
        warning: parser('warning'),
        zod: parser('zod')
    };

    const pageTranslations = {
        client: parser('page.client'),
        code: parser('page.code'),
        company: parser('page.company'),
        company_config: parser('page.company_config'),
        cost_center: parser('page.cost_center'),
        dashboard: parser('page.dashboard'),
        integration: parser('page.integration'),
        invite: parser('page.invite'),
        kanban: parser('page.kanban'),
        kanban_template: parser('page.kanban_template'),
        kanban_template_card_type: parser('page.kanban_template_card_type'),
        kanban_template_tag: parser('page.kanban_template_tag'),
        level: parser('page.level'),
        login: parser('page.login'),
        lp: parser('page.lp'),
        me: parser('page.me'),
        my_profile: parser('page.my_profile'),
        plans: parser('page.plans'),
        profile: parser('page.profile'),
        project: parser('page.project'),
        project_kanban: parser('page.project_kanban'),
        project_kanban_objective: parser('page.project_kanban_objective'),
        recovery: parser('page.recovery'),
        reset: parser('page.reset'),
        role: parser('page.role'),
        subscription: parser('page.subscription'),
        two_auth: parser('page.two_auth'),
        welcome: parser('page.welcome'),
        work_type: parser('page.work_type')
    };

    return {
        ...rootTranslations,
        page: pageTranslations
    };
};
