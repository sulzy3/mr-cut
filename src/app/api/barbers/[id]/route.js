import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const barber = await prisma.barber.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            phone_number: true,
            role: true
          }
        }
      }
    });

    if (!barber) {
      return NextResponse.json(
        { error: 'Barber not found' },
        { status: 404 }
      );
    }

    // Format the response
    const formattedBarber = {
      id: barber.id,
      firstName: barber.firstName || barber.user.firstName,
      lastName: barber.lastName || barber.user.lastName,
      phone_number: barber.phone_number,
      specialties: barber.specialties,
      working_hours: barber.working_hours,
      photo_url: barber.photo_url,
      bio: barber.bio,
      created_at: barber.created_at,
      updated_at: barber.updated_at
    };

    return NextResponse.json(formattedBarber);
  } catch (error) {
    console.error('Error fetching barber:', error);
    return NextResponse.json(
      { error: 'Failed to fetch barber' },
      { status: 500 }
    );
  }
} 