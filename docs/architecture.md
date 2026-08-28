# ForenCCTV Architecture & System Data Flow

**Smart India Hackathon 2026**
- **PS ID**: `SIH26150`
- **Theme**: Blockchain & Cybersecurity
- **Category**: Software

---

## ??? End-to-End Forensic Pipeline

```
[Seized CCTV Storage Media]
(Hikvision, Dahua, CP Plus, Honeywell, TP-Link, Godrej, Uniview, Matrix)
                   ¦
                   ?
+-------------------------------------------------------------+
¦ 1. HARDWARE WRITE-BLOCKER ACQUISITION (Tableau / WiebeTech) ¦
¦    - Read-only hardware lock prevents host write commands   ¦
¦    - Bit-stream imaging (.E01 / .DD / .RAW)                 ¦
¦    - Simultaneous Dual-Hash (SHA-256 & MD5)                 ¦
+-------------------------------------------------------------+
                               ¦
                               ?
+-------------------------------------------------------------+
¦ 2. VENDOR & PROPRIETARY SIGNATURE DETECTION                 ¦
¦    - Sector 0x0000 header magic bytes (DHAV, HKH, WFS, UNV) ¦
¦    - Partition geometry parser (DHFS 4.1, HIKFS 2.0, WFS)   ¦
¦    - Extraction profile assignment                          ¦
+-------------------------------------------------------------+
                               ¦
                               ?
+-------------------------------------------------------------+
¦ 3. DEEP FORENSIC CARVING ENGINE                             ¦
¦    - Unallocated LBA sector cluster scanner                 ¦
¦    - SPS/PPS NAL unit reconstructor (H.264 / H.265 / MP4)   ¦
¦    - Rebuilds deleted or unindexed video fragments          ¦
+-------------------------------------------------------------+
                               ¦
                               ?
+-------------------------------------------------------------+
¦ 4. MULTI-CAMERA AI COMPUTER VISION SUITE                    ¦
¦    - Biometric face recognition against crime databases     ¦
¦    - Automatic License Plate Recognition (ALPR) OCR         ¦
¦    - Cross-camera appearance matching ("Red jacket male")   ¦
+-------------------------------------------------------------+
                               ¦
                               ?
+-------------------------------------------------------------+
¦ 5. UNIFIED TIMELINE & RTC DRIFT CALIBRATION                 ¦
¦    - Corrects unsynchronized DVR internal clock skew        ¦
¦    - Multi-track timeline synchronization (UTC normalized)  ¦
¦    - Suspect movement route mapping                         ¦
+-------------------------------------------------------------+
                               ¦
                               ?
+-------------------------------------------------------------+
¦ 6. IMMUTABLE BLOCKCHAIN CHAIN-OF-CUSTODY AUDIT              ¦
¦    - ECDSA-secp256k1 digital signatures                     ¦
¦    - SHA-256 Merkle root verification                       ¦
¦    - Tamper-evident proof-of-authority ledger               ¦
+-------------------------------------------------------------+
                               ¦
                               ?
+-------------------------------------------------------------+
¦ 7. COURT-ADMISSIBLE FORENSIC REPORT GENERATION              ¦
¦    - Section 65B (Indian Evidence Act 1872) certificate     ¦
¦    - ISO/IEC 27037:2012 compliance standard                 ¦
¦    - Official laboratory sign-off & PDF export              ¦
+-------------------------------------------------------------+
```

---

## ?? Client-Server Interaction Model

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
