"use client";

import { persistor, store } from "#/store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </ReduxProvider>
  );
};
