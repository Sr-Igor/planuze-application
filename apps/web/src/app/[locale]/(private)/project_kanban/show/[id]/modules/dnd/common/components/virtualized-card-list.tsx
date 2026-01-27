"use client";

import { CSSProperties, memo, ReactElement, useMemo } from "react";

import { List } from "react-window";

import {
  project_kanban_cycle_card,
  project_kanban_cycle_card_type,
  project_kanban_cycle_column,
} from "@repo/types";

import { Position } from "../../hooks/useDnd/types";
import { VisibleCards } from "../../types";
import { CardPlaceholder } from "./placeholder";
import { SortableKanbanCard } from "./sortable-card";

interface KanbanRowData {
  cards: project_kanban_cycle_card[];
  column: project_kanban_cycle_column;
  cardTypes: project_kanban_cycle_card_type[];
  visibleCards: VisibleCards;
  loading: boolean;
  insertPosition?: Position | null;
  isDragActive?: boolean;
}

interface CardItemProps extends KanbanRowData {
  index: number;
  style: CSSProperties;
  ariaAttributes: {
    "aria-posinset": number;
    "aria-setsize": number;
    role: "listitem";
  };
}

const CardItem = memo(
  ({
    index,
    style,
    ariaAttributes,
    cards,
    column,
    loading,
    visibleCards,
    insertPosition,
    isDragActive,
  }: CardItemProps): ReactElement | null => {
    const card = cards[index];

    if (!card) return null;

    const shouldShowPlaceholder =
      isDragActive && insertPosition?.columnId === column.id && insertPosition.index === index;

    return (
      <div style={style} {...ariaAttributes} className="flex flex-col">
        {shouldShowPlaceholder && <CardPlaceholder visible={true} />}
        <SortableKanbanCard
          card={card}
          column={column}
          loading={loading}
          visibleCards={visibleCards}
        />
      </div>
    );
  }
);

CardItem.displayName = "CardItem";

interface VirtualizedCardListProps extends KanbanRowData {
  height?: number;
  itemHeight?: number;
}

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
    const rowProps = useMemo<KanbanRowData>(
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
      <List<KanbanRowData>
        style={{
          height: `${height}px`,
          width: "100%",
        }}
        defaultHeight={height}
        rowCount={cards.length}
        rowHeight={itemHeight}
        rowProps={rowProps}
        rowComponent={(props) => <CardItem {...props} />}
        overscanCount={5}
        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      />
    );
  }
);

VirtualizedCardList.displayName = "VirtualizedCardList";
