import React from 'react';
import { AccessPoint, Badge } from '../types';
import { MapPin, Users, Lock, Unlock, ExternalLink, QrCode } from 'lucide-react';

interface AccessPointCardProps {
  accessPoint: AccessPoint;
  userBadges: Badge[];
  onAccessAttempt: (accessPoint: AccessPoint, hasAccess: boolean) => void;
}

const AccessPointCard: React.FC<AccessPointCardProps> = ({ 
  accessPoint, 
  userBadges,
  onAccessAttempt
}) => {
  // Check if user has required badges
  const userBadgeIds = userBadges.map(badge => badge.id);
  const hasAccess = accessPoint.requiredBadges.every(id => userBadgeIds.includes(id));

  const handleAccessClick = () => {
    onAccessAttempt(accessPoint, hasAccess);
  };

  return (
    <div className={`border rounded-xl overflow-hidden shadow-md transition-all duration-300 
      hover:shadow-lg ${hasAccess ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/20'}`}>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl mb-1">{accessPoint.name}</h3>
            <p className="text-gray-600 text-sm">{accessPoint.description}</p>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
            ${accessPoint.type === 'digital' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
            {accessPoint.type}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-2" />
            {accessPoint.university}
            {accessPoint.location && ` • ${accessPoint.location}`}
          </div>
          
          {accessPoint.capacity && (
            <div className="flex items-center text-sm text-gray-600">
              <Users size={16} className="mr-2" />
              {accessPoint.currentAttendance}/{accessPoint.capacity} attending
              <div className="ml-2 w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(accessPoint.currentAttendance! / accessPoint.capacity) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t px-5 py-3 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center">
          {hasAccess ? (
            <>
              <Unlock size={16} className="text-green-600 mr-1" />
              <span className="text-sm text-green-600 font-medium">Access granted</span>
            </>
          ) : (
            <>
              <Lock size={16} className="text-red-600 mr-1" />
              <span className="text-sm text-red-600 font-medium">Access denied</span>
            </>
          )}
        </div>
        
        <div className="flex space-x-2">
          {accessPoint.type === 'physical' && (
            <button 
              className={`p-2 rounded-full ${hasAccess ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500'}`}
              disabled={!hasAccess}
            >
              <QrCode size={16} />
            </button>
          )}
          
          <button 
            onClick={handleAccessClick}
            className={`px-4 py-2 rounded-md text-sm font-medium transition
              ${hasAccess 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-500'}`}
          >
            {accessPoint.type === 'digital' ? (
              <div className="flex items-center">
                <span>{hasAccess ? 'Enter' : 'Request Access'}</span>
                {hasAccess && <ExternalLink size={14} className="ml-1" />}
              </div>
            ) : (
              <span>{hasAccess ? 'Check In' : 'Request Access'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessPointCard;