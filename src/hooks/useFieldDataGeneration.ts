import { isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { FieldData } from '../types';
import { calculateNextTickFieldData, initialFieldData } from '../utils';

export const useFieldDataGeneration = ({
  rowsNum,
  columnsNum,
}: {
  rowsNum?: number;
  columnsNum?: number;
}) => {
  const fieldDataRef = useRef<FieldData>(initialFieldData(rowsNum, columnsNum));
  const [tick, setTick] = useState(0);
  const [finished, setFinished] = useState<boolean>();

  useEffect(() => {
    if (!finished) {
      setTimeout(() => {
        setTick((t) => t + 1);
      }, 400);
    }

    if (tick === 0) {
      // initial field data is already set
      return;
    }

    const fieldData = fieldDataRef.current;
    const newFieldData = calculateNextTickFieldData(fieldData);

    if (tick % 5 === 0 && isEqual(fieldData, newFieldData)) {
      setFinished(true);
    } else {
      fieldDataRef.current = newFieldData;
    }
  }, [tick, finished]);

  useEffect(() => {
    if (finished) {
      window.alert("The game is over ;)");
    }
  }, [finished]);

  return {
    fieldData: fieldDataRef.current,
  };
};
