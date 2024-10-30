import React from 'react';
import { render } from "@testing-library/react"
import '@testing-library/jest-dom';
import App from "./App.tsx"
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { SortProvider } from './hooks/useSort.tsx';

test("Проверка наличия header и main на странице", () => {
  const screen = render(
    <Provider store={store}>
      <SortProvider>
        <App />
      </SortProvider>
    </Provider>
  )
  const head = screen.getByRole('heading')
  const main = screen.getByRole('main')
  expect(head).toBeInTheDocument()
  expect(main).toBeInTheDocument()
})