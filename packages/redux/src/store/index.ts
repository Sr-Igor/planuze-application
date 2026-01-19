//Create Store
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";

import { persistConfig } from "./modules/rootPersistors";
import rootReducer from "./modules/rootReducers";
//Modules Configs
import rootSaga from "./modules/rootSagas";

//--------------------------------------Configure Store--------------------------------------//

//Persistor Module
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Create Saga
const sagaMiddleware = createSagaMiddleware();

//Default Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

//Default Persistor
const persistor = persistStore(store);

//Run Sagas
sagaMiddleware.run(rootSaga);

//----------------------------------------- Exports ----------------------------------------//
export { store, persistor };
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
