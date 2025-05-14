import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const service = await prisma.service.findUnique({
      where: { id }
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    console.log('Received update request:', { id, body });

    // Validate required fields
    const { name, description, duration_minutes, price } = body;
    if (!name || !description || !duration_minutes || !price) {
      return NextResponse.json(
        { error: 'Name, description, duration_minutes, and price are required' },
        { status: 400 }
      );
    }

    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: { id }
    });

    if (!existingService) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Update the service
    const service = await prisma.service.update({
      where: { id },
      data: {
        name,
        description,
        duration_minutes: Number(duration_minutes),
        price: Number(price)
      }
    });

    console.log('Service updated successfully:', service);
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ 
      error: 'Failed to update service',
      details: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.service.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
} 