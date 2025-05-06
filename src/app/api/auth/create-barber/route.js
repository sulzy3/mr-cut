import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { 
      phone_number, 
      first_name, 
      last_name,
      specialties = [],
      working_hours = {},
      photo_url,
      bio
    } = await request.json();

    if (!phone_number || !first_name || !last_name) {
      return NextResponse.json(
        { message: 'Phone number, first name, and last name are required' },
        { status: 400 }
      );
    }

    // Create a new barber user and profile in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Create the user
      const user = await prisma.user.create({
        data: {
          phone_number,
          firstName: first_name,
          lastName: last_name,
          role: 'barber'
        }
      });

      // Create the barber profile
      const barber = await prisma.barber.create({
        data: {
          id: user.id,
          firstName: first_name,
          lastName: last_name,
          phone_number,
          specialties,
          working_hours,
          photo_url,
          bio
        }
      });

      return { user, barber };
    });

    return NextResponse.json(
      { 
        message: 'Barber created successfully', 
        user: result.user,
        barber: result.barber
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating barber:', error);
    return NextResponse.json(
      { message: 'Failed to create barber' },
      { status: 500 }
    );
  }
} 