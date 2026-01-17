import { action, module } from "@repo/types";
import { setModule, setProfile } from "@repo/cookies";

import * as types from "./types";

export type ModuleState = {
  all: module[];
  actions: action[];
  moduleId: string | null;
  profileId: string | null;
};

const initialState: ModuleState = {
  all: [],
  actions: [],
  moduleId: null,
  profileId: null,
};

type ModuleAction = {
  type: string;
  payload: Partial<ModuleState>;
};

export default function moduleReducer(state: ModuleState = initialState, action: ModuleAction) {
  action?.payload?.profileId && setProfile(action.payload.profileId);
  action?.payload?.moduleId && setModule(action.payload.moduleId);

  switch (action.type) {
    case types.MODULE_SET:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
