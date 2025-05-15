import { AccessPoint, Badge, BadgeType, University, User } from '../types';

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Computer Science Major',
    description: 'Verified Computer Science student',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    university: 'Eastern Michigan University',
    type: BadgeType.COURSE,
    requirements: 'Enrolled in Computer Science program',
    issuedAt: new Date('2023-09-01'),
    expiresAt: new Date('2024-06-30')
  },
  {
    id: '2',
    name: 'Hackathon Participant',
    description: 'Participated in the 2023 University Hackathon',
    image: 'https://images.pexels.com/photos/7102/notes-macbook-study-conference.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    university: 'Virginia Tech',
    type: BadgeType.EVENT,
    requirements: 'Registered and participated in the hackathon',
    issuedAt: new Date('2023-11-15')
  },
  {
    id: '3',
    name: 'Blockchain Club Member',
    description: 'Active member of the university blockchain club',
    image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    university: 'Oakland University',
    type: BadgeType.CLUB,
    requirements: 'Attended at least 3 club meetings',
    issuedAt: new Date('2023-10-05')
  },
  {
    id: '4',
    name: 'Research Lab Access',
    description: 'Authorized access to the AI research laboratory',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    university: 'Thomas Edison State University',
    type: BadgeType.FACILITY,
    requirements: 'Graduate student in AI research program',
    issuedAt: new Date('2023-09-15'),
    expiresAt: new Date('2024-09-15')
  },
  {
    id: '5',
    name: 'Dean\'s List 2023',
    description: 'Achieved academic excellence with GPA above 3.8',
    image: 'https://images.pexels.com/photos/8617943/pexels-photo-8617943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    university: 'Eastern University',
    type: BadgeType.ACHIEVEMENT,
    requirements: 'GPA above 3.8 for the academic year',
    issuedAt: new Date('2023-12-20')
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Shivam Tiwari',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  university: 'Eastern Michigan University',
  badges: mockBadges.slice(0, 3),
  isConnected: true
};

export const mockAccessPoints: AccessPoint[] = [
  {
    id: '1',
    name: 'Computer Science Discord',
    description: 'Official CS department Discord server',
    type: 'digital',
    requiredBadges: ['1'],
    university: 'Eastern Michigan University'
  },
  {
    id: '2',
    name: 'Spring Hackathon 2024',
    description: 'Annual university hackathon event',
    type: 'physical',
    requiredBadges: ['2'],
    university: 'Virginia Tech',
    location: 'Student Union Building',
    capacity: 200,
    currentAttendance: 143
  },
  {
    id: '3',
    name: 'Blockchain Development Workshop',
    description: 'Weekly workshop for blockchain enthusiasts',
    type: 'physical',
    requiredBadges: ['3'],
    university: 'Oakland University',
    location: 'Technology Center, Room 305',
    capacity: 50,
    currentAttendance: 32
  },
  {
    id: '4',
    name: 'AI Research Lab',
    description: 'Specialized laboratory for AI research',
    type: 'physical',
    requiredBadges: ['4'],
    university: 'Thomas Edison State University',
    location: 'Science Building, Wing B'
  },
  {
    id: '5',
    name: 'Academic Excellence Community',
    description: 'Private online community for top students',
    type: 'digital',
    requiredBadges: ['5'],
    university: 'Eastern University'
  }
];

export const mockUniversities: University[] = [
  {
    id: '1',
    name: 'Eastern Michigan University',
    logo: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    accessPoints: mockAccessPoints.filter(ap => ap.university === 'Eastern Michigan University'),
    badges: mockBadges.filter(badge => badge.university === 'Eastern Michigan University')
  },
  {
    id: '2',
    name: 'Virginia Tech',
    logo: 'https://images.pexels.com/photos/6147276/pexels-photo-6147276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    accessPoints: mockAccessPoints.filter(ap => ap.university === 'Virginia Tech'),
    badges: mockBadges.filter(badge => badge.university === 'Virginia Tech')
  },
  {
    id: '3',
    name: 'Oakland University',
    logo: 'https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    accessPoints: mockAccessPoints.filter(ap => ap.university === 'Oakland University'),
    badges: mockBadges.filter(badge => badge.university === 'Oakland University')
  },
  {
    id: '4',
    name: 'Thomas Edison State University',
    logo: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    accessPoints: mockAccessPoints.filter(ap => ap.university === 'Thomas Edison State University'),
    badges: mockBadges.filter(badge => badge.university === 'Thomas Edison State University')
  },
  {
    id: '5',
    name: 'Eastern University',
    logo: 'https://images.pexels.com/photos/159752/books-read-stack-literature-159752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    accessPoints: mockAccessPoints.filter(ap => ap.university === 'Eastern University'),
    badges: mockBadges.filter(badge => badge.university === 'Eastern University')
  }
];