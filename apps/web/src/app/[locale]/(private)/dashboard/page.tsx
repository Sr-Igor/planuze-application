"use client";

import { useDashboard } from "@repo/api/web";
import { useSearchParams } from "@repo/hooks";
import { useUserAuth } from "@repo/redux/hooks";

import { Loader } from "./components/Loader";
import { schema } from "./constants/schema";
import Admin from "./modules/admin";
import type { IAdminIndexResponseDTO } from "./modules/admin/types";
import Default from "./modules/default";
import Personal from "./modules/personal";
import type { IPersonalIndexResponseDTO } from "./modules/personal/types";
import Project from "./modules/project";
import type { IProjectIndexResponseDTO } from "./modules/project/types";

type UnionDashboardData = IProjectIndexResponseDTO &
  IPersonalIndexResponseDTO &
  IAdminIndexResponseDTO;

export default function Dashboard() {
  const { module } = useUserAuth();

  const { setParams, params, resetParams } = useSearchParams({
    schema,
    replace: true,
    scroll: false,
  });

  const { index, exported } = useDashboard<UnionDashboardData>({
    moduleId: module?.id,
    filters: params,
  });

  const modules = {
    project: Project,
    personal: Personal,
    financial: Default,
    human: Default,
    admin: Admin,
    integration: Default,
    commercial: Default,
  };

  const handleResetFilters = () => {
    if (module?.title === "project") {
      resetParams({ project_tab: params.project_tab });
    } else if (module?.title === "personal") {
      resetParams({ personal_tab: params.personal_tab });
    } else {
      resetParams({});
    }
  };

  const Module = modules?.[module?.title as keyof typeof modules] || Loader;

  return (
    <div className="relative flex h-[calc(100vh-68px)] items-center justify-center overflow-hidden">
      <Module
        data={index.data as UnionDashboardData}
        filters={params}
        setFilters={setParams}
        resetFilters={handleResetFilters}
        isLoading={index.isLoading}
        isExporting={exported.isPending}
        handleExport={() => exported.mutate()}
      />
    </div>
  );
}
