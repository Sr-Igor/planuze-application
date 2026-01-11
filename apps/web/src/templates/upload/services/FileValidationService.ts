import { IFileValidator } from '../types/interfaces';

export class FileValidationService implements IFileValidator {
    private maxFileSize: number;
    private allowedTypes: string[];
    private translate: (key: string) => string;

    constructor(
        maxFileSize: number = 10 * 1024 * 1024,
        allowedTypes: string[] = [],
        translate: (key: string) => string
    ) {
        this.maxFileSize = maxFileSize;
        this.allowedTypes = allowedTypes;
        this.translate = translate;
    }

    validateFile(file: File): { isValid: boolean; error?: string } {
        // // Validar tamanho do arquivo
        // if (file.size > this.maxFileSize) {
        //     return {
        //         isValid: false,
        //         error: this.translate('file_too_large').replace('{{maxSize}}', this.formatFileSize(this.maxFileSize))
        //     };
        // }

        // Validar tipo do arquivo
        // if (this.allowedTypes.length > 0 && !this.allowedTypes.includes(file.type)) {
        //     return {
        //         isValid: false,
        //         error: this.translate('file_type_not_allowed').replace('{{allowedTypes}}', this.allowedTypes.join(', '))
        //     };
        // }

        // // Validar se o arquivo tem nome
        // if (!file.name || file.name.trim().length === 0) {
        //     return {
        //         isValid: false,
        //         error: this.translate('file_must_have_name')
        //     };
        // }

        return { isValid: true };
    }

    validateFiles(files: File[]): { valid: File[]; invalid: { file: File; error: string }[] } {
        const valid: File[] = [];
        const invalid: { file: File; error: string }[] = [];

        files.forEach((file) => {
            const validation = this.validateFile(file);
            if (validation.isValid) {
                valid.push(file);
            } else {
                invalid.push({ file, error: validation.error! });
            }
        });

        return { valid, invalid };
    }

    // Métodos auxiliares
    setMaxFileSize(size: number): void {
        this.maxFileSize = size;
    }

    setAllowedTypes(types: string[]): void {
        this.allowedTypes = types;
    }

    setTranslate(translate: (key: string) => string): void {
        this.translate = translate;
    }

    private formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
