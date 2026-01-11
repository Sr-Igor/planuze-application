'use client';

import { Provider as ReduxProvider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@/store';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </ReduxProvider>
  );
};
