/**
 * ForenCCTV - Timeline Normalization & Drift Calibration Service
 */

export const timelineService = {
  calculateNormalizedTimestamp: (rawTimestamp, driftSeconds) => {
    const date = new Date(rawTimestamp);
    return new Date(date.getTime() - driftSeconds * 1000).toISOString();
  }
};
