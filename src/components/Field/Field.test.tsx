import { act } from 'react-dom/test-utils';

import { render } from '@testing-library/react';

import { calculateNextTickFieldData } from '../../utils';
import Field from './Field';

describe("testing Field component", () => {
  test("checks 'field' className on root element", () => {
    const { container } = render(<Field />);
    expect(container.firstChild).toHaveClass("field");
  });

  test("checking rows and cols number", () => {
    const { container } = render(<Field />);
    expect(container.firstChild?.childNodes.length).toBe(50);
    expect(container.firstChild?.childNodes[0].childNodes.length).toBe(50);
  });

  // this test should check the Field DOM and compare alive/dead cells in it for the data generated for the next tick.
  // but unfortunately jest fake timers does not work as expected so furthere investigation is needed
  xtest("checking field rerendering", async () => {
    jest.useFakeTimers();

    const { getByTestId } = render(<Field rowsNum={3} columnsNum={3} />);

    const getFieldDataFromDom = (fieldElement: HTMLElement): number[][] => {
      return Array.from(fieldElement.getElementsByClassName("field-row")).map(
        (rowElement) => {
          return Array.from(
            rowElement.getElementsByClassName("field-cell")
          ).map((cellElement) => {
            return cellElement.classList.contains("field-cell--alive") ? 1 : 0;
          });
        }
      );
    };

    const fieldElement = getByTestId("field");
    const initialFieldData = getFieldDataFromDom(fieldElement);
    expect(initialFieldData.length).toBe(3);
    expect(initialFieldData[0].length).toBe(3);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    const fieldData1 = getFieldDataFromDom(fieldElement);
    expect(calculateNextTickFieldData(initialFieldData)).toEqual(fieldData1);

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
