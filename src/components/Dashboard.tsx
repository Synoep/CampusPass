import React from 'react';
import { Badge, AccessPoint, User } from '../types';
import BadgeCard from './BadgeCard';
import AccessPointCard from './AccessPointCard';
import { AlertTriangle, Award, CheckCircle, Clock, Info, Users } from 'lucide-react';

interface DashboardProps {
  user: User;
  badges: Badge[];
  accessPoints: AccessPoint[];
  onAccessAttempt: (accessPoint: AccessPoint, hasAccess: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  badges, 
  accessPoints,
  onAccessAttempt
}) => {
  const userBadges = user.badges;
  const userBadgeIds = userBadges.map(badge => badge.id);
  
  // Filter access points by accessibility
  const accessiblePoints = accessPoints.filter(point => 
    point.requiredBadges.every(id => userBadgeIds.includes(id))
  );
  
  const inaccessiblePoints = accessPoints.filter(point => 
    !point.requiredBadges.every(id => userBadgeIds.includes(id))
  );

  // Stats
  const digitalAccessCount = accessiblePoints.filter(point => point.type === 'digital').length;
  const physicalAccessCount = accessiblePoints.filter(point => point.type === 'physical').length;
  const badgeCount = userBadges.length;
  const pendingBadgeCount = badges.length - badgeCount;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome back, {user.name}
        </h1>
        <p className="text-gray-600">
          Your digital identity is active. Below is a summary of your access credentials.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 rounded-lg p-4 flex flex-col border border-blue-100">
            <div className="flex items-center">
              <Award className="text-blue-600 h-5 w-5 mr-2" />
              <span className="text-blue-800 font-medium">My Badges</span>
            </div>
            <p className="text-2xl font-bold text-blue-900 mt-2">{badgeCount}</p>
            <p className="text-sm text-blue-700 mt-1">Active credentials</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 flex flex-col border border-green-100">
            <div className="flex items-center">
              <CheckCircle className="text-green-600 h-5 w-5 mr-2" />
              <span className="text-green-800 font-medium">Digital Access</span>
            </div>
            <p className="text-2xl font-bold text-green-900 mt-2">{digitalAccessCount}</p>
            <p className="text-sm text-green-700 mt-1">Online resources available</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 flex flex-col border border-purple-100">
            <div className="flex items-center">
              <Users className="text-purple-600 h-5 w-5 mr-2" />
              <span className="text-purple-800 font-medium">Physical Access</span>
            </div>
            <p className="text-2xl font-bold text-purple-900 mt-2">{physicalAccessCount}</p>
            <p className="text-sm text-purple-700 mt-1">Campus locations accessible</p>
          </div>
          
          <div className="bg-amber-50 rounded-lg p-4 flex flex-col border border-amber-100">
            <div className="flex items-center">
              <Clock className="text-amber-600 h-5 w-5 mr-2" />
              <span className="text-amber-800 font-medium">Pending</span>
            </div>
            <p className="text-2xl font-bold text-amber-900 mt-2">{pendingBadgeCount}</p>
            <p className="text-sm text-amber-700 mt-1">Badges available to earn</p>
          </div>
        </div>
      </div>
      
      {/* My Badges Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">My Badges</h2>
          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All Badges
          </a>
        </div>
        
        {userBadges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userBadges.map(badge => (
              <BadgeCard key={badge.id} badge={badge} isOwned={true} />
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-center">
            <AlertTriangle className="text-yellow-500 h-5 w-5 mr-3" />
            <p className="text-yellow-700">
              You don't have any badges yet. Connect your wallet or verify your university email to claim your first badge.
            </p>
          </div>
        )}
      </div>
      
      {/* Available Access Points */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Available Access Points</h2>
          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </a>
        </div>
        
        {accessiblePoints.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {accessiblePoints.map(point => (
              <AccessPointCard 
                key={point.id} 
                accessPoint={point} 
                userBadges={userBadges}
                onAccessAttempt={onAccessAttempt}
              />
            ))}
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center">
            <Info className="text-blue-500 h-5 w-5 mr-3" />
            <p className="text-blue-700">
              No access points are currently available with your credentials. Earn more badges to unlock access.
            </p>
          </div>
        )}
      </div>
      
      {/* Locked Access Points */}
      {inaccessiblePoints.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Locked Access Points</h2>
            <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
              Explore Requirements
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {inaccessiblePoints.slice(0, 4).map(point => (
              <AccessPointCard 
                key={point.id} 
                accessPoint={point} 
                userBadges={userBadges}
                onAccessAttempt={onAccessAttempt}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;