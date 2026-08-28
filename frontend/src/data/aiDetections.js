/**
 * ForenCCTV - AI Computer Vision Detections & Biometric Matches
 */

export const INITIAL_AI_DETECTIONS = [
  {
    id: 'AI-DET-001',
    caseId: 'FC-2026-089',
    camera: 'CAM-01 (Lobby)',
    timestamp: '2026-08-21 02:22:15',
    type: 'person',
    label: 'Suspect-01 (Primary Infiltrator)',
    confidence: 96.4,
    boundingBox: { x: 38, y: 32, w: 22, h: 58 },
    attributes: {
      gender: 'Male (Est. 28-35 yrs)',
      upperClothing: 'Dark Charcoal Tactical Jacket with hood',
      lowerClothing: 'Black Cargo Pants with reflective ankle tab',
      accessories: ['Full Balaclava mask', 'Heavy Nitrile Gloves', 'Blue Lanyard/Card'],
      heightEstimate: '178 cm +/- 3 cm'
    },
    similarityCluster: 'CLUSTER-SUSPECT-A',
    crossCameraMatches: ['CAM-01 @ 02:22:15', 'CAM-02 @ 02:24:32', 'CAM-03 @ 02:44:18', 'CAM-04 @ 03:02:11'],
    threatLevel: 'HIGH',
    notes: 'Used bypass access card on electromagnetic lobby glass latch.'
  },
  {
    id: 'AI-DET-002',
    caseId: 'FC-2026-089',
    camera: 'CAM-01 (Lobby)',
    timestamp: '2026-08-21 02:22:18',
    type: 'person',
    label: 'Suspect-02 (Breach Operator)',
    confidence: 94.8,
    boundingBox: { x: 62, y: 35, w: 24, h: 55 },
    attributes: {
      gender: 'Male (Est. 30-40 yrs)',
      upperClothing: 'Navy Blue Zip Hoodie',
      lowerClothing: 'Dark Denim Jeans',
      accessories: ['Black Ski Cap', 'Heavy Duty Black Backpack (approx 45L)', 'Pry Bar'],
      heightEstimate: '185 cm +/- 4 cm'
    },
    similarityCluster: 'CLUSTER-SUSPECT-B',
    crossCameraMatches: ['CAM-01 @ 02:22:18', 'CAM-02 @ 02:24:35', 'CAM-03 @ 02:35:10', 'CAM-04 @ 03:02:15'],
    threatLevel: 'HIGH',
    notes: 'Carrying heavy load; backpack weight evident from shoulder strap tension.'
  },
  {
    id: 'AI-DET-003',
    caseId: 'FC-2026-089',
    camera: 'CAM-02 (Vault Corridor)',
    timestamp: '2026-08-21 02:24:32',
    type: 'object',
    label: 'Burglary Equipment (Thermal Lance & Heavy Duffel)',
    confidence: 92.1,
    boundingBox: { x: 50, y: 55, w: 20, h: 28 },
    attributes: {
      itemClass: 'Industrial Cutting Equipment / Oxygen Cylinder Pack',
      color: 'Matte Olive / Black Strap',
      dimensionsEstimate: '85cm x 30cm cylindrical',
      potentialOrigin: 'Commercial Metal Fabrication kit'
    },
    similarityCluster: 'EQUIPMENT-01',
    crossCameraMatches: ['CAM-02 @ 02:24:32', 'CAM-03 @ 02:30:15'],
    threatLevel: 'CRITICAL',
    notes: 'Detected high-temperature oxygen thermal lance apparatus.'
  },
  {
    id: 'AI-DET-004',
    caseId: 'FC-2026-089',
    camera: 'CAM-03 (Vault Interior)',
    timestamp: '2026-08-21 02:44:18',
    type: 'face',
    label: 'Unmasked Face Detection (Suspect-01)',
    confidence: 97.2,
    boundingBox: { x: 44, y: 22, w: 14, h: 18 },
    attributes: {
      gender: 'Male',
      facialHair: 'Trimmed stubble beard',
      distinguishingMarks: 'Linear scar above right eyebrow (2.5cm)',
      fslDatabaseMatch: 'MATCH CANDIDATE: #ND-CRIME-2024-9182 (89.4% Biometric Cosine Similarity)'
    },
    similarityCluster: 'CLUSTER-SUSPECT-A',
    crossCameraMatches: ['CAM-03 @ 02:44:18 (Clear Face Anchor)'],
    threatLevel: 'CRITICAL',
    notes: 'Recovered from unallocated sector video carving. Balaclava pulled down for 8.4 seconds.'
  },
  {
    id: 'AI-DET-005',
    caseId: 'FC-2026-089',
    camera: 'CAM-04 (Alleyway Dock)',
    timestamp: '2026-08-21 02:18:10',
    type: 'vehicle',
    label: 'Getaway SUV (White Toyota Fortuner)',
    confidence: 98.4,
    boundingBox: { x: 25, y: 40, w: 45, h: 42 },
    attributes: {
      make: 'Toyota',
      model: 'Fortuner 2.8 4x4 (2022-2024)',
      color: 'Pearl White (Metallic)',
      licensePlate: 'DL 08 CA 4421',
      plateConfidence: 98.7,
      uniqueFeatures: 'Tinted black windows (illegal 90% tint), roof rack carrier installed, dent on rear left quarter panel'
    },
    similarityCluster: 'VEHICLE-FORTUNER-WHITE',
    crossCameraMatches: ['CAM-04 @ 02:18:10 (Arrival)', 'CAM-04 @ 03:04:22 (Getaway Departure)'],
    threatLevel: 'CRITICAL',
    notes: 'Vahan database query: Registration belongs to stolen vehicle reported on 2026-08-19.'
  },
  {
    id: 'AI-DET-006',
    caseId: 'FC-2026-089',
    camera: 'CAM-03 (Vault Interior)',
    timestamp: '2026-08-21 02:38:50',
    type: 'motion',
    label: 'Thermal Cutting Heat Signature & Spark Activity',
    confidence: 95.0,
    boundingBox: { x: 70, y: 35, w: 25, h: 30 },
    attributes: {
      eventType: 'Rapid Luminance & Spark Dispersion Spike',
      duration: '4 minutes 22 seconds',
      intensity: 'High Lumens Pulse (Thermal Breach Activity)'
    },
    similarityCluster: 'HEATMAP-BREACH-CH03',
    crossCameraMatches: ['CAM-03 @ 02:38:50'],
    threatLevel: 'CRITICAL',
    notes: 'Corresponds exactly to safe deposit metal barrier thermal degradation.'
  }
];
