import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../store/index";

export { useUserAuth } from "./use-user-auth";
export { useUserAccess } from "./use-user-access";

export type {
  Warning,
  AccessView,
  FeatureWithActions,
  ModuleWithFeatures,
  Permissions,
} from "./types";
export type { AppDispatch, RootState } from "../store/index";
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector as TypedUseSelectorHook<RootState>;
