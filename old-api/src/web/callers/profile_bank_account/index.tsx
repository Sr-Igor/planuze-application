import * as api from "#/web/req/profile_bank_account";
import { useInsert } from "#/hooks/use-insert";
import { IUseCallerProps } from "#/types";

import { profile_bank_account } from "@repo/types";

import { placeholder } from "./placeholder";

export const useProfileBankAccount = (props: IUseCallerProps<profile_bank_account>) => {
  return useInsert({
    ...props,
    api,
    cache: "profile_bank_account",
    placeholder,
  });
};
