import { useFieldDataGeneration } from '../../hooks';
import { Cell } from '../Cell';

export default function Field({
  rowsNum,
  columnsNum,
}: {
  rowsNum?: number;
  columnsNum?: number;
}) {
  const { fieldData } = useFieldDataGeneration({ rowsNum, columnsNum });

  return (
    <div className="field" data-testid="field">
      {fieldData?.map((row: number[], rowIndex: number) => (
        <div className="field-row" key={rowIndex}>
          {row.map((cell: number, colIndex: number) => (
            <Cell key={colIndex} alive={Boolean(cell)} />
          ))}
        </div>
      ))}
    </div>
  );
}
