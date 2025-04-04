import { NextResponse } from 'next/server';

const mockBarbers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '555-0101',
    specialties: ['Haircut', 'Beard Trim'],
    photoUrl: '/barbers/john.jpg',
    bio: 'Master barber with 10 years of experience specializing in modern cuts and beard grooming.',
  },
  {
    id: '2',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '555-0102',
    specialties: ['Haircut', 'Kids Haircut'],
    photoUrl: '/barbers/mike.jpg',
    bio: 'Friendly barber with a special touch for kids and family haircuts.',
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '555-0103',
    specialties: ['Haircut', 'Beard Trim', 'Senior Haircut'],
    photoUrl: '/barbers/sarah.jpg',
    bio: 'Experienced barber with expertise in all types of cuts and styles.',
  },
];

export async function GET() {
  return NextResponse.json(mockBarbers);
}

export async function POST(request) {
  const body = await request.json();
  const newBarber = {
    id: String(mockBarbers.length + 1),
    ...body,
  };
  mockBarbers.push(newBarber);
  return NextResponse.json(newBarber);
} 