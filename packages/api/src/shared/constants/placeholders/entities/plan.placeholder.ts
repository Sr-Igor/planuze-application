/**
 * Plan placeholder data
 * Used for initial data loading and skeleton states
 */
import type { plan } from "@repo/types";

import type { Pagination } from "../../../../core/domain/entities/pagination.entity";

const createPlanFeature = (id: string, planId: string, moduleTitle: string) => ({
  id,
  deleted: false,
  deletedAt: null,
  updatedAt: "2025-06-25T01:03:00.700Z",
  createdAt: "2025-06-25T01:03:00.700Z",
  feature_id: `feature_${id}`,
  plan_id: planId,
  feature: {
    id: `feature_${id}`,
    deleted: false,
    deletedAt: null,
    updatedAt: "2025-06-25T01:02:53.172Z",
    createdAt: "2025-06-25T01:02:53.172Z",
    title: "company contact",
    path: "company_contact",
    sidebar: false,
    icon: "User",
    module_id: `module_${id}`,
    new: false,
    order: 2,
    group: "company",
    reference: "company",
    route: null,
    show_plan: true,
    plan_title: "company_contact",
    actions: "",
    module: {
      id: `module_${id}`,
      deleted: false,
      deletedAt: null,
      integration: false,
      updatedAt: "2025-06-25T01:02:53.163Z",
      createdAt: "2025-06-25T01:02:53.163Z",
      title: moduleTitle,
      icon: "ShieldUser",
      order: 6,
      company_id: null,
      basic: false,
    },
  },
});

const basePlan: Omit<plan, "id" | "plan_features"> = {
  deleted: false,
  deletedAt: null,
  currency: "BRL",
  updatedAt: "2025-06-25T01:03:00.686Z",
  createdAt: "2025-06-25T01:03:00.686Z",
  title: "Free",
  price: 1,
  billing_model: "monthly",
  free_test: 7,
  licenses: 3,
  gateway: "free",
  metadata: "",
  price_id: "test_ccy3i2pmhiwdegfkiw0vhklv",
  company_id: null,
  icon: "Award",
  is_popular: false,
  order: 1,
};

export const planPlaceholder: Pagination<plan> = {
  data: [
    {
      ...basePlan,
      id: "cmcb92yj20015pbcmkqqkxfjl",
      plan_features: [
        createPlanFeature("cmcb92yjg001fpbcm08xyhh5t", "cmcb92yj20015pbcmkqqkxfjl", "admin"),
        createPlanFeature("cmcb92yjg001fpbcm08xyhh52", "cmcb92yj20015pbcmkqqkxfj2", "personal"),
        createPlanFeature("cmcb92yjg001fpbcm08xyhh53", "cmcb92yj20015pbcmkqqkxfj3", "commercial"),
        createPlanFeature("cmcb92yjg001fpbcm08xyhh54", "cmcb92yj20015pbcmkqqkxfj4", "project"),
        createPlanFeature("cmcb92yjg001fpbcm08xyhh55", "cmcb92yj20015pbcmkqqkxfj5", "personal"),
      ],
    },
    {
      ...basePlan,
      id: "cmcb92yj20015pbcmkqqkxfj1",
      plan_features: [
        createPlanFeature("cmcb92yjg001fpbcm08xyhh5t", "cmcb92yj20015pbcmkqqkxfjl", "admin"),
        createPlanFeature("cmcb92yjg001fpbcm08xyhh52", "cmcb92yj20015pbcmkqqkxfj2", "personal"),
        createPlanFeature("cmcb92yjg001fpbcm08xyhh53", "cmcb92yj20015pbcmkqqkxfj3", "commercial"),
        createPlanFeature("cmcb92yjg001fpbcm08xyhh54", "cmcb92yj20015pbcmkqqkxfj4", "project"),
        createPlanFeature("cmcb92yjg001fpbcm08xyhh55", "cmcb92yj20015pbcmkqqkxfj5", "personal"),
      ],
    },
    {
      ...basePlan,
      id: "cmcb92yj20015pbcmkqqkxfj3",
      plan_features: [
        createPlanFeature("cmcb92yjg001fpbcm08xyhh5t", "cmcb92yj20015pbcmkqqkxfjl", "admin"),
        createPlanFeature("cmcb92yjg001fpbcm08xyhh52", "cmcb92yj20015pbcmkqqkxfj2", "personal"),
        createPlanFeature("cmcb92yjg001fpbcm08xyhh53", "cmcb92yj20015pbcmkqqkxfj3", "commercial"),
        createPlanFeature("cmcb92yjg001fpbcm08xyhh54", "cmcb92yj20015pbcmkqqkxfj4", "project"),
        createPlanFeature("cmcb92yjg001fpbcm08xyhh55", "cmcb92yj20015pbcmkqqkxfj5", "personal"),
      ],
    },
  ],
  count: 3,
  page: 1,
  pages: 1,
};
