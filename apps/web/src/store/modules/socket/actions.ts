import * as types from './types';
import { SocketState } from './reducers';

export const update = (params: Partial<SocketState>) => {
  return {
    type: types.SOCKET_UPDATE,
    payload: params
  };
};
