import { NextResponse } from 'next/server';

const mockAppointments = [
  {
    id: '1',
    serviceId: '1',
    barberId: '1',
    date: '2024-04-05',
    time: '10:00',
    customerName: 'David Brown',
    customerPhone: '555-0201',
    customerEmail: 'david@example.com',
    status: 'confirmed',
    notes: 'Regular haircut',
  },
  {
    id: '2',
    serviceId: '2',
    barberId: '3',
    date: '2024-04-05',
    time: '11:00',
    customerName: 'Lisa Green',
    customerPhone: '555-0202',
    customerEmail: 'lisa@example.com',
    status: 'pending',
    notes: 'Beard trim only',
  },
];

export async function GET() {
  return NextResponse.json(mockAppointments);
}

export async function POST(request) {
  const body = await request.json();
  const newAppointment = {
    id: String(mockAppointments.length + 1),
    status: 'pending',
    ...body,
  };
  mockAppointments.push(newAppointment);
  return NextResponse.json(newAppointment);
} 