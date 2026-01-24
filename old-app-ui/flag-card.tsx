/* eslint-disable @typescript-eslint/no-require-imports */
import Image from 'next/image';

import { cn } from '@/lib/utils';

import { CreditCard } from 'lucide-react';

const SUPPORTED_FLAGS = ['visa', 'mastercard', 'elo', 'amex', 'diners', 'discover', 'hipercard', 'jcb'];

export interface CardFlagProps {
    brand?: string;
    width?: number;
    height?: number;
}

export function CardFlag({ brand, width = 28, height = 18 }: CardFlagProps) {
    const normalized = brand?.toLowerCase()?.replace(/[^a-z]/g, '') || '';

    if (SUPPORTED_FLAGS.includes(normalized)) {
        try {
            const flag = require(`payment-icons/min/flat/${normalized}.svg`);
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Image src={flag} alt={brand || ''} width={width} height={height} />
                </div>
            );
        } catch {
            return null;
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard
                className={cn('h-5 w-5 text-gray-400', width && `w-[${width}px]`, height && `h-[${height}px]`)}
            />
        </div>
    );
}
