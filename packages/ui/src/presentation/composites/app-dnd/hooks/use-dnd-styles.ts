/**
 * Hook for DnD styling utilities
 */
export const useDndStyles = () => {
  const getItemStyle = (
    isDragging: boolean,
    draggableStyle?: React.CSSProperties,
    disabled?: boolean
  ): React.CSSProperties => ({
    userSelect: "none",
    margin: "0 0 20px 0",
    opacity: isDragging || disabled ? 0.5 : 1,
    pointerEvents: disabled ? "none" : "auto",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    opacity: isDraggingOver ? 0.8 : 1,
    maxWidth: 768,
    width: "100%",
  });

  return { getItemStyle, getListStyle };
};
