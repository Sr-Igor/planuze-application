import { IFileUploadService } from '../types/interfaces';

export class FileUploadService implements IFileUploadService {
    private requests: any;
    private rootData: any;
    private feature: string;
    private onStateChange: (state: { loading: boolean }) => void;
    private vectorizeApi: any;
    private destroyVectorizeApi: any;

    constructor(
        requests: any,
        rootData: any,
        feature: string,
        onStateChange: (state: { loading: boolean }) => void,
        vectorizeApi?: any,
        destroyVectorizeApi?: any
    ) {
        this.requests = requests;
        this.rootData = rootData;
        this.feature = feature;
        this.onStateChange = onStateChange;
        this.vectorizeApi = vectorizeApi;
        this.destroyVectorizeApi = destroyVectorizeApi;
    }

    async upload(file: File, metadata: any): Promise<{ id: string; name: string; file: string }> {
        this.onStateChange({ loading: true });

        return new Promise((resolve, reject) => {
            this.requests?.store?.mutate(
                { file, ...this.rootData },
                {
                    onSuccess: (res: any) => {
                        this.onStateChange({ loading: false });
                        resolve({
                            id: res.id,
                            name: res.name,
                            file: res.file
                        });
                    },
                    onError: (e: any) => {
                        this.onStateChange({ loading: false });
                        reject(new Error(e.message));
                    }
                }
            );
        });
    }

    async remove(id: string): Promise<void> {
        this.onStateChange({ loading: true });

        return new Promise((resolve, reject) => {
            this.requests?.destroy?.mutate(id, {
                onSuccess: () => {
                    this.onStateChange({ loading: false });
                    resolve();
                },
                onError: (e: any) => {
                    this.onStateChange({ loading: false });
                    reject(new Error(e.message));
                }
            });
        });
    }

    async rename(id: string, name: string): Promise<void> {
        this.onStateChange({ loading: true });

        return new Promise((resolve, reject) => {
            this.requests?.update?.mutate(
                { id, body: { name } },
                {
                    onSuccess: () => {
                        this.onStateChange({ loading: false });
                        resolve();
                    },
                    onError: (e: any) => {
                        this.onStateChange({ loading: false });
                        reject(new Error(e.message));
                    }
                }
            );
        });
    }

    async vectorize(file: string, feature: string): Promise<void> {
        if (!this.vectorizeApi) {
            throw new Error('Vectorize API not provided');
        }

        return new Promise((resolve, reject) => {
            this.vectorizeApi.mutate(
                { file, body: { feature, key: 'file' } },
                {
                    onSuccess: () => resolve(),
                    onError: (e: any) => reject(new Error(e.message))
                }
            );
        });
    }

    async destroyVectorize(file: string, feature: string): Promise<void> {
        if (!this.destroyVectorizeApi) {
            throw new Error('Destroy Vectorize API not provided');
        }

        return new Promise((resolve, reject) => {
            this.destroyVectorizeApi.mutate(
                { file, body: { feature, key: 'file' } },
                {
                    onSuccess: () => resolve(),
                    onError: (e: any) => reject(new Error(e.message))
                }
            );
        });
    }

    resetErrorStatus(): void {}
}
