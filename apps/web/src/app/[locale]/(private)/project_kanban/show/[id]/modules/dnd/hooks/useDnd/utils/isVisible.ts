import { project_kanban_cycle_card } from "@repo/api/generator/types";

import { VisibleCards } from "../../../types";

export const checkVisibility = (card: project_kanban_cycle_card, visibleCards: VisibleCards) => {
  if (!visibleCards || Object.keys(visibleCards).length === 0) {
    return true;
  }

  for (const [key, value] of Object.entries(visibleCards)) {
    if (Array.isArray(value) && value.length === 0) {
      continue;
    }

    const cardValue = (card as any)[key];

    // Verificar se é um filtro de tags
    if (key === "tag" && Array.isArray(value) && value.length > 0) {
      const cardTags = card.project_kanban_cycle_card_tags || [];
      const cardTagTitles = cardTags.map((tag) => tag.title?.toLowerCase() || "");
      const filterTags = value.map((tag) => tag.toLowerCase());

      // Verificar se pelo menos uma tag do card corresponde aos filtros
      if (
        !cardTagTitles.some((tagTitle) =>
          filterTags.some((filterTag) => tagTitle.includes(filterTag))
        )
      ) {
        return false;
      }
    }
    // Verificar se é um filtro de data com range (start/end)
    else if (
      (key === "end_date_estimate" || key === "end_date_execute" || key === "createdAt") &&
      value &&
      typeof value === "object" &&
      "start" in value
    ) {
      const dateRange = value as { start?: string; end?: string };
      const cardDate = cardValue ? new Date(cardValue) : null;

      if (!cardDate || isNaN(cardDate.getTime())) {
        // Se a data do card é inválida e há filtros de data, não mostrar
        if (dateRange.start || dateRange.end) {
          return false;
        }
        continue;
      }

      // Verificar se a data está dentro do range
      if (dateRange.start) {
        const startDate = new Date(dateRange.start);
        if (cardDate < startDate) {
          return false;
        }
      }

      if (dateRange.end) {
        const endDate = new Date(dateRange.end);
        // Adicionar 23:59:59 ao final do dia para incluir o dia inteiro
        endDate.setHours(23, 59, 59, 999);
        if (cardDate > endDate) {
          return false;
        }
      }
    } else if (Array.isArray(value)) {
      // Transformar string "null" em null para comparação
      const normalizedValues = value.map((v) => (v === "null" ? null : v));
      const normalizedCardValue = cardValue === "null" ? null : cardValue;

      if (
        !normalizedValues.some((v) => {
          if (v === null) {
            return normalizedCardValue === null;
          }
          if (typeof normalizedCardValue === "number") {
            return normalizedCardValue === Number(v);
          }

          return normalizedCardValue?.toLowerCase()?.includes(v?.toLowerCase());
        })
      ) {
        return false;
      }
    } else if (typeof value === "object" && "min" in value) {
      // Verificar se é um filtro min/max (como severity)
      const minMaxRange = value as { min?: string; max?: string };
      const cardNumericValue = cardValue ? Number(cardValue) : null;

      if (cardNumericValue === null || isNaN(cardNumericValue)) {
        // Se o valor do card é inválido e há filtros min/max, não mostrar
        if (minMaxRange.min || minMaxRange.max) {
          return false;
        }
        continue;
      }

      // Verificar se o valor está dentro do range min/max
      if (minMaxRange.min) {
        const minValue = Number(minMaxRange.min);
        if (cardNumericValue < minValue) {
          return false;
        }
      }

      if (minMaxRange.max) {
        const maxValue = Number(minMaxRange.max);
        if (cardNumericValue > maxValue) {
          return false;
        }
      }
    } else if (typeof value === "string") {
      // Transformar string "null" em null para comparação
      const normalizedValue = value === "null" ? null : value;
      const normalizedCardValue = cardValue === "null" ? null : cardValue;

      if (normalizedCardValue !== normalizedValue) {
        return false;
      }
    }
  }

  return true;
};
