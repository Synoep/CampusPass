import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ConnectWallet from './components/ConnectWallet';
import QRCodeModal from './components/QRCodeModal';
import AccessDeniedModal from './components/AccessDeniedModal';
import { mockUser, mockBadges, mockAccessPoints } from './data/mockData';
import { AccessPoint, Badge, User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedAccessPoint, setSelectedAccessPoint] = useState<AccessPoint | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isAccessDeniedModalOpen, setIsAccessDeniedModalOpen] = useState(false);
  
  // Handle connecting wallet
  const handleConnect = () => {
    // In a real app, this would trigger a wallet connection flow
    setUser(mockUser);
  };
  
  // Handle disconnecting wallet
  const handleDisconnect = () => {
    setUser(null);
  };
  
  // Handle access attempt to a facility or digital resource
  const handleAccessAttempt = (accessPoint: AccessPoint, hasAccess: boolean) => {
    setSelectedAccessPoint(accessPoint);
    
    if (hasAccess) {
      if (accessPoint.type === 'physical') {
        setIsQRModalOpen(true);
      } else {
        // For digital resources, we would redirect to the resource or open it in a new tab
        alert(`Redirecting to ${accessPoint.name}...`);
      }
    } else {
      setIsAccessDeniedModalOpen(true);
    }
  };
  
  // Find required badges for the currently selected access point
  const getRequiredBadgesForSelectedAccessPoint = (): Badge[] => {
    if (!selectedAccessPoint) return [];
    
    return mockBadges.filter(badge => 
      selectedAccessPoint.requiredBadges.includes(badge.id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {user ? (
        <>
          <Navbar 
            user={user} 
            onConnect={handleConnect} 
            onDisconnect={handleDisconnect} 
          />
          <Dashboard 
            user={user} 
            badges={mockBadges}
            accessPoints={mockAccessPoints}
            onAccessAttempt={handleAccessAttempt}
          />
        </>
      ) : (
        <ConnectWallet onConnect={handleConnect} />
      )}
      
      {/* Modals */}
      {selectedAccessPoint && (
        <>
          <QRCodeModal 
            accessPoint={selectedAccessPoint}
            isOpen={isQRModalOpen}
            onClose={() => setIsQRModalOpen(false)}
          />
          
          <AccessDeniedModal
            accessPoint={selectedAccessPoint}
            isOpen={isAccessDeniedModalOpen}
            onClose={() => setIsAccessDeniedModalOpen(false)}
            requiredBadges={getRequiredBadgesForSelectedAccessPoint()}
          />
        </>
      )}
    </div>
  );
};

export default App;