export const useDND = () => {
    const getItemStyle = (isDragging: boolean, draggableStyle: any, disabled?: boolean) => ({
        userSelect: 'none',
        margin: `0 0 20px 0`,
        opacity: isDragging || disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        opacity: isDraggingOver ? 0.8 : '1',
        maxWidth: 768,
        width: '100%'
    });

    return { getItemStyle, getListStyle };
};
