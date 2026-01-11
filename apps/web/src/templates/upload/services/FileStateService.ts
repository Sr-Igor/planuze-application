import { FileStatus } from '../types/enums';
import { IFile, IFileStateManager, IUploadFile, IUploadState } from '../types/interfaces';

export class FileStateService implements IFileStateManager {
    private state: IUploadState;
    private listeners: Set<(state: IUploadState) => void>;

    constructor() {
        this.state = {
            uploads: [],
            loading: false,
            dirty: false
        };
        this.listeners = new Set();
    }

    getState(): IUploadState {
        return { ...this.state };
    }

    setState(updates: Partial<IUploadState>): void {
        this.state = { ...this.state, ...updates };
        this.notifyListeners();
    }

    addFile(file: IUploadFile): void {
        this.state.uploads = [file, ...this.state.uploads];
        this.notifyListeners();
    }

    removeFile(id: string): void {
        this.state.uploads = this.state.uploads.filter((upload) => upload.id !== id);
        this.notifyListeners();
    }

    updateFile(id: string, updates: Partial<IUploadFile>): void {
        this.state.uploads = this.state.uploads.map((upload) =>
            upload.id === id ? { ...upload, ...updates } : upload
        );
        this.notifyListeners();
    }

    clearState(): void {
        this.state = {
            uploads: [],
            loading: false,
            dirty: false
        };
        this.notifyListeners();
    }

    // Sincronizar com files externos, preservando itens em processamento
    syncWithFiles(files: IFile[]): void {
        if (!files) {
            this.clearState();
            return;
        }

        const filesMap = new Map(
            files.map((file, idx) => [
                file.id,
                {
                    preview: file.file,
                    status: FileStatus.DONE as const,
                    vector: file?.vector,
                    vector_error: file?.vector_error,
                    company_id: file.company_id,
                    name: file?.name || '-',
                    id: file.id,
                    idx
                }
            ])
        );

        // Preservar itens em processamento
        const processingItems = this.state.uploads.filter((upload) => {
            if (upload.status !== FileStatus.DONE) {
                return true;
            }
            return !filesMap.has(upload.id!);
        });

        this.state.uploads = [...Array.from(filesMap.values()), ...processingItems];
        this.notifyListeners();
    }

    // Adicionar listener para mudanças de estado
    subscribe(listener: (state: IUploadState) => void): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private notifyListeners(): void {
        this.listeners.forEach((listener) => listener(this.getState()));
    }
}
