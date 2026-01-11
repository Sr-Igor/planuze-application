export type ModalType = 'image' | 'youtube' | 'link';

export interface EditorProps {
    value?: string | null;
    onChange?: (content: string | null) => void;
    mentionQuery?: Record<string, string>;
    hashtagQuery?: Record<string, string>;
    placeholder?: string;
    editable?: boolean;
    setEditable?: (value: boolean) => void;
    className?: string;
    hashRefLink?: (id: string) => void;
    mentionRefLink?: (id: string) => void;
    maxImageSize?: number;
    disabled?: boolean;
}

export interface MenuBarProps {
    editor: any;
    className?: string;
    onOpenModal: (type: ModalType) => void;
}

export interface InsertModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    type: ModalType;
    onConfirm: (value: string) => void;
    title?: string;
    placeholder?: string;
    label?: string;
    maxImageSize?: number;
}

export interface MenuOption {
    icon: React.ReactNode;
    onClick: () => void;
    pressed: boolean;
    title: string;
    disabled?: boolean;
}

export interface ModalConfig {
    title: string;
    placeholder: string;
    label: string;
}

export interface EditorState {
    editable: boolean;
    showEditButton: boolean;
    modalOpen: boolean;
    modalType: ModalType;
}

export interface EditorRefs {
    editorRef: React.RefObject<HTMLDivElement | null>;
    isEditingRef: React.MutableRefObject<boolean>;
    hoverTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
    hideTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
}
