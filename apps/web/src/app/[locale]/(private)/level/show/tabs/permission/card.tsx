import { memo } from "react";

import { useLevelAction } from "@repo/api/web";
import { level_action, module as TModule } from "@repo/types";

import { ModuleWithFeatures } from "@/hooks/access/types";
import { PermissionCard } from "@/templates/permission-card";

export interface ICardFormProps {
  module: TModule;
  companyView: ModuleWithFeatures;
  userView: ModuleWithFeatures;
  access: ModuleWithFeatures | undefined;
  data?: { id: string; level_actions?: level_action[] };
  actions: level_action[];
  handleDirty: (dirty: boolean) => void;
  isAdministrator: boolean;
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
  isAdministrator,
  allowed,
}: ICardFormProps) => {
  const { update } = useLevelAction({ id: data?.id || "" });

  const handleUpdate = (payload: { module_id: string; actions: Record<string, string[]> }) => {
    update.mutate(payload);
  };

  return (
    <PermissionCard<level_action>
      module={module}
      companyView={companyView}
      userView={userView}
      access={access}
      actions={actions}
      loading={update.isPending}
      handleDirty={handleDirty}
      allowed={allowed}
      isAdministrator={isAdministrator}
      onUpdate={handleUpdate}
      getActionKey={getActionKey}
      defaultOpen={false}
      showButtons={true}
      customDisabledCondition={(status, allowed, isAdministrator) =>
        status !== "active" || isAdministrator || !allowed
      }
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
    prevProps.isAdministrator === nextProps.isAdministrator &&
    prevProps.allowed === nextProps.allowed
  );
});
