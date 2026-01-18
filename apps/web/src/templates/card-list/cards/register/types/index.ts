import { IValidatorRequest } from "@deviobr/validator";
import { DefaultValues } from "react-hook-form";

import { ILogsComparison } from "@repo/ui/app";

import { Field, IUseFormListReturn } from "@repo/form";
import { ICardProps } from "@/templates/card-list/types";
import { HookReq } from "@/types/hookReq";

export interface IUseHookProps<T extends { id: string }> {
  disabled?: boolean;
  item?: Partial<T>;
}

export interface IRegisterCardProps<T extends { id: string }> extends ICardProps<T> {
  logs?: { hidden?: boolean } & Partial<ILogsComparison<T>>;
  useForm: (props: IUseHookProps<T>) => IUseFormListReturn<Partial<T>> & {
    config?: {
      schema: IValidatorRequest;
      fields: Field<Partial<T>>[];
      defaultValues: DefaultValues<Partial<T>>;
      typeOptions?: { label: string; value: string }[];
    };
  };
  deleteChildren?: (data: T) => React.ReactNode;
  beforeDelete?: (onSuccess: () => void) => void;
}

export interface IUseReqRegisterCardProps<T extends { id: string }> {
  handleState: (obj: any) => void;
  data?: any;
  item: Partial<T>;
  updateItem: (local_id: string, item?: T) => void;
  state: any;
  bodyKeys?: string[];
  hookReq?: HookReq<T>;
  filters?: Record<string, any>;
  local_id: string;
}
