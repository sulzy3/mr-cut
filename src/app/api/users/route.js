import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add explicit export for GET method
export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone_number: true,
        role: true,
        created_at: true,
        barber: {
          select: {
            specialties: true,
            working_hours: true,
            photo_url: true,
            bio: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
} 