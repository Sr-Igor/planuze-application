'use client';

import { useDroppable } from '@dnd-kit/core';

import { ITaskRowColumnProps } from './types';

export const useComponent = (
    props: Pick<
        ITaskRowColumnProps,
        'column' | 'mainTaskId' | 'insertPosition' | 'isDragActive' | 'subTasks' | 'activeCard'
    >
) => {
    const { setNodeRef } = useDroppable({
        id: `${props.column.id}-${props.mainTaskId}`,
        data: {
            columnId: props.column.id,
            mainTaskId: props.mainTaskId,
            card: props.activeCard,
            type: 'task-row-column'
        }
    });

    // Drop zone para o topo da lista
    const { setNodeRef: setTopDropRef } = useDroppable({
        id: `${props.column.id}-${props.mainTaskId}-top`,
        data: {
            columnId: props.column.id,
            mainTaskId: props.mainTaskId,
            card: props.activeCard,
            type: 'task-row-column',
            position: 'top'
        }
    });

    // Drop zone para o final da lista
    const { setNodeRef: setBottomDropRef } = useDroppable({
        id: `${props.column.id}-${props.mainTaskId}-bottom`,
        data: {
            columnId: props.column.id,
            mainTaskId: props.mainTaskId,
            card: props.activeCard,
            type: 'task-row-column',
            position: 'bottom'
        }
    });

    // Verificar se deve mostrar placeholder baseado na mudança de coluna ou card principal
    const shouldShowPlaceholder = (index: number) => {
        if (!props.isDragActive || !props.insertPosition || !props.activeCard) return false;

        // Verificar se é a posição de destino correta
        const isTargetPosition =
            props.insertPosition.columnId === props.column.id &&
            props.insertPosition.mainTaskId === props.mainTaskId &&
            props.insertPosition.index === index;

        if (!isTargetPosition) return false;

        // Só mostrar placeholder se a coluna ou card principal for diferente
        const hasColumnChange = props.activeCard.project_kanban_cycle_column_id !== props.column.id;

        // Comparação de task principal considerando cards unlinked
        const hasTaskChange = (() => {
            const activeCardId = props.activeCard.card_id;
            const targetMainTaskId = props.mainTaskId;

            // Para target unlinked, verificar se o card ativo não é null
            if (targetMainTaskId === 'unlinked') {
                return activeCardId !== null;
            }

            // Para outros casos, comparação direta (incluindo quando activeCardId é null)
            return activeCardId !== targetMainTaskId;
        })();

        return hasColumnChange || hasTaskChange;
    };

    // Verificar se deve mostrar placeholder no final
    const shouldShowBottomPlaceholder = () => {
        if (!props.isDragActive || !props.insertPosition || !props.activeCard) return false;

        // Verificar se é a posição de destino correta (final)
        const isTargetPosition =
            props.insertPosition.columnId === props.column.id &&
            props.insertPosition.mainTaskId === props.mainTaskId &&
            props.insertPosition.index >= props.subTasks.length;

        if (!isTargetPosition) return false;

        // Só mostrar placeholder se a coluna ou card principal for diferente
        const hasColumnChange = props.activeCard.project_kanban_cycle_column_id !== props.column.id;

        // Usar a mesma lógica de comparação
        const hasTaskChange = (() => {
            const activeCardId = props.activeCard.card_id;
            const targetMainTaskId = props.mainTaskId;

            // Para target unlinked, verificar se o card ativo não é null
            if (targetMainTaskId === 'unlinked') {
                return activeCardId !== null;
            }

            // Para outros casos, comparação direta (incluindo quando activeCardId é null)
            return activeCardId !== targetMainTaskId;
        })();

        return hasColumnChange || hasTaskChange;
    };

    return {
        setNodeRef,
        setTopDropRef,
        setBottomDropRef,
        shouldShowPlaceholder,
        shouldShowBottomPlaceholder
    };
};
