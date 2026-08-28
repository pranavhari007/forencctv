import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000, details = '') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    setToasts(prev => [...prev, { id, message, type, details, timestamp: new Date().toLocaleTimeString() }]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const notifySuccess = useCallback((msg, details) => addToast(msg, 'success', 4000, details), [addToast]);
  const notifyError = useCallback((msg, details) => addToast(msg, 'error', 6000, details), [addToast]);
  const notifyWarning = useCallback((msg, details) => addToast(msg, 'warning', 5000, details), [addToast]);
  const notifyInfo = useCallback((msg, details) => addToast(msg, 'info', 4000, details), [addToast]);
  const notifyHashCopied = useCallback((hash) => addToast(`Hash copied to clipboard: ${hash.substring(0, 16)}...`, 'info', 2500), [addToast]);

  return (
    <NotificationContext.Provider value={{
      toasts,
      addToast,
      removeToast,
      notifySuccess,
      notifyError,
      notifyWarning,
      notifyInfo,
      notifyHashCopied
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
