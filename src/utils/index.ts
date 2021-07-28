import { times } from 'lodash';

const CELLS_IN_ROW = 50;
const CELLS_IN_COLUMN = 50;
export type FieldData = Array<number[]>;

// 1 is for alive, 2 is for dead
const isRandomlyAlive = () => Math.round(Math.random());

export const initialFieldData = (): FieldData =>
  times(CELLS_IN_COLUMN, () => times(CELLS_IN_ROW, isRandomlyAlive));

export const calculateNextTickFieldData = (prevData: FieldData): FieldData =>
  times(CELLS_IN_COLUMN, () => times(CELLS_IN_ROW, isRandomlyAlive));
