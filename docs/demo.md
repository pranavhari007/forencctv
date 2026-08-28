# ForenCCTV Live Demo & SIH Jury Walkthrough Guide

**Smart India Hackathon 2026 (PS ID: SIH26150)**

## 3-Minute Presentation Pitch

1. **The Problem (30s)**:
   - "India has millions of CCTV cameras across 8+ different brands: Hikvision, Dahua, CP Plus, Honeywell, TP-Link, Godrej, Uniview, Matrix."
   - "Every brand uses incompatible proprietary file systems (DHFS, HIKFS, WFS) and codecs (.dav, .264). When footage is deleted or unsynchronized, investigations stall, and evidence gets rejected in court under Section 65B."

2. **The ForenCCTV Solution (90s)**:
   - **Step 1 - Device ID**: Show instant signature detection of all 8 major brands.
   - **Step 2 - Write-Blocked Acquisition**: Demonstrate hardware write-block lock, live bitstream cloning, and simultaneous SHA-256 dual-hashing.
   - **Step 3 - Evidence Analysis**: Show the 4K canvas player with frame stepping, optical zoom (1x to 8x), and Night Vision / Thermal filters.
   - **Step 4 - Video Carving**: Run unallocated sector carving to reconstruct deleted CCTV footage from unindexed clusters.
   - **Step 5 - AI CV & Timeline**: Show cross-camera search for "Red jacket" and calibrate a +4m 17s hardware clock drift into a synchronized unified timeline.
   - **Step 6 - Blockchain Custody**: Trigger the *"Simulate Tamper"* tool to show how a 1-bit modification is instantly flagged in red on the immutable ledger.

3. **The Legal Output (30s)**:
   - "Click *Generate Section 65B PDF* to show a court-admissible forensic certificate compliant with the Indian Evidence Act and ISO/IEC 27037."
