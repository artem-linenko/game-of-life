import { compact, times } from 'lodash';

import { FieldData } from '../types';

const ROWS_NUM = 50;
const COLUMNS_NUM = 50;

export const getAliveNeighboursCount = (
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
  // this can be avoided by only storing alive cells in the array but preserved for the sake of readability
  return compact(neighbours).length;
};

// 1 is for alive, 0 is for dead
export const isRandomlyAlive = (): number => Math.round(Math.random());

export const isAlive = (
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

export const initialFieldData = (
  rowsNum = ROWS_NUM,
  columnsNum = COLUMNS_NUM
): FieldData => times(columnsNum, () => times(rowsNum, isRandomlyAlive));

export const calculateNextTickFieldData = (field: FieldData): FieldData =>
  field.map((row, rowIndex) =>
    row.map((cell, colIndex) => (isAlive(rowIndex, colIndex, field) ? 1 : 0))
  );
