'use client';

import { IValidatorRequest, validatorWeb } from '@deviobr/validator';

import { useLocale, useTranslations } from 'next-intl';

export function useValidator() {
    const locale = useLocale();
    const t = useTranslations('zod');

    return (data: IValidatorRequest): any => {
        const res = validatorWeb(data, { getFixedT: () => t }, locale);

        return res.body;
    };
}
