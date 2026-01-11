import { module as TModule } from "@repo/api/generator/types";

import { ModuleWithFeatures } from "@/hooks/access/types";

import { PermissionPayload } from "./common";

export * from "./common";
export * from "./components";
export * from "./hooks";
export * from "./services";

export interface IPermissionCardProps<T> {
  module: TModule;
  companyView: ModuleWithFeatures;
  userView: ModuleWithFeatures;
  access: ModuleWithFeatures | undefined;
  actions: T[];
  handleDirty: (dirty: boolean) => void;
  allowed: boolean;
  loading: boolean;

  // Props específicas opcionais
  isAdministrator?: boolean;
  additionalDisabledCondition?: boolean;

  // Callbacks personalizados
  onUpdate: (payload: PermissionPayload) => void;
  getActionKey: (featurePath: string, actionTitle?: string) => string;
  getFeaturePath?: (action: T) => string;
  getActionTitle?: (action: T) => string;

  // Configurações opcionais
  defaultOpen?: boolean;
  showButtons?: boolean;
  customDisabledCondition?: (
    status: string,
    allowed: boolean,
    isAdministrator?: boolean
  ) => boolean;

  onlyIntegrations?: boolean;
}
