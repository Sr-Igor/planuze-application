import { profile_bank_account } from "@repo/api/generator/types";

import { useInsert } from "@/api/hooks/use-insert";
import * as api from "@/api/req/profile_bank_account";
import { IUseCallerProps } from "@/api/types";

import { placeholder } from "./placeholder";

export const useProfileBankAccount = (props: IUseCallerProps<profile_bank_account>) => {
  return useInsert({
    ...props,
    api,
    cache: "profile_bank_account",
    placeholder,
  });
};
