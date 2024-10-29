import React from 'react';
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom';
import App from "./App.tsx"
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

test("есть ли элемент", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const test = screen.getByText(/sort by/i)
  expect(test).toBeInTheDocument()
})