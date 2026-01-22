import { useCallback, useMemo, useState } from "react";

import { useModule } from "@repo/api/web";
import { useUnload } from "@repo/hooks";
import { level, level_action, module } from "@repo/types";

import { useShow } from "@/templates/show/context";

import { CardModule } from "./card";

export const Permission = () => {
  const [dirtyModules, setDirtyModules] = useState<Record<string, boolean>>({});

  const { index } = useModule();
  const modules: module[] = index?.data?.data || [];

  const { data, handleState, companyView, userView, access, permissions } = useShow<level>();

  const isAdministrator = !!data?.administrator;
  const canEdit = data?.id ? permissions.update : permissions.store;

  const isOverallDirty = useMemo(() => {
    return Object.values(dirtyModules).some((isModuleDirty) => isModuleDirty);
  }, [dirtyModules]);

  const handleModuleDirty = useCallback((moduleId: string, isDirty: boolean) => {
    setDirtyModules((prev) => ({
      ...prev,
      [moduleId]: isDirty,
    }));
  }, []);

  useUnload(
    isOverallDirty,
    useCallback(
      (dirtyState: boolean) => {
        handleState({ dirty: dirtyState });
      },
      [handleState]
    )
  );

  return (
    <div className="flex flex-col gap-4 px-1 sm:px-5">
      {modules.map((module, idx) => {
        if (module.basic || module.integration) return null;

        const companyModuleView = companyView?.[module.id];
        const userModuleView = userView?.[module.id];
        const moduleAccess = access?.[module.id];

        const moduleActions =
          data?.level_actions?.filter(
            (item: level_action) => item.feature?.module_id === module.id
          ) || [];

        return (
          <CardModule
            key={module.id}
            handleDirty={(isDirtyForModule) => handleModuleDirty(module.id, isDirtyForModule)}
            data={data}
            module={module}
            companyView={companyModuleView}
            userView={userModuleView}
            access={moduleAccess}
            actions={moduleActions}
            isAdministrator={isAdministrator}
            allowed={canEdit}
          />
        );
      })}
    </div>
  );
};
