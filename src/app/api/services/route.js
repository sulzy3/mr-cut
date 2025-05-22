import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.service.findMany();
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, duration_minutes, price } = await request.json();

    // Validate required fields
    if (!name || !duration_minutes || !price) {
      return NextResponse.json(
        { error: 'Name, description, duration_minutes, and price are required' },
        { status: 400 }
      );
    }

    // Create the service
    const service = await prisma.service.create({
      data: {
        name,
        duration_minutes,
        price,
        description:"null",
      }
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}