import { Position } from '../types';

export interface IUpdateInsertPositionProps {
    insertPositionTimeoutRef: React.RefObject<NodeJS.Timeout | null>;
    setInsertPosition: (newPosition: Position | null) => void;
    newPosition: Position | null;
}

export const updateInsertPosition = ({
    insertPositionTimeoutRef,
    setInsertPosition,
    newPosition
}: IUpdateInsertPositionProps) => {
    // Limpar timeout anterior
    if (insertPositionTimeoutRef.current) {
        clearTimeout(insertPositionTimeoutRef.current);
    }

    // Para melhor responsividade, atualizar imediatamente se for null (limpeza)
    if (newPosition === null) {
        setInsertPosition(null);
        return;
    }

    // Para posições válidas, aplicar pequeno debounce para suavizar
    insertPositionTimeoutRef.current = setTimeout(() => {
        setInsertPosition(newPosition);
    }, 16); // ~60fps para suavidade
};
