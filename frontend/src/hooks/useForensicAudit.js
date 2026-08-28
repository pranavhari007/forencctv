import { useCallback } from 'react';
import { useCases } from '../context/CaseContext';
import { useNotification } from '../context/NotificationContext';

export const useForensicAudit = () => {
  const { addCustodyBlock, activeCase } = useCases();
  const { notifySuccess, notifyWarning } = useNotification();

  const recordEvent = useCallback((action, details, evidenceId = 'EVD-SYS') => {
    const block = addCustodyBlock({
      action,
      details,
      evidenceId
    });
    notifySuccess(`Custody Block Anchored: #${block.blockHeight}`, details);
    return block;
  }, [addCustodyBlock, notifySuccess]);

  return { recordEvent };
};
