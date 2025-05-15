import React from 'react';
import { Badge } from '../types';
import { Clock, Award, Check, School } from 'lucide-react';

interface BadgeCardProps {
  badge: Badge;
  isOwned?: boolean;
  onClick?: () => void;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge, isOwned = false, onClick }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Determine if badge is active or expired
  const isExpired = badge.expiresAt ? new Date() > badge.expiresAt : false;
  const badgeStatus = isExpired ? 'expired' : 'active';

  return (
    <div 
      onClick={onClick}
      className={`relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-300 
        transform hover:scale-[1.02] hover:shadow-xl cursor-pointer 
        ${isOwned ? 'border-2 border-green-500' : 'border border-gray-200'}
        ${isExpired ? 'opacity-70' : 'opacity-100'}`}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={badge.image} 
          alt={badge.name} 
          className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Badge overlay with info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end text-white">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg leading-tight">{badge.name}</h3>
            {isOwned && (
              <div className="bg-green-500 rounded-full p-1">
                <Check size={16} />
              </div>
            )}
          </div>
          
          <div className="flex items-center text-sm text-white/80">
            <School size={14} className="mr-1" />
            {badge.university}
          </div>
          
          <div className="flex items-center text-sm text-white/80">
            <Award size={14} className="mr-1" />
            {badge.type}
          </div>
          
          <div className="text-xs text-white/70 flex items-center">
            <Clock size={12} className="mr-1" />
            {badgeStatus === 'active' 
              ? `Valid since ${formatDate(badge.issuedAt)}` 
              : `Expired on ${formatDate(badge.expiresAt!)}`
            }
          </div>
        </div>
      </div>
      
      {/* Status indicator */}
      <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium
        ${badgeStatus === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
        {badgeStatus}
      </div>
    </div>
  );
};

export default BadgeCard;