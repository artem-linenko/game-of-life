import { compact, times } from 'lodash';

const CELLS_IN_ROW = 50;
const CELLS_IN_COLUMN = 50;
export type FieldData = number[][];

const getAliveNeighboursCount = (
  rowIndex: number,
  colIndex: number,
  field: FieldData
): number => {
  const rowsNum = field.length;
  const colsNum = field[0].length;

  const isTopRow = rowIndex !== 0;
  const isBottomRow = rowIndex + 1 !== rowsNum;
  const isLeftCol = colIndex !== 0;
  const isRightCol = colIndex + 1 !== colsNum;

  // the scheme is next
  // n n n
  // n t n
  // n n n
  // where n - neighbour, t - target
  const neighbours = [
    isTopRow ? field[rowIndex - 1][colIndex] : null,
    isBottomRow ? field[rowIndex + 1][colIndex] : null,
    isLeftCol ? field[rowIndex][colIndex - 1] : null,
    isRightCol ? field[rowIndex][colIndex + 1] : null,
    isTopRow && isLeftCol ? field[rowIndex - 1][colIndex - 1] : null,
    isBottomRow && isRightCol ? field[rowIndex + 1][colIndex + 1] : null,
    isTopRow && isRightCol ? field[rowIndex - 1][colIndex + 1] : null,
    isBottomRow && isLeftCol ? field[rowIndex + 1][colIndex - 1] : null,
  ];

  // compact will clear both nulls an 0 (dead cells)
  return compact(neighbours).length;
};

// 1 is for alive, 0 is for dead
const isRandomlyAlive = () => Math.round(Math.random());
const isAlive = (
  rowIndex: number,
  colIndex: number,
  field: FieldData
): boolean => {
  const isCurrentlyAlive = Boolean(field[rowIndex][colIndex]);
  const aliveNeighboursCount = getAliveNeighboursCount(
    rowIndex,
    colIndex,
    field
  );

  // cell becomes alive only when there are 3 alive neighbours
  if (!isCurrentlyAlive) {
    return aliveNeighboursCount === 3;
  }

  if (aliveNeighboursCount < 2 || aliveNeighboursCount > 3) {
    return false;
  }

  return true;
};

export const initialFieldData = (): FieldData =>
  times(CELLS_IN_COLUMN, () => times(CELLS_IN_ROW, isRandomlyAlive));

export const calculateNextTickFieldData = (field: FieldData): FieldData =>
  field.map((row, rowIndex) =>
    row.map((cell, colIndex) => (isAlive(rowIndex, colIndex, field) ? 1 : 0))
  );
