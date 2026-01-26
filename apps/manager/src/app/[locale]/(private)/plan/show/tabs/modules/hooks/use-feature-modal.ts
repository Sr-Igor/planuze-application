import { useEffect, useState } from 'react';

export function useFeatureModal({
    features,
    planFeatures,
    actions,
    currentPlanFeature,
    storePlanFeature,
    storePlanFeatureAction,
    destroyPlanFeatureAction,
    queryClient,
    data
}: any) {
    // Estado do modal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedModule, setSelectedModule] = useState<any>(null);
    const [selectedFeature, setSelectedFeature] = useState<any>(null);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [selectedActions, setSelectedActions] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);
    const [currentPlanFeatureId, setCurrentPlanFeatureId] = useState<string | null>(null);

    // Actions já vinculadas à feature no plano
    const currentActionIds = currentPlanFeature?.plan_feature_actions?.map((pfa: any) => pfa.action_id) || [];

    // Features disponíveis para adicionar ao plano
    const availableFeatures = features.filter(
        (f: any) => f.module_id === selectedModule?.id && !planFeatures.some((pf: any) => pf.feature_id === f.id)
    );

    // Atualizar selectedActions ao abrir o modal de actions
    useEffect(() => {
        if (modalOpen && selectedFeature && currentActionIds.length > 0) {
            setSelectedActions(currentActionIds);
        }
        if (modalOpen && selectedFeature && currentActionIds.length === 0) {
            setSelectedActions([]);
        }
    }, [modalOpen, selectedFeature, currentActionIds.join(',')]);

    useEffect(() => {
        if (modalOpen && !selectedFeature) {
            setSelectedFeatures([]);
        }
    }, [modalOpen, selectedFeature]);

    // Handler para adicionar features ao plano
    const handleAddFeatures = async () => {
        setSaving(true);
        try {
            if (!data) return;
            const results = await Promise.all(
                selectedFeatures.map((featureId: string) =>
                    storePlanFeature.mutateAsync({ feature_id: String(featureId), plan_id: String(data.id) })
                )
            );
            await queryClient.invalidateQueries();
            if (results.length > 0 && selectedFeatures.length > 0) {
                const addedPlanFeature = results[0];
                const addedFeature = features.find((f: any) => f.id === selectedFeatures[0]);
                setSelectedFeature(addedFeature);
                setSelectedFeatures([]);
                setCurrentPlanFeatureId(addedPlanFeature.id);
            } else {
                setModalOpen(false);
            }
        } finally {
            setSaving(false);
        }
    };

    // Handler salvar permissões (actions)
    const handleSaveActions = async () => {
        setSaving(true);
        try {
            const planFeatureId = currentPlanFeatureId || currentPlanFeature?.id;
            if (!planFeatureId) {
                alert('ID da plan_feature não encontrado!');
                return;
            }
            const toAdd = selectedActions.filter((id: string) => !currentActionIds.includes(id));
            const toRemove = currentActionIds.filter((id: string) => !selectedActions.includes(id));
            await Promise.all([
                ...toAdd.map((actionId: string) =>
                    storePlanFeatureAction.mutateAsync({
                        plan_feature_id: String(planFeatureId),
                        action_id: String(actionId)
                    })
                ),
                ...toRemove
                    .map((actionId: string) => {
                        const pfa = currentPlanFeature?.plan_feature_actions?.find(
                            (a: any) => a.action_id === actionId
                        );
                        if (pfa && pfa.id) return destroyPlanFeatureAction.mutateAsync(pfa.id);
                        return null;
                    })
                    .filter((p: any): p is Promise<any> => !!p)
            ]);
            await queryClient.invalidateQueries();
            setModalOpen(false);
            setSelectedFeature(null);
            setSelectedModule(null);
            setCurrentPlanFeatureId(null);
        } finally {
            setSaving(false);
        }
    };

    return {
        modalOpen,
        setModalOpen,
        selectedModule,
        setSelectedModule,
        selectedFeature,
        setSelectedFeature,
        selectedFeatures,
        setSelectedFeatures,
        selectedActions,
        setSelectedActions,
        saving,
        availableFeatures,
        handleAddFeatures,
        handleSaveActions,
        currentPlanFeatureId,
        setCurrentPlanFeatureId
    };
}
