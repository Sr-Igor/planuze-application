'use client';

import { Input } from '@repo/ui';

import { formatCnpj } from '../../../../shared/utils';

export const Cnpj = (
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) => {
    return (
        <Input
            {...props}
            onChange={(e) => {
                const value = formatCnpj(e.target.value);
                e.target.value = value;
                props.onChange?.(e);
            }}
        />
    );
};
