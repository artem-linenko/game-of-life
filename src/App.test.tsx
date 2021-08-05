import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';

describe("testing App component", () => {
  test("renders 'app-root' div element", () => {
    render(<App />);
    const rootElement = screen.getByTestId("app-root");
    expect(rootElement).toBeInTheDocument();
  });

  test("renders field element", () => {
    render(<App />);
    const fieldElement = screen.getByTestId("field");
    expect(fieldElement).toBeInTheDocument();
  });
});
