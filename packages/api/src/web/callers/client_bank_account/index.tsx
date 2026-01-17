import * as api from "#/web/req/client_bank_account";
import { useInsert } from "#/hooks/use-insert";

import { client_bank_account } from "@repo/types";

import { IUseCallerProps } from "../../../types";
import { placeholder } from "./placeholder";

export const useClientBankAccount = (props: IUseCallerProps<client_bank_account>) => {
  return useInsert({
    ...props,
    api,
    cache: "client_bank_account",
    placeholder,
  });
};
