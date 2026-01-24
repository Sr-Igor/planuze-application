import { UseMutationResult } from "@tanstack/react-query";

import { Pagination } from "../../@types";
import { IUseCallerProps } from "../../types";
import { Api, CacheKeys } from "../use-base/types";

export interface IUseNestedFieldProps<T, K extends CacheKeys = CacheKeys>
  extends IUseCallerProps<T> {
  api: Api<T>;
  cache: K;
  rootCache: K;
  field: string;
  accessKey?: string;
}

export interface IUseNestedFieldReturn<T> {
  store: UseMutationResult<T | Pagination<T>, Error, any>;
  update: UseMutationResult<T | Pagination<T>, Error, any>;
}
