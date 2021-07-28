import { useEffect, useState } from 'react';

import { calculateNextTickFieldData, FieldData, initialFieldData } from '../utils';
import Cell from './Cell';

export default function Field() {
  const [tick, setTick] = useState(0);
  const [fieldData, setFieldData] = useState<FieldData>(initialFieldData());

  useEffect(() => {
    if (tick === 0) {
      return;
    }

    setFieldData(calculateNextTickFieldData(fieldData));
  }, [tick, fieldData]);

  // setTimeout(() => {
  //   setTick((t) => t + 1);
  // }, 1000);

  return (
    <div className="field">
      {fieldData?.map((row) => (
        <div className="field-row">
          {row.map((cell) => (
            <Cell alive={Boolean(cell)} />
          ))}
        </div>
      ))}
    </div>
  );
}
