import {
    calculateNextTickFieldData, getAliveNeighboursCount, initialFieldData, isAlive, isRandomlyAlive
} from './';

describe("testing utils", () => {
  test("checks `isRandomlyAlive` util", () => {
    expect(isRandomlyAlive()).toBeLessThan(2);
    expect(isRandomlyAlive()).toBeLessThan(2);
    expect(isRandomlyAlive()).toBeLessThan(2);
    expect(isRandomlyAlive()).toBeLessThan(2);
    expect(isRandomlyAlive()).toBeLessThan(2);
    expect(isRandomlyAlive()).toBeLessThan(2);
  });

  test("checks `getAliveNeighboursCount` util", () => {
    expect(
      getAliveNeighboursCount(1, 1, [
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
      ])
    ).toBe(6);
    expect(
      getAliveNeighboursCount(1, 1, [
        [0, 0, 1],
        [0, 0, 0],
        [1, 0, 1],
      ])
    ).toBe(3);
    expect(
      getAliveNeighboursCount(0, 1, [
        [0, 0, 0],
        [0, 0, 0],
        [1, 0, 1],
      ])
    ).toBe(0);
  });

  test("checks `isAlive` util", () => {
    expect(
      isAlive(1, 1, [
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
      ])
    ).toBeFalsy();
    expect(
      getAliveNeighboursCount(1, 1, [
        [0, 0, 1],
        [0, 0, 0],
        [1, 0, 1],
      ])
    ).toBeTruthy();
    expect(
      getAliveNeighboursCount(1, 1, [
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
      ])
    ).toBeTruthy();
    expect(
      getAliveNeighboursCount(1, 1, [
        [0, 0, 0],
        [0, 1, 0],
        [1, 0, 1],
      ])
    ).toBeTruthy();
  });

  test("checks `initialFieldData` util", () => {
    const fifeOnFiveFieldInitialData = initialFieldData(5, 5);
    expect(fifeOnFiveFieldInitialData.length).toEqual(5);
    expect(fifeOnFiveFieldInitialData[0].length).toEqual(5);

    const defaultFieldInitialData = initialFieldData();
    expect(defaultFieldInitialData.length).toEqual(50);
    expect(defaultFieldInitialData[0].length).toEqual(50);
  });

  test("checks `calculateNextTickFieldData` util", () => {
    const nextTickFieldData1 = calculateNextTickFieldData([
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
    ]);
    expect(nextTickFieldData1).toEqual([
      [0, 0, 0],
      [1, 0, 1],
      [0, 0, 0],
    ]);

    const nextTickFieldData2 = calculateNextTickFieldData([
      [0, 1, 0],
      [1, 0, 1],
      [0, 0, 0],
    ]);
    expect(nextTickFieldData2).toEqual([
      [0, 1, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]);

    const nextTickFieldData3 = calculateNextTickFieldData([
      [0, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ]);
    expect(nextTickFieldData3).toEqual([
      [0, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ]);

    const nextTickFieldData4 = calculateNextTickFieldData([
      [0, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ]);
    expect(nextTickFieldData4).toEqual([
      [0, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ]);

    const nextTickFieldData5 = calculateNextTickFieldData([
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ]);
    expect(nextTickFieldData5).toEqual([
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]);
  });
});
