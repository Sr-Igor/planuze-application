import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { Pagination } from "../../@types";
import { IQuerySort } from "../../cache";
import { IUseCallerProps } from "../../types";
import { Api, CacheKeys } from "../use-base/types";

export interface IUseNestedArrayProps<T, K extends CacheKeys = CacheKeys>
  extends IUseCallerProps<T> {
  api: Api<T>;
  cache: K;
  rootCache: K;
  field: string;
  accessKey?: string;
  nestedArrayOptions?: Omit<IQuerySort, "data">;
}

export interface IUseNestedArrayReturn<T> {
  store: UseMutationResult<T | Pagination<T>, Error, any>;
  update: UseMutationResult<T | Pagination<T>, Error, any>;
  destroy: UseMutationResult<T | Pagination<T>, Error, void>;
  trash: UseQueryResult<Pagination<T>, Error>;
  restore: UseMutationResult<T | Pagination<T>, Error, string>;
}
