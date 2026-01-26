import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import {
  useAction,
  useFeature,
  useModule,
  usePlanFeature,
  usePlanFeatureAction,
} from "@repo/api/manager";

import { usePlanShow } from "../../../context";

export function useModulesData() {
  const { index: actionsIndex } = useAction({ enabledIndex: true });
  const { index: modulesIndex } = useModule({ enabledIndex: true });
  const { index: featuresIndex } = useFeature({ enabledIndex: true });
  const modules = modulesIndex?.data?.data || [];
  const actions = actionsIndex?.data?.data || [];
  const features = featuresIndex?.data?.data || [];

  const { data } = usePlanShow();
  const planFeatures = data?.plan_features || [];

  const { store: storePlanFeature, destroy: destroyPlanFeature } = usePlanFeature({});
  const { store: storePlanFeatureAction, destroy: destroyPlanFeatureAction } = usePlanFeatureAction(
    {}
  );

  const queryClient = useQueryClient();

  // Estados
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  // Agrupamentos
  const featuresByModule = modules.reduce((acc: Record<string, any[]>, mod: any) => {
    acc[mod.id] = features.filter((f: any) => f.module_id === mod.id);
    return acc;
  }, {});

  const planFeaturesByFeature = planFeatures.reduce((acc: Record<string, any>, pf: any) => {
    acc[pf.feature_id] = pf;
    return acc;
  }, {});

  // Função para alternar módulos abertos
  const handleToggleModule = (moduleId: string) => {
    setOpenModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  return {
    modules,
    actions,
    features,
    planFeatures,
    featuresByModule,
    planFeaturesByFeature,
    storePlanFeature,
    storePlanFeatureAction,
    destroyPlanFeatureAction,
    destroyPlanFeature,
    queryClient,
    openModules,
    setOpenModules,
    handleToggleModule,
    data,
  };
}
