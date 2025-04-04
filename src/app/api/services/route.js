import { NextResponse } from 'next/server';

const mockServices = [
  {
    id: '1',
    name: 'Haircut',
    description: 'Professional haircut with styling',
    price: 30,
    duration: 30,
  },
  {
    id: '2',
    name: 'Beard Trim',
    description: 'Beard shaping and trimming',
    price: 20,
    duration: 20,
  },
  {
    id: '3',
    name: 'Haircut & Beard',
    description: 'Complete haircut and beard service',
    price: 45,
    duration: 45,
  },
  {
    id: '4',
    name: 'Kids Haircut',
    description: 'Haircut for children under 12',
    price: 25,
    duration: 25,
  },
  {
    id: '5',
    name: 'Senior Haircut',
    description: 'Haircut for seniors (65+)',
    price: 25,
    duration: 25,
  },
];

export async function GET() {
  return NextResponse.json(mockServices);
}

export async function POST(request) {
  const body = await request.json();
  const newService = {
    id: String(mockServices.length + 1),
    ...body,
  };
  mockServices.push(newService);
  return NextResponse.json(newService);
} 