# ForenCCTV

**Unified DVR/NVR Forensic Analysis Platform**

**Smart India Hackathon 2026**
- **PS ID**: `SIH26150`
- **Theme**: `Blockchain & Cybersecurity`
- **Category**: `Software`

---

## 1. Problem Statement

Modern surveillance ecosystems in India and worldwide are plagued by extreme vendor fragmentation. Law enforcement, forensic laboratories, and cybercrime cells face severe investigative bottlenecks:

1. **Proprietary Filesystems & Codecs**: Leading brands (Hikvision, Dahua, CP Plus, Honeywell, TP-Link, Godrej, Uniview, Matrix) format hard drives with proprietary file tables (DHFS, HIKFS, WFS) that are unreadable by standard forensic tools and operating systems.
2. **Fragile Video Stream Containers**: Raw surveillance containers (`.dav`, `.264`, `.h265`, `.asf`) cannot be natively played or scrubbed accurately without vendor-specific proprietary software.
3. **Lost & Deleted Footage in Unallocated Space**: Deleted or overwritten surveillance recordings get fragmented across physical clusters, making manual carving arduous.
4. **Hardware RTC Clock Drift**: Unsynchronized DVR internal clocks result in conflicting timestamps across different camera angles.
5. **Chain of Custody Vulnerabilities**: Traditional manual evidence tracking risks tampering allegations, resulting in electronic evidence rejection under Section 65B of the Indian Evidence Act.

---

## 2. Solution

**ForenCCTV** provides a standardized, unified digital forensic platform designed specifically for law enforcement investigators and forensic science laboratories. It automates device identification, hardware-blocked acquisition, signature-based video carving, AI cross-camera correlation, RTC clock drift normalization, and immutable blockchain-anchored chain-of-custody reporting.

```
Different DVR/NVR Vendors (Hikvision, Dahua, CP Plus, Honeywell, TP-Link, Godrej, Uniview, Matrix)
                   ¦
                   ? Proprietary File Systems (DHFS, HIKFS, WFS) & Raw Containers (.dav, .264)
Difficult Evidence Extraction, Lost Deleted Sectors & Broken Chain of Custody
                   ¦
                   ?
--------------------------------------------------------------
       ForenCCTV – Unified Forensic Analysis Workflow
--------------------------------------------------------------
  1. Write-Blocked Bit-Stream Acquisition & Dual Hashing (SHA-256 / MD5)
  2. Proprietary Signature Detection & File System Parser (8+ Vendors)
  3. Forensic Frame Carving for Deleted / Fragmented Footage Recovery
  4. Multi-Camera AI Computer Vision & Synchronized Normalized Timeline
  5. Immutable Blockchain Custody Ledger (Sec 65B Indian Evidence Act compliant)
  6. Court-Admissible Automated Forensic Report Generation (PDF/Print)
```

---

## 3. Core USP

> **"One platform to acquire, recover, analyze, and verify CCTV evidence from multiple DVR/NVR vendors."**

---

## 4. Features

- **Automated Signature & Magic Byte Detection**: Instantly identifies vendor architecture (`0x44484156 [DHAV]`, `0x484B48 [HKH]`, `0x574653 [WFS]`, etc.).
- **Hardware Write-Blocker Status Enforcement**: Ensures 100% read-only acquisition integrity preventing host OS contamination.
- **Simultaneous Dual-Hash Verification**: Generates and checks `SHA-256` and `MD5` pre- and post-acquisition digests.
- **Deep Frame Carving Engine**: Reconstructs orphaned H.264/H.265 SPS/PPS NAL units from unallocated sectors.
- **4K Canvas Surveillance Player**: Optical zoom (1x to 8x), frame-by-frame navigation, and edge/night-vision/thermal filters.
- **AI Computer Vision Suite**: Cross-camera appearance search, face recognition database matching, and vehicle license plate OCR.
- **RTC Clock Drift Compensation**: Normalizes unsynchronized DVR timestamps onto a unified master UTC timeline.
- **Tamper-Evident Blockchain Ledger**: Cryptographically anchors every action with ECDSA-secp256k1 signatures and SHA-256 Merkle root verification.
- **Section 65B Legal Certificate**: Generates court-admissible forensic reports compliant with the Indian Evidence Act and ISO/IEC 27037.

---

## 5. Supported DVR/NVR Vendors

| Vendor | Magic Bytes | Proprietary Filesystem | Raw Container Format | Carving Strategy |
|---|---|---|---|---|
| **Hikvision** | `0x484B4820` [HKH ] | HIKFS 2.0 / HIKFS 1.0 | `.mp4` (Hik tag) / `.h265` | Smart265+ GOP boundary chunk reconstructor |
| **Dahua** | `0x44484156` [DHAV] | DHFS 4.1 / DHFS 4.0 | `.dav` / `.264` | Full SPS/PPS + DHAV NAL reconstruction |
| **CP Plus** | `0x44484156` [DHAV-CP] | DHFS-CP 3.2 / WFS 0.4 | `.dav` / `.asf` | Modified Master Allocation Index cyclic parser |
| **Honeywell** | `0x484E5957` [HNYW] | Honeywell Encrypted Block | `.hvw` / `.mp4` | NAL header decryption & key-stream frame aligner |
| **TP-Link VIGI** | `0x54504C4B` [TPLK] | VIGI-FS 1.2 | `.mp4` / `.vigi` | H.265+ smart stream carving & index rebuilder |
| **Godrej** | `0x4744524A` [GDRJ] | SeeThru-FS v2 | `.gdr` / `.264` | Unindexed sector carver with audio/video demux |
| **Uniview** | `0x554E5630` [UNV0] | UNV-UFS 3.0 | `.unv` / `.ts` | Deep carving for Ultra 265 I-frames & motion |
| **Matrix** | `0x4D545258` [MTRX] | SATATYA Direct-to-Disk | `.mat` / `.mp4` | Proprietary chunk scanner with cryptographic seal |

---

## 6. System Architecture

See detailed architectural diagram and data flows in [docs/architecture.md](docs/architecture.md).

```
+-------------------------+           REST API / WebSocket          +-------------------------+
¦     Frontend Client     ¦ --------------------------------------> ¦     Backend Service     ¦
¦  (React 18 + Vite + UI) ¦ <-------------------------------------- ¦     (Node / Express)    ¦
+-------------------------+                                         +-------------------------+
                                                                                 ¦
                                                                                 ?
                                                                    +-------------------------+
                                                                    ¦ Native Forensic Drivers ¦
                                                                    ¦  - Write-Block IOCTL    ¦
                                                                    ¦  - libforen_dhav_parser ¦
                                                                    ¦  - libforen_hikfs       ¦
                                                                    ¦  - Blockchain RPC Node  ¦
                                                                    +-------------------------+
```

---

## 7. Forensic Workflow

1. **On-Site Seizure**: Anti-static bagging, physical sealing, and Genesis Block initialization.
2. **Write-Blocked Acquisition**: Tableau T8u bridge connection, bitstream clone (`.E01`), and dual-hash logging.
3. **Vendor Profiling**: Magic byte inspection and partition table decoding.
4. **Video Recovery**: Unallocated sector carving for deleted or damaged video streams.
5. **Surveillance Analysis**: Frame scrubbing, optical zoom, and low-light filter enhancements.
6. **AI CV Correlation**: Face biometric search, license plate OCR, and cross-camera tracking.
7. **Timeline Calibration**: Hardware RTC clock drift adjustment (+4m 17s offset sync).
8. **Blockchain Attestation**: Merkle root verification and immutable audit record generation.
9. **Court Reporting**: Section 65B Indian Evidence Act certified PDF generation.

---

## 8. Technology Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS, Framer Motion, Lucide React, Canvas Confetti
- **Backend (Skeleton Architecture)**: Node.js, Express.js, CORS, Dotenv
- **Graphics Engine**: HTML5 Procedural Surveillance Canvas Renderer
- **Compliance & Output**: Section 65B Legal Template, ISO/IEC 27037:2012, Print CSS

---

## 9. Project Structure

```
forencctv/
+-- frontend/                     # React + Vite Client Application
¦   +-- src/
¦   ¦   +-- components/           # Common, Dashboard & Case UI Components
¦   ¦   +-- layouts/              # MainLayout and AuthLayout
¦   ¦   +-- pages/                # Feature Pages (Login, Dashboard, Carving, AI, Custody, etc.)
¦   ¦   +-- services/             # Forensic Service Abstractions
¦   ¦   +-- data/                 # Decoupled Mock Datasets
¦   ¦   +-- context/              # Global React Contexts
¦   ¦   +-- hooks/                # Custom Forensic Hooks
¦   ¦   +-- utils/                # Canvas CCTV Renderer & Formatters
¦   +-- package.json
¦   +-- vite.config.js
¦
+-- backend/                      # Express Backend Architecture Skeleton
¦   +-- src/
¦   ¦   +-- config/
¦   ¦   +-- controllers/
¦   ¦   +-- middleware/
¦   ¦   +-- routes/
¦   ¦   +-- server.js
¦   +-- package.json
¦
+-- docs/                         # In-Depth Documentation
¦   +-- architecture.md
¦   +-- forensic-workflow.md
¦   +-- api.md
¦   +-- demo.md
¦
+-- .gitignore
+-- .env.example
+-- README.md
```

---

## 10. Installation

```bash
# Clone repository
git clone https://github.com/your-username/forencctv.git
cd forencctv

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies (optional)
cd ../backend
npm install
```

---

## 11. Development

```bash
# Start frontend dev server
cd frontend
npm run dev

# Access the application at http://localhost:3000
```

---

## 12. Production Build

```bash
cd frontend
npm run build

# Preview production build
npm run preview
```

---

## 13. Environment Variables

Copy `.env.example` to `.env`:

```env
PORT=5000
NODE_ENV=development
WRITE_BLOCK_STRICT=true
BLOCKCHAIN_RPC_URI=http://localhost:8545
```

---

## 14. Demo Workflow

1. **Login**: Click on any of the 3 one-click Demo Investigator accounts:
   - *Insp. Rajesh Sharma* (`DL-CYBER-8841`)
   - *Dr. Aanya Verma* (`FSL-DIGI-1092`)
   - *SP Vikramaditya Rao* (`CBI-TECH-4091`)
2. **SIH Banner**: Click *"SIH Problem & USP"* to view the multi-vendor fragmentation challenge.
3. **Device Identification**: Switch between Hikvision, Dahua, CP Plus, etc., to inspect live magic byte hex signatures.
4. **Evidence Acquisition**: Click *"Start Bit-Stream Acquisition"* to simulate write-blocked disk imaging and live SHA-256 calculation.
5. **Evidence Analysis**: Use the canvas player with optical zoom (1x to 8x) and Night Vision/Thermal filters.
6. **Video Recovery**: Click *"Scan Unallocated Space"* to carve deleted streams from unindexed clusters.
7. **AI Analysis**: Search for "Red jacket" or "White Fortuner" to see cross-camera matches.
8. **Unified Timeline**: Calibrate a +4m 17s hardware clock drift into synchronized master UTC.
9. **Chain of Custody**: Click *"Simulate Tamper"* to demonstrate immediate cryptographic Merkle failure detection.
10. **Forensic Report**: Click *"Download Section 65B PDF"* to generate court-admissible documentation.

---

## 15. Security Considerations

- **Write-Block Protection**: Strict enforcement of read-only disk mounts prevents accidental evidence destruction.
- **Cryptographic Immutability**: All actions generate ECDSA-signed blocks anchored to a Merkle tree.
- **No Hardcoded Credentials**: API secrets, private keys, and real forensic evidence are excluded from version control.

---

## 16. Limitations

- Forensic recovery, carving, and neural CV in this prototype operate on high-fidelity simulated surveillance datasets for hackathon evaluation.
- Native kernel IOCTL write-block drivers require physical hardware bridge connections in a certified forensic lab environment.

---

## 17. Future Scope

- Integration with native C++ `libforen_dhav` and `libforen_hikfs` binary stream unpackers.
- Hardware FPGA accelerator support for live multi-gigabyte carving.
- Direct integration with State FSL LIMS (Laboratory Information Management Systems).

---

## 18. Team

- **Smart India Hackathon 2026 Team**
- **Problem Statement**: `SIH26150` (Blockchain & Cybersecurity)
