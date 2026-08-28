import { useState, useCallback } from 'react';

export const useDriftCalibration = (initialMinutes = 4, initialSeconds = 17) => {
  const [driftMinutes, setDriftMinutes] = useState(initialMinutes);
  const [driftSeconds, setDriftSeconds] = useState(initialSeconds);
  const [isCalibrated, setIsCalibrated] = useState(true);

  const totalDriftSeconds = driftMinutes * 60 + driftSeconds;

  const applyDriftOffset = useCallback((timestampUtc) => {
    const date = new Date(timestampUtc);
    return new Date(date.getTime() + totalDriftSeconds * 1000).toISOString();
  }, [totalDriftSeconds]);

  return {
    driftMinutes,
    setDriftMinutes,
    driftSeconds,
    setDriftSeconds,
    isCalibrated,
    setIsCalibrated,
    totalDriftSeconds,
    applyDriftOffset
  };
};
