"use client";

import { memo, useMemo } from "react";

import { FixedSizeList as List } from "react-window";

import {
  project_kanban_cycle_card,
  project_kanban_cycle_card_type,
  project_kanban_cycle_column,
} from "@repo/types";

import { Position } from "../../hooks/useDnd/types";
import { VisibleCards } from "../../types";
import { CardPlaceholder } from "./placeholder";
import { SortableKanbanCard } from "./sortable-card";

interface VirtualizedCardListProps {
  cards: project_kanban_cycle_card[];
  column: project_kanban_cycle_column;
  cardTypes: project_kanban_cycle_card_type[];
  visibleCards: VisibleCards;
  loading: boolean;
  insertPosition?: Position | null;
  isDragActive?: boolean;
  height?: number;
  itemHeight?: number;
}

interface CardItemProps {
  index: number;
  style: React.CSSProperties;
  data: {
    cards: project_kanban_cycle_card[];
    column: project_kanban_cycle_column;
    cardTypes: project_kanban_cycle_card_type[];
    visibleCards: VisibleCards;
    loading: boolean;
    insertPosition?: Position | null;
    isDragActive?: boolean;
  };
}

const CardItem = memo(({ index, style, data }: CardItemProps) => {
  const { cards, column, cardTypes, visibleCards, loading, insertPosition, isDragActive } = data;
  const card = cards[index];

  if (!card) return null;

  const shouldShowPlaceholder =
    isDragActive && insertPosition?.columnId === column.id && insertPosition.index === index;

  return (
    <div style={style} className="flex flex-col">
      {shouldShowPlaceholder && <CardPlaceholder visible={true} />}
      <SortableKanbanCard
        card={card}
        column={column}
        loading={loading}
        visibleCards={visibleCards}
      />
    </div>
  );
});

CardItem.displayName = "CardItem";

export const VirtualizedCardList = memo(
  ({
    cards,
    column,
    cardTypes,
    visibleCards,
    loading,
    insertPosition,
    isDragActive,
    height = 400,
    itemHeight = 160,
  }: VirtualizedCardListProps) => {
    const itemData = useMemo(
      () => ({
        cards,
        column,
        cardTypes,
        visibleCards,
        loading,
        insertPosition,
        isDragActive,
      }),
      [cards, column, cardTypes, visibleCards, loading, insertPosition, isDragActive]
    );

    if (cards.length <= 10) {
      return (
        <div className="space-y-2">
          {cards.map((card, index) => {
            const shouldShowPlaceholder =
              isDragActive &&
              insertPosition?.columnId === column.id &&
              insertPosition.index === index;

            return (
              <div key={card.id} className="flex flex-col">
                {shouldShowPlaceholder && <CardPlaceholder visible={true} />}
                <SortableKanbanCard
                  card={card}
                  column={column}
                  loading={loading}
                  visibleCards={visibleCards}
                />
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <List
        height={height}
        width="100%"
        itemCount={cards.length}
        itemSize={itemHeight}
        itemData={itemData}
        overscanCount={5} // Renderizar 5 itens extras para scroll suave
        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        {CardItem}
      </List>
    );
  }
);

VirtualizedCardList.displayName = "VirtualizedCardList";
