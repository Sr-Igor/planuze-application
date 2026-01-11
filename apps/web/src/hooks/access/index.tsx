import { useCallback, useMemo } from "react";

import { usePathname } from "next/navigation";

import { addDays, differenceInDays, isAfter, isBefore } from "date-fns";

import { useLang } from "@repo/language/hook";

import { module, profile, subscription, user } from "@/api/generator/types";

import { useAuth } from "../auth";
import type { AccessView, FeatureWithActions, Warning } from "./types";

export const useAccess = (): IAccess => {
  const t = useLang();

  const { profile, module, modules, user, actions, hasProfile, activeSubscription } = useAuth();

  const pathname = usePathname();

  const subscription = profile?.company?.subscriptions?.[0] as subscription;

  const companyView = useMemo((): AccessView => {
    const planFeatures = subscription?.subscription_plan?.subscription_plan_features ?? [];
    const view: AccessView = {};

    for (const planFeature of planFeatures) {
      const module = planFeature?.feature?.module;
      if (!module?.id) continue;

      if (!view[module.id]) {
        view[module.id] = {
          title: module.title,
          icon: module.icon,
          features: [],
        };
      }

      // Só adicionar features que não têm referência
      if (!planFeature.feature?.reference) {
        view[module.id].features.push({
          ...planFeature.feature,
          actions: (planFeature.subscription_plan_feature_actions?.map(
            (action) => action.action?.title
          ) ?? []) as string[],
        });
      }
    }

    // Depois, processar features com referência herdando as permissões
    for (const planFeature of planFeatures) {
      const module = planFeature?.feature?.module;
      if (!module?.id || !planFeature.feature?.reference) continue;

      const referencedFeature = view[module.id]?.features.find(
        (f) => f.path === planFeature.feature?.reference
      );

      if (referencedFeature) {
        // Herdar as ações da feature referenciada
        const inheritedActions = [...referencedFeature.actions];

        // Adicionar as ações específicas da feature atual se houver
        const specificActions =
          planFeature.subscription_plan_feature_actions
            ?.map((action) => action.action?.title)
            .filter((title): title is string => !!title) ?? [];
        const allActions = [...new Set([...inheritedActions, ...specificActions])];

        view[module.id].features.push({
          ...planFeature.feature,
          actions: allActions,
        });
      } else {
        // Mesmo se a feature referenciada não existir, adicionar a feature com suas próprias ações
        const specificActions =
          planFeature.subscription_plan_feature_actions
            ?.map((action) => action.action?.title)
            .filter((title): title is string => !!title) ?? [];

        if (specificActions.length > 0) {
          view[module.id].features.push({
            ...planFeature.feature,
            actions: specificActions,
          });
        } else {
          // Se não tem ações próprias e a referência não existe, adicionar com ações vazias
          // para que possa ser processada pelo userView
          view[module.id].features.push({
            ...planFeature.feature,
            actions: [],
          });
        }
      }
    }

    return view;
  }, [profile]);

  const userView = useMemo((): AccessView => {
    const levelActions = profile?.level?.level_actions ?? [];
    const view: AccessView = {};

    // Primeiro, processar todas as features sem referência
    for (const levelAction of levelActions) {
      const module = levelAction?.feature?.module;
      const feature = levelAction?.feature;
      const actionTitle = levelAction?.action?.title;

      if (!module?.id || !feature || !actionTitle) continue;

      if (!view[module.id]) {
        view[module.id] = {
          title: module.title,
          icon: module.icon,
          features: [],
        };
      }

      // Só processar features que não têm referência
      if (!feature.reference) {
        const existingFeature = view[module.id].features.find((f) => f.path === feature.path);

        if (existingFeature) {
          if (!existingFeature.actions.includes(actionTitle)) {
            existingFeature.actions.push(actionTitle);
          }
        } else {
          view[module.id].features.push({
            ...feature,
            actions: [actionTitle],
          });
        }
      }
    }

    // Depois, processar features com referência herdando as permissões
    for (const levelAction of levelActions) {
      const module = levelAction?.feature?.module;
      const feature = levelAction?.feature;
      const actionTitle = levelAction?.action?.title;

      if (!module?.id || !feature || !actionTitle || !feature.reference) continue;

      const referencedFeature = view[module.id]?.features.find((f) => f.path === feature.reference);

      if (referencedFeature) {
        // Herdar todas as ações da feature referenciada
        const inheritedActions = [...referencedFeature.actions];

        // Adicionar a ação específica da feature atual se não estiver já incluída
        if (!inheritedActions.includes(actionTitle)) {
          inheritedActions.push(actionTitle);
        }

        const existingFeature = view[module.id].features.find((f) => f.path === feature.path);

        if (existingFeature) {
          // Mesclar as ações existentes com as herdadas
          const allActions = [...new Set([...existingFeature.actions, ...inheritedActions])];
          existingFeature.actions = allActions;
        } else {
          view[module.id].features.push({
            ...feature,
            actions: inheritedActions,
          });
        }
      }
    }

    return view;
  }, [profile]);

  const access = useMemo((): AccessView => {
    const finalAccess: AccessView = {};

    for (const moduleId in companyView) {
      const companyModule = companyView[moduleId];
      const userModule = userView[moduleId];

      const moduleInfo = modules.find((m) => m.id === moduleId);
      const isBasicModule = moduleInfo?.basic;

      if (isBasicModule) {
        const allFeatures: FeatureWithActions[] = companyModule.features.map((feature) => ({
          ...feature,
          actions: [...feature.actions],
        }));

        if (allFeatures.length > 0) {
          allFeatures.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

          finalAccess[moduleId] = {
            title: companyModule.title,
            icon: companyModule.icon,
            basic: moduleInfo.basic,
            features: allFeatures,
          };
        }
      } else {
        if (!userModule) continue;

        const effectiveFeatures: FeatureWithActions[] = [];

        for (const userFeature of userModule.features) {
          const companyFeature = companyModule.features.find((cf) => cf.path === userFeature.path);

          if (companyFeature) {
            const allowedActions = userFeature.actions.filter((action) =>
              companyFeature.actions.includes(action)
            );

            if (allowedActions.length > 0) {
              effectiveFeatures.push({
                ...userFeature,
                actions: allowedActions,
              });
            }
          }
        }

        // Adicionar features do companyView que não estão no userView mas têm referência
        for (const companyFeature of companyModule.features) {
          if (
            companyFeature.reference &&
            !effectiveFeatures.find((f) => f.path === companyFeature.path)
          ) {
            // Verificar se a feature referenciada tem permissões no userView
            const referencedUserFeature = userModule.features.find(
              (f) => f.path === companyFeature.reference
            );
            if (referencedUserFeature) {
              effectiveFeatures.push({
                ...companyFeature,
                actions: companyFeature.actions,
              });
            }
          }
        }

        if (effectiveFeatures.length > 0) {
          effectiveFeatures.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

          finalAccess[moduleId] = {
            ...userModule,
            basic: moduleInfo?.basic,
            features: effectiveFeatures,
          };
        }
      }
    }

    return finalAccess;
  }, [userView, companyView, modules]);

  const canAccessCurrentRoute = useMemo(() => {
    if (!module?.id) return false;

    const pathItem = pathname.split("/")[2];
    const action = pathname.split("/")[3] || "index";

    const feature = access[module?.id]?.features.find((f) => f.path === pathItem);

    if (feature?.actions.includes(action)) {
      return true;
    }

    // Se a feature tem referência, verificar se a feature referenciada tem a permissão
    if (feature?.reference) {
      const referencedFeature = access[module?.id]?.features.find(
        (f) => f.path === feature.reference
      );
      return referencedFeature?.actions.includes(action) ?? false;
    }

    return false;
  }, [profile, module?.id, pathname]);

  const modulesWithAccess = useMemo(() => {
    const pathItem = pathname.split("/")[2];
    const action = pathname.split("/")[3] || "index";

    const allowedModuleIds = Object.keys(access).filter((id) => {
      const feature = access[id]?.features.find((feature) => feature.path === pathItem);

      if (feature?.actions.includes(action)) {
        return true;
      }

      // Se a feature tem referência, verificar se a feature referenciada tem a permissão
      if (feature?.reference) {
        const referencedFeature = access[id]?.features.find((f) => f.path === feature.reference);
        return referencedFeature?.actions.includes(action) ?? false;
      }

      return false;
    });

    return modules.filter((module) => allowedModuleIds.includes(module.id));
  }, [access, modules, pathname]);

  const base = useMemo(() => {
    return actions?.reduce(
      (acc, action) => {
        acc[action.title] = false;
        return acc;
      },
      {} as Record<string, boolean>
    );
  }, [actions]);

  const permissions = useCallback(
    (feature?: string) => {
      const pathItem = feature || pathname.split("/")[2];

      if (!pathItem || !module?.id) return base;

      const currentFeature = access[module?.id]?.features.find(
        (feature) => feature.path === pathItem
      );
      let actions = currentFeature?.actions;

      // Se a feature tem referência e não tem ações próprias, usar as ações da feature referenciada
      if (currentFeature?.reference && (!actions || actions.length === 0)) {
        const referencedFeature = access[module?.id]?.features.find(
          (f) => f.path === currentFeature.reference
        );
        actions = referencedFeature?.actions;
      }

      if (!actions?.length) return base;

      return actions?.reduce(
        (acc, action) => {
          if (action in base) {
            acc[action as keyof typeof base] = true;
          }
          return acc;
        },
        { ...base }
      );
    },
    [access, module?.id, pathname, actions]
  );

  const warning: Warning | undefined = useMemo(() => {
    const subscription = profile?.company?.subscriptions?.[0];

    const endDate = new Date(subscription?.end_date ?? "");
    const today = new Date();

    if (subscription?.status === "deleted") {
      return {
        type: "error",
        title: t.warning("subscription_canceled.title"),
        description: t.warning("subscription_canceled.description"),
        locked: true,
      };
    } else if (subscription?.is_test) {
      if (isAfter(today, endDate)) {
        return {
          type: "error",
          title: t.warning("test_expired.title"),
          description: t.warning("test_expired.description"),
          locked: true,
        };
      } else if (isBefore(today, endDate)) {
        const daysLeft = differenceInDays(endDate, today);
        const MIN_DAYS_TO_RENEW = 3;

        if (daysLeft <= MIN_DAYS_TO_RENEW) {
          return {
            type: "info",
            title: t.warning("test_ending.title"),
            description: t.warning("test_ending.description", { days: daysLeft }),
            locked: false,
          };
        }
      }
    } else if (isAfter(today, addDays(endDate, 1))) {
      const daysOff = subscription?.days_off ?? 0;
      const maxDate = addDays(endDate, daysOff);
      const daysLeft = differenceInDays(maxDate, today);

      if (isBefore(today, maxDate)) {
        return {
          type: "warning",
          title: t.warning("subscription_not_renewed.title"),
          description: t.warning("subscription_not_renewed.description", { days: daysLeft }),
          locked: false,
        };
      } else {
        return {
          type: "error",
          title: t.warning("subscription_expired.title"),
          description: t.warning("subscription_expired.description"),
          locked: true,
        };
      }
    }
  }, [profile]);

  const verifyAccess = (path: string, action: string, currentModule?: string) => {
    let hasSomeOne = {
      moduleId: "",
      ok: false,
    };

    for (const moduleId of Object.keys(
      currentModule ? { [currentModule]: access[currentModule] } : access
    )) {
      const feature = access[moduleId]?.features?.find((f) => f.path === path);

      if (feature?.actions?.includes(action)) {
        hasSomeOne = {
          moduleId,
          ok: true,
        };
      } else if (feature?.reference) {
        // Se a feature tem referência, verificar se a feature referenciada tem a permissão
        const referencedFeature = access[moduleId]?.features?.find(
          (f) => f.path === feature.reference
        );
        if (referencedFeature?.actions?.includes(action)) {
          hasSomeOne = {
            moduleId,
            ok: true,
          };
        }
      }
    }

    return hasSomeOne;
  };

  const currentFeature = useMemo(() => {
    if (!module?.id) return null;
    const pathItem = pathname.split("/")[2];
    return access[module?.id]?.features.find((f) => f.path === pathItem);
  }, [access, module?.id, pathname]);

  return {
    user,
    profile,
    module,
    access,
    canAccessCurrentRoute,
    modulesWithAccess,
    companyView,
    userView,
    isRoleInactive: profile && !profile?.level?.active,
    hasNoPermissionsAtAll: useMemo(() => {
      return (
        profile && Object.keys(access || {}).every((key: any) => !access?.[key]?.features.length)
      );
    }, [access, profile]),
    permissions,
    warning,
    verifyAccess,
    currentFeature,
    hasProfile,
    subscription,
    activeSubscription,
  };
};

export interface IAccess {
  user: user | null;
  profile: profile | undefined;
  module: module | undefined;
  access: AccessView;
  canAccessCurrentRoute: boolean;
  modulesWithAccess: module[];
  companyView: AccessView;
  userView: AccessView;
  isRoleInactive: boolean | undefined;
  hasNoPermissionsAtAll: boolean | undefined;
  permissions: (feature?: string) => Record<string, boolean>;
  warning: Warning | undefined;
  verifyAccess: (
    path: string,
    action: string,
    currentModule?: string
  ) => { moduleId: string; ok: boolean };
  currentFeature: FeatureWithActions | null | undefined;
  hasProfile: boolean;
  subscription: subscription;
  activeSubscription: boolean;
}
