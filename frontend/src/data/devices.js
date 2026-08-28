/**
 * ForenCCTV - Supported DVR/NVR Hardware Architecture & Vendor Profiles
 * 8 Major Surveillance Vendors (Dahua, CP Plus, Hikvision, Honeywell, TP-Link, Godrej, Uniview, Matrix)
 */

export const SUPPORTED_DEVICES = [
  {
    id: 'dahua',
    name: 'Dahua Technology',
    logoText: 'DAHUA',
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/30',
    deviceType: 'DVR / NVR / XVR',
    marketShare: '28% Market Deployment',
    magicBytes: '0x44 0x48 0x41 0x56 [DHAV]',
    filesystem: 'DHFS 4.1 / DHFS 4.0',
    rawFormat: '.dav / .264 (DHAV payload)',
    sectorSize: '512 bytes / 4096 physical',
    timestampEncoding: 'BCD packed datetime (6-byte)',
    parsingEngine: 'libforen_dhav_parser v2.4',
    partitionStructure: 'Raw Index Table @ Sector 0x00000800, Frame Headers @ 0x200 clusters',
    carvingSupport: 'Full SPS/PPS + DHAV NAL unit reconstruction',
    sampleDumps: [
      {
        fileName: 'Dahua_DHI-NVR5216_Disk01_Raw.img',
        size: '1.82 TB Image (500 MB demo dump)',
        firmware: 'V4.001.0000000.18.R.20250912',
        serial: 'DHI-NVR5216-4KS2-20251109B',
        hddModel: 'WD Purple WD40PURZ 4TB Surveillance',
        partitions: 3,
        detectedStreams: 16,
        status: 'Identified (100% Confidence)'
      }
    ]
  },
  {
    id: 'hikvision',
    name: 'Hikvision Digital Technology',
    logoText: 'HIKVISION',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    deviceType: 'NVR / Hybrid DVR / DS-7000 Series',
    marketShare: '34% Market Deployment',
    magicBytes: '0x48 0x4B 0x48 0x20 [HKH ] / 0x48 0x49 0x4B 0x46 [HIKF]',
    filesystem: 'HIKFS 2.0 / HIKFS 1.0 (Embedded ExtFS)',
    rawFormat: '.mp4 (Hik proprietary tag) / .h264 / .h265',
    sectorSize: '4096 bytes (Surveillance 4K sector)',
    timestampEncoding: 'Epoch seconds + 4-byte microsecond offset',
    parsingEngine: 'libforen_hikfs_unpacker v3.1',
    partitionStructure: 'HIK Storage Pool Table with 64-bit cluster addressing',
    carvingSupport: 'Smart265+ GOP Boundary & HIK chunk reconstructor',
    sampleDumps: [
      {
        fileName: 'Hikvision_DS-7616NI-K2_PhysicalDrive2.dd',
        size: '2.0 TB Image (650 MB demo dump)',
        firmware: 'V4.74.010 build 250815',
        serial: 'DS7616NIK220250810CCRR98231',
        hddModel: 'Seagate SkyHawk AI 6TB',
        partitions: 2,
        detectedStreams: 12,
        status: 'Identified (100% Confidence)'
      }
    ]
  },
  {
    id: 'cpplus',
    name: 'CP Plus (Aditya Infotech)',
    logoText: 'CP PLUS',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    deviceType: 'DVR (Cosmic/Orange) & Indigo NVR',
    marketShare: '18% Indian Market Deployment',
    magicBytes: '0x44 0x48 0x41 0x56 [DHAV-CP] / 0x57 0x46 0x53 [WFS]',
    filesystem: 'DHFS-CP 3.2 / WFS 0.4',
    rawFormat: '.dav / .asf (CP Container)',
    sectorSize: '512 bytes',
    timestampEncoding: '32-bit timestamp field with UTC+5:30 offset',
    parsingEngine: 'libforen_cpplus_cosmic v2.0',
    partitionStructure: 'Modified Master Allocation Index with Cyclic Ring-Buffer',
    carvingSupport: 'Stream descriptor recovery & fragmented block re-chaining',
    sampleDumps: [
      {
        fileName: 'CP_Plus_CP-UVR-0801E1_ForensicRaw.E01',
        size: '1.0 TB Expert Witness Image',
        firmware: 'CP-V3.200.0000.0.R.20250311',
        serial: 'CP-UVR-202503-IN-7782',
        hddModel: 'Toshiba S300 Surveillance 2TB',
        partitions: 1,
        detectedStreams: 8,
        status: 'Identified (100% Confidence)'
      }
    ]
  },
  {
    id: 'honeywell',
    name: 'Honeywell Commercial Security',
    logoText: 'HONEYWELL',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    deviceType: 'MAXPRO NVR / Performance Series',
    marketShare: '7% Enterprise & Bank Deployment',
    magicBytes: '0x48 0x4E 0x59 0x57 [HNYW] / 0x50 0x4B 0x54 [PKT]',
    filesystem: 'Honeywell Encrypted Block FS / NTFS-Secured',
    rawFormat: '.hvw / .mp4 (AES-CTR authenticated container)',
    sectorSize: '4096 bytes',
    timestampEncoding: 'ISO 8601 millisecond epoch with NTP audit tag',
    parsingEngine: 'libforen_maxpro_stream v1.9',
    partitionStructure: 'Encrypted LUN table with tamper-evident metadata tree',
    carvingSupport: 'NAL header decryption & key-stream frame aligner',
    sampleDumps: [
      {
        fileName: 'Honeywell_MAXPRO_HEN16204_LUN0.raw',
        size: '4.0 TB Enterprise Array Dump',
        firmware: 'HNW-MP-R5.8.2-Build2025',
        serial: 'HEN16204-US-20250199',
        hddModel: 'WD Gold Enterprise 8TB',
        partitions: 4,
        detectedStreams: 16,
        status: 'Identified (99.8% Confidence)'
      }
    ]
  },
  {
    id: 'tplink',
    name: 'TP-Link VIGI Series',
    logoText: 'TP-LINK VIGI',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    deviceType: 'VIGI NVR1008H / VIGI NVR1016H',
    marketShare: '5% SMB Deployment',
    magicBytes: '0x54 0x50 0x4C 0x4B [TPLK] / 0x56 0x49 0x47 0x49 [VIGI]',
    filesystem: 'VIGI-FS 1.2 / Ext4 Surveillance Variant',
    rawFormat: '.mp4 / .vigi stream',
    sectorSize: '512 / 4096 bytes',
    timestampEncoding: '64-bit UTC microsecond integer',
    parsingEngine: 'libforen_vigi_parser v1.5',
    partitionStructure: 'Standard GPT with VIGI Index Inode tables',
    carvingSupport: 'H.265+ smart stream carving & index reconstruction',
    sampleDumps: [
      {
        fileName: 'TPLink_VIGI_NVR1016H_RawClone.dd',
        size: '2.0 TB Physical Clone',
        firmware: 'VIGI_NVR1016H_V1_250619',
        serial: '224B680019241',
        hddModel: 'WD Purple 2TB',
        partitions: 2,
        detectedStreams: 8,
        status: 'Identified (100% Confidence)'
      }
    ]
  },
  {
    id: 'godrej',
    name: 'Godrej Security Solutions',
    logoText: 'GODREJ',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    deviceType: 'SeeThru DVR & EVE NVR Series',
    marketShare: '4% Retail / Residential Deployment',
    magicBytes: '0x47 0x44 0x52 0x4A [GDRJ] / 0x53 0x54 0x48 0x52 [STHR]',
    filesystem: 'SeeThru-FS v2 / FAT32 Modified Block Layout',
    rawFormat: '.gdr / .264 (Godrej Frame Header)',
    sectorSize: '512 bytes',
    timestampEncoding: 'Standard Indian Standard Time (IST) offset BCD',
    parsingEngine: 'libforen_seethru_extractor v1.4',
    partitionStructure: 'Single continuous recording track with bitmap allocation',
    carvingSupport: 'Unindexed sector carver with audio/video stream demuxing',
    sampleDumps: [
      {
        fileName: 'Godrej_SeeThru_4Ch_Seized_Disk.img',
        size: '1.0 TB Image',
        firmware: 'GDR-ST-4C-2024.11',
        serial: 'GD-ST4-2024-9982',
        hddModel: 'Seagate BarraCuda 1TB',
        partitions: 1,
        detectedStreams: 4,
        status: 'Identified (100% Confidence)'
      }
    ]
  },
  {
    id: 'uniview',
    name: 'Uniview (UNV)',
    logoText: 'UNIVIEW',
    badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    deviceType: 'Ultra 265 NVR Series (NVR301/302)',
    marketShare: '3% Critical Infrastructure',
    magicBytes: '0x55 0x4E 0x56 0x30 [UNV0] / 0x55 0x46 0x53 0x31 [UFS1]',
    filesystem: 'UNV-UFS 3.0 / Linux RAID-Surveillance',
    rawFormat: '.unv / .ts (Ultra 265 compression)',
    sectorSize: '4096 bytes',
    timestampEncoding: 'Epoch milliseconds with camera ID hash tag',
    parsingEngine: 'libforen_unv_ufs v2.1',
    partitionStructure: 'Dynamic Slice Allocation with UB-Tree index',
    carvingSupport: 'Deep carving for Ultra 265 I-frames & motion metadata',
    sampleDumps: [
      {
        fileName: 'Uniview_NVR302-16E2_Drive1.raw',
        size: '4.0 TB Raw Dump',
        firmware: 'UNV-B3821P20-20250410',
        serial: '210235C14S3207000109',
        hddModel: 'Seagate SkyHawk 4TB',
        partitions: 2,
        detectedStreams: 16,
        status: 'Identified (100% Confidence)'
      }
    ]
  },
  {
    id: 'matrix',
    name: 'Matrix Comsec',
    logoText: 'MATRIX SATATYA',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    deviceType: 'SATATYA NVR / Enterprise Video Management',
    marketShare: '2% Government & Industrial Deployment',
    magicBytes: '0x4D 0x54 0x52 0x58 [MTRX] / 0x53 0x41 0x54 0x41 [SATA]',
    filesystem: 'SATATYA Direct-to-Disk FS',
    rawFormat: '.mat / .mp4 (Enterprise secured header)',
    sectorSize: '4096 bytes',
    timestampEncoding: 'UTC ISO-8601 with hardware crypto checksum',
    parsingEngine: 'libforen_satatya_direct v2.2',
    partitionStructure: 'Raw contiguous block allocation without conventional partition table',
    carvingSupport: 'Proprietary chunk scanner with cryptographic seal validation',
    sampleDumps: [
      {
        fileName: 'Matrix_SATATYA_NVRX_Array1.E01',
        size: '3.0 TB Image',
        firmware: 'MX-SATATYA-V3.6.1-2025',
        serial: 'MTX-NVR-2025-00441',
        hddModel: 'WD Purple Pro 6TB',
        partitions: 1,
        detectedStreams: 16,
        status: 'Identified (100% Confidence)'
      }
    ]
  }
];

export const VENDORS_DATA = SUPPORTED_DEVICES; // Alias for backward-compatibility
