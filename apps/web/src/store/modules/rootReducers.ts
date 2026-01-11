import modalReducer from './modal/reducers';
import moduleReducer from './module/reducers';
import socketReducer from './socket/reducers';
import userReducer from './user/reducers';
import warningReducer from './warning/reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
    socket: socketReducer,
    modal: modalReducer,
    module: moduleReducer,
    warning: warningReducer
});

export default rootReducer;
