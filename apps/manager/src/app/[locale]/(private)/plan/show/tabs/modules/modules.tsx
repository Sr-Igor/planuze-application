import React, { useState } from "react";

import { Loader2 } from "lucide-react";

import { ScrollArea } from "@repo/ui";

import { ActionsModal } from "./components/actions-modal";
import { FeatureModal } from "./components/feature-modal";
import { ModuleList } from "./components/module-list";
import { useFeatureModal } from "./hooks/use-feature-modal";
import { useModulesData } from "./hooks/use-modules-data";

export const Modules = () => {
  const {
    modules,
    actions,
    features,
    planFeatures,
    featuresByModule,
    planFeaturesByFeature,
    storePlanFeature,
    storePlanFeatureAction,
    destroyPlanFeatureAction,
    queryClient,
    openModules,
    handleToggleModule,
    data,
    destroyPlanFeature,
  } = useModulesData();

  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [selectedModule, setSelectedModule] = useState<any>(null);

  // Estados separados para cada modal
  const [featureModalOpen, setFeatureModalOpen] = useState(false);
  const [actionsModalOpen, setActionsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Para feedback global

  const currentPlanFeature = selectedFeature
    ? planFeatures.find((pf: any) => pf.feature_id === selectedFeature.id)
    : null;

  // Hook do modal de features
  const featureModal = useFeatureModal({
    features,
    planFeatures,
    actions,
    currentPlanFeature: null, // Não precisa para adicionar features
    storePlanFeature,
    storePlanFeatureAction,
    destroyPlanFeatureAction,
    queryClient,
    data,
  });

  // Hook do modal de actions
  const actionsModal = useFeatureModal({
    features,
    planFeatures,
    actions,
    currentPlanFeature,
    storePlanFeature,
    storePlanFeatureAction,
    destroyPlanFeatureAction,
    queryClient,
    data,
  });

  // Sincronizar selectedModule do modal de features
  React.useEffect(() => {
    featureModal.setSelectedModule(selectedModule);
  }, [selectedModule]);

  // Sincronizar selectedFeature/selectedModule do modal de actions
  React.useEffect(() => {
    actionsModal.setSelectedFeature(selectedFeature);
    actionsModal.setSelectedModule(selectedModule);
  }, [selectedFeature, selectedModule]);

  // Função para remover uma feature do plano e suas actions, com feedback visual
  const handleDeleteFeature = async (planFeature: any) => {
    if (!planFeature) return;
    setLoading(true);
    try {
      // Remove todas as plan_feature_actions primeiro
      if (planFeature.plan_feature_actions && planFeature.plan_feature_actions.length > 0) {
        await Promise.all(
          planFeature.plan_feature_actions.map((pfa: any) =>
            destroyPlanFeatureAction.mutateAsync(pfa.id)
          )
        );
      }
      // Depois remove a plan_feature
      await destroyPlanFeature.mutateAsync(planFeature.id);
      await queryClient.invalidateQueries();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative space-y-4">
      {/* Spinner global de loading */}
      {loading && (
        <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-zinc-900/60">
          <Loader2 className="text-primary h-10 w-10 animate-spin" />
        </div>
      )}

      <ScrollArea className="max-h-[60vh] pr-2">
        <ModuleList
          modules={modules}
          featuresByModule={featuresByModule}
          planFeaturesByFeature={planFeaturesByFeature}
          openModules={openModules}
          onToggleModule={handleToggleModule}
          onAddFeature={(module) => {
            setSelectedModule(module);
            setSelectedFeature(null);
            setFeatureModalOpen(true);
          }}
          onEditActions={(module, feature) => {
            setSelectedModule(module);
            setSelectedFeature(feature);
            setActionsModalOpen(true);
          }}
          onDeleteFeature={handleDeleteFeature}
          companyIdPlano={data?.company_id ?? undefined}
        />
      </ScrollArea>

      <FeatureModal
        open={featureModalOpen}
        onOpenChange={(open) => {
          setFeatureModalOpen(open);
          if (!open) {
            setSelectedModule(null);
          }
        }}
        selectedModule={featureModal.selectedModule}
        availableFeatures={featureModal.availableFeatures}
        selectedFeatures={featureModal.selectedFeatures}
        setSelectedFeatures={featureModal.setSelectedFeatures}
        saving={featureModal.saving}
        handleAddFeatures={async () => {
          setLoading(true);
          try {
            await featureModal.handleAddFeatures();
            setFeatureModalOpen(false);
          } finally {
            setLoading(false);
          }
        }}
      />

      <ActionsModal
        open={actionsModalOpen}
        onOpenChange={(open) => {
          setActionsModalOpen(open);
          if (!open) {
            setSelectedFeature(null);
            setSelectedModule(null);
          }
        }}
        selectedFeature={planFeatures.find(
          (pf: any) => pf.feature_id === actionsModal.selectedFeature?.id
        )}
        selectedModule={actionsModal.selectedModule}
        actions={actions}
        feature={actionsModal.selectedFeature}
        selectedActions={actionsModal.selectedActions}
        setSelectedActions={actionsModal.setSelectedActions}
        saving={actionsModal.saving}
        handleSaveActions={async () => {
          setLoading(true);
          try {
            await actionsModal.handleSaveActions();
            setActionsModalOpen(false);
          } finally {
            setLoading(false);
          }
        }}
      />
    </div>
  );
};
