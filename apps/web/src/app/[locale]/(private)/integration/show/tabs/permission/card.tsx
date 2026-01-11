import { memo } from 'react';

import { useIntegrationAction } from '@/api/callers/integration_action';
import { module as TModule, integration_action } from '@/api/generator/types';
import { ModuleWithFeatures } from '@/hooks/access/types';
import { PermissionCard } from '@/templates/permission-card';

export interface ICardFormProps {
    module: TModule;
    companyView: ModuleWithFeatures;
    userView: ModuleWithFeatures;
    access: ModuleWithFeatures | undefined;
    data?: { id: string; integration_actions?: integration_action[] };
    actions: integration_action[];
    handleDirty: (dirty: boolean) => void;
    allowed: boolean;
}

const getActionKey = (featurePath: string, actionTitle?: string) => `${featurePath}:${actionTitle}`;

export const Component = ({
    module,
    companyView,
    access,
    userView,
    actions,
    data,
    handleDirty,
    allowed
}: ICardFormProps) => {
    const { update } = useIntegrationAction({ id: data?.id || '' });

    const handleUpdate = (payload: { module_id: string; actions: Record<string, string[]> }) => {
        update.mutate(payload);
    };

    return (
        <PermissionCard<integration_action>
            module={module}
            companyView={companyView}
            userView={userView}
            access={access}
            actions={actions}
            handleDirty={handleDirty}
            allowed={allowed}
            onUpdate={handleUpdate}
            getActionKey={getActionKey}
            defaultOpen={true}
            showButtons={true}
            onlyIntegrations={true}
            loading={update.isPending}
        />
    );
};

export const CardModule = memo(Component, (prevProps, nextProps) => {
    return (
        prevProps.module.id === nextProps.module.id &&
        prevProps.companyView === nextProps.companyView &&
        prevProps.userView === nextProps.userView &&
        prevProps.access === nextProps.access &&
        JSON.stringify(prevProps.actions) === JSON.stringify(nextProps.actions) &&
        prevProps.data?.id === nextProps.data?.id &&
        prevProps.allowed === nextProps.allowed
    );
});
