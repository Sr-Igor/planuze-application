'use client';

import React from 'react';

import { components } from '@/components/controllers';

//Types
import { FormProps } from './types';
import { FieldValues } from 'react-hook-form';

export const onlyReadProps = {
    disabled: true,
    tabIndex: -1,
    inputClassName:
        'disabled:opacity-100! border-t-0 border-l-0 border-r-0 rounded-none border-b-1 p-0 outline-none cursor-default opacity-100!'
};

export function Form<FormType extends FieldValues>({ fields, hook, onlyRead, ...rest }: FormProps<FormType>) {
    const onlyReadP = onlyRead ? onlyReadProps : {};

    return (
        <form {...rest} data-testid='form'>
            {fields.map((field, key) => {
                if (field.hide) return null;

                const Component = components[field.field];

                if (!Component) {
                    console.warn(`Component for field type '${String(field.field)}' not found.`);
                    return null;
                }

                return (
                    <Component
                        key={`form--${key}--${String(field.name)}`}
                        control={hook.control}
                        read={onlyRead?.toString()}
                        {...(field as any)}
                        {...onlyReadP}
                    />
                );
            })}

            <input type='submit' data-testid='submit-button' className='hidden' />
        </form>
    );
}
