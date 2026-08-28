import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_INVESTIGATORS } from '../data/investigators';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('forencctv_user');
    return saved ? JSON.parse(saved) : DEMO_INVESTIGATORS[0];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('forencctv_auth') === 'true' || true;
  });

  const login = (email, password, profileId = null) => {
    let userToSet = DEMO_INVESTIGATORS[0];
    if (profileId) {
      userToSet = DEMO_INVESTIGATORS.find(p => p.id === profileId) || DEMO_INVESTIGATORS[0];
    } else if (email) {
      const match = DEMO_INVESTIGATORS.find(p => p.email.toLowerCase() === email.toLowerCase());
      if (match) userToSet = match;
      else {
        userToSet = {
          id: 'custom-user',
          name: email.split('@')[0].toUpperCase(),
          badgeId: 'AUTH-CUSTOM-7701',
          email: email,
          role: 'Forensic Investigator',
          agency: 'Forensic Examination Unit',
          avatar: email.substring(0, 2).toUpperCase(),
          clearance: 'AUTHORIZED EXAMINER',
          casesAssigned: 1
        };
      }
    }
    setCurrentUser(userToSet);
    setIsAuthenticated(true);
    localStorage.setItem('forencctv_user', JSON.stringify(userToSet));
    localStorage.setItem('forencctv_auth', 'true');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('forencctv_auth');
  };

  const switchProfile = (profileId) => {
    const profile = DEMO_INVESTIGATORS.find(p => p.id === profileId);
    if (profile) {
      setCurrentUser(profile);
      localStorage.setItem('forencctv_user', JSON.stringify(profile));
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      login,
      logout,
      switchProfile,
      demoProfiles: DEMO_INVESTIGATORS
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
