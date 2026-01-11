import { client_bank_account } from '@/api/generator/types';
import { useInsert } from '@/api/hooks/use-insert';
import * as api from '@/api/req/client_bank_account';
import { IUseCallerProps } from '@/api/types';

import { placeholder } from './placeholder';

export const useClientBankAccount = (props: IUseCallerProps<client_bank_account>) => {
    return useInsert({
        ...props,
        api,
        cache: 'client_bank_account',
        placeholder
    });
};
