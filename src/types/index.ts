export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  university: string;
  type: BadgeType;
  requirements: string;
  issuedAt: Date;
  expiresAt?: Date;
}

export enum BadgeType {
  COURSE = 'course',
  EVENT = 'event',
  CLUB = 'club',
  FACILITY = 'facility',
  ACHIEVEMENT = 'achievement'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  university: string;
  badges: Badge[];
  isConnected: boolean;
}

export interface AccessPoint {
  id: string;
  name: string;
  description: string;
  type: 'digital' | 'physical';
  requiredBadges: string[];
  university: string;
  location?: string;
  capacity?: number;
  currentAttendance?: number;
}

export interface University {
  id: string;
  name: string;
  logo: string;
  accessPoints: AccessPoint[];
  badges: Badge[];
}