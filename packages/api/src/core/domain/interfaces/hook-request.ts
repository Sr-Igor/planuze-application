import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { UseCallerProps } from "../../../shared/types";

export interface Requests<T> extends Record<string, any> {
  index?: UseQueryResult<any, any>;
  show?: UseQueryResult<any, any> | UseMutationResult<any, any, any>;
  showMutation?: UseMutationResult<any, any, any>;
  store?: UseMutationResult<any, any, any>;
  update?: UseMutationResult<any, any, any>;
  destroy?: UseMutationResult<any, any, any>;
  many?: UseMutationResult<any, any, any>;
  trash?: UseQueryResult<any, any>;
  restore?: UseMutationResult<any, any, any, any>;
}

export type HookReq<T> = (params: UseCallerProps<T>) => Requests<T>;
