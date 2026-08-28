# ForenCCTV API Specification

Base URL: `http://localhost:5000/api`

## Endpoints

### 1. System Health
- **GET** `/health`
- **Response**: `{ status: "ONLINE", version: "2.4.0", writeBlockEnforced: true }`

### 2. Cases
- **GET** `/cases` - List all registered cases
- **POST** `/cases` - Create case & anchor Genesis Block
- **Payload**:
  ```json
  {
    "title": "State Bank Vault Burglary",
    "caseNumber": "FIR-2026/0412",
    "investigator": "Insp. Rajesh Sharma",
    "jurisdiction": "Sector 18 Cyber Cell"
  }
  ```

### 3. Device Identification
- **POST** `/devices/detect`
- **Payload**: `{ "headerBytesHex": "0x484B4820" }`
- **Response**: `{ "detectedVendor": "hikvision", "confidence": 100 }`

### 4. Acquisition (Write-Block Protected)
- **Header**: `x-forensic-write-block: ACTIVE`
- **POST** `/acquisition/start`
- **Payload**: `{ "sourceChannel": "CAM-01", "format": "E01" }`

### 5. Video Carving
- **POST** `/recovery/carve`
- **Payload**: `{ "startSector": "0x08A00000", "endSector": "0x08F42000" }`

### 6. Blockchain Custody
- **GET** `/custody/blocks` - Retrieve audit trail blocks
- **POST** `/custody/verify` - Validate Merkle root integrity
