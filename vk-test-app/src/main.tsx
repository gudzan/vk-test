import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { SortProvider } from "./hooks/useSort.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SortProvider>
        <App />
      </SortProvider>
    </Provider>
  </StrictMode>,
)
