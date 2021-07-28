import { useFieldDataGeneration } from '../hooks';
import Cell from './Cell';

export default function Field() {
  const { fieldData } = useFieldDataGeneration();

  return (
    <div className="field">
      {fieldData?.map((row, rowIndex) => (
        <div className="field-row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} alive={Boolean(cell)} />
          ))}
        </div>
      ))}
    </div>
  );
}
