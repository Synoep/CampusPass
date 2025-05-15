import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { mockUser } from '../data/mockData';

interface WalletContextType {
  user: User | null;
  isConnecting: boolean;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = async () => {
      // In a real app, this would check local storage or a session cookie
      const hasSession = localStorage.getItem('bitbadges_session');
      if (hasSession) {
        try {
          // This would fetch the user's data from an API in a real app
          setUser(mockUser);
        } catch (err) {
          console.error('Failed to restore session:', err);
        }
      }
    };

    checkExistingSession();
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // In a real app, this would trigger the BitBadges or web3 wallet connection flow
      // For now, we're just simulating with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock the user data for demonstration
      setUser(mockUser);
      
      // In a real app, we would save the session
      localStorage.setItem('bitbadges_session', 'connected');
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setUser(null);
    localStorage.removeItem('bitbadges_session');
  };

  return (
    <WalletContext.Provider value={{
      user,
      isConnecting,
      error,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};