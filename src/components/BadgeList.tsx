import React, { useState } from 'react';
import { Badge, BadgeType } from '../types';
import BadgeCard from './BadgeCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface BadgeListProps {
  badges: Badge[];
  userBadges: Badge[];
}

const BadgeList: React.FC<BadgeListProps> = ({ badges, userBadges }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<BadgeType[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  
  // Get unique universities from badges
  const universities = Array.from(new Set(badges.map(badge => badge.university)));
  
  // Filter badges based on search term and filters
  const filteredBadges = badges.filter(badge => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Badge type filter
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(badge.type);
    
    // University filter
    const matchesUniversity = selectedUniversity === '' || badge.university === selectedUniversity;
    
    return matchesSearch && matchesType && matchesUniversity;
  });
  
  // Check if a badge is owned by the user
  const isBadgeOwned = (badgeId: string) => {
    return userBadges.some(userBadge => userBadge.id === badgeId);
  };
  
  // Toggle badge type selection
  const toggleBadgeType = (type: BadgeType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Badges</h1>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search badges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="relative">
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">All Universities</option>
              {universities.map(university => (
                <option key={university} value={university}>
                  {university}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <SlidersHorizontal className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
      
      {/* Badge Type Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {Object.values(BadgeType).map(type => (
          <button
            key={type}
            onClick={() => toggleBadgeType(type)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedTypes.includes(type)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Badges Grid */}
      {filteredBadges.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBadges.map(badge => (
            <BadgeCard 
              key={badge.id} 
              badge={badge} 
              isOwned={isBadgeOwned(badge.id)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No badges found matching your filters.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedTypes([]);
              setSelectedUniversity('');
            }}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BadgeList;