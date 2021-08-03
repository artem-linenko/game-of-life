import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';

test("renders field element", () => {
  render(<App />);
  const fieldElement = screen.getByTestId("field");
  expect(fieldElement).toBeInTheDocument();
});
