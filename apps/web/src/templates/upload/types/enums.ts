// Enums para melhorar a tipagem e evitar magic strings
export enum FileStatus {
    WAIT = 'wait',
    UPLOADING = 'uploading',
    DONE = 'done',
    ERROR = 'error',
    ERROR_LOADING = 'error_loading',
    REMOVE = 'remove'
}

export type VectorStatus = {
    available: boolean;
    processing: boolean | null;
    unavailable: boolean;
};

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc'
}

export enum FileAction {
    UPLOAD = 'upload',
    REMOVE = 'remove',
    RENAME = 'rename',
    VECTORIZE = 'vectorize',
    DESTROY_VECTORIZE = 'destroy_vectorize'
}
