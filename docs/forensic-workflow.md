# Forensic Investigation Workflow & Section 65B Compliance

## ?? Standard Operating Procedure (SOP)

1. **On-Site Seizure & Bagging**
   - Seize physical DVR/NVR unit, hard disks, and power supplies.
   - Seal in anti-static tamper-evident evidence bag with signature tape.
   - Record serial numbers and chain-of-custody genesis timestamp.

2. **Write-Blocked Evidence Acquisition**
   - Connect seized storage directly through a certified hardware write-blocker (e.g., Tableau T8u).
   - Generate bit-exact physical clone in `.E01` (Expert Witness) or `.DD` raw format.
   - Compute and log dual hashes: `SHA-256` and `MD5`.
   - Verify 0 bad sectors and ensure `Pre-Hash == Post-Hash`.

3. **Device Signature & Filesystem Profiling**
   - Run magic byte signature analysis on the cloned image.
   - Identify vendor proprietary structures (`DHAV` for Dahua/CP Plus, `HKH` for Hikvision, etc.).
   - Mount read-only loopback container with specialized extraction driver.

4. **Deep Video Carving**
   - Scan unallocated sectors and corrupted file tables for orphaned H.264/H.265 NAL units.
   - Reconstruct fragmented video streams with confidence scoring.

5. **AI Appearance Search & Cross-Camera Timeline Sync**
   - Detect faces, vehicles, clothing attributes, and tools across all camera feeds.
   - Calibrate internal hardware RTC clock drift (e.g., +4m 17s offset).
   - Normalize timestamps to master UTC.

6. **Blockchain Anchoring & Sec 65B Report**
   - Anchor all forensic steps onto the immutable blockchain custody ledger.
   - Generate Section 65B Indian Evidence Act certificate with cryptographic seals and examiner signatures.
