/**
 * ForenCCTV - AI Forensic Computer Vision Service
 * Face biometric recognition, vehicle OCR, and appearance matching
 */

export const aiForensicsService = {
  filterDetections: (detections, { type = 'ALL', query = '' }) => {
    return detections.filter(d => {
      const matchesType = type === 'ALL' || d.type === type;
      const matchesQuery = !query || 
        d.label.toLowerCase().includes(query.toLowerCase()) ||
        d.camera.toLowerCase().includes(query.toLowerCase()) ||
        (d.attributes?.upperClothing && d.attributes.upperClothing.toLowerCase().includes(query.toLowerCase())) ||
        (d.attributes?.licensePlate && d.attributes.licensePlate.toLowerCase().includes(query.toLowerCase()));
      return matchesType && matchesQuery;
    });
  }
};
