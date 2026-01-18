'use client';

import { useRef, useState } from 'react';

import { ExternalLink, Trash2, UserRound } from 'lucide-react';

import { useLang } from '@repo/language/hook';
import { Button, cn, Img } from '@repo/ui';

export interface FieldProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    clearable?: boolean;
    name: string;
    path?: string;
    publicFile?: boolean;
}

export function Avatar({ blob, clearable, name, path, publicFile, ...rest }: FieldProps & { blob: string | null }) {
    const t = useLang();

    const inputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);

    return (
        <div className="relative flex w-full items-center justify-start gap-2">
            <input
                type="file"
                ref={inputRef}
                accept="image/png, image/jpeg, image/jpg"
                tabIndex={-1}
                autoFocus={false}
                {...rest}
                className={cn('hidden', rest.className)}
            />

            <button
                type="button"
                className="relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100 transition-colors duration-300"
                onClick={() => inputRef.current?.click()}
                disabled={rest.disabled}
                aria-label={blob ? t.helper('toggle_image') : t.helper('add_image')}
            >
                {blob ? (
                    <Img
                        src={blob}
                        alt="Avatar"
                        fill
                        path={path || name}
                        callbackLink={(url) => setImage(url)}
                        publicFile={publicFile}
                    />
                ) : (
                    <UserRound size={24} className="text-gray-400" />
                )}
            </button>

            <Button type="button" onClick={() => inputRef.current?.click()} disabled={rest.disabled}>
                {blob ? t.helper('toggle_image') : t.helper('add_image')}
            </Button>

            {!blob && <div className="hidden text-xs text-gray-500 md:block">{t.helper('empty_image')}</div>}

            {clearable && blob && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        inputRef.current!.value = '';
                        rest.onChange?.({
                            // @ts-ignore
                            target: { files: [] },
                        });
                    }}
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-500 transition-colors duration-300 hover:bg-red-400"
                >
                    <Trash2 size={14} className="text-white" />
                </button>
            )}

            {blob && (
                <button
                    type="button"
                    onClick={() => {
                        if (image) window.open(image, '_blank');
                    }}
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
                >
                    <ExternalLink size={14} className="text-foreground" />
                </button>
            )}
        </div>
    );
}
