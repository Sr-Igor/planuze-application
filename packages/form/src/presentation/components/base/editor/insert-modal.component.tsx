'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Upload, X } from 'lucide-react';

import { useLang } from '@repo/language/hooks';
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Input, Label } from '@repo/ui';

import { useModalConfig } from '../../../hooks/editor/use-modal-configs.hook';
import type { InsertModalProps } from '#/shared/types/editor.types';

export const InsertModal: React.FC<InsertModalProps> = ({
    open,
    onOpenChange,
    type,
    onConfirm,
    title,
    placeholder,
    label,
    maxImageSize,
}) => {
    const t = useLang();

    const [value, setValue] = useState('');
    const [linkText, setLinkText] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { MODAL_CONFIGS, DEFAULT_MODAL_CONFIG } = useModalConfig();

    const config = MODAL_CONFIGS[type] || DEFAULT_MODAL_CONFIG;
    const finalTitle = title || config.title;
    const finalPlaceholder = placeholder || config.placeholder;
    const finalLabel = label || config.label;

    // Function to convert file to base64
    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject(new Error('Error converting file'));
                }
            };
            reader.onerror = () => reject(new Error('Error reading file'));
            reader.readAsDataURL(file);
        });
    };

    // Constant for maximum image size (2MB default)
    const MAX_IMAGE_SIZE = maxImageSize || 2 * 1024 * 1024;

    // Function to validate image file type
    const isValidImageFile = (file: File): boolean => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        return validTypes.includes(file.type);
    };

    // Function to validate file size
    const isValidImageSize = (file: File): boolean => {
        return file.size <= MAX_IMAGE_SIZE;
    };

    const handleConfirm = async () => {
        if (value.trim()) {
            if (type === 'link') {
                // For links, send object with URL and text
                const linkData = {
                    url: value.trim(),
                    text: linkText.trim() || value.trim(), // If no text, use URL
                };
                onConfirm(JSON.stringify(linkData));
            } else {
                onConfirm(value.trim());
            }
            setValue('');
            setLinkText('');
            setSelectedFile(null);
            onOpenChange(false);
        } else if (selectedFile && type === 'image') {
            try {
                setIsConverting(true);
                const base64 = await convertFileToBase64(selectedFile);
                onConfirm(base64);
                setValue('');
                setLinkText('');
                setSelectedFile(null);
                onOpenChange(false);
            } catch (error) {
                console.error('Error while converting file:', error);
                alert(t.editor('error.convert_file'));
            } finally {
                setIsConverting(false);
            }
        }
    };

    const handleCancel = () => {
        setValue('');
        setLinkText('');
        setSelectedFile(null);
        onOpenChange(false);
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!isValidImageFile(file)) {
                alert(t.editor('error.invalid_image_format'));
                return;
            }
            if (!isValidImageSize(file)) {
                alert(
                    t.editor('error.image_too_large', {
                        maxSize: (MAX_IMAGE_SIZE / 1024 / 1024).toFixed(0),
                        currentSize: (file.size / 1024 / 1024).toFixed(2),
                    })
                );
                return;
            }
            setSelectedFile(file);
            setValue(''); // Clear URL when selecting file
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if (event.target.value.trim()) {
            setSelectedFile(null); // Clear file when typing URL
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleOpenChange = (isOpen: boolean) => {
        onOpenChange(isOpen);
        // If closing modal, clear states and focus editor
        if (!isOpen) {
            setValue('');
            setLinkText('');
            setSelectedFile(null);
            setIsConverting(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setTimeout(() => {
                // Dispatch custom event so editor can focus
                globalThis.window.dispatchEvent(new CustomEvent('editor-focus-request'));
            }, 100);
        }
    };

    // Intercept ESC globally when modal is open
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                e.preventDefault();
                e.stopPropagation();
                handleCancel();
            }
        };

        if (open) {
            document.addEventListener('keydown', handleGlobalKeyDown, true);
        }

        return () => {
            document.removeEventListener('keydown', handleGlobalKeyDown, true);
        };
    }, [open]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            handleConfirm();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            handleCancel();
        }
    };

    const renderHints = () => {
        switch (type) {
            case 'image':
                return (
                    <div className="text-muted-foreground text-sm">
                        <p>{t.editor('tips')}:</p>
                        <ul className="mt-1 list-inside list-disc space-y-1">
                            <li>{t.editor('image.tip_url_or_upload')}</li>
                            <li>{t.editor('image.tip_formats')}</li>
                            <li>{t.editor('image.tip_base64')}</li>
                        </ul>
                    </div>
                );
            case 'link':
                return (
                    <div className="text-muted-foreground text-sm">
                        <p>{t.editor('tips')}:</p>
                        <ul className="mt-1 list-inside list-disc space-y-1">
                            <li>{t.editor('link.tip_url')}</li>
                            <li>{t.editor('link.tip_text_optional')}</li>
                            <li>{t.editor('link.tip_custom_text')}</li>
                        </ul>
                    </div>
                );
            case 'youtube':
                return (
                    <div className="text-muted-foreground text-sm">
                        <p>{t.editor('tips')}:</p>
                        <ul className="mt-1 list-inside list-disc space-y-1">
                            <li>{t.editor('youtube.tip_urls')}</li>
                            <li>{t.editor('youtube.tip_short_urls')}</li>
                            <li>{t.editor('youtube.tip_embed_urls')}</li>
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{finalTitle}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="input-value">{finalLabel}</Label>
                        <Input
                            id="input-value"
                            value={value}
                            onChange={handleUrlChange}
                            placeholder={finalPlaceholder}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    </div>

                    {type === 'link' && (
                        <div className="space-y-2">
                            <Label htmlFor="link-text">{t.editor('link.text_label')}</Label>
                            <Input
                                id="link-text"
                                value={linkText}
                                onChange={(e) => setLinkText(e.target.value)}
                                placeholder={t.editor('link.text_placeholder')}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    )}

                    {type === 'image' && (
                        <div className="space-y-2">
                            <Label>{t.editor('image.upload_label')}</Label>
                            <div className="space-y-2">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="mt-2 flex w-full flex-1 items-center gap-2"
                                >
                                    <Upload className="h-4 w-4" />
                                    {t.editor('image.select_file')}
                                </Button>
                                {selectedFile && (
                                    <div className="bg-muted flex items-center gap-2 rounded-md p-2">
                                        <span className="text-muted-foreground flex-1 truncate text-sm">
                                            {selectedFile.name}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleRemoveFile}
                                            className="h-6 w-6 flex-shrink-0 p-0"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {renderHints()}
                </div>

                <DialogFooter className="flex-col gap-2 sm:flex-row">
                    <Button variant="outline" onClick={handleCancel} disabled={isConverting} className="w-full sm:w-auto">
                        {t.editor('cancel')}
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={(!value.trim() && !selectedFile) || isConverting}
                        className="w-full sm:w-auto"
                    >
                        {isConverting ? t.editor('converting') : t.editor('insert')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
