import { render } from '@testing-library/react';

import Cell from './Cell';

describe("testing Cell component", () => {
  test("checks 'field-cell' and 'field-cell-dead' classes presence on Cell component", () => {
    const { container } = render(<Cell />);
    expect(container.firstChild).toHaveClass("field-cell field-cell--dead");
  });

  test("checks 'field-cell' and 'field-cell-alive' classes presence on alive Cell component", () => {
    const { container } = render(<Cell alive />);
    expect(container.firstChild).toHaveClass("field-cell field-cell--alive");
  });

  test("checks cellElement to be empty", () => {
    const { container } = render(<Cell alive />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
