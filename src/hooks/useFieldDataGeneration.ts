import { isEqual } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

import { calculateNextTickFieldData, FieldData, initialFieldData } from '../utils';

export const useFieldDataGeneration = () => {
  const fieldDataRef = useRef<FieldData>(initialFieldData());
  const [tick, setTick] = useState(0);
  const [finished, setFinished] = useState<boolean>();

  useEffect(() => {
    if (tick === 0) {
      return;
    }
    const fieldData = fieldDataRef.current;
    const newFieldData = calculateNextTickFieldData(fieldData);

    if (isEqual(fieldData, newFieldData)) {
      setFinished(true);
    } else {
      fieldDataRef.current = newFieldData;
    }
  }, [tick]);

  const tickInterval = useMemo(() => {
    return setInterval(() => {
      setTick((t) => t + 1);
    }, 400);
  }, []);

  useEffect(() => {
    if (finished) {
      clearTimeout(tickInterval);
      alert("The End!");
    }
  }, [finished, tickInterval]);

  return {
    fieldData: fieldDataRef.current,
  };
};
