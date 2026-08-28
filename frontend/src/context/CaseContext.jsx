import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CASES } from '../data/cases';
import { INITIAL_EVIDENCE } from '../data/evidence';
import { INITIAL_CARVED_FILES } from '../data/carvedFiles';
import { INITIAL_AI_DETECTIONS } from '../data/aiDetections';
import { INITIAL_TIMELINE_EVENTS } from '../data/timeline';
import { INITIAL_CUSTODY_LOG } from '../data/blockchain';

const CaseContext = createContext(null);

export const CaseProvider = ({ children }) => {
  const [cases, setCases] = useState(() => {
    const saved = localStorage.getItem('forencctv_cases');
    return saved ? JSON.parse(saved) : INITIAL_CASES;
  });

  const [activeCaseId, setActiveCaseId] = useState(() => {
    return localStorage.getItem('forencctv_active_case') || 'FC-2026-089';
  });

  const [evidenceList, setEvidenceList] = useState(() => {
    const saved = localStorage.getItem('forencctv_evidence');
    return saved ? JSON.parse(saved) : INITIAL_EVIDENCE;
  });

  const [carvedFiles, setCarvedFiles] = useState(() => {
    const saved = localStorage.getItem('forencctv_carved');
    return saved ? JSON.parse(saved) : INITIAL_CARVED_FILES;
  });

  const [aiDetections, setAiDetections] = useState(() => {
    const saved = localStorage.getItem('forencctv_ai');
    return saved ? JSON.parse(saved) : INITIAL_AI_DETECTIONS;
  });

  const [timelineEvents, setTimelineEvents] = useState(() => {
    const saved = localStorage.getItem('forencctv_timeline');
    return saved ? JSON.parse(saved) : INITIAL_TIMELINE_EVENTS;
  });

  const [custodyLog, setCustodyLog] = useState(() => {
    const saved = localStorage.getItem('forencctv_custody');
    return saved ? JSON.parse(saved) : INITIAL_CUSTODY_LOG;
  });

  const [tamperedBlockIndex, setTamperedBlockIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('forencctv_cases', JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem('forencctv_active_case', activeCaseId);
  }, [activeCaseId]);

  useEffect(() => {
    localStorage.setItem('forencctv_evidence', JSON.stringify(evidenceList));
  }, [evidenceList]);

  useEffect(() => {
    localStorage.setItem('forencctv_carved', JSON.stringify(carvedFiles));
  }, [carvedFiles]);

  useEffect(() => {
    localStorage.setItem('forencctv_ai', JSON.stringify(aiDetections));
  }, [aiDetections]);

  useEffect(() => {
    localStorage.setItem('forencctv_timeline', JSON.stringify(timelineEvents));
  }, [timelineEvents]);

  useEffect(() => {
    localStorage.setItem('forencctv_custody', JSON.stringify(custodyLog));
  }, [custodyLog]);

  const activeCase = cases.find(c => c.id === activeCaseId) || cases[0] || INITIAL_CASES[0];
  const activeEvidence = evidenceList.filter(e => e.caseId === activeCaseId);
  const activeCarvedFiles = carvedFiles.filter(c => c.caseId === activeCaseId);
  const activeAiDetections = aiDetections.filter(a => a.caseId === activeCaseId);
  const activeTimelineEvents = timelineEvents.filter(t => t.caseId === activeCaseId);
  const activeCustodyLog = custodyLog.filter(l => l.caseId === activeCaseId);

  const addCase = (newCaseData) => {
    const nextNum = cases.length + 100;
    const newCase = {
      id: `FC-2026-${String(nextNum).padStart(3, '0')}`,
      creationDate: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'ACTIVE',
      priority: newCaseData.priority || 'HIGH',
      evidenceCount: 0,
      recoveredCount: 0,
      aiDetectionsCount: 0,
      timelineEventsCount: 0,
      custodyBlocks: 1,
      integrityVerified: true,
      tags: newCaseData.tags || ['Surveillance Footage', 'Pending Acquisition'],
      ...newCaseData
    };
    
    setCases(prev => [newCase, ...prev]);
    setActiveCaseId(newCase.id);

    const genesisBlock = {
      blockHeight: 140300 + cases.length,
      action: 'CASE_REGISTERED_ON_CHAIN',
      evidenceId: 'GENESIS-' + newCase.id,
      caseId: newCase.id,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      officer: newCase.investigator || 'Digital Evidence Officer',
      badgeId: newCase.investigatorBadge || 'POL-AUTH-2026',
      agency: newCase.agency || 'Cyber Crime Division',
      hardwareAsset: 'ForenCCTV Node Cluster #01 (Genesis Block)',
      sha256: 'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0',
      merkleRoot: 'f0e1d2c3b4a5968778695a4b3c2d1e0f0123456789abcdef0123456789abcdef',
      blockHash: '00000000000000000009f4b8c7e2d19302f849102cae38950bb1237a89e4401',
      status: 'CONFIRMED_ON_CHAIN',
      digitalSignature: 'ECDSA-secp256k1: 304502210088fe12...a901ff2',
      details: `Formal investigation initiated for ${newCase.title} (FIR: ${newCase.caseNumber}). Immutable custody ledger initialized.`
    };
    setCustodyLog(prev => [genesisBlock, ...prev]);

    return newCase;
  };

  const addEvidence = (evidenceData) => {
    const newEvidence = {
      id: `EVD-2026-${activeCaseId.replace('FC-2026-', '')}-${String(activeEvidence.length + 1).padStart(2, '0')}`,
      caseId: activeCaseId,
      acquisitionTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      verificationStatus: 'VERIFIED_MATCH',
      integrityScore: '100% Bit-Exact Match',
      ...evidenceData
    };
    setEvidenceList(prev => [newEvidence, ...prev]);
    setCases(prev => prev.map(c => c.id === activeCaseId ? { ...c, evidenceCount: c.evidenceCount + 1 } : c));

    addCustodyBlock({
      action: 'BITSTREAM_EVIDENCE_ACQUIRED',
      evidenceId: newEvidence.id,
      details: `Acquired forensic stream ${newEvidence.fileName} (${newEvidence.fileSize}) from ${newEvidence.cameraNumber}. Write-block verified. SHA-256 sealed.`
    });

    return newEvidence;
  };

  const addCarvedFile = (carvedData) => {
    const newCarved = {
      id: `CRV-${activeCaseId.replace('FC-2026-', '')}-${String(activeCarvedFiles.length + 1).padStart(3, '0')}`,
      caseId: activeCaseId,
      status: 'Fully Recovered & Re-indexed',
      previewAvailable: true,
      ...carvedData
    };
    setCarvedFiles(prev => [newCarved, ...prev]);
    setCases(prev => prev.map(c => c.id === activeCaseId ? { ...c, recoveredCount: c.recoveredCount + 1 } : c));

    addCustodyBlock({
      action: 'UNALLOCATED_SECTOR_CARVED',
      evidenceId: newCarved.id,
      details: `Deep carved video fragment ${newCarved.carvedFileName} (${newCarved.recoveredSize}) from Sector ${newCarved.startSector}. Confidence: ${newCarved.recoveryConfidence}%.`
    });

    return newCarved;
  };

  const addCustodyBlock = (blockData) => {
    const block = {
      blockHeight: 140300 + custodyLog.length,
      caseId: activeCaseId,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      officer: activeCase.investigator,
      badgeId: activeCase.investigatorBadge,
      agency: activeCase.agency,
      hardwareAsset: 'ForenCCTV Unified Forensic Node',
      sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      merkleRoot: '7e2c9a14bf9d1283c44567e9120baef23940283c4b57e9302ba14f89d38c119b',
      blockHash: `0000000000000000000${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
      status: 'CONFIRMED_ON_CHAIN',
      digitalSignature: 'ECDSA-secp256k1: ' + Math.random().toString(36).substring(2, 15) + '...' + Math.random().toString(36).substring(2, 8),
      ...blockData
    };
    setCustodyLog(prev => [block, ...prev]);
    return block;
  };

  const simulateTampering = (blockIndex) => {
    setTamperedBlockIndex(blockIndex);
  };

  const resetTampering = () => {
    setTamperedBlockIndex(null);
  };

  const stats = {
    totalCases: cases.length,
    activeInvestigations: cases.filter(c => c.status === 'ACTIVE' || c.status === 'IN_ACQUISITION').length,
    evidenceFiles: evidenceList.length,
    verifiedEvidencePercentage: 100,
    carvedRecoveries: carvedFiles.length,
    blockchainBlocks: custodyLog.length,
    supportedVendorsCount: 8
  };

  return (
    <CaseContext.Provider value={{
      cases,
      activeCaseId,
      setActiveCaseId,
      activeCase,
      evidenceList,
      activeEvidence,
      carvedFiles,
      activeCarvedFiles,
      aiDetections,
      activeAiDetections,
      timelineEvents,
      activeTimelineEvents,
      custodyLog,
      activeCustodyLog,
      addCase,
      addEvidence,
      addCarvedFile,
      addCustodyBlock,
      tamperedBlockIndex,
      simulateTampering,
      resetTampering,
      stats
    }}>
      {children}
    </CaseContext.Provider>
  );
};

export const useCases = () => useContext(CaseContext);
