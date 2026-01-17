import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { Pagination } from "../../@types";
import { IUseCallerProps } from "../../types";
import { Api, CacheKeys } from "../use-base/types";

export interface IUseInsertProps<T, K extends CacheKeys = CacheKeys> extends IUseCallerProps<T> {
  api: Api<T>;
  cache: K;
  placeholder?: Pagination<T>;
}

export interface IUseInsertReturn<T> {
  store: UseMutationResult<T | Pagination<T>, Error, Partial<T>>;
  show?: UseQueryResult<T, Error> | undefined;
  showMutation?: UseMutationResult<T, Error, string>;
  index: UseQueryResult<Pagination<T>, Error>;
  update: UseMutationResult<T | Pagination<T>, Error, Partial<T>>;
  destroy: UseMutationResult<Pagination<T> | T, Error, void>;
  trash: UseQueryResult<Pagination<T>, Error>;
  restore: UseMutationResult<Pagination<T> | T, Error, string | undefined>;
}
